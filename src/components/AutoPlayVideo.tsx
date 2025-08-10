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
      src={src}
      autoPlay
      muted
      loop
      playsInline
      className={className}
    />
  );
}


