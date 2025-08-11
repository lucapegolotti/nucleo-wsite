"use client";

import { useEffect, useMemo, useState } from "react";

type OrbVariant = "teal" | "sunset" | "sage" | "cream";

type RandomOrb = {
  leftPx: number;
  topPx: number;
  size: number;
  variant: OrbVariant;
  softness: number; // fraction of size used as blur radius
  opacity: number;
};

type RandomOrbsProps = {
  count?: number;
  areaHeightPx?: number;
  seed?: number | string; // deterministic seed
};

const VARIANTS: OrbVariant[] = ["teal", "sunset", "sage", "cream"];

export default function RandomOrbs({ count = 8, areaHeightPx = 1400, seed }: RandomOrbsProps) {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  // Lightweight seeded RNG helpers
  const xfnv1a = (str: string) => {
    let h = 2166136261 >>> 0;
    for (let i = 0; i < str.length; i += 1) {
      h = Math.imul(h ^ str.charCodeAt(i), 16777619);
    }
    h += h << 13;
    h ^= h >>> 7;
    h += h << 3;
    h ^= h >>> 17;
    h += h << 5;
    return h >>> 0;
  };

  const mulberry32 = (a: number) => {
    let t = a >>> 0;
    return () => {
      t += 0x6d2b79f5;
      let r = Math.imul(t ^ (t >>> 15), 1 | t);
      r ^= r + Math.imul(r ^ (r >>> 7), 61 | r);
      return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
    };
  };

  const orbs = useMemo<RandomOrb[]>(() => {
    if (!isMounted) return [];
    const viewportWidth = window.innerWidth;
    // Stable seed: allow external seed or use a default
    const defaultSeed = "nucleo-orbs-v1";
    const seedValue = seed ?? defaultSeed;
    const seedNumber = typeof seedValue === "number" ? seedValue : xfnv1a(seedValue);
    const rng = mulberry32(seedNumber >>> 0);
    const randomBetween = (min: number, max: number) => rng() * (max - min) + min;

    const generated: RandomOrb[] = [];
    for (let i = 0; i < count; i += 1) {
      const size = randomBetween(80, 520);
      const leftPx = randomBetween(-200, viewportWidth + 200);
      const topPx = randomBetween(-120, areaHeightPx);
      const variant = VARIANTS[Math.floor(randomBetween(0, VARIANTS.length))] as OrbVariant;
      const softness = randomBetween(0.08, 0.18);
      const opacity = randomBetween(0.55, 0.95);
      generated.push({ leftPx, topPx, size, variant, softness, opacity });
    }
    return generated;
  }, [count, areaHeightPx, seed, isMounted]);

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
      {orbs.map((orb, index) => {
        const blurPx = Math.max(8, Math.round(orb.size * orb.softness));
        return (
          <div
            key={index}
            className={`pointer-events-none absolute orb orb--${orb.variant}`}
            style={{
              left: orb.leftPx,
              top: orb.topPx,
              width: orb.size,
              height: orb.size,
              filter: `blur(${blurPx}px)`,
              opacity: orb.opacity,
            }}
          />
        );
      })}
    </div>
  );
}


