/* ------------------------------------------------------------------
 * SEO / GEO / AEO build plugin.
 * Everything is generated from src/data/resume.ts, so search engines and
 * AI assistants always see the same facts as the visible site.
 *
 * Set SITE_URL when building for production, e.g.
 *   SITE_URL=https://aryansinghrajput.com npm run build
 * (or as an environment variable in Vercel / Netlify). Without it, the
 * absolute-URL tags (canonical, og:url, sitemap) are skipped.
 * ------------------------------------------------------------------ */
import type { Plugin } from "vite";
import {
  profile,
  services,
  experience,
  projects,
  skillGroups,
  industries,
  education,
  achievements,
  socials,
} from "../src/data/resume";

const SITE = (process.env.SITE_URL || "").replace(/\/+$/, "");
const abs = (p: string) => (SITE ? `${SITE}/${p.replace(/^\.?\//, "")}` : p);
const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export const TITLE = "Aryan Singh Rajput — Full-Stack Developer, AI Automation & Growth Strategist | Vadodara";
export const DESCRIPTION =
  "Aryan Singh Rajput is a freelance full-stack developer and digital business strategist in Vadodara, Gujarat. He builds business management (ERP/CRM) and manufacturing software, websites, AI voice agents, n8n marketing automation and Meta Ads campaigns for real clients.";

const KEYWORDS = [
  "Aryan Singh Rajput",
  "full-stack developer Vadodara",
  "freelance web developer Vadodara",
  "freelance developer Gujarat",
  "React developer Vadodara",
  "Next.js developer India",
  "Node.js developer Gujarat",
  "business management software developer",
  "custom ERP developer Gujarat",
  "CRM development Vadodara",
  "manufacturing software developer Gujarat",
  "garage management software",
  "car detailing website developer",
  "AI voice agent developer India",
  "AI automation freelancer",
  "n8n automation expert India",
  "marketing automation freelancer",
  "Meta Ads freelancer Vadodara",
  "performance marketing Gujarat",
  "Three.js developer India",
  "digital business strategist",
  "website development Vadodara",
];

const FAQ: [string, string][] = [
  [
    "Who is Aryan Singh Rajput?",
    `Aryan Singh Rajput is a full-stack developer and digital business strategist based in ${profile.location}, India. He runs a full-time freelance practice and agency and has delivered ${projects.length} client projects across ${industries.length} industries since 2023.`,
  ],
  [
    "What services does Aryan Singh Rajput offer?",
    services.map((s) => `${s.title}: ${s.text}`).join(" "),
  ],
  [
    "Can Aryan build custom business management or ERP software?",
    "Yes. He has built integrated business and manufacturing management systems covering staff, attendance, CRM, job cards, bookings, estimates, production workflows and administration for clients such as GK Auto Herb, God of Ceramic, O3, Swish Auto Care, SP Chemicals and Arvind Fittings.",
  ],
  [
    "Does Aryan build AI voice agents and automation?",
    "Yes. He implemented an AI voice agent for God of Ceramic and deployed white-label n8n marketing automation for five clients, plus AI features inside business applications.",
  ],
  [
    "Does Aryan run Meta Ads and digital marketing?",
    "Yes. He has managed Facebook and Instagram (Meta) ad campaigns for seven client accounts — targeting, lead generation, optimisation and reporting — along with content strategy and social media growth.",
  ],
  [
    "Which technologies does Aryan Singh Rajput use?",
    skillGroups
      .filter((g) => ["Languages", "Frontend", "Backend", "Databases", "AI & ML", "Automation", "Cloud & Deploy", "3D & Motion"].includes(g.title))
      .map((g) => `${g.title}: ${g.items.join(", ")}`)
      .join(". "),
  ],
  [
    "Where is Aryan Singh Rajput located and does he work remotely?",
    `He is based in ${profile.location}, India, and works with clients locally and remotely across India and abroad.`,
  ],
  [
    "How can I hire or contact Aryan Singh Rajput?",
    `Email ${profile.email} or call ${profile.phone}. He is ${profile.status.toLowerCase()}.`,
  ],
];

