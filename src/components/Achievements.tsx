import { useRef } from "react";
import { FiBarChart2, FiCpu, FiLayers, FiUsers } from "react-icons/fi";
import { gsap, useGSAP } from "../lib/gsap";
import { achievements } from "../data/resume";
import "./styles/Achievements.css";

const icons = [FiLayers, FiCpu, FiBarChart2, FiUsers];

const Achievements = () => {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".ac-card", {
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "expo.out",
        scrollTrigger: { trigger: ".ac-grid", start: "top 80%" },
      });
      // count-up for any filled-in figures
      gsap.utils.toArray<HTMLElement>(".ac-metric[data-num]").forEach((el) => {
        const target = parseFloat(el.dataset.num!);
        const suffix = el.dataset.suffix ?? "";
        const o = { v: 0 };
        gsap.to(o, {
          v: target,
          duration: 1.8,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 85%" },
          onUpdate: () => (el.textContent = Math.round(o.v).toLocaleString("en-IN") + suffix),
        });
      });
    },
    { scope: root }
  );

  const spot = (e: React.MouseEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <section className="section achievements" id="achievements" ref={root}>
      <span className="eyebrow">Selected achievements</span>
      <h2 className="section-title">
        Impact, <em>measured</em>
      </h2>
      <div className="ac-grid">
        {achievements.map((a, i) => {
          const Icon = icons[i];
          const num = a.metric ? parseFloat(a.metric.replace(/,/g, "")) : NaN;
          return (
            <article className="ac-card" key={a.label} onMouseMove={spot}>
              <div className="ac-top">
                <span className="ac-label">
                  <span>0{i + 1}</span> {a.label}
                </span>
                <Icon className="ac-icon" aria-hidden />
              </div>
              {a.metric ? (
                <div className="ac-figure">
                  <span
                    className="ac-metric"
                    data-num={Number.isFinite(num) ? num : undefined}
                    data-suffix={a.metric.replace(/[\d,.]/g, "")}
                  >
                    {a.metric}
                  </span>
                  <small>{a.metricLabel}</small>
                </div>
              ) : (
                <span className="ac-ghost" aria-hidden>
                  0{i + 1}
                </span>
              )}
              <p>{a.text}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default Achievements;
