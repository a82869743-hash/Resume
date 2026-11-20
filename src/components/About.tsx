import { useRef } from "react";
import { gsap, SplitText, useGSAP } from "../lib/gsap";
import { profile, projects, industries, education } from "../data/resume";
import "./styles/About.css";

const facts = [
  { k: "3+", v: "Years building for real clients" },
  { k: String(projects.length), v: "Client projects & engagements" },
  { k: "09", v: "Business & manufacturing systems" },
  { k: String(industries.length).padStart(2, "0"), v: "Industries served" },
];

const About = () => {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      // Words darken from light grey to black as you scroll.
      // autoSplit re-splits after webfonts load / on resize so words never overlap.
      const split = SplitText.create(".about-text", {
        type: "words",
        wordsClass: "w",
        autoSplit: true,
        onSplit: (self) =>
          gsap.fromTo(
            self.words,
            { color: "#c4c4c4" },
            {
              color: "#111111",
              stagger: 0.12,
              ease: "none",
              scrollTrigger: {
                trigger: ".about-text",
                start: "top 85%",
                end: "bottom 60%",
                scrub: 0.5,
              },
            }
          ),
      });
      gsap.from(".about-art img", {
        x: 60,
        opacity: 0,
        duration: 1.3,
        ease: "expo.out",
        scrollTrigger: { trigger: ".about-grid", start: "top 75%" },
      });
      gsap.from(".about-fact", {
        y: 50,
        opacity: 0,
        stagger: 0.1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: ".about-facts", start: "top 85%" },
      });
      gsap.from(".about-head > *", {
        y: 40,
        opacity: 0,
        stagger: 0.1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 75%" },
      });
      return () => split.revert();
    },
    { scope: root }
  );

  return (
    <section className="section about" id="about" ref={root}>
      <div className="about-head">
        <span className="eyebrow">About me</span>
        <div className="about-meta">
          <span>{profile.location}</span>
          <span>{profile.status}</span>
          <span>{education[0].degree.replace(" - ", " · ")}</span>
        </div>
      </div>
      <div className="about-grid">
        <p className="about-text">{profile.summary}</p>
        <figure className="about-art">
          <img
            src="./images/aryan-whiteboard.webp"
            alt="Illustration of Aryan explaining a website, CRM, AI agent and automation plan on a whiteboard"
            width={1051}
            height={1100}
            loading="lazy"
          />
          <figcaption>Strategy first — then the stack.</figcaption>
        </figure>
      </div>
      <div className="about-facts">
        {facts.map((f) => (
          <div className="about-fact" key={f.v}>
            <strong>{f.k}</strong>
            <span>{f.v}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default About;
