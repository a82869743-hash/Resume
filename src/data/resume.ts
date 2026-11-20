/* ------------------------------------------------------------------
 * Single source of truth for the website AND the printable resume.
 *
 * ✏️  TO FILL IN: values marked `null` in PENDING are not known yet.
 *     Fill them and the site + PDF update automatically. Until then the
 *     related link/line is simply not shown — nothing is invented.
 * ------------------------------------------------------------------ */

export const PENDING = {
  github: null as string | null, // e.g. "https://github.com/aryan"
  linkedin: null as string | null, // e.g. "https://www.linkedin.com/in/aryan"
  instagram: null as string | null,
  /** Expected graduation, e.g. "2027" */
  graduation: null as string | null,
};

export const profile = {
  name: "Aryan Singh Rajput",
  firstName: "Aryan",
  lastName: "Singh Rajput",
  monogram: "AR",
  title: "Full-Stack Developer",
  discipline: "Digital Business Strategist",
  phone: "+91 8238538098",
  phoneHref: "tel:+918238538098",
  email: "a82869743@gmail.com",
  location: "Vadodara, Gujarat",
  status: "Full-time freelancer · Running my own agency",
  tagline: "I build the software, automation and growth engines that real businesses run on.",
  summary:
    "Full-stack developer and digital business strategist with 3+ years of building for real clients. I design and ship integrated business management systems, manufacturing software, websites, AI voice agents and marketing automation — and I run the growth side too, from Meta Ads to content strategy. Hardworking, ambitious and multi-disciplinary, I believe the best software starts with business strategy: understand how a company grows, then build the technology that makes it happen.",
  heroWords: ["FULL STACK", "AI AGENTS", "AUTOMATION", "GROWTH"],
};

export const socials = [
  { label: "GitHub", url: PENDING.github },
  { label: "LinkedIn", url: PENDING.linkedin },
  { label: "Instagram", url: PENDING.instagram },
].filter((s): s is { label: string; url: string } => Boolean(s.url));

/** Skill domains — shown in the marquee and on the resume. */
export const competencies = [
  "Full-Stack Development",
  "Enterprise Business Systems",
  "Manufacturing Software",
  "Automotive & Garage Tech",
  "AI Agents & Voice AI",
  "Workflow & Marketing Automation",
  "Meta Ads & Performance Marketing",
  "Content & Social Strategy",
  "Client & Requirements Handling",
  "Product & Solution Architecture",
];

export const industries = [
  "Automotive & Car Detailing",
  "Manufacturing & Industrial",
  "Chemical Industry",
  "Healthcare & Physiotherapy",
  "Business & Corporate Services",
  "Digital Platforms & Online Services",
  "Digital Marketing & Advertising",
];

/** "What I do" — four service pillars. */
export const services = [
  {
    no: "01",
    title: "Software & Systems",
    sub: "ERP-like platforms, CRMs, web apps",
    text: "Integrated business and manufacturing management systems — staff, attendance, CRM, job cards, operations and administration in one platform — plus marketplaces and fast, modern websites.",
    tags: ["React.js", "Next.js", "Node.js", "Express.js", "MySQL", "MongoDB", "Supabase"],
  },
  {
    no: "02",
    title: "AI & Automation",
    sub: "Agents, voice AI, n8n workflows",
    text: "AI voice agents for customer calls, AI integrations inside business apps, and white-label marketing automation deployed across multiple clients with client-specific workflows.",
    tags: ["AI Voice Agents", "AI Agents", "n8n", "Whisper", "API Automation", "Multi-Agent Workflows"],
  },
  {
    no: "03",
    title: "Performance Marketing",
    sub: "Meta Ads that bring leads",
    text: "Facebook and Instagram campaigns planned, targeted, monitored and optimised for lead generation, customer acquisition and brand visibility across seven client accounts.",
    tags: ["Meta Ads", "Audience Targeting", "Lead Generation", "Campaign Optimization", "Analytics"],
  },
  {
    no: "04",
    title: "Strategy & Growth",
    sub: "Where business meets tech",
    text: "Requirement gathering, product planning and growth strategy first — then content, social and brand positioning that keeps the business growing after launch.",
    tags: ["Business Strategy", "Product Planning", "Content Strategy", "Brand Positioning", "Client Handling"],
  },
];

export type Role = {
  company: string;
  short: string;
  location?: string;
  role: string;
  unit?: string;
  start: string;
  end: string | null; // "Present" => current
  period?: string; // overrides the computed date label
  year: string; // big label on the card
  highlights?: string[];
  points: string[];
};