/* ---------------- JSON-LD ---------------- */
const jsonLd = () => {
  const personId = SITE ? `${SITE}/#person` : "#person";
  const sameAs = socials.map((s) => s.url);
  const graph: Record<string, unknown>[] = [
    {
      "@type": "Person",
      "@id": personId,
      name: profile.name,
      givenName: "Aryan",
      familyName: "Singh Rajput",
      jobTitle: `${profile.title} & ${profile.discipline}`,
      description: DESCRIPTION,
      email: `mailto:${profile.email}`,
      telephone: profile.phone,
      image: abs("images/aryan-hero.webp"),
      ...(SITE ? { url: SITE } : {}),
      ...(sameAs.length ? { sameAs } : {}),
      address: { "@type": "PostalAddress", addressLocality: "Vadodara", addressRegion: "Gujarat", addressCountry: "IN" },
      alumniOf: { "@type": "CollegeOrUniversity", name: "Navrachana University", address: "Vadodara, Gujarat, India" },
      knowsAbout: Array.from(new Set(skillGroups.flatMap((g) => g.items))),
      knowsLanguage: ["English", "Hindi", "Gujarati"],
      hasOccupation: {
        "@type": "Occupation",
        name: "Full-Stack Developer",
        occupationLocation: { "@type": "City", name: "Vadodara" },
        skills: skillGroups.flatMap((g) => g.items).slice(0, 40).join(", "),
      },
    },
    {
      "@type": "ProfessionalService",
      "@id": SITE ? `${SITE}/#service` : "#service",
      name: `${profile.name} — Software, AI & Growth`,
      description: DESCRIPTION,
      founder: { "@id": personId },
      image: abs("images/aryan-hero.webp"),
      email: profile.email,
      telephone: profile.phone,
      priceRange: "₹₹",
      ...(SITE ? { url: SITE } : {}),
      address: { "@type": "PostalAddress", addressLocality: "Vadodara", addressRegion: "Gujarat", addressCountry: "IN" },
      areaServed: [
        { "@type": "City", name: "Vadodara" },
        { "@type": "State", name: "Gujarat" },
        { "@type": "Country", name: "India" },
        "Worldwide (remote)",
      ],
      knowsAbout: industries,
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Services",
        itemListElement: services.map((s) => ({
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: s.title, description: s.text, serviceType: s.sub },
        })),
      },
    },
    {
      "@type": "WebSite",
      "@id": SITE ? `${SITE}/#website` : "#website",
      name: `${profile.name} — Portfolio`,
      inLanguage: "en-IN",
      publisher: { "@id": personId },
      ...(SITE ? { url: SITE } : {}),
    },
    {
      "@type": "ProfilePage",
      name: TITLE,
      description: DESCRIPTION,
      mainEntity: { "@id": personId },
      ...(SITE ? { url: SITE } : {}),
    },
    {
      "@type": "ItemList",
      name: "Client projects",
      numberOfItems: projects.length,
      itemListElement: projects.map((p, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: {
          "@type": "CreativeWork",
          name: p.client ? `${p.client} — ${p.name}` : p.name,
          description: p.desc,
          genre: p.category,
          creator: { "@id": personId },
          ...(p.image ? { image: abs(`images/projects/${p.image}`) } : {}),
        },
      })),
    },
    {
      "@type": "FAQPage",
      mainEntity: FAQ.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
    },
  ];
  return JSON.stringify({ "@context": "https://schema.org", "@graph": graph });
};

