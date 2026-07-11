import { createFileRoute, Link } from "@tanstack/react-router";
import { FlatLayHero } from "@/components/hero/FlatLayHero";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <FlatLayHero />

      {/* Highlights strip */}
      <section className="bg-[color:var(--cream)] px-6 py-24 md:px-10">
        <div className="mx-auto max-w-5xl">
          <p className="mb-4 text-xs uppercase tracking-[0.3em] text-muted-foreground">
            The shortlist
          </p>
          <h2 className="font-display text-4xl md:text-5xl text-[color:var(--walnut)]">
            Three things, done properly.
          </h2>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {[
              { t: "Cuts", d: "45 minutes. Wash, consult, cut, finish." },
              { t: "Shaves", d: "Straight razor, hot towel, cold cloth." },
              { t: "Beards", d: "Line, taper, oil. Kept honest." },
            ].map((s) => (
              <div key={s.t} className="border-t border-[color:var(--walnut)]/20 pt-6">
                <h3 className="font-display text-2xl text-[color:var(--walnut)]">{s.t}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.d}</p>
              </div>
            ))}
          </div>
          <div className="mt-12">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 text-sm font-medium text-[color:var(--walnut)] underline underline-offset-4 hover:text-[color:var(--brass)]"
            >
              See the full menu →
            </Link>
          </div>
        </div>
      </section>

      {/* About teaser */}
      <section className="bg-[color:var(--walnut)] px-6 py-24 text-[color:var(--cream)] md:px-10">
        <div className="mx-auto grid max-w-5xl gap-10 md:grid-cols-2 md:items-center">
          <div>
            <p className="mb-4 text-xs uppercase tracking-[0.3em] text-[color:var(--cream)]/60">
              The shop
            </p>
            <h2 className="font-display text-4xl md:text-5xl">
              A room built for the cut.
            </h2>
          </div>
          <div>
            <p className="text-[color:var(--cream)]/80">
              Four chairs. Real light. Tools kept sharp because dull tools tell on you.
              We take our time — you should too.
            </p>
            <Link
              to="/about"
              className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-[color:var(--brass)] underline underline-offset-4"
            >
              More about us →
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
