import { useRef } from "react";
import { FiArrowDownRight, FiArrowUpRight } from "react-icons/fi";
import { useLoading } from "../context/LoadingProvider";
import { gsap, SplitText, useGSAP, isTouch, scrollToId } from "../lib/gsap";
import { profile } from "../data/resume";
import "./styles/Landing.css";

const ROLES = ["Full-Stack Developer", "AI Automation Engineer", "Growth Strategist", "Business Systems Builder"];
const BADGE = "OPEN FOR PROJECTS • FREELANCE + AGENCY • ";

const Landing = () => {
  const { loaded, setSceneReady } = useLoading();
  const root = useRef<HTMLElement>(null);

  // mouse depth: word and character move in opposite directions
  useGSAP(
    () => {
      if (isTouch()) return;
      const wx = gsap.quickTo(".hx-word", "x", { duration: 1.2, ease: "power3" });
      const cx = gsap.quickTo(".hx-figure", "x", { duration: 1, ease: "power3" });
      const cr = gsap.quickTo(".hx-figure", "rotationY", { duration: 1, ease: "power3" });
      const move = (e: PointerEvent) => {
        const px = e.clientX / window.innerWidth - 0.5;
        wx(-px * 40);
        cx(px * 24);
        cr(px * 6);
      };
      window.addEventListener("pointermove", move);
      return () => window.removeEventListener("pointermove", move);
    },
    { scope: root }
  );

  // scroll: word lifts and widens, character sinks slower — depth parallax
  useGSAP(
    () => {
      const st = { trigger: root.current, start: "top top", end: "bottom top", scrub: true };
      gsap.to(".hx-word-in", { yPercent: -45, scale: 1.12, ease: "none", scrollTrigger: st });
      gsap.to(".hx-figure-wrap", { yPercent: 14, ease: "none", scrollTrigger: st });
      gsap.to([".hx-intro", ".hx-cta", ".hx-badge"], { y: -80, opacity: 0, ease: "none", scrollTrigger: { ...st, end: "55% top" } });
    },
    { scope: root }
  );

  useGSAP(
    () => {
      if (!loaded) return;
      const word = SplitText.create(".hx-word-in", { aria: "none", type: "chars", charsClass: "hx-ch" });
      const tl = gsap.timeline({ delay: 0.45 });
      tl.from(word.chars, { yPercent: 120, duration: 1.4, stagger: 0.07, ease: "expo.out" })
        .from(".hx-figure-wrap", { yPercent: 35, opacity: 0, duration: 1.6, ease: "expo.out" }, 0.25)
        .from(".hx-intro > *", { y: 30, opacity: 0, duration: 0.9, stagger: 0.08, ease: "power3.out" }, 0.8)
        .from(".hx-cta > *", { y: 30, opacity: 0, duration: 0.9, stagger: 0.08, ease: "power3.out" }, 0.9)
        .from(".hx-badge", { scale: 0, rotate: -120, duration: 1.2, ease: "back.out(1.6)" }, 1.1);

      gsap.to(".hx-badge-ring", { rotate: 360, duration: 14, repeat: -1, ease: "none" });

      // rolling role pill
      const items = gsap.utils.toArray<HTMLElement>(".hx-pill-item");
      gsap.set(items.slice(1), { yPercent: 110 });
      const loop = gsap.timeline({ repeat: -1, delay: 2.4 });
      items.forEach((it, i) => {
        const next = items[(i + 1) % items.length];
        loop
          .to(it, { yPercent: -110, duration: 0.7, ease: "expo.inOut" }, "+=1.8")
          .fromTo(next, { yPercent: 110 }, { yPercent: 0, duration: 0.7, ease: "expo.inOut", immediateRender: false }, "<");
      });
      return () => word.revert();
    },
    { scope: root, dependencies: [loaded] }
  );

  return (
    <section className="hx" id="home" ref={root}>
      <div className="hx-word" aria-hidden>
        <span className="hx-word-in">{profile.firstName.toUpperCase()}</span>
      </div>

      <div className="hx-figure-wrap">
        <div className="hx-figure">
          <img
            src="./images/aryan-hero.webp"
            alt="Illustration of Aryan Singh Rajput with arms crossed holding a laptop"
            width={1027}
            height={1392}
            onLoad={() => setSceneReady(true)}
            onError={() => setSceneReady(true)}
            fetchPriority="high"
          />
        </div>
      </div>

      <button className="hx-badge" onClick={() => scrollToId("contact")} aria-label="Start a project">
        <svg className="hx-badge-ring" viewBox="0 0 120 120" aria-hidden>
          <defs>
            <path id="hxCircle" d="M60,60 m-46,0 a46,46 0 1,1 92,0 a46,46 0 1,1 -92,0" />
          </defs>
          <text>
            <textPath href="#hxCircle">{BADGE}</textPath>
          </text>
        </svg>
        <span className="hx-badge-core">
          <FiArrowUpRight />
        </span>
      </button>

      <div className="hx-intro">
        <h1 className="hx-hi">
          Hi, I'm <strong>{profile.name}</strong>
          <span className="sr-only"> — {profile.title} &amp; {profile.discipline} in Vadodara, Gujarat, India</span>.
        </h1>
        <p className="hx-iam">
          I am a
          <span className="sr-only">{ROLES.join(", ")}</span>
          <span className="hx-pill" aria-hidden>
            {ROLES.map((r) => (
              <span className="hx-pill-item" key={r} aria-hidden>
                {r}
              </span>
            ))}
          </span>
        </p>
      </div>

      <div className="hx-cta">
        <p>{profile.tagline}</p>
        <div className="hx-btns">
          <button className="hx-btn solid" onClick={() => scrollToId("work")}>
            See my work <FiArrowDownRight />
          </button>
          <a className="hx-btn" href="./Aryan-Singh-Rajput-Resume.pdf" target="_blank" rel="noreferrer">
            Resume <FiArrowUpRight />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Landing;
