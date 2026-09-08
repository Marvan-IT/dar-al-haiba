# Dar Al Haiba — website

Marketing site for Dar Al Haiba, designer and manufacturer of traditional Arabic garments,
first floor, Jumeirah Centre, Dubai.

Static site: plain HTML, CSS and JavaScript, no framework, no build step, no dependencies.
Both English and Arabic ship in the same page.

## Structure

```
dar-al-haiba/
├── public/                  Deployable web root — this is what goes live
│   ├── index.html           The site. Both languages, inline-styled sections.
│   ├── css/styles.css       Resets, font loading, hover states, breakpoints
│   ├── js/main.js           Language toggle (EN / AR)
│   ├── assets/              Photography and icons
│   ├── 404.html             Not-found page in the same visual language
│   ├── favicon.png          Site icon (512px) + favicon-64.png
│   ├── robots.txt           Crawler rules, points at the sitemap
│   ├── sitemap.xml          One URL, hreflang alternates for both languages
│   └── .nojekyll            Stops GitHub Pages rewriting the folder
├── DEPLOY.md                Step-by-step free deployment + Google visibility guide
├── package.json             Local dev server script
├── netlify.toml             Publish directory and cache headers
├── .editorconfig            Formatting conventions
├── .gitignore
├── device-test.html         Opens the site side by side at eight widths, 320px to 1440px
└── README.md
```

### Why there is no backend

Nothing on this site needs a server. Enquiries go straight to WhatsApp and the phone
dialler, directions go to Google Maps, and the product catalogue is fixed content. That is
deliberate — a static site is free to host, loads in well under a second, and cannot be
hacked through a database or admin login.

A backend becomes necessary only if you add one of these:

| Feature | What it needs |
| --- | --- |
| Contact form that emails you | A serverless function, or a hosted form service |
| Online ordering and payment | A backend plus a payment gateway (Stripe, Telr, Network International) |
| Stock levels shown live | A database and an admin interface |
| Customer accounts | Authentication and a database |

The conventional place for that code would be a sibling `api/` or `netlify/functions/`
directory, deployed alongside `public/`. Nothing is stubbed out for it here — an empty
folder would only be misleading.

## Running locally

No install needed. Either open `public/index.html` directly in a browser, or run a server:

```bash
npm run dev
```

Then open:

- **http://localhost:8000/public/** — the site
- **http://localhost:8000/device-test.html** — the same site at 320 / 360 / 390 / 430 / 500 /
  768 / 1024 / 1440px side by side, live and scrollable. Useful whenever you change layout.

Without npm:

```bash
python3 -m http.server 8000        # from the dar-al-haiba folder
```

The dev server serves the project root, not `public/`, so the device harness is reachable.
Only `public/` is deployed — `device-test.html` stays a local tool and never goes live.

## Deploying

**See `DEPLOY.md` for step-by-step instructions**, including the Google Business Profile
and Search Console setup that actually determines whether customers find the shop.

The publish directory is `public`. A GitHub Pages workflow is included at
`.github/workflows/pages.yml` — set Settings → Pages → Source to "GitHub Actions" to use it.

- **Netlify** — drag the folder (or the zip) onto https://app.netlify.com/drop, or connect
  the repo; `netlify.toml` already sets the publish directory and cache headers.
- **Cloudflare Pages** — connect the repo, no build command, output directory `public`.
- **GitHub Pages** — set Settings → Pages → Source to "GitHub Actions"; the bundled
  workflow publishes `public/` directly, with nothing to move or rename.
- **Shared hosting** — upload the *contents* of `public/` into `public_html`.

### After you have a domain

Replace `https://daralhaibatrading.com/` in these three files:

- `public/index.html` — `<link rel="canonical">`, both `hreflang` links, and `@id` in the JSON-LD
- `public/sitemap.xml` — `<loc>` and both `hreflang` links
- `public/robots.txt` — the `Sitemap:` line

## How the two languages work

Both versions are in the HTML at all times, so search engines index both. `js/main.js`
shows one and hides the other, relabels the navigation, repoints the anchor links at the
active language's sections, flips text direction, sets `documentElement.lang`, and stores
the choice in `localStorage`.

`?lang=ar` opens the site in Arabic directly. That URL is registered as the Arabic
alternate in the sitemap and in the `hreflang` tags.

