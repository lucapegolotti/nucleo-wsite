"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type BarDatum = {
  label: string;
  valuePercent: number; // 0-100
  colorVar?: string; // CSS var name e.g. --tealgray
};

function AnimatedBar({
  datum,
  delayMs,
}: {
  datum: BarDatum;
  delayMs: number;
}) {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          setInView(e.isIntersecting);
        }
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const width = inView ? `${datum.valuePercent}%` : "0%";
  const bgColor = `var(${datum.colorVar ?? "--tealgray"})`;
  const transition = inView
    ? `width 900ms cubic-bezier(0.22, 1, 0.36, 1) ${delayMs}ms`
    : "none";

  return (
    <div className="w-full">
      <div className="flex items-baseline justify-between">
        <div className="text-sm sm:text-base font-medium">{datum.label}</div>
        <div className="text-sm sm:text-base font-semibold tabular-nums">{datum.valuePercent}%</div>
      </div>
      <div ref={trackRef} className="mt-2 h-3 sm:h-3.5 w-full rounded-full bg-black/5">
        <div
          className="h-full rounded-full"
          style={{ width, backgroundColor: bgColor, transition }}
          aria-hidden
        />
      </div>
    </div>
  );
}

export default function PerformanceSection() {
  const data = useMemo<BarDatum[]>(
    () => [
      {
        label: "Our body composition tool",
        valuePercent: 91,
        colorVar: "--tealgray",
      },
      {
        label: "The industry standard (BIA)",
        valuePercent: 75,
        colorVar: "--sage",
      },
      {
        label: "Our lesion segmentator",
        valuePercent: 85,
        colorVar: "--peach",
      },
    ],
    []
  );

  return (
    <section id="performance" className="relative isolate py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="font-display text-3xl sm:text-5xl">State of the art performance</h2>
        <p className="mt-4 max-w-3xl text-slate-700">
          Our platform delivers incredible performance in seconds. For example, in the body composition assessment task, our accuracy, measured in Dice score similarity, is well above that of the widely used Bioelectrical Impedance Analysis (BIA).
        </p>
        <div className="mt-10 grid grid-cols-1 gap-6">
          {data.map((d, i) => (
            <div key={d.label}>
              <AnimatedBar datum={d} delayMs={i * 150} />
              {i === 1 ? (
                <div className="mt-4 border-t border-dashed border-black/20" />
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


