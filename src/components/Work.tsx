import { useRef, useState } from "react";
import { gsap, ScrollTrigger, useGSAP } from "../lib/gsap";
import { projects } from "../data/resume";
import ProjectArt from "./ProjectArt";
import "./styles/Work.css";

const Work = () => {
  const root = useRef<HTMLElement>(null);
  const [current, setCurrent] = useState(1);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 901px)", () => {
        const track = root.current!.querySelector<HTMLElement>(".wk-track")!;
        const distance = () => track.scrollWidth - window.innerWidth + parseFloat(getComputedStyle(track).paddingLeft);
        const tween = gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: ".wk-pin",
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 0.8,
            invalidateOnRefresh: true,
            onUpdate: (s) => setCurrent(Math.min(projects.length, Math.floor(s.progress * projects.length) + 1)),
          },
        });
        gsap.utils.toArray<HTMLElement>(".wk-card").forEach((card) => {
          const art = card.querySelector(".wk-art .pa");
          if (art)
            gsap.from(art, {
              yPercent: 18,
              scale: 0.86,
              opacity: 0,
              ease: "power2.out",
              scrollTrigger: { trigger: card, containerAnimation: tween, start: "left 100%", end: "left 55%", scrub: true },
            });
        });
        return () => ScrollTrigger.refresh();
      });
      mm.add("(max-width: 900px)", () => {
        gsap.from(".wk-card", {
          y: 40,
          opacity: 0,
          stagger: 0.08,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: ".wk-track", start: "top 85%" },
        });
      });
    },
    { scope: root }
  );

  return (
    <section className="work" id="work" ref={root}>
      <div className="wk-pin">
        <div className="wk-head">
          <div>
            <span className="eyebrow">Selected work · {projects.length} client projects</span>
            <h2 className="section-title">
              Things I've <em>shipped</em>
            </h2>
          </div>
          <div className="wk-count" aria-hidden>
            <span>{String(current).padStart(2, "0")}</span>/{String(projects.length).padStart(2, "0")}
          </div>
        </div>
        <div className="wk-track">
          {projects.map((p, i) => (
            <article className={`wk-card ${p.featured ? "is-featured" : ""}`} key={`${p.client}-${p.name}`}>
              <div className="wk-card-top">
                <span className="wk-no">{String(i + 1).padStart(2, "0")}</span>
                <span className="chip">{p.category}</span>
              </div>
              <div className={`wk-art ${p.image ? "has-img" : ""}`}>
                {p.image ? (
                  <img src={`./images/projects/${p.image}`} alt={`Screenshot of ${p.name}`} loading="lazy" decoding="async" />
                ) : (
                  <ProjectArt category={p.category} seed={i} />
                )}
                {p.featured ? <span className="wk-feat">Featured</span> : null}
              </div>
              <div className="wk-info">
                {p.client ? <p className="wk-client">{p.client}</p> : null}
                <h3>{p.name}</h3>
                <p className="wk-desc">{p.desc}</p>
              </div>
            </article>
          ))}
        </div>
        <div className="wk-legend">
          <span>Business systems · Manufacturing · Platforms · Websites · AI · Automation · Marketing</span>
          <span className="wk-note">Client work — some systems are private and shown as illustrations</span>
        </div>
      </div>
    </section>
  );
};

export default Work;
