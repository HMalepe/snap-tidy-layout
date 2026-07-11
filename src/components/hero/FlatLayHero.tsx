import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import woodGrain from "@/assets/backdrop/wood-grain.jpg";
import { FlatLayScene } from "./FlatLayScene";

export function FlatLayHero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(0);
  const assembledRef = useRef(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    let raf = 0;
    const tick = () => {
      const el = sectionRef.current;
      if (el) {
        const rect = el.getBoundingClientRect();
        const total = rect.height - window.innerHeight;
        const scrolled = Math.min(Math.max(-rect.top, 0), Math.max(total, 1));
        const p = total > 0 ? scrolled / total : 0;
        progressRef.current = p;
        assembledRef.current = p >= 0.95;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full"
      style={{ height: "190vh" }}
      aria-label="Barbershop tools flat-lay"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Wood grain backdrop */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${woodGrain})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        {/* Vignette */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.35) 100%)",
          }}
        />

        {/* 3D flat-lay scene */}
        <div className="absolute inset-0">
          {mounted && (
            <FlatLayScene progressRef={progressRef} assembledRef={assembledRef} />
          )}
        </div>

        {/* Headline overlay */}
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center pointer-events-none">
          <p className="mb-4 text-xs uppercase tracking-[0.35em] text-[color:var(--cream)]/80">
            Est. Twenty Twenty-Six
          </p>
          <h1 className="font-display text-[color:var(--cream)] text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[0.95] max-w-4xl">
            Sharper<br />
            <span className="italic text-[color:var(--brass)]">by the minute.</span>
          </h1>
          <p className="mt-6 max-w-md text-sm md:text-base text-[color:var(--cream)]/80">
            A quiet room, a hot towel, and tools kept as sharp as the cut.
          </p>
          <div className="pointer-events-auto mt-8 flex gap-3">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center rounded-full bg-[color:var(--brass)] px-6 py-3 text-sm font-medium text-[color:var(--walnut)] transition-transform hover:scale-[1.03]"
            >
              Book a chair
            </Link>
            <Link
              to="/services"
              className="inline-flex items-center justify-center rounded-full border border-[color:var(--cream)]/40 px-6 py-3 text-sm font-medium text-[color:var(--cream)] transition-colors hover:bg-[color:var(--cream)]/10"
            >
              The menu
            </Link>
          </div>
          <p className="absolute bottom-6 text-[10px] uppercase tracking-[0.3em] text-[color:var(--cream)]/60">
            Scroll — watch the tools settle
          </p>
        </div>
      </div>
    </section>
  );
}
