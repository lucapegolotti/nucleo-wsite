"use client";

import { useEffect, useRef, useState } from "react";

type ParallaxProps = {
  children: React.ReactNode;
  speed?: number; // positive moves with scroll direction, negative opposes
  className?: string;
};

export default function Parallax({ children, speed = 0.1, className = "" }: ParallaxProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [elementOffsetTop, setElementOffsetTop] = useState<number | null>(null);

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    const measure = () => {
      const rect = element.getBoundingClientRect();
      setElementOffsetTop(rect.top + window.scrollY);
    };

    measure();
    window.addEventListener("resize", measure, { passive: true });
    window.addEventListener("orientationchange", measure, { passive: true });

    return () => {
      window.removeEventListener("resize", measure);
      window.removeEventListener("orientationchange", measure);
    };
  }, []);

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    let ticking = false;

    const update = () => {
      if (elementOffsetTop == null) return;
      const scrollY = window.scrollY || window.pageYOffset;
      const translateY = (scrollY - elementOffsetTop) * speed;
      element.style.transform = `translate3d(0, ${translateY.toFixed(2)}px, 0)`;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    };

    // Initial position
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [speed, elementOffsetTop]);

  return (
    <div ref={containerRef} className={className} style={{ willChange: "transform" }}>
      {children}
    </div>
  );
}


