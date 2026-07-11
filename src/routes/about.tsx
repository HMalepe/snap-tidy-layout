import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Ashwood & Co." },
      { name: "description", content: "A four-chair barbershop that keeps its tools sharp and its rooms quiet." },
      { property: "og:title", content: "About — Ashwood & Co." },
      { property: "og:description", content: "A four-chair barbershop that keeps its tools sharp and its rooms quiet." },
    ],
  }),
  component: About,
});

function About() {
  return (
    <div className="min-h-screen bg-[color:var(--cream)] text-[color:var(--walnut)]">
      <Header />
      <div className="bg-[color:var(--walnut)] pb-24 pt-40 text-[color:var(--cream)]">
        <div className="mx-auto max-w-4xl px-6 md:px-10">
          <p className="mb-4 text-xs uppercase tracking-[0.3em] text-[color:var(--cream)]/60">The shop</p>
          <h1 className="font-display text-5xl md:text-7xl">
            Four chairs. Real light.<br />
            <span className="italic text-[color:var(--brass)]">No hurry.</span>
          </h1>
        </div>
      </div>
      <section className="px-6 py-20 md:px-10">
        <div className="mx-auto max-w-3xl space-y-6 text-lg leading-relaxed">
          <p>
            We opened Ashwood & Co. because most barbershops are in a rush, and we don't like being in a rush.
            A cut should take as long as it takes.
          </p>
          <p>
            We honed shears in Kyoto, learned straight-razor work in Bologna, and set up a room in the neighborhood
            we already lived in. Four chairs is enough. More than that and we'd start rushing again.
          </p>
          <p>
            Our tools are cleaned between clients, sharpened weekly, and replaced before they dull. That's the boring
            part. The good part is the coffee, the music, and the twenty minutes you spend not looking at your phone.
          </p>
        </div>
      </section>
      <Footer />
    </div>
  );
}
