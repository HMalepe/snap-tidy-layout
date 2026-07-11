
# Barbershop Landing Page — 3D Top-Down Flat-Lay Hero

## Overview

A new barbershop landing page whose signature moment is a scroll-driven, orthographic top-down flat-lay: 5 barber tools scatter into editorial symmetry around the headline. Backdrop is wood grain. Built in three.js with an orthographic camera, driven by GSAP ScrollTrigger with individually tuned back.out overshoots per tool.

Tools use a hybrid asset approach: generated top-down PNGs (with transparency) for realism as textures, complemented by custom inline SVG accents (tick marks, guide lines, headline treatment) for the editorial layer.

## Page Structure (routes)

```text
src/routes/
  __root.tsx        (existing — update head metadata: title, description, og)
  index.tsx         (rebuild: hero with 3D flat-lay + short intro)
  services.tsx      (cuts, shaves, beard care, kids)
  about.tsx         (story, craft, team)
  contact.tsx       (address, hours, booking CTA)
```

Each route sets its own head() (title, description, og:title, og:description). Shared `<Header />` and `<Footer />` components live in `src/components/site/`.

## Hero: The Flat-Lay Animation

### Composition
- Full-viewport section, 100vh sticky, with 90vh scroll table driving progress 0→1.
- Headline sits centered; tools resolve into a radially-balanced arrangement around its negative space (2 above, 2 below, 1 offset — computed from viewport size).
- Wood-grain backdrop plane, subtle radial vignette (10% edge darkening), no other backdrop motion.

### Tools (5 layers)
1. Scissors
2. Comb
3. Straight razor
4. Clipper
5. Folded towel

Each tool = a textured plane in three.js using a generated top-down PNG (transparent background).

### Motion spec
Per tool `i` (0–4):
- Scatter start: hand-authored `{ x, y, rotation }` with moderate randomness (fixed seed, not random per load).
- Final target: symmetric arrangement around headline.
- Overshoot (back.out): unique per tool — e.g. `[1.6, 2.1, 1.4, 1.9, 2.2]`.
- Stagger delay per index: `[0, 0.09, 0.13, 0.08, 0.15]` (mapped into scroll progress window).
- Easing: GSAP `back.out(overshoot)` sampled by normalized scroll progress, not time.

### Lighting / shadow
- Fixed overhead light direction.
- Each tool has a soft drop-shadow plane beneath it (or CSS-equivalent post shadow layer): 8px blur, 20% opacity, 4px offset. Shadow tracks the tool's position/rotation during motion (physical coherence).

### Cursor interaction (post-assembly)
- Hover an assembled tool → scale to 1.03, shadow grows to 12px blur / 28% opacity, 150ms ease-out.
- Reverts on mouseleave.
- Only enabled after scroll progress ≥ ~0.95.

### Scroll wiring
- GSAP + ScrollTrigger, `scrub: true` on the 90vh table.
- Progress 0–1 fed into per-tool eased interpolation between scatter and target transforms.

## Technical Details

### New dependencies
- `three` — 3D scene
- `@react-three/fiber` — React renderer for three
- `@react-three/drei` — OrthographicCamera, useTexture, Plane helpers
- `gsap` — back.out easing + ScrollTrigger

### Files
```text
src/components/hero/
  FlatLayHero.tsx           (section wrapper, scroll table, headline overlay)
  FlatLayScene.tsx          (R3F Canvas, orthographic camera, lighting)
  ToolMesh.tsx              (textured plane + shadow plane, hover state)
  useScrollProgress.ts      (ScrollTrigger scrub → progress value)
  toolConfig.ts             (5 tools: asset path, scatter, target, overshoot, delay)
src/components/site/
  Header.tsx
  Footer.tsx
src/assets/tools/           (generated PNGs, ~1024×1024 transparent)
  scissors.png
  comb.png
  razor.png
  clipper.png
  towel.png
src/assets/backdrop/
  wood-grain.jpg            (generated seamless wood texture)
```

### Asset generation
- 5 top-down tool PNGs generated at high fidelity, transparent background, consistent lighting direction baked in so shadows match the scene light.
- 1 wood-grain backdrop image (seamless, warm walnut tones).

### Rendering notes
- Orthographic camera looking straight down (−Z). Scene units in viewport-relative space so tool layout adapts to resize.
- DPR clamped to `[1, 2]` for perf.
- Shadow implemented as a second darker, blurred plane (`MeshBasicMaterial`, opacity 0.2) offset behind each tool — cheaper than shadow maps and matches the flat-lay aesthetic.
- Falls back gracefully on very small screens: static assembled arrangement, no scroll scatter.

### Design tokens (add to `src/styles.css`)
- Warm barbershop palette: deep walnut background, cream foreground, brass accent.
- Display serif for headline (e.g. Fraunces), clean sans for body (e.g. Inter or Söhne-style).
- New CSS vars: `--brass`, `--walnut`, `--cream`, plus `--ease-premium-out: cubic-bezier(.22,.61,.36,1)`.

## Content

### Home (hero copy suggestion)
- Headline: "Sharper by the minute."
- Subhead: one line about craft-first grooming.
- CTA: "Book a chair" → /contact.

### Below the hero on `/`
- 3-item highlight strip (Cuts / Shaves / Beard) linking to /services.
- Short "About the shop" teaser linking to /about.

Full copy for services/about/contact will be drafted during build using the same tone.

## Out of Scope (this plan)
- Actual booking/payments backend.
- CMS.
- Multi-language.

## Verification
- Scroll the hero on desktop: tools snap with visibly distinct overshoots and staggered timing.
- Hover assembled tools: scale + shadow bump.
- Resize window: layout recomputes, arrangement stays symmetric.
- Lighthouse pass on `/` for perf/SEO/a11y.
