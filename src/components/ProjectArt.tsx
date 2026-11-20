import type { Category } from "../data/resume";

/* Monochrome + signal-orange UI illustrations, one per project category.
 * `seed` varies bar heights etc. so cards in the same category differ. */

const O = "#ff5a1f";
const INK = "#111";
const L = "#d9d9d6";
const M = "#a5a5a0";

const r = (seed: number, n: number) => {
  const x = Math.sin((seed + 1) * 97.13 + n * 12.9898) * 43758.5453;
  return x - Math.floor(x);
};

const Frame = ({ children, title }: { children: React.ReactNode; title: string }) => (
  <svg viewBox="0 0 320 220" className="pa" aria-hidden>
    <rect x="1" y="1" width="318" height="218" rx="12" fill="#fff" stroke={L} />
    <rect x="1" y="1" width="318" height="26" rx="12" fill="#f6f6f4" />
    <rect x="1" y="20" width="318" height="7" fill="#f6f6f4" />
    <line x1="1" y1="27" x2="319" y2="27" stroke={L} />
    <circle cx="16" cy="14" r="4" fill={INK} />
    <circle cx="29" cy="14" r="4" fill={L} />
    <circle cx="42" cy="14" r="4" fill={L} />
    <text x="304" y="17.5" textAnchor="end" fontSize="8.5" fill={M} fontFamily="Geist Mono, monospace">
      {title}
    </text>
    {children}
  </svg>
);

const Dashboard = ({ seed }: { seed: number }) => (
  <Frame title="dashboard.app">
    <rect x="12" y="38" width="56" height="170" rx="6" fill="#f4f4f1" />
    {[0, 1, 2, 3, 4, 5].map((i) => (
      <rect key={i} x="20" y={50 + i * 22} width={i === 1 ? 40 : 32} height="7" rx="3.5" fill={i === 1 ? INK : L} />
    ))}
    {[0, 1, 2].map((i) => (
      <g key={i}>
        <rect x={78 + i * 78} y="38" width="70" height="44" rx="7" fill="#fff" stroke={L} />
        <rect x={86 + i * 78} y="47" width="26" height="5" rx="2.5" fill={M} />
        <text x={86 + i * 78} y="73" fontSize="15" fontWeight="800" fill={i === 0 ? O : INK} fontFamily="Archivo, sans-serif">
          {Math.round(40 + r(seed, i) * 900)}
        </text>
      </g>
    ))}
    <rect x="78" y="92" width="226" height="116" rx="8" fill="#fff" stroke={L} />
    {Array.from({ length: 9 }).map((_, i) => {
      const h = 18 + r(seed, i + 5) * 70;
      return <rect key={i} x={92 + i * 23} y={196 - h} width="13" height={h} rx="3" fill={i === 6 ? O : i % 2 ? INK : "#cfcfcb"} />;
    })}
  </Frame>
);

const Factory = ({ seed }: { seed: number }) => (
  <Frame title="production.flow">
    {["RAW", "MIX", "QC", "PACK"].map((t, i) => (
      <g key={t}>
        <rect x={16 + i * 76} y="52" width="58" height="40" rx="8" fill={i === 2 ? INK : "#fff"} stroke={i === 2 ? INK : L} />
        <text x={45 + i * 76} y="76" textAnchor="middle" fontSize="10" fontWeight="700" fill={i === 2 ? "#fff" : INK} fontFamily="Archivo, sans-serif">
          {t}
        </text>
        {i < 3 ? <path d={`M${76 + i * 76} 72 h14`} stroke={O} strokeWidth="2.5" markerEnd="url(#ar)" /> : null}
      </g>
    ))}
    <defs>
      <marker id="ar" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
        <path d="M0,0 L6,3 L0,6 z" fill={O} />
      </marker>
    </defs>
    <rect x="16" y="108" width="288" height="100" rx="8" fill="#fff" stroke={L} />
    {[0, 1, 2, 3].map((i) => (
      <g key={i}>
        <rect x="28" y={120 + i * 21} width="70" height="7" rx="3.5" fill={L} />
        <rect x="112" y={120 + i * 21} width="170" height="7" rx="3.5" fill="#efefec" />
        <rect x="112" y={120 + i * 21} width={60 + r(seed, i) * 110} height="7" rx="3.5" fill={i === 1 ? O : INK} />
      </g>
    ))}
  </Frame>
);

