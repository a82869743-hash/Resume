import { useRef, useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import { gsap, useGSAP } from "../lib/gsap";
import { services } from "../data/resume";
import "./styles/WhatIDo.css";

const WhatIDo = () => {
  const root = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(0);

  useGSAP(
    () => {
      gsap.from(".wid-title .ln > span", {
        yPercent: 110,
        duration: 1.2,
        stagger: 0.1,
        ease: "expo.out",
        scrollTrigger: { trigger: root.current, start: "top 70%" },
      });
      gsap.from(".wid-desk", {
        x: -80,
        opacity: 0,
        duration: 1.4,
        ease: "expo.out",
        scrollTrigger: { trigger: ".wid-grid", start: "top 75%" },
      });
      gsap.from(".wid-box", {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.12,
        ease: "expo.out",
        scrollTrigger: { trigger: ".wid-boxes", start: "top 80%" },
      });
      gsap.from(".wid-vline", {
        scaleY: 0,
        transformOrigin: "top",
        duration: 1.6,
        ease: "expo.inOut",
        scrollTrigger: { trigger: ".wid-grid", start: "top 75%" },
      });
    },
    { scope: root }
  );

  return (
    <section className="section wid" id="services" ref={root}>
      <h2 className="wid-title">
        <span className="ln">
          <span>WHAT</span>
        </span>
        <span className="ln">
          <span>
            I <em>do</em>
          </span>
        </span>
      </h2>

      <div className="wid-grid">
        <div className="wid-desk">
          <img
            src="./images/aryan-command.webp"
            alt="Illustration of Aryan controlling floating panels: code editor, sales dashboard, automation workflow and AI voice agent"
            width={1100}
            height={1100}
           
          />
        </div>

        <div className="wid-boxes">
          <span className="wid-vline l" aria-hidden />
          <span className="wid-vline r" aria-hidden />
          {services.map((s, i) => {
            const isOpen = open === i;
            return (
              <article key={s.no} className={`wid-box ${isOpen ? "is-open" : ""}`}>
                <span className="br tl" />
                <span className="br tr" />
                <span className="br bl" />
                <span className="br br-r" />
                <button className="wid-head" onClick={() => setOpen(isOpen ? -1 : i)} aria-expanded={isOpen}>
                  <span className="wid-no">{s.no}</span>
                  <span className="wid-h">
                    <h3>{s.title}</h3>
                    <span className="wid-sub">{s.sub}</span>
                  </span>
                  <span className="wid-toggle" aria-hidden>
                    <FiChevronDown />
                  </span>
                </button>
                <div className="wid-more">
                  <div className="wid-more-in">
                    <p>{s.text}</p>
                    <div className="wid-tags">
                      {s.tags.map((t) => (
                        <span className="chip" key={t}>
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhatIDo;
