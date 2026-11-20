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
          <div className="tk-core">
            <img src="./images/aryan-avatar.webp" alt="" />
            <span>AR.</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Toolkit;
