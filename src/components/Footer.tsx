export default function Footer() {
  const year = new Date().getFullYear();
  const links = [
    { label: "Product", href: "#product" },
    { label: "Use Cases", href: "#use-cases" },
    { label: "Performance", href: "#performance" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <footer className="border-t border-black/10 bg-white">
      <div className="mx-auto max-w-6xl px-6 py-6 sm:py-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-sm text-slate-600">© {year} Nucleo. All rights reserved.</div>
          <nav className="flex flex-wrap items-center gap-x-6 gap-y-3 text-slate-700">
            {links.map((link) => (
              <a key={link.label} href={link.href} className="text-sm hover:opacity-80">
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}


