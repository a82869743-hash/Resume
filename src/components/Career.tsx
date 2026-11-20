import { useRef, useState } from "react";
import { gsap, useGSAP } from "../lib/gsap";
import { experience, formatDates } from "../data/resume";
import "./styles/Career.css";

const ICONS = ["◆", "▣", "✦", "◎", "▲"];
/* Illustration per role (same order as `experience`). Swap files here to change art. */
const ART = [
  "./images/projects/marketplace-art.webp",
  "./images/aryan-command.webp",
  "./images/projects/voice-agent-art.webp",
  "./images/projects/meta-ads-art.webp",
  "./images/aryan-whiteboard.webp",
];

const Career = () => {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const n = experience.length;

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      // Desktop: pinned horizontal coverflow — the centred card is fully readable.
      mm.add("(min-width: 961px)", () => {
        const cards = gsap.utils.toArray<HTMLElement>(".wb-card");
        const track = root.current!.querySelector<HTMLElement>(".wb-track")!;
        const step = () => cards[0].offsetWidth + parseFloat(getComputedStyle(track).columnGap || "0");

        const place = (p: number) => {
          gsap.set(track, { x: -p * step() });
          cards.forEach((c, i) => {
            const d = i - p;
            const a = Math.min(Math.abs(d), 2);
            gsap.set(c, {
              scale: 1 - a * 0.14,
              opacity: 1 - Math.min(a, 1) * 0.6,
              rotationY: gsap.utils.clamp(-14, 14, -d * 14),
              transformOrigin: d > 0 ? "0% 50%" : "100% 50%",
              zIndex: 100 - Math.round(a * 10),
            });
            c.classList.toggle("is-on", Math.abs(d) < 0.5);
          });
          gsap.set(".wb-bg-a", { xPercent: -p * 6 });
          gsap.set(".wb-bg-b", { xPercent: -30 + p * 6 });
        };
        place(0);

        const st = gsap.to({}, {
          scrollTrigger: {
            trigger: ".wb-pin",
            start: "top top",
            end: () => `+=${(n - 1) * window.innerHeight * 0.85}`,
            pin: true,
            scrub: 0.6,
            invalidateOnRefresh: true,
            snap: { snapTo: 1 / (n - 1), duration: { min: 0.2, max: 0.6 }, ease: "power2.inOut" },
            onUpdate: (s) => {
              const p = s.progress * (n - 1);
              place(p);
              setActive(Math.round(p));
            },
            onRefresh: (s) => place(s.progress * (n - 1)),
          },
        });
        return () => {
          st.scrollTrigger?.kill();
          gsap.set([...cards, track], { clearProps: "all" });
        };
      });
      mm.add("(max-width: 960px)", () => {
        gsap.utils.toArray<HTMLElement>(".wb-card").forEach((card) =>
          gsap.from(card, { y: 60, opacity: 0, duration: 1, ease: "expo.out", scrollTrigger: { trigger: card, start: "top 85%" } })
        );
      });
    },
    { scope: root }
  );

  return (
    <section className="wb" id="career" ref={root}>
      <div className="wb-pin">
        <div className="wb-bg" aria-hidden>
          <div className="wb-bg-a">WHERE I'VE BEEN · WHERE I'VE BEEN · WHERE I'VE BEEN ·</div>
          <div className="wb-bg-b">SOFTWARE · AI · AUTOMATION · ADS · GROWTH · SOFTWARE · AI ·</div>
        </div>

        <header className="wb-head">
          <div>
            <span className="eyebrow">Experience</span>
            <h2 className="wb-title">
              Where I've <em>been</em>
            </h2>
          </div>
          <div className="wb-count" aria-hidden>
            <b>{String(active + 1).padStart(2, "0")}</b>
            <span>/ {String(n).padStart(2, "0")}</span>
            <div className="wb-dots">
              {experience.map((_, i) => (
                <i key={i} className={i === active ? "on" : ""} />
              ))}
            </div>
          </div>
        </header>

        <div className="wb-viewport">
          <div className="wb-track">
            {experience.map((r, i) => (
              <article className="wb-card" key={i}>
                <div className="wb-l">
                  <div className="wb-card-top">
                    <span className="wb-ico" aria-hidden>
                      {ICONS[i % ICONS.length]}
                    </span>
                    <span className={`wb-date ${r.end === "Present" ? "now" : ""}`}>{formatDates(r)}</span>
                  </div>
                  <div className="wb-l-main">
                    <span className="wb-kicker">{String(i + 1).padStart(2, "0")} — {r.unit}</span>
                    <h3>{r.role.split(" - ")[0]}</h3>
                    <p className="wb-co">{r.company}</p>
                    {r.role.includes(" - ") ? <p className="wb-sub">{r.role.split(" - ")[1]}</p> : null}
                  </div>
                  <img className="wb-art" src={ART[i % ART.length]} alt="" loading="lazy" aria-hidden />
                  <span className="wb-num" aria-hidden>
                    {r.year}
                  </span>
                </div>
                <div className="wb-r">
                  <ul>
                    {r.points.map((p) => (
                      <li key={p}>{p}</li>
                    ))}
                  </ul>
                  {r.highlights ? (
                    <div className="wb-tags">
                      {r.highlights.map((h) => (
                        <span key={h}>{h}</span>
                      ))}
                    </div>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Career;
