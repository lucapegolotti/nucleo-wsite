"use client";

import { useEffect, useState } from "react";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? ""; // retained if needed elsewhere

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { label: "Product", href: "#product" },
    { label: "Use Cases", href: "#use-cases" },
    { label: "Performance", href: "#performance" },
    { label: "Team", href: "#team" },
    { label: "Contact", href: "#contact" },
  ];

  // Prevent background scroll when the menu is open
  useEffect(() => {
    if (isOpen) {
      const previous = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = previous;
      };
    }
  }, [isOpen]);

  const headerClass = isOpen
    ? "sticky top-0 z-50 bg-white border-b border-black/5"
    : "sticky top-0 z-50 bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/70 border-b border-black/5";

  return (
    <header className={headerClass}>
      <div className="mx-auto max-w-6xl px-6 h-12 sm:h-14 flex items-center justify-between overflow-x-hidden">
        <a href="#" className="flex items-center">
          <span className="font-display text-[22px] sm:text-[24px] leading-none tracking-tight">
            Nucleo
            <span className="text-slate-400">.</span>
          </span>
        </a>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center gap-10">
          {links.slice(0, 4).map((link) => (
            <a key={link.label} href={link.href} className="text-sm hover:opacity-80">
              {link.label}
            </a>
          ))}
          <a href="#contact" className="text-sm hover:opacity-80">Contact</a>
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          <a href="#contact" className="button-outline-peach px-4 py-2 font-semibold text-sm">Request Demo</a>
        </div>

        {/* Mobile burger */}
        <button
          type="button"
          aria-label="Open menu"
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          onClick={() => setIsOpen((v) => !v)}
          className="md:hidden inline-flex items-center justify-center p-2 rounded-md border border-black/10"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            {isOpen ? (
              <path d="M18 6L6 18M6 6l12 12" />
            ) : (
              <>
                <path d="M3 6h18" />
                <path d="M3 12h18" />
                <path d="M3 18h18" />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Solid white backdrop to guarantee no transparency bleed-through */}
      <div
        className={`${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"} md:hidden fixed inset-0 z-[900] bg-white transition-opacity duration-200`}
      />

      {/* Mobile drawer */}
      <div
        id="mobile-menu"
        className={`mobile-menu-root md:hidden fixed inset-0 z-[1000] h-full w-full bg-white transform transition-transform duration-200 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="px-6 py-5 flex items-center justify-between border-b border-black/10">
          <span className="font-display text-[22px] leading-none tracking-tight">Nucleo<span className="text-slate-400">.</span></span>
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setIsOpen(false)}
            className="inline-flex items-center justify-center p-2 rounded-md border border-black/10"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
        <nav className="px-6 py-4 flex flex-col gap-4 overflow-y-auto">
          {links.map((link) => (
            <a key={link.label} href={link.href} className="text-base" onClick={() => setIsOpen(false)}>
              {link.label}
            </a>
          ))}
          <div className="pt-4">
            <a href="#contact" className="button-outline-peach w-full inline-flex justify-center px-4 py-2 font-semibold text-sm" onClick={() => setIsOpen(false)}>
              Request Demo
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
