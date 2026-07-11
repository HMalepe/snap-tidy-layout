import { Link } from "@tanstack/react-router";

export function Header() {
  return (
    <header className="absolute inset-x-0 top-0 z-20 flex items-center justify-between px-6 py-5 md:px-10">
      <Link to="/" className="font-display text-lg tracking-tight text-[color:var(--cream)]">
        Ashwood & Co.
      </Link>
      <nav className="hidden gap-8 text-sm text-[color:var(--cream)]/80 md:flex">
        <Link to="/services" className="hover:text-[color:var(--brass)] transition-colors">
          Services
        </Link>
        <Link to="/about" className="hover:text-[color:var(--brass)] transition-colors">
          About
        </Link>
        <Link to="/contact" className="hover:text-[color:var(--brass)] transition-colors">
          Contact
        </Link>
      </nav>
      <Link
        to="/contact"
        className="rounded-full border border-[color:var(--cream)]/40 px-4 py-2 text-xs uppercase tracking-widest text-[color:var(--cream)] hover:bg-[color:var(--cream)]/10"
      >
        Book
      </Link>
    </header>
  );
}