const Marketplace = ({ seed }: { seed: number }) => (
  <Frame title="marketplace">
    <rect x="16" y="38" width="200" height="22" rx="11" fill="#f4f4f1" />
    <rect x="224" y="38" width="80" height="22" rx="11" fill={INK} />
    <text x="264" y="52.5" textAnchor="middle" fontSize="9" fontWeight="700" fill="#fff" fontFamily="Archivo, sans-serif">
      SEARCH
    </text>
    {Array.from({ length: 6 }).map((_, i) => {
      const x = 16 + (i % 3) * 98;
      const y = 72 + Math.floor(i / 3) * 70;
      return (
        <g key={i}>
          <rect x={x} y={y} width="90" height="62" rx="8" fill="#fff" stroke={L} />
          <circle cx={x + 18} cy={y + 18} r="9" fill={i === Math.floor(r(seed, 1) * 6) ? O : "#cfcfcb"} />
          <rect x={x + 32} y={y + 12} width="46" height="5" rx="2.5" fill={INK} />
          <rect x={x + 32} y={y + 21} width="30" height="4" rx="2" fill={L} />
          <rect x={x + 10} y={y + 38} width="70" height="4" rx="2" fill="#efefec" />
          <rect x={x + 10} y={y + 47} width="44" height="4" rx="2" fill="#efefec" />
        </g>
      );
    })}
  </Frame>
);

const Website = ({ seed }: { seed: number }) => (
  <Frame title="www">
    <rect x="16" y="36" width="40" height="7" rx="3.5" fill={INK} />
    {[0, 1, 2].map((i) => (
      <rect key={i} x={196 + i * 38} y="37" width="28" height="5" rx="2.5" fill={L} />
    ))}
    <rect x="16" y="58" width={120 + r(seed, 2) * 40} height="16" rx="3" fill={INK} />
    <rect x="16" y="80" width="110" height="16" rx="3" fill={INK} />
    <rect x="16" y="104" width="130" height="5" rx="2.5" fill={L} />
    <rect x="16" y="114" width="100" height="5" rx="2.5" fill={L} />
    <rect x="16" y="130" width="64" height="20" rx="10" fill={O} />
    <rect x="186" y="56" width="118" height="96" rx="10" fill="#f4f4f1" />
    <circle cx="245" cy="104" r={26 + r(seed, 3) * 8} fill="#e6e6e2" />
    <circle cx="245" cy="104" r="12" fill={INK} />
    {[0, 1, 2].map((i) => (
      <g key={i}>
        <rect x={16 + i * 98} y="164" width="90" height="44" rx="8" fill="#fff" stroke={L} />
        <rect x={26 + i * 98} y="176" width="34" height="5" rx="2.5" fill={INK} />
        <rect x={26 + i * 98} y="187" width="60" height="4" rx="2" fill={L} />
      </g>
    ))}
  </Frame>
);

const Voice = ({ seed }: { seed: number }) => (
  <Frame title="voice-agent · live">
    <circle cx="70" cy="108" r="40" fill="#fff" stroke={L} />
    <circle cx="70" cy="108" r="28" fill={INK} />
    <rect x="64" y="94" width="12" height="20" rx="6" fill="#fff" />
    <path d="M58 110 a12 12 0 0 0 24 0 M70 122 v6" stroke="#fff" strokeWidth="2.5" fill="none" />
    {Array.from({ length: 30 }).map((_, i) => {
      const h = 6 + Math.abs(Math.sin(i * 0.6 + seed)) * 46 * r(seed, i);
      return <rect key={i} x={128 + i * 6} y={108 - h / 2} width="3" height={h} rx="1.5" fill={i > 10 && i < 20 ? O : INK} />;
    })}
    <rect x="128" y="160" width="176" height="5" rx="2.5" fill="#efefec" />
    <rect x="128" y="160" width="96" height="5" rx="2.5" fill={O} />
    <rect x="16" y="176" width="288" height="32" rx="8" fill="#f4f4f1" />
    <rect x="28" y="188" width="150" height="6" rx="3" fill={L} />
    <circle cx="288" cy="192" r="6" fill="#2fbf71" />
  </Frame>
);

