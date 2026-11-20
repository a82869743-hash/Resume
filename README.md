# Aryan Singh Rajput — Portfolio & Resume

Personal portfolio and resume for **Aryan Singh Rajput** — Full-Stack Developer & Digital Business Strategist.

Built with React · TypeScript · Vite · GSAP (ScrollTrigger, ScrollSmoother, SplitText) · Three.js (React Three Fiber, Drei, Rapier, Postprocessing) · react-fast-marquee · react-icons.

## Develop

```bash
npm install
npm run dev
```

## Edit content

All content lives in `src/data/resume.ts` and feeds both the website and the printable resume (`resume.html`).
Fill in the `PENDING` values (GitHub, LinkedIn, Instagram, graduation year) and they appear automatically.

Optional project screenshots: put them in `public/images/projects/` and set `image: "file.webp"` on the project.

## Resume PDF

```bash
npm run build && npm run pdf && npm run build
```

`npm run pdf` prints `resume.html` to `public/Aryan-Singh-Rajput-Resume.pdf`, which the site's Resume links download.

## SEO / GEO / AEO

Generated at build time by `seo/plugin.ts` from `src/data/resume.ts`:

- Title, meta description, keywords, Open Graph / Twitter card (`public/og-image.png`), geo meta tags
- JSON-LD: Person, ProfessionalService, WebSite, ProfilePage, ItemList (all projects), FAQPage
- Crawlable text copy of the site inside `#root` for crawlers that don't run JavaScript (React replaces it on load)
- `robots.txt` (search engines + AI crawlers allowed), `sitemap.xml` with images, `llms.txt` / `llms-full.txt`, `site.webmanifest`
- `resume.html` is `noindex` (the PDF is the indexable resume)

**Set your domain when deploying** so canonical, og:url and the sitemap use absolute URLs:

```bash
SITE_URL=https://your-domain.com npm run build
```

On Vercel/Netlify add `SITE_URL` as an environment variable. Then submit `https://your-domain.com/sitemap.xml` in Google Search Console and Bing Webmaster Tools.
