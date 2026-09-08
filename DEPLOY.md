# Deploying the Dar Al Haiba website

## Opening this in VS Code

1. Unzip the folder and open it in VS Code: **File → Open Folder →** `dar-al-haiba`
2. To preview while editing, install the **Live Server** extension, then right-click
   `public/index.html` → **Open with Live Server**. Or run `npm run dev` in the terminal.
3. `device-test.html` in the project root shows the site at eight screen widths at once.
   It is a development tool and sits outside `public/`, so it is never deployed.

Files you will actually edit:

| To change | Edit |
| --- | --- |
| Any text, in either language | `public/index.html` |
| Colours, spacing, breakpoints | `public/css/styles.css` |
| Language switching | `public/js/main.js` |
| Product photos | `public/assets/` — keep new ones 1024×1536 WebP |
| What Google reads | the `application/ld+json` block near the top of `index.html` |

The Arabic version is the second `<main>` element in `index.html`. Anything changed in
one language must be changed in the other — they are meant to match exactly.


Everything here is free. Pick **one** of the three hosts below — you do not need all of them.
Then do the Google section, which is what actually makes people find you.

The folder that gets published is `public/`. Nothing else in the project is served.

---

## Option 1 — Netlify Drop (fastest, no account needed to start)

1. Go to **https://app.netlify.com/drop**
2. Drag the **`public`** folder onto the page (or drag the project zip — it unpacks it).
3. Wait about ten seconds. You get a live URL like `dazzling-kandoura-a1b2c3.netlify.app`.
4. Create a free account when prompted, so the site stays permanently and you can update it.
5. To update later: drag the folder on again, or connect the GitHub repo under
   **Site configuration → Build & deploy** so every push republishes automatically.

Publish directory, if it asks: `public`. Build command: leave empty.

---

## Option 2 — GitHub Pages (free, tied to your repo)

The workflow file is already in the project at `.github/workflows/pages.yml`.

1. Push this project to a GitHub repository.
2. In the repository, go to **Settings → Pages**.
3. Under **Build and deployment → Source**, choose **GitHub Actions**.
4. Push once to `main`. The workflow runs and publishes `public/`.
5. Your site appears at `https://<your-username>.github.io/<repo-name>/`

Note: on a project page the site is served from a sub-path, so `404.html`'s "back to the
site" link and its favicon point one level too high. A custom domain (or a repo named
`<your-username>.github.io`) serves from the root and avoids this.

If you later add a custom domain, put it in **Settings → Pages → Custom domain**.

---

## Option 3 — Cloudflare Pages (free, fastest network)

1. **https://dash.cloudflare.com** → Workers & Pages → Create → Pages → Connect to Git
2. Pick the repository.
3. Framework preset: **None**. Build command: **leave empty**. Output directory: **`public`**
4. Save and deploy.

---

## Getting a domain (about AED 40–60 a year)

A real domain matters. Google trusts `daralhaibatrading.com` far more than
`something.netlify.app`, and so do customers.

1. Buy **daralhaibatrading.com** or **daralhaiba.com** from Namecheap, GoDaddy or
   (for `.ae`) an accredited UAE registrar such as Etisalat or du.
2. Point it at your host:
   - **Netlify** — Domain management → Add domain → follow the DNS instructions
   - **GitHub Pages** — Settings → Pages → Custom domain
   - **Cloudflare** — it handles DNS for you
3. Then update the domain in four files:
   - `public/index.html` — `<link rel="canonical">`, both `hreflang` links, `og:url`,
     `og:image`, `twitter:image`, and `@id`, `url`, `image` plus the nine product `url`
     anchors in the JSON-LD block
   - `public/sitemap.xml` — `<loc>` and both `hreflang` links
   - `public/robots.txt` — the `Sitemap:` line
   - `DEPLOY.md` and `README.md` — the instructions above

Until you do that, those tags point at `https://daralhaibatrading.com/` as a placeholder.

---

## Making Google find you

This is the part that decides whether searching "Dar Al Haiba" brings up your shop.
Do them in this order — the first one matters more than the website itself.

### 1. Google Business Profile — do this first

For a physical shop this is the single highest-impact step. It is what puts you on
Google Maps with your photos, phone number and hours.

1. Go to **https://business.google.com** and sign in.
2. Search "Dar Al Haiba" — if a listing already exists, claim it. If not, create it.
3. Business name: **Dar Al Haiba**
4. Category: **Men's clothing store** (add **Tailor** and **Clothing store** as extras)
5. Address: **First Floor, Jumeirah Centre, Jumeirah Road (Beach Road), Jumeirah 1, Dubai**
6. Phone: **+971 50 829 9582**
7. Website: your new domain
8. Add opening hours, and upload the same photos used on the site plus a few of the shop.
9. Verify — Google will ask for a video call or a postcard. Until you verify, nothing shows.

Then: ask happy customers for reviews. Reviews are the biggest factor in whether you
appear for searches like "kandoura shop near me". Ten genuine reviews will do more than
any amount of work on the website.

### 2. Google Search Console

1. **https://search.google.com/search-console** → Add property → URL prefix → your domain
2. Verify (the DNS record method is easiest if your registrar is Cloudflare).
3. Sidebar → **Sitemaps** → submit `sitemap.xml`
4. Use **URL Inspection** on your homepage → **Request indexing**

This tells Google you exist rather than waiting to be discovered. Usually a few days.

### 3. Links pointing at you

Google trusts sites that other places mention. Free and worth doing:

- Instagram bio (**@dar.h2006**) — add the link
- WhatsApp Business profile — add the link
- Jumeirah Centre's tenant directory — ask the mall to list you with the link
- UAE directories: Yellow Pages UAE, Connect.ae, Dubai Local, Yalla
- Any supplier or partner who has a website

Each mention of your name *plus* your address strengthens the connection in Google's index.

### What is already handled in the code

- Page title and description targeting kandoura, thobe and bisht searches in Dubai
- `ClothingStore` structured data with address, coordinates, opening hours, phone and Instagram
- A product catalogue in structured data, so each garment can surface on its own
- `hreflang` tags so the English and Arabic versions are not treated as duplicates
- Descriptive `alt` text on every photo, which also feeds Google Images
- `sitemap.xml` and `robots.txt`
- Mobile-friendly at every screen size, which is a ranking factor
- Fast: no framework, no build step, lazy-loaded images below the fold

### Honest expectations

- **"Dar Al Haiba"** — should reach the top within days of verifying the Business Profile.
  It is your own name and nobody competes for it.
- **"kandoura Dubai"**, **"bisht Dubai"** — months, not days. Established shops and
  marketplaces already rank there. Reviews, photos and mentions move you up; nothing
  in the code alone will.
- **"kandoura shop near me"** — driven almost entirely by the Business Profile and
  reviews, not the website.

Anyone who promises page one for competitive terms in a fortnight is selling you something.

---

## Still missing from the site

- **Two photos are below retina resolution** — `craft.webp` (878×585) and `store.webp`
  (998×749) are shown at roughly their native width, so they soften on a 2× screen. All
  nine product photos are already 1024×1536, which is the standard to match.
- **No prices anywhere**, by the owner's decision. The JSON-LD deliberately carries no
  `priceRange`; do not add one without confirmed figures.
