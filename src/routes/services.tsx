import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Ashwood & Co." },
      { name: "description", content: "Cuts, shaves, beard care and kids — the full menu at Ashwood & Co." },
      { property: "og:title", content: "Services — Ashwood & Co." },
      { property: "og:description", content: "Cuts, shaves, beard care and kids — the full menu at Ashwood & Co." },
    ],
  }),
  component: Services,
});

const MENU = [
  { t: "The Cut", time: "45 min", price: "$48", d: "Wash, consult, cut, finish. The one most people book." },
  { t: "The Long Cut", time: "60 min", price: "$62", d: "For hair past the collar. More time, same care." },
  { t: "Straight Shave", time: "45 min", price: "$55", d: "Hot towel, badger brush, straight razor, cold cloth." },
  { t: "Beard Trim", time: "25 min", price: "$28", d: "Line, taper, and oil." },
  { t: "Cut + Beard", time: "60 min", price: "$68", d: "Both. Together. In sequence." },
  { t: "Kids (under 12)", time: "30 min", price: "$28", d: "Quiet, quick, no fuss." },
];

function Services() {
  return (
    <div className="min-h-screen bg-[color:var(--cream)] text-[color:var(--walnut)]">
      <Header />
      <div className="bg-[color:var(--walnut)] pb-24 pt-40 text-[color:var(--cream)]">
        <div className="mx-auto max-w-5xl px-6 md:px-10">
          <p className="mb-4 text-xs uppercase tracking-[0.3em] text-[color:var(--cream)]/60">
            Menu
          </p>
          <h1 className="font-display text-5xl md:text-7xl">Services</h1>
          <p className="mt-6 max-w-xl text-[color:var(--cream)]/80">
            Prices are honest. Times are real. If we finish early, you leave early.
          </p>
        </div>
      </div>
      <section className="px-6 py-20 md:px-10">
        <div className="mx-auto max-w-5xl divide-y divide-[color:var(--walnut)]/15">
          {MENU.map((m) => (
            <div key={m.t} className="grid grid-cols-12 gap-4 py-6 items-baseline">
              <h3 className="col-span-12 md:col-span-4 font-display text-2xl">{m.t}</h3>
              <p className="col-span-8 md:col-span-6 text-sm text-muted-foreground">{m.d}</p>
              <p className="col-span-2 md:col-span-1 text-sm text-muted-foreground">{m.time}</p>
              <p className="col-span-2 md:col-span-1 text-right font-display text-xl text-[color:var(--brass)]">{m.price}</p>
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </div>
  );
}
