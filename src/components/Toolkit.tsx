import { useRef, useState } from "react";
import { gsap, useGSAP, isTouch } from "../lib/gsap";
import { skillGroups } from "../data/resume";
import "./styles/Toolkit.css";

/* Four orbits, inner → outer. Each orbit pulls from a few skill groups. */
const ORBITS = [
  { name: "Core", groups: ["Languages", "Frontend"], speed: 46 },
  { name: "Backend & data", groups: ["Backend", "Databases"], speed: 64 },
  { name: "AI & automation", groups: ["AI & ML", "Automation"], speed: 82 },
  { name: "Cloud & 3D", groups: ["Cloud & Deploy", "3D & Motion", "Media & Maps"], speed: 104 },
];

const pick = (groups: string[], max = 10) =>
  Array.from(new Set(skillGroups.filter((g) => groups.includes(g.title)).flatMap((g) => g.items)))
    .filter((t) => t.length <= 16)
    .slice(0, max);

const Toolkit = () => {
  const root = useRef<HTMLElement>(null);
  const [hot, setHot] = useState<number | null>(null);

  useGSAP(
    () => {
      gsap.from(".tk-copy > *", {
        y: 40,
        opacity: 0,
        stagger: 0.08,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 70%" },
      });
      gsap.fromTo(".tk-ring", {
        scale: 0.2,
        opacity: 0,
        rotate: -90,
      }, {
        scale: 1,
        opacity: 1,
        rotate: 0,
        stagger: 0.12,
        duration: 1.6,
        ease: "expo.out",
        scrollTrigger: { trigger: ".tk-orbit", start: "top 75%" },
      });
      gsap.from(".tk-core", {
        scale: 0,
        duration: 1.2,
        ease: "back.out(1.8)",
        scrollTrigger: { trigger: ".tk-orbit", start: "top 75%" },
      });
      if (!isTouch()) {
        const sys = root.current!.querySelector<HTMLElement>(".tk-sys")!;
        const rx = gsap.quickTo(sys, "rotationX", { duration: 1, ease: "power3" });
        const ry = gsap.quickTo(sys, "rotationY", { duration: 1, ease: "power3" });
        const stage = root.current!.querySelector<HTMLElement>(".tk-orbit")!;
        const move = (e: PointerEvent) => {
          const r = stage.getBoundingClientRect();
          rx(((e.clientY - r.top) / r.height - 0.5) * -14);
          ry(((e.clientX - r.left) / r.width - 0.5) * 14);
        };
        const leave = () => {
          rx(0);
          ry(0);
        };
        stage.addEventListener("pointermove", move);
        stage.addEventListener("pointerleave", leave);
        return () => {
          stage.removeEventListener("pointermove", move);
          stage.removeEventListener("pointerleave", leave);
        };
      }
    },
    { scope: root }
  );

  return (
    <section className="section toolkit" id="toolkit" ref={root}>
      <div className="tk-copy">
        <span className="eyebrow">Toolkit</span>
        <h2 className="section-title">
          Tech <em>stack</em>
        </h2>
        <ul className="tk-legend">
          {ORBITS.map((o, i) => (
            <li
              key={o.name}
              className={hot === i ? "on" : ""}
              onMouseEnter={() => setHot(i)}
              onMouseLeave={() => setHot(null)}
            >
              <span className="tk-lg-no">0{i + 1}</span>
              <div>
                <b>{o.name}</b>
                <p>{pick(o.groups).join(" · ")}</p>
              </div>
            </li>
          ))}
        </ul>
        <div className="tk-groups">
          {skillGroups
            .filter((g) => ["Marketing", "Business"].includes(g.title))
            .map((g) => (
              <div className="tk-group" key={g.title}>
                <h3>{g.title}</h3>
                <p>{g.items.join(" · ")}</p>
              </div>
            ))}
        </div>
      </div>

      <div className={`tk-orbit ${hot !== null ? "has-hot" : ""}`}>
        <div className="tk-sys">
          {ORBITS.map((o, i) => {
            const items = pick(o.groups, i === 0 ? 7 : 10);
            return (
              <div
                key={o.name}
                className={`tk-ring r${i} ${hot === i ? "is-hot" : ""}`}
                style={{ ["--d" as string]: `${i * 22 + 34}%`, ["--t" as string]: `${o.speed}s`, ["--dir" as string]: i % 2 ? "reverse" : "normal" }}
                onMouseEnter={() => setHot(i)}
                onMouseLeave={() => setHot(null)}
              >
                <div className="tk-spin">
                  {items.map((t, k) => (
                    <span key={t} className="tk-chip" style={{ ["--a" as string]: `${(360 / items.length) * k}deg` }}>
                      <span className="tk-chip-up">
                        <span className="tk-chip-in">{t}</span>
                      </span>
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
          <div className="tk-core" aria-hidden>
            <svg viewBox="0 0 120 120" className="tk-brain">
              <defs>
                <linearGradient id="tkg" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stopColor="#ff9a3c" />
                  <stop offset="1" stopColor="#ff5a1f" />
                </linearGradient>
              </defs>
              {/* left lobe */}
              <path
                className="tk-lobe"
                d="M58 22c-8-6-20-4-25 4-9-1-16 7-14 16-7 4-9 14-4 21-3 8 2 17 10 18 2 8 11 13 19 10 4 5 10 6 14 3Z"
              />
              {/* right lobe (circuit side) */}
              <path
                className="tk-lobe r"
                d="M62 22c8-6 20-4 25 4 9-1 16 7 14 16 7 4 9 14 4 21 3 8-2 17-10 18-2 8-11 13-19 10-4 5-10 6-14 3Z"
              />
              {/* gyri on the left */}
              <g className="tk-folds">
                <path d="M30 40c6-3 12 0 14 6" />
                <path d="M24 60c7-2 13 2 14 8" />
                <path d="M34 80c5-4 12-3 15 2" />
                <path d="M46 30c-2 6 2 11 8 12" />
                <path d="M42 54c4 3 10 2 12-3" />
              </g>
              {/* circuits on the right */}
              <g className="tk-circ">
                <path d="M62 34h14l6 6h10" />
                <path d="M62 52h10l6-6h14" />
                <path d="M62 66h18l6 6h8" />
                <path d="M62 82h10l8 8h6" />
                <path d="M76 34v-6" />
              </g>
              <g className="tk-nodes">
                <circle cx="92" cy="40" r="3" />
                <circle cx="92" cy="46" r="3" />
                <circle cx="94" cy="72" r="3" />
                <circle cx="86" cy="90" r="3" />
                <circle cx="76" cy="27" r="3" />
              </g>
              <line x1="60" y1="20" x2="60" y2="100" className="tk-mid" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Toolkit;