/* ---------------- crawlable text (same facts as the visible site) ---------------- */
const prerender = () => `
<div class="sr-only" id="seo-content">
  <h1>${esc(profile.name)} — ${esc(profile.title)} &amp; ${esc(profile.discipline)} in Vadodara, Gujarat</h1>
  <p>${esc(profile.summary)}</p>
  <h2>Services</h2>
  <ul>${services.map((s) => `<li><h3>${esc(s.title)}</h3><p>${esc(s.text)}</p></li>`).join("")}</ul>
  <h2>Client projects</h2>
  <ul>${projects
    .map((p) => `<li><h3>${esc(p.client ? `${p.client} — ${p.name}` : p.name)}</h3><p>${esc(p.category)}. ${esc(p.desc)}</p></li>`)
    .join("")}</ul>
  <h2>Experience</h2>
  <ul>${experience
    .map((r) => `<li><h3>${esc(r.role.split(" - ")[0])} — ${esc(r.company)}</h3><ul>${r.points.map((x) => `<li>${esc(x)}</li>`).join("")}</ul></li>`)
    .join("")}</ul>
  <h2>Highlights</h2>
  <ul>${achievements.map((a) => `<li>${esc(a.metric)} ${esc(a.metricLabel)} — ${esc(a.text)}</li>`).join("")}</ul>
  <h2>Tech stack</h2>
  <ul>${skillGroups.map((g) => `<li>${esc(g.title)}: ${esc(g.items.join(", "))}</li>`).join("")}</ul>
  <h2>Industries</h2>
  <p>${esc(industries.join(", "))}</p>
  <h2>Education</h2>
  <p>${education.map((e) => `${esc(e.degree)}, ${esc(e.school)} (${esc(e.period)})`).join("; ")}</p>
  <h2>Frequently asked questions</h2>
  ${FAQ.map(([q, a]) => `<h3>${esc(q)}</h3><p>${esc(a)}</p>`).join("")}
  <h2>Contact</h2>
  <p>Email: ${esc(profile.email)} · Phone: ${esc(profile.phone)} · ${esc(profile.location)}, India</p>
</div>`;

/* ---------------- head tags ---------------- */
const head = () => {
  const og = abs("og-image.png");
  return [
    `<meta name="description" content="${esc(DESCRIPTION)}" />`,
    `<meta name="keywords" content="${esc(KEYWORDS.join(", "))}" />`,
    `<meta name="author" content="${esc(profile.name)}" />`,
    `<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />`,
    `<meta name="googlebot" content="index, follow" />`,
    `<meta name="geo.region" content="IN-GJ" />`,
    `<meta name="geo.placename" content="Vadodara" />`,
    `<meta name="geo.position" content="22.3072;73.1812" />`,
    `<meta name="ICBM" content="22.3072, 73.1812" />`,
    SITE ? `<link rel="canonical" href="${SITE}/" />` : "",
    SITE ? `<link rel="alternate" hreflang="en-IN" href="${SITE}/" />` : "",
    `<meta property="og:type" content="profile" />`,
    `<meta property="og:locale" content="en_IN" />`,
    `<meta property="og:site_name" content="${esc(profile.name)}" />`,
    `<meta property="og:title" content="${esc(TITLE)}" />`,
    `<meta property="og:description" content="${esc(DESCRIPTION)}" />`,
    `<meta property="og:image" content="${og}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:image:alt" content="${esc(profile.name)} — ${esc(profile.title)}" />`,
    SITE ? `<meta property="og:url" content="${SITE}/" />` : "",
    `<meta property="profile:first_name" content="Aryan" />`,
    `<meta property="profile:last_name" content="Singh Rajput" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(TITLE)}" />`,
    `<meta name="twitter:description" content="${esc(DESCRIPTION)}" />`,
    `<meta name="twitter:image" content="${og}" />`,
    `<link rel="apple-touch-icon" href="./apple-touch-icon.png" />`,
    `<link rel="manifest" href="./site.webmanifest" />`,
    `<link rel="alternate" type="text/plain" title="LLM summary" href="./llms.txt" />`,
    `<script type="application/ld+json">${jsonLd()}</script>`,
  ]
    .filter(Boolean)
    .join("\n    ");
};

/* ---------------- files for crawlers and AI engines ---------------- */
const robots = () =>
  [
    "# Search engines and AI assistants are welcome.",
    "User-agent: *",
    "Allow: /",
    "Disallow: /resume.html",
    "",
    ...["GPTBot", "OAI-SearchBot", "ChatGPT-User", "ClaudeBot", "Claude-Web", "anthropic-ai", "PerplexityBot", "Google-Extended", "Applebot-Extended", "CCBot", "Bingbot"].flatMap(
      (b) => [`User-agent: ${b}`, "Allow: /", ""]
    ),
    SITE ? `Sitemap: ${SITE}/sitemap.xml` : "# Sitemap: set SITE_URL at build time",
  ].join("\n");