The English sections use ids `products`, `craft`, `story`, `visit`; the Arabic ones use
`products-ar`, `craft-ar`, `story-ar`, `visit-ar`. If you add a section, add it to both
languages and to the `EN`, `AR` and `TARGETS` arrays in `js/main.js`, which are read in
step by index.

The inactive language carries the `hidden` attribute rather than `display:none`, so exactly
one `<main>` landmark is exposed at a time and the page is still correct with JavaScript off.

## Interaction checklist

Everything on the page is a real link, verified working:

| Element | Behaviour |
| --- | --- |
| `+971 50 829 9582` (5 places) | `tel:` link — opens the phone dialler, number pre-filled |
| WhatsApp buttons (10 places) | `wa.me` link with a pre-written enquiry message |
| Directions buttons | Google Maps directions to Jumeirah Centre |
| Map card in Visit | Google Maps location search |
| Instagram | @dar.h2006 |
| العربية / English | Swaps language, relabels nav, repoints anchors, remembers the choice |
| Header + mobile nav | Scroll to the matching section in the active language |

Tested at 320, 360, 390, 430 and 768px in both languages: no horizontal scrolling, and every
tappable element is at least 44px tall (Apple's minimum touch target).

## Search visibility

Already in the code:

- Title, meta description and keywords aimed at kandoura / thobe / bisht searches in Dubai
- Open Graph and Twitter tags for link previews on WhatsApp and social
- `ClothingStore` JSON-LD carrying address, geo coordinates, opening hours, phone, Instagram
  and all nine product lines — this is what lets Google show the business as a store with
  a map pin. It deliberately carries no `priceRange`
- `hreflang` alternates, so English and Arabic are not treated as duplicate pages
- Descriptive `alt` text on every photo, which also feeds Google Images
- `loading="lazy"` on everything below the fold

Needs doing outside the code, in order of impact:

1. **Google Business Profile** for the Jumeirah Centre location. For a physical shop this
   matters more than the website. Verify it, add the same photos, keep the hours current.
2. **Google Search Console** — add the domain, submit `sitemap.xml`.
3. Link the site from the Instagram bio (@dar.h2006) and from any mall or directory listing.

## Resizing the product photos

All nine product photos are 1024×1536 WebP (2:3), the exact shape of their frames, so
every one fills its tile edge to edge with nothing cropped. They were converted from
2–3 MB PNGs to WebP at quality 0.86 — the whole asset folder is 2.0 MB, down from 20.8 MB. Keep new photos in WebP; PNG at this size makes the page unusable on
mobile data. `assets/og-image.jpg` is a 1200×630 JPEG used only for link previews
(WhatsApp and some social scrapers handle WebP poorly).

To scale every product photo at once, change one number in `public/css/styles.css`:

    :root { --prod-zoom: 1; }      /* 1 = as shot, 1.08 = 8% larger */

Values above about 1.15 start cutting into the garments.

## Domain

The site is configured for **daralhaibatrading.com**. If the domain ever changes, the name
appears in exactly four files and nowhere else:

- `public/index.html` — canonical, both hreflang links, og:url, og:image, twitter:image,
  and `@id`, `url`, `image` plus the nine product `url` anchors in the JSON-LD
- `public/sitemap.xml` — `<loc>` and both hreflang alternates
- `public/robots.txt` — the `Sitemap:` line
- `DEPLOY.md` — the instructions

## Known gaps

- **No prices anywhere, by the owner's decision.** `priceRange` was removed from the
  JSON-LD; do not reintroduce it without confirmed figures.
- **Opening hours are Saturday–Thursday 10:00–22:00, Friday 15:00–22:00**, taken from the
  shop's Google Business Profile. They appear in the Visit section in both languages and as
  `openingHoursSpecification` in the JSON-LD. If the hours change, update all three places
  and the Google listing together, or Google will flag the mismatch.
- **Two photos are below retina resolution.** Every one of the nine product photos is now
  1024×1536, but `craft.webp` (878×585) and `store.webp` (998×749) are displayed at roughly
  their native width, so they soften on a 2× screen. Replace them with larger originals when
  you have them; the product photos at 1024×1536 are the standard to match.

## Contact details in the markup

Phone `+971508299582` (four `tel:` links), WhatsApp `wa.me/971508299582`, Instagram
`dar.h2006`, and the Jumeirah Centre address all appear in several places, in both
languages. Search for the number before changing it.
