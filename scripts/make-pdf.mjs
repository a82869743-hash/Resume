// Renders resume.html to an A4 PDF used by the site's "Download resume" links.
// Usage: npm run build && npm run pdf  (then rebuild so dist/ picks up the PDF)
import { preview } from "vite";
import { copyFileSync, existsSync } from "node:fs";
import { createRequire } from "node:module";
import { execSync } from "node:child_process";

// Use a local playwright if installed, otherwise the globally installed one.
const require = createRequire(import.meta.url);
let playwright;
try {
  playwright = require("playwright");
} catch {
  playwright = require(`${execSync("npm root -g").toString().trim()}/playwright`);
}
const { chromium } = playwright;

const server = await preview({ preview: { port: 4321, strictPort: true }, logLevel: "silent" });
const browser = await chromium.launch();
try {
  const page = await browser.newPage();
  await page.goto("http://localhost:4321/resume.html", { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  const out = "public/Aryan-Singh-Rajput-Resume.pdf";
  await page.pdf({ path: out, format: "A4", printBackground: true, preferCSSPageSize: true });
  if (existsSync("dist")) copyFileSync(out, "dist/Aryan-Singh-Rajput-Resume.pdf");
  console.log("wrote", out);
} finally {
  await browser.close();
  server.httpServer.close();
}