export const experience: Role[] = [
  {
    company: "Independent Practice — Freelance & Agency",
    short: "Aryan Rajput",
    location: "Vadodara · Remote",
    role: "Founder & Lead Developer - Full-Stack & Growth",
    unit: "Freelance studio",
    start: "2023",
    end: "Present",
    year: "NOW",
    highlights: ["26 client engagements", "9 business systems", "9 websites", "5 + 7 marketing clients"],
    points: [
      "Run a full-time freelance practice and growing agency delivering software, AI, automation and marketing for businesses across seven industries.",
      "Own the full client lifecycle — requirement gathering, solution architecture, development, deployment and ongoing support.",
      "Designed and built 9 integrated business and manufacturing management systems covering staff, attendance, CRM, operations and administration.",
      "Delivered 9 corporate, business, healthcare and product websites, plus marketplace and growth platforms.",
      "Shipped an AI voice agent and AI-integrated business features for client operations.",
      "Combine business strategy with technology so every build maps to a measurable business outcome.",
    ],
  },
  {
    company: "Business & Manufacturing Software",
    short: "ERP Systems",
    role: "Enterprise Systems Developer",
    unit: "9 client systems",
    start: "",
    end: "Present",
    period: "Ongoing",
    year: "ERP",
    highlights: ["Staff & attendance", "CRM", "Job cards", "Manufacturing workflows"],
    points: [
      "Built integrated management platforms for GK Auto Herb, God of Ceramic, O3, Satyanarayan and Happy — centralising operations, workforce, attendance, customers and administration.",
      "Developed Swish Auto Care's garage management system with CRM, job cards, bookings, estimates and vehicle management.",
      "Delivered manufacturing management software for SP Chemicals, Arvind Fittings and a GIDC manufacturing company — digitising production workflows and company-wide operations.",
      "Designed database architecture and role-based workflows so each business runs from one central system.",
    ],
  },
  {
    company: "White-Label Marketing Automation",
    short: "AI Automation",
    role: "Automation & AI Engineer",
    unit: "5 client deployments",
    start: "",
    end: "Present",
    period: "Ongoing",
    year: "AI",
    highlights: ["n8n", "White-label", "Multi-client", "AI voice agent"],
    points: [
      "Designed and deployed white-label marketing automation infrastructure for five clients.",
      "Customised automation systems and built client-specific marketing workflows for each brand.",
      "Integrated automation into digital marketing and content operations with scalable, multi-client workflows.",
      "Implemented an AI voice agent for God of Ceramic to automate voice-based customer interactions.",
    ],
  },
  {
    company: "Meta Ads & Performance Marketing",
    short: "Meta Ads",
    role: "Performance Marketer",
    unit: "7 client accounts",
    start: "",
    end: "Present",
    period: "Ongoing",
    year: "ADS",
    highlights: ["Facebook & Instagram", "Lead generation", "Optimisation"],
    points: [
      "Managed Meta advertising campaigns across seven client accounts.",
      "Planned and executed Facebook and Instagram campaigns end to end.",
      "Handled audience targeting, campaign setup, optimisation and performance monitoring.",
      "Ran lead-generation, customer-acquisition and brand-visibility campaigns, using performance analysis to refine strategy.",
    ],
  },
  {
    company: "Digital Marketing & Content Strategy",
    short: "Content Growth",
    role: "Digital Growth Strategist",
    unit: "Multi-client",
    start: "",
    end: "Present",
    period: "Ongoing",
    year: "GROW",
    highlights: ["Social media", "Reels", "Content calendars", "Brand positioning"],
    points: [
      "Managed social media and content strategy across client businesses.",
      "Planned reels and short-form content, content calendars and creative direction.",
      "Shaped brand positioning, campaign ideation and client-specific digital growth strategies.",
      "Tracked marketing performance to steer each client's growth plan.",
    ],
  },
];

export const formatDates = (r: Role) => {
  if (r.period) return r.period;
  if (!r.start && r.end === "Present") return "Present";
  if (r.end === null) return `${r.start} onwards`;
  return `${r.start} – ${r.end}`;
};