const Flow = ({ seed }: { seed: number }) => {
  const nodes = [
    [40, 70, "Trigger"],
    [140, 70, "AI Agent"],
    [240, 70, "CRM"],
    [90, 160, "WhatsApp"],
    [190, 160, "Email"],
  ] as const;
  const hi = Math.floor(r(seed, 4) * 5);
  return (
    <Frame title="workflow.n8n">
      <path d="M68 70 H112 M168 70 H212 M240 92 C240 130 214 140 214 140 M140 92 C140 130 116 140 116 140 M118 160 H162" stroke={M} strokeWidth="2" fill="none" strokeDasharray="4 3" />
      {nodes.map(([x, y, t], i) => (
        <g key={t}>
          <rect x={x - 30} y={y - 20} width="60" height="40" rx="9" fill={i === hi ? O : i === 1 ? INK : "#fff"} stroke={i === hi || i === 1 ? "none" : L} />
          <text x={x} y={y + 4} textAnchor="middle" fontSize="9" fontWeight="700" fill={i === hi || i === 1 ? "#fff" : INK} fontFamily="Archivo, sans-serif">
            {t}
          </text>
        </g>
      ))}
      <text x="304" y="206" textAnchor="end" fontSize="9" fill={M} fontFamily="Geist Mono, monospace">
        ● 5 clients · running
      </text>
    </Frame>
  );
};

const Ads = ({ seed }: { seed: number }) => (
  <Frame title="ads-manager">
    {[0, 1, 2].map((i) => (
      <g key={i}>
        <path d={`M${36 + i * 18} ${48 + i * 34} H${154 - i * 18} L${146 - i * 18} ${78 + i * 34} H${44 + i * 18} Z`} fill={i === 2 ? O : i === 1 ? INK : "#cfcfcb"} />
        <text x="95" y={67 + i * 34} textAnchor="middle" fontSize="9" fontWeight="700" fill={i === 0 ? INK : "#fff"} fontFamily="Archivo, sans-serif">
          {["REACH", "CLICKS", "LEADS"][i]}
        </text>
      </g>
    ))}
    <rect x="172" y="44" width="132" height="104" rx="8" fill="#fff" stroke={L} />
    <polyline
      points={Array.from({ length: 8 }, (_, i) => `${182 + i * 16},${132 - i * 9 - r(seed, i) * 14}`).join(" ")}
      fill="none"
      stroke={O}
      strokeWidth="2.5"
      strokeLinejoin="round"
    />
    <text x="182" y="62" fontSize="8.5" fill={M} fontFamily="Geist Mono, monospace">
      CPL ↓
    </text>
    <rect x="16" y="160" width="288" height="48" rx="8" fill="#f4f4f1" />
    {[0, 1, 2, 3].map((i) => (
      <g key={i}>
        <text x={34 + i * 72} y="182" fontSize="13" fontWeight="800" fill={i === 2 ? O : INK} fontFamily="Archivo, sans-serif">
          {["7", "FB", "IG", "↑"][i]}
        </text>
        <rect x={34 + i * 72} y="190" width="40" height="4" rx="2" fill={L} />
      </g>
    ))}
  </Frame>
);

const Content = ({ seed }: { seed: number }) => (
  <Frame title="content-calendar">
    {Array.from({ length: 8 }).map((_, i) => {
      const x = 16 + (i % 4) * 73;
      const y = 38 + Math.floor(i / 4) * 86;
      const hot = i === Math.floor(r(seed, 2) * 8);
      return (
        <g key={i}>
          <rect x={x} y={y} width="66" height="78" rx="8" fill={hot ? INK : i % 3 === 0 ? "#e9e9e5" : "#f4f4f1"} />
          <path d={`M${x + 27} ${y + 30} l14 9 l-14 9 z`} fill={hot ? O : "#bdbdb8"} />
          <rect x={x + 8} y={y + 62} width="34" height="5" rx="2.5" fill={hot ? "#fff" : L} />
        </g>
      );
    })}
  </Frame>
);

const ART: Record<Category, (p: { seed: number }) => JSX.Element> = {
  "Enterprise Software": Dashboard,
  "Manufacturing Software": Factory,
  Platforms: Marketplace,
  Websites: Website,
  "AI & Voice": Voice,
  Automation: Flow,
  "Performance Marketing": Ads,
  "Content & Growth": Content,
};

const ProjectArt = ({ category, seed }: { category: Category; seed: number }) => {
  const A = ART[category];
  return <A seed={seed} />;
};

export default ProjectArt;
