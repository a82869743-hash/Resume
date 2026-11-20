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