/** Big-number highlights. */
export const achievements = [
  {
    label: "Business systems",
    metric: "9",
    metricLabel: "business & manufacturing platforms",
    text: "Integrated business and manufacturing management systems built and deployed for real companies.",
  },
  {
    label: "Websites",
    metric: "9",
    metricLabel: "websites & digital experiences",
    text: "Corporate, business, automotive and healthcare websites designed and developed end to end.",
  },
  {
    label: "Automation",
    metric: "5",
    metricLabel: "white-label deployments",
    text: "Marketing automation infrastructure configured and deployed for five separate clients.",
  },
  {
    label: "Advertising",
    metric: "7",
    metricLabel: "Meta Ads client accounts",
    text: "Facebook and Instagram campaigns managed and optimised across seven client accounts.",
  },
];

export const education = [
  {
    degree: "B.Tech - Computer Science & Engineering",
    school: "Navrachana University, Vadodara",
    period: PENDING.graduation ? `Expected ${PENDING.graduation}` : "4th year · Pursuing",
    score: "CSE",
  },
];

export type Category =
  | "Enterprise Software"
  | "Manufacturing Software"
  | "Platforms"
  | "Websites"
  | "AI & Voice"
  | "Automation"
  | "Performance Marketing"
  | "Content & Growth";

export type Project = {
  name: string;
  client?: string;
  category: Category;
  desc: string;
  featured?: boolean;
  image?: string; // optional screenshot in public/images/projects
  device?: "desktop" | "mobile";
  /** Vertical reels played in sequence inside a phone frame. */
  videos?: string[];
  poster?: string;
  url?: string;
};

export const projects: Project[] = [
  { client: "GK Auto Herb", name: "Integrated Business Management System", category: "Enterprise Software", featured: true, image: "gk-app.webp", device: "mobile",
    desc: "Business operations, workforce management, staff attendance, customers, workflows and administration in one centralised digital ecosystem." },
  { client: "God of Ceramic", name: "Enterprise Business Management Platform", category: "Enterprise Software", featured: true, image: "goc-dashboard.webp",
    desc: "An extensive platform digitising operations, employee workflows, attendance, customer management and administration." },
  { client: "O3", name: "Integrated Business Management System", category: "Enterprise Software", image: "o3-dashboard.webp",
    desc: "End-to-end management covering operations, employee administration, attendance and core business workflows." },
  { client: "Satyanarayan", name: "Integrated Business Operations Platform", category: "Enterprise Software", image: "satyanarayan-admin.webp",
    desc: "Digitised operations with centralised staff and attendance management and streamlined internal workflows." },
  { client: "Happy", name: "Enterprise Operations Management System", category: "Enterprise Software", image: "happy-dashboard.webp",
    desc: "Large-scale software integrating employees, attendance, operations, administration and organisation-wide workflows." },
  { client: "Swish Auto Care", name: "Garage Management & Operations System", category: "Enterprise Software", featured: true, image: "swish-dashboard.webp",
    desc: "Automotive service platform with CRM, job cards, bookings, estimates, vehicle management and employee workflows." },
  { client: "SP Chemicals", name: "Integrated Manufacturing Management System", category: "Manufacturing Software", featured: true, image: "sp-chemicals-dashboard.webp",
    desc: "Manufacturing processes, employees, attendance, internal workflows and business administration in one system." },
  { client: "Arvind Fittings", name: "Manufacturing & Enterprise Operations Platform", category: "Manufacturing Software", image: "arvind-dashboard.webp",
    desc: "Centralised manufacturing operations, workforce, attendance, workflows and administrative processes." },
  { client: "GIDC Manufacturing Co.", name: "Industrial Business Management System", category: "Manufacturing Software", image: "gidc-dashboard.webp",
    desc: "Company-wide digitalisation of operations, workforce administration, attendance and business processes." },
  { client: "Freelance Marketspace", name: "Freelance Marketplace Platform", category: "Platforms",
    desc: "A marketplace connecting freelance professionals and clients through an organised, opportunity-based ecosystem." },
  { client: "GrowthMates", name: "Operational Agentic AI Platform", category: "Platforms", image: "growthmates-platform.webp",
    desc: "Agentic AI platform turning business knowledge into action — workflow agents, decision engines, MCP data connectors and governance with human sign-off." },
  { name: "AI-Integrated Business Solutions", category: "Platforms",
    desc: "AI capabilities built into business applications — intelligent workflows, automated processes and AI-powered features." },
  { client: "GK Auto Herb", name: "Automotive Detailing Website", category: "Websites", image: "gk-web.webp",
    desc: "A professional detailing website presenting services and brand identity to drive customer enquiries." },
  { client: "God of Ceramic", name: "Premium Automotive Detailing Website", category: "Websites", image: "goc-web.webp",
    desc: "A premium, immersive website with modern UI and brand positioning to match a high-end detailing brand." },
  { client: "O3", name: "Corporate Website", category: "Websites", image: "o3-web.webp",
    desc: "A structured corporate site establishing the company's digital presence and business offerings." },
  { client: "Satyanarayan", name: "Business Website", category: "Websites", image: "satyanarayan-web.webp",
    desc: "A business website for brand presentation, service information and online visibility." },
  { client: "DBST Solutions", name: "Corporate Website", category: "Websites", image: "dbst-web.webp",
    desc: "A corporate website showcasing services and strengthening the company's digital brand." },
  { client: "Dr Neha Physiotherapy", name: "Healthcare Clinic Website", category: "Websites", image: "physio-web.webp",
    desc: "An accessible clinic website presenting services, patient information and essential details." },
  { client: "Swish Auto Care", name: "Premium Detailing Website", category: "Websites", image: "swish-web.webp",
    desc: "A bold detailing-studio website for interior, exterior and ceramic protection services with booking and gallery." },
  { client: "GrowthMates", name: "Product Marketing Website", category: "Websites", image: "growthmates-web.webp",
    desc: "Launch site for an operational agentic AI product — animated workflow demo, ROI calculator, enterprise and roadmap pages." },
  { client: "Vroomy", name: "AI Car Advisor Website", category: "Websites", image: "vroomy-web.webp",
    desc: "Landing site for a 24×7 AI + human car advisor app — breakdown help, fair pricing and app-store conversion." },
  { client: "God of Ceramic", name: "AI Voice Agent", category: "AI & Voice", featured: true,
    desc: "A conversational AI voice agent automating voice-based customer interactions and business communication." },
  { name: "AI-Powered Business Automation", category: "AI & Voice",
    desc: "AI-driven capabilities wired into business apps and workflows for intelligent, automated operations." },
  { name: "White-Label Marketing Automation — 5 Clients", category: "Automation", featured: true, image: "vroomy-studio.webp",
    desc: "Multi-client automation infrastructure with white-label configuration and client-specific marketing workflows." },
  { name: "Meta Ads & Performance Marketing — 7 Clients", category: "Performance Marketing",
    desc: "Campaign strategy, audience targeting, lead generation, monitoring and optimisation across seven accounts." },
  { name: "Multi-Client Digital Marketing & Content", category: "Content & Growth", videos: ["launch3.mp4", "vroomy-outro.mp4"], poster: "launch3-poster.webp",
    desc: "Social media, reels, content calendars, creative direction and brand positioning for client growth." },
];

