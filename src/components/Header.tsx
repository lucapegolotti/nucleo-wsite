import Image from "next/image";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/70 border-b border-black/5">
      <div className="mx-auto max-w-6xl px-6 h-14 sm:h-16 flex items-center justify-between">
        <a href="#" className="flex items-center">
          <Image src={`${basePath}/media/logo.png`} alt="Nucleo" width={120} height={28} />
        </a>
        <nav className="hidden md:flex items-center gap-10">
          <a href="#product" className="text-sm hover:opacity-80">Product</a>
          <a href="#use-cases" className="text-sm hover:opacity-80">Use Cases</a>
          <a href="#performance" className="text-sm hover:opacity-80">Performance</a>
          <a href="#contact" className="md:hidden text-sm hover:opacity-80">Contact</a>
        </nav>
        <div className="flex items-center gap-3">
          <a href="#contact" className="button-outline-peach px-5 py-2.5 font-semibold text-sm">Request Demo</a>
        </div>
      </div>
    </header>
  );
}


