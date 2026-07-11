import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="border-t border-border bg-[color:var(--walnut)] px-6 py-12 text-[color:var(--cream)]/80 md:px-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-display text-2xl text-[color:var(--cream)]">Ashwood & Co.</p>
          <p className="mt-2 text-sm">Barbering, slowly done.</p>
        </div>
        <nav className="flex gap-6 text-sm">
          <Link to="/services" className="hover:text-[color:var(--brass)]">Services</Link>
          <Link to="/about" className="hover:text-[color:var(--brass)]">About</Link>
          <Link to="/contact" className="hover:text-[color:var(--brass)]">Contact</Link>
        </nav>
        <p className="text-xs uppercase tracking-widest">© {new Date().getFullYear()}</p>
      </div>
    </footer>
  );
}
