"use client";

import { useEffect, useRef } from "react";

type AutoPlayVideoProps = {
  src: string;
  playbackRate?: number;
  className?: string;
};

export default function AutoPlayVideo({
  src,
  playbackRate = 1.2,
  className = "",
}: AutoPlayVideoProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  const normalizedSrc = src.startsWith("/") ? src : `/${src}`;
  const fullSrc = `${basePath || ""}${normalizedSrc}`;

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const applyRate = () => {
      try {
        video.playbackRate = playbackRate;
      } catch {
        /* no-op */
      }
    };

    applyRate();
    video.addEventListener("loadedmetadata", applyRate);
    video.addEventListener("play", applyRate);

    return () => {
      video.removeEventListener("loadedmetadata", applyRate);
      video.removeEventListener("play", applyRate);
    };
  }, [playbackRate]);

  return (
    <video
      ref={videoRef}
      src={fullSrc}
      autoPlay
      muted
      loop
      playsInline
      className={className}
    />
  );
}


