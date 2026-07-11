import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact & Booking — Ashwood & Co." },
      { name: "description", content: "Address, hours, and how to book a chair at Ashwood & Co." },
      { property: "og:title", content: "Contact & Booking — Ashwood & Co." },
      { property: "og:description", content: "Address, hours, and how to book a chair at Ashwood & Co." },
    ],
  }),
  component: Contact,
});

function Contact() {
  return (
    <div className="min-h-screen bg-[color:var(--cream)] text-[color:var(--walnut)]">
      <Header />
      <div className="bg-[color:var(--walnut)] pb-24 pt-40 text-[color:var(--cream)]">
        <div className="mx-auto max-w-4xl px-6 md:px-10">
          <p className="mb-4 text-xs uppercase tracking-[0.3em] text-[color:var(--cream)]/60">Visit</p>
          <h1 className="font-display text-5xl md:text-7xl">Book a chair.</h1>
        </div>
      </div>
      <section className="px-6 py-20 md:px-10">
        <div className="mx-auto grid max-w-5xl gap-12 md:grid-cols-2">
          <div className="space-y-6">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Address</p>
              <p className="mt-2 font-display text-2xl">142 Ashwood Lane<br />Portland, OR 97214</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Hours</p>
              <ul className="mt-2 space-y-1 text-sm">
                <li>Tue–Fri · 9am — 7pm</li>
                <li>Saturday · 9am — 5pm</li>
                <li>Sunday & Monday · Closed</li>
              </ul>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Get in touch</p>
              <p className="mt-2 text-sm">
                <a href="tel:+15035550142" className="hover:text-[color:var(--brass)]">(503) 555-0142</a><br />
                <a href="mailto:book@ashwood.co" className="hover:text-[color:var(--brass)]">book@ashwood.co</a>
              </p>
            </div>
          </div>
          <form className="space-y-4 rounded-2xl border border-[color:var(--walnut)]/15 bg-white/60 p-6">
            <div>
              <label className="text-xs uppercase tracking-widest text-muted-foreground">Name</label>
              <input className="mt-2 w-full border-b border-[color:var(--walnut)]/30 bg-transparent py-2 outline-none focus:border-[color:var(--brass)]" />
            </div>
            <div>
              <label className="text-xs uppercase tracking-widest text-muted-foreground">Email or phone</label>
              <input className="mt-2 w-full border-b border-[color:var(--walnut)]/30 bg-transparent py-2 outline-none focus:border-[color:var(--brass)]" />
            </div>
            <div>
              <label className="text-xs uppercase tracking-widest text-muted-foreground">What are you after?</label>
              <textarea rows={4} className="mt-2 w-full border-b border-[color:var(--walnut)]/30 bg-transparent py-2 outline-none focus:border-[color:var(--brass)]" />
            </div>
            <button
              type="button"
              className="rounded-full bg-[color:var(--walnut)] px-6 py-3 text-sm text-[color:var(--cream)] hover:bg-[color:var(--brass)] hover:text-[color:var(--walnut)] transition-colors"
            >
              Request a chair
            </button>
          </form>
        </div>
      </section>
      <Footer />
    </div>
  );
}
