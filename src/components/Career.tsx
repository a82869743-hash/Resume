import { useRef, useState } from "react";
import { gsap, useGSAP } from "../lib/gsap";
import { experience, formatDates } from "../data/resume";
import "./styles/Career.css";

const initials = (s: string) =>
  s
    .split(" ")
    .filter((w) => /^[A-Z]/.test(w))
    .slice(0, 2)
    .map((w) => w[0])
    .join("");

const Career = () => {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  useGSAP(
    () => {
      gsap.from(".xp-head > *", {
        y: 50,
        opacity: 0,
        stagger: 0.08,
        duration: 1.1,
        ease: "expo.out",
        scrollTrigger: { trigger: root.current, start: "top 75%" },
      });

      const mm = gsap.matchMedia();
      // Desktop: pinned rolodex — each card rolls up and out while the next rolls in.
      mm.add("(min-width: 961px)", () => {
        const cards = gsap.utils.toArray<HTMLElement>(".xp-card");
        gsap.set(cards.slice(1), { rotationX: -75, yPercent: 55, opacity: 0, transformOrigin: "50% 0%" });
        gsap.set(cards[0], { transformOrigin: "50% 100%" });
        const tl = gsap.timeline({
          defaults: { ease: "power2.inOut", duration: 1 },
          scrollTrigger: {
            trigger: ".xp-pin",
            start: "top top",
            end: () => `+=${(cards.length - 1) * window.innerHeight * 0.9}`,
            pin: true,
            scrub: 0.7,
            invalidateOnRefresh: true,
            snap: { snapTo: 1 / (cards.length - 1), duration: { min: 0.2, max: 0.6 }, ease: "power2.inOut" },
            onUpdate: (s) => setActive(Math.round(s.progress * (cards.length - 1))),
          },
        });
        cards.forEach((card, i) => {
          if (i === 0) return;
          const prev = cards[i - 1];
          tl.set(prev, { transformOrigin: "50% 100%" }, i - 1)
            .to(prev, { rotationX: 70, yPercent: -55, opacity: 0, scale: 0.92 }, i - 1)
            .to(card, { rotationX: 0, yPercent: 0, opacity: 1 }, i - 1)
            .to(".xp-bar i", { scaleY: i / (cards.length - 1) }, i - 1);
        });
        return () => gsap.set(cards, { clearProps: "all" });
      });
      mm.add("(max-width: 960px)", () => {
        gsap.utils.toArray<HTMLElement>(".xp-card").forEach((card) =>
          gsap.from(card, { y: 60, opacity: 0, duration: 1, ease: "expo.out", scrollTrigger: { trigger: card, start: "top 85%" } })
        );
      });
    },
    { scope: root }
  );

  return (
    <section className="xp" id="career" ref={root}>
      <div className="xp-pin">
        <div className="xp-grid">
          <div className="xp-head">
            <span className="eyebrow">Experience</span>
            <h2 className="xp-title">
              My <em>experience</em>
            </h2>
            <p className="xp-lead">
              One independent practice, four disciplines — software, AI automation, performance marketing and growth
              strategy, delivered for real clients since 2023.
            </p>
            <div className="xp-nav">
              <span className="xp-bar" aria-hidden>
                <i />
              </span>
              <ol>
                {experience.map((r, i) => (
                  <li key={i} className={i === active ? "on" : i < active ? "done" : ""}>
                    <span>{String(i + 1).padStart(2, "0")}</span>
                    <b>{r.role.split(" - ")[0]}</b>
                    <small>{r.unit}</small>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <div className="xp-stage">
            {experience.map((r, i) => (
              <article className="xp-card" key={i}>
                <header className="xp-top">
                  <span className="xp-logo" aria-hidden>
                    {initials(r.short)}
                  </span>
                  <div className="xp-role">
                    <h3>{r.role.split(" - ")[0]}</h3>
                    <p>{r.company}</p>
                  </div>
                  <span className={`xp-status ${r.end === "Present" ? "now" : ""}`}>{formatDates(r)}</span>
                </header>
                <div className="xp-meta">
                  {r.role.includes(" - ") ? <span>{r.role.split(" - ")[1]}</span> : null}
                  {r.unit ? <span>{r.unit}</span> : null}
                  {r.location ? <span>{r.location}</span> : null}
                </div>
                <ul className="xp-points">
                  {r.points.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
                {r.highlights ? (
                  <div className="xp-hl">
                    {r.highlights.map((h) => (
                      <span key={h}>{h}</span>
                    ))}
                  </div>
                ) : null}
                <span className="xp-year" aria-hidden>
                  {r.year}
                </span>
                <span className="xp-idx" aria-hidden>
                  {String(i + 1).padStart(2, "0")} / {String(experience.length).padStart(2, "0")}
                </span>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Career;