const sitemap = () => {
  const d = new Date().toISOString().slice(0, 10);
  const urls = [
    { loc: `${SITE}/`, pri: "1.0", img: ["images/aryan-hero.webp", ...projects.filter((p) => p.image).map((p) => `images/projects/${p.image}`)] },
    { loc: `${SITE}/Aryan-Singh-Rajput-Resume.pdf`, pri: "0.6", img: [] as string[] },
  ];
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urls
  .map(
    (u) => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${d}</lastmod>
    <priority>${u.pri}</priority>${u.img.map((i) => `\n    <image:image><image:loc>${abs(i)}</image:loc></image:image>`).join("")}
  </url>`
  )
  .join("\n")}
</urlset>
`;
};

const llms = (full: boolean) => {
  const L: string[] = [
    `# ${profile.name}`,
    "",
    `> ${profile.title} & ${profile.discipline} based in ${profile.location}, India. ${profile.status}. ${projects.length} client projects across ${industries.length} industries since 2023.`,
    "",
    profile.summary,
    "",
    "## Contact",
    `- Email: ${profile.email}`,
    `- Phone: ${profile.phone}`,
    `- Location: ${profile.location}, India (works remotely too)`,
    ...socials.map((s) => `- ${s.label}: ${s.url}`),
    SITE ? `- Website: ${SITE}` : "",
    `- Resume (PDF): ${abs("Aryan-Singh-Rajput-Resume.pdf")}`,
    "",
    "## Services",
    ...services.map((s) => `- **${s.title}** (${s.sub}): ${s.text}`),
    "",
    "## Industries",
    ...industries.map((i) => `- ${i}`),
    "",
    "## Selected projects",
    ...(full ? projects : projects.filter((p) => p.featured)).map(
      (p) => `- **${p.client ? `${p.client} — ` : ""}${p.name}** (${p.category}): ${p.desc}`
    ),
    "",
  ];
  if (full) {
    L.push("## Experience");
    experience.forEach((r) => {
      L.push(`### ${r.role.split(" - ")[0]} — ${r.company} (${r.period ?? `${r.start} – ${r.end}`})`);
      r.points.forEach((x) => L.push(`- ${x}`));
      L.push("");
    });
    L.push("## Tech stack");
    skillGroups.forEach((g) => L.push(`- ${g.title}: ${g.items.join(", ")}`));
    L.push("", "## Education");
    education.forEach((e) => L.push(`- ${e.degree}, ${e.school} (${e.period})`));
    L.push("");
  }
  L.push("## FAQ");
  FAQ.forEach(([q, a]) => L.push(`### ${q}`, a, ""));
  if (!full) L.push(`Full details: ${abs("llms-full.txt")}`);
  return L.filter((x, i, a) => !(x === "" && a[i - 1] === "")).join("\n");
};

const manifest = () =>
  JSON.stringify(
    {
      name: `${profile.name} — Portfolio`,
      short_name: "Aryan",
      description: DESCRIPTION,
      start_url: "./",
      display: "standalone",
      background_color: "#f3efe8",
      theme_color: "#f3efe8",
      icons: [
        { src: "./favicon.svg", sizes: "any", type: "image/svg+xml" },
        { src: "./apple-touch-icon.png", sizes: "180x180", type: "image/png" },
        { src: "./icon-512.png", sizes: "512x512", type: "image/png" },
      ],
    },
    null,
    2
  );

export default function seo(): Plugin {
  return {
    name: "aryan-seo",
    transformIndexHtml: {
      order: "post",
      handler(html, ctx) {
        if (ctx.filename.endsWith("resume.html")) {
          return html.replace("</head>", `  <meta name="robots" content="noindex, follow" />\n  </head>`);
        }
        return html
          .replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(TITLE)}</title>`)
          .replace(/\s*<meta name="description"[^>]*>/, "")
          .replace(/\s*<meta property="og:title"[^>]*>/, "")
          .replace(/\s*<meta property="og:description"[^>]*>/, "")
          .replace("</head>", `    ${head()}\n  </head>`)
          .replace('<div id="root"></div>', `<div id="root">${prerender()}</div>`);
      },
    },
    generateBundle() {
      this.emitFile({ type: "asset", fileName: "robots.txt", source: robots() });
      this.emitFile({ type: "asset", fileName: "llms.txt", source: llms(false) });
      this.emitFile({ type: "asset", fileName: "llms-full.txt", source: llms(true) });
      this.emitFile({ type: "asset", fileName: "site.webmanifest", source: manifest() });
      if (SITE) this.emitFile({ type: "asset", fileName: "sitemap.xml", source: sitemap() });
    },
  };
}
