# ThinkMetric Website

Production website for ThinkMetric — wind LiDAR, meteorological mast,
environmental & atmospheric LiDAR, and remote power supply systems.

Built with React 19 + Vite + React Router. No CSS framework; a hand-built
design system ("Atmospheric Precision") lives in `src/styles/`.

## Local setup

```bash
npm install
npm run dev       # local dev server
npm run build     # production build -> dist/
npm run preview   # preview the production build locally
npm run lint      # oxlint
```

## Editing content

All company and product content lives in two plain data files so it can be
updated without touching component code:

- **`src/data/siteContent.js`** — company name, tagline, contact details,
  Istanbul location + Google Maps link, About copy, process steps,
  the product categories, and applications list.
- **`src/data/products.js`** — the full product catalog. Each entry:

  ```js
  {
    slug: 'windhorizon-h400',
    modelName: 'WindHorizon H400',
    productType: 'Nacelle Wind LiDAR',
    categorySlug: 'lidars',
    categoryLabel: 'Lidars',
    summary: '...',
    applications: [],
    image: null,      // see "Adding product images" below
    pdfUrl: null,      // see "Adding product datasheets" below
    contentStatus: 'pending',
  }
  ```

  To add a new product, add a new object to the `products` array. To add a
  new category, add it to `categories` in `siteContent.js` and give products
  a matching `categorySlug`.

**Content-integrity note:** this site intentionally avoids inventing specs,
certifications, statistics, testimonials, or office locations that were not
supplied. Please keep that discipline when editing — leave a field `null`
or write an honest "coming soon" note rather than filling in a plausible
guess.

## Adding product images

1. Add the image file to `public/images/products/{slug}.jpg` (and ideally a
   `.webp` version for performance).
2. Set `image: '/images/products/{slug}.jpg'` on the matching product in
   `src/data/products.js`.

Until a real, manufacturer-approved photo is added, the product card and
detail page show a branded placeholder with a category icon — never a
fabricated or AI-generated "photo" of a specific model.

## Adding product datasheets (PDFs)

1. Add the PDF to `public/documents/products/{slug}.pdf`.
2. Set `pdfUrl: '/documents/products/{slug}.pdf'` on the matching product.

The product page automatically switches from the "Datasheet coming soon /
Request documentation" state to a working "Open Product Datasheet" link
that opens the PDF in a new tab.

## Hero scene

The hero is a fully illustrated, animated scene (`src/components/WindScene`)
rather than a static photo: a gradient sky, drifting fog, layered hill
silhouettes, and wind turbines with genuinely rotating blades (CSS
`@keyframes` on an SVG `<g>`, not a decorative loop). It's paired with the
existing `AtmosphericOverlay` (contour lines / scan arcs) for the
measurement motif. Both are pausable via the on-screen control and fully
respect `prefers-reduced-motion`.

To adjust the scene:

- Turbine count/position/scale/speed: edit the `TURBINES` array at the top
  of `WindScene.jsx`.
- Sky/fog/hill colors: `WindScene.css`.

To swap in a licensed or newly generated video instead, add files at
`public/media/thinkmetric-hero.webm` / `.mp4` / `-poster.webp`, then replace
`<WindScene />` in `HeroMedia.jsx` with a `<video muted loop playsInline
preload="metadata">` pointing at them — keep the existing gradient overlay,
motion-toggle button, and `prefers-reduced-motion` handling as-is. Never use
a video that shows screen-recording UI, phone status bars, playback
controls, or third-party watermarks.

## Contact form endpoint

Copy `.env.example` to `.env` and, if you have a form-handling backend, set:

```
VITE_CONTACT_FORM_ENDPOINT=https://your-endpoint.example.com/contact
```

If this is left empty, the form still works: on submit it opens a
pre-filled email draft addressed to `info@think-metric.co` (general
inquiries) or `sales@think-metric.co` (sales, documentation, technical),
so there is never a fake "success" message with no real submission.

## Map link

The Istanbul location and Google Maps search URL are both defined once, in
`location` inside `src/data/siteContent.js`. Update `mapsUrl` there when a
full street address is approved — every link on the site (footer, contact
page, homepage) reads from this single source.

The world map illustration on the homepage/contact page (`src/data/worldMap.js`)
is derived from real geographic data — the [`@svg-maps/world`](https://www.npmjs.com/package/@svg-maps/world)
package (CC-BY-4.0, © Victor Cazanave) — geometrically unioned and simplified
for a lightweight decorative graphic. Attribution retained here per the license.

## Routes

```
/                                                Home
/products                                        Products & Services overview (filter by category)
/products/lidars                                 Category
/products/wind-measurement-met-mast              Category (pending model list)
/products/remote-power-supply-systems            Category (pending model list)
/products/detail/:productSlug                    Individual product page
/about                                            About
/contact                                          Contact
*                                                 404
```

## Build / test results

- `npm run build` — succeeds, no errors.
- `npx oxlint` — 0 errors, 1 informational warning (fast-refresh note on an
  icon-map export, harmless in production).
- All routes load directly (client-side routing configured for
  `BrowserRouter`; configure your host to rewrite unknown paths to
  `index.html` — e.g. Netlify `_redirects: /* /index.html 200` or Vercel's
  default SPA rewrite).

## Remaining TODOs (require approved content)

- [ ] Full Istanbul street address (currently "Full address coming soon").
- [ ] Model lists for **Wind Measurement — Met Mast** and **Remote Power
      Supply Systems** categories.
- [ ] Real product photography for the 16 confirmed LiDAR products.
- [ ] Product datasheets (PDFs) for any of the above.
- [ ] A licensed or newly generated hero video (see "Hero video / poster").
- [ ] A backend endpoint for the contact form, if a mailto fallback isn't
      the long-term preference.
