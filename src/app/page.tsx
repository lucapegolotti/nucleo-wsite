// Landing hero with CTA and decorative orbs
import AutoPlayVideo from "@/components/AutoPlayVideo";
import Parallax from "@/components/Parallax";
import UseCasesSection from "@/components/UseCasesSection";
import PerformanceSection from "@/components/PerformanceSection";
import ContactSection from "@/components/ContactSection";

function CTAButton() {
  return (
    <a
      href="#contact"
      className="group relative inline-flex items-center justify-center button-outline-peach px-8 py-4 text-base sm:text-lg font-semibold shadow-lg shadow-slate-900/10"
    >
      <span>Request demo</span>
    </a>
  );
}

// Removed sections per request; keeping only hero

function Orb({
  className = "",
  variant = "teal",
  size = 280, // pixels
  softness = 0.12, // fraction of size used as blur radius
  opacity = 0.9,
}: {
  className?: string;
  variant?: string;
  size?: number;
  softness?: number;
  opacity?: number;
}) {
  const blurPx = Math.max(8, Math.round(size * softness));
  return (
    <div
      className={`pointer-events-none absolute orb orb--${variant} ${className}`}
      style={{ width: size, height: size, filter: `blur(${blurPx}px)`, opacity }}
    />
  );
}

export default function Home() {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  return (
    <main className="relative min-h-screen">
      {/* Decorative orbs*/}
      <Orb className="-left-32 -top-24" variant="teal" size={300} />
      <Orb className="-right-24 top-40" variant="sunset" size={360} />
      <Orb className="-left-0 top-130" variant="sage" size={360} />
      {/* <Orb className="left-1/2 -translate-x-1/2 top-350" variant="sage" size={120} /> */}
      <Orb className="left-1/2 translate-x-[-400px] top-350" variant="sunset" size={500} />

      {/* Hero */}
      <section className="relative isolate overflow-hidden py-28 sm:py-36">
        <div className="mx-auto max-w-6xl px-6">
          <Parallax speed={0.05}>
            <p className="mb-4 text-center text-base font-medium tracking-wide">
              Advanced AI-powered body composition analysis and tumor segmentation from medical images.
            </p>
            <h1 className="font-display text-center text-6xl sm:text-7xl md:text-8xl leading-[0.95] text-slate-700">
              From scan to answer.<br />
              <span className="italic">In seconds, not hours.</span>
            </h1>
          </Parallax>
          <div className="mt-16 sm:mt-20 flex justify-center">
            <CTAButton />
          </div>
          <div id="product" className="mt-20 sm:mt-28 w-full flex justify-center px-0 sm:px-6">
            <AutoPlayVideo
              src={`${basePath}/media/demo.mp4`}
              playbackRate={1.2}
              className="w-full max-w-5xl rounded-3xl ring-1 ring-white/10 shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Use cases section */}
      <UseCasesSection />

      {/* Performance section */}
      <PerformanceSection />

      {/* Contact section */}
      <ContactSection />
    </main>
  );
}