/** Skill groups (full list — shown in Toolkit and on the resume). */
export const skillGroups = [
  { title: "Languages", items: ["JavaScript", "Python", "C", "SQL"] },
  { title: "Frontend", items: ["React.js", "Next.js", "Tailwind CSS", "HTML5", "CSS3", "Responsive UI"] },
  { title: "Backend", items: ["Node.js", "Express.js", "Flask", "REST APIs", "API Integration"] },
  { title: "Databases", items: ["MySQL", "MongoDB", "Supabase", "Firebase", "Database Design"] },
  { title: "AI & ML", items: ["AI Agents", "AI Voice Agents", "Whisper", "XGBoost", "YOLOv8", "SHAP", "NumPy", "Pandas"] },
  { title: "Automation", items: ["n8n", "Workflow Automation", "Marketing Automation", "Multi-Agent Workflows"] },
  { title: "Cloud & Deploy", items: ["AWS", "Vercel", "Render", "Firebase", "cPanel"] },
  { title: "Media & Maps", items: ["Cloudinary", "Leaflet", "OpenStreetMap", "Geospatial"] },
  { title: "Marketing", items: ["Meta Ads", "Lead Generation", "Audience Targeting", "Content Strategy"] },
  { title: "Business", items: ["Requirements Analysis", "Project Management", "Product Planning", "Client Handling"] },
];

/** Physics blocks in the Toolkit section. */
export const tools = ["React", "Next.js", "Node.js", "Python", "n8n", "AWS"];
export const reportKit = ["MongoDB", "MySQL", "Supabase", "Tailwind", "Express", "Flask", "Vercel", "Firebase"];
export const languages = ["JavaScript", "SQL", "Whisper", "YOLOv8", "Meta Ads"];
