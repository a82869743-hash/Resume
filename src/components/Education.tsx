import { useRef } from "react";
import { gsap, useGSAP } from "../lib/gsap";
import { education } from "../data/resume";
import "./styles/Education.css";

const Education = () => {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".ed-row", {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "expo.out",
        scrollTrigger: { trigger: ".ed-list", start: "top 80%" },
      });
      gsap.from(".ed-row .ed-line", {
        scaleX: 0,
        transformOrigin: "left",
        duration: 1.4,
        stagger: 0.1,
        ease: "expo.inOut",
        scrollTrigger: { trigger: ".ed-list", start: "top 80%" },
      });
    },
    { scope: root }
  );

  return (
    <section className="section education" id="education" ref={root}>
      <span className="eyebrow">Education</span>
      <h2 className="section-title">
        The <em>foundation</em>
      </h2>
      <ol className="ed-list">
        {education.map((e) => (
          <li className="ed-row" key={e.degree} data-cursor="hover">
            <span className="ed-line" aria-hidden />
            <span className="ed-period">{e.period}</span>
            <div className="ed-main">
              <h3>{e.degree}</h3>
              <p>{e.school}</p>
            </div>
            <span className="ed-score">{e.score}</span>
          </li>
        ))}
      </ol>
    </section>
  );
};

export default Education;
