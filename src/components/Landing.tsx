import { useRef } from "react";
import { useLoading } from "../context/LoadingProvider";
import { gsap, SplitText, useGSAP, isTouch } from "../lib/gsap";
import { profile } from "../data/resume";
import "./styles/Landing.css";

const TITLE = "PORTFOLIO".split("");

const Landing = () => {
  const { loaded, setSceneReady } = useLoading();
  const root = useRef<HTMLElement>(null);
  const figure = useRef<HTMLDivElement>(null);

  // mouse parallax tilt on the character
  useGSAP(
    () => {
      if (isTouch()) return;
      const rx = gsap.quickTo(figure.current, "rotationY", { duration: 0.8, ease: "power3" });
      const ry = gsap.quickTo(figure.current, "rotationX", { duration: 0.8, ease: "power3" });
      const mx = gsap.quickTo(figure.current, "x", { duration: 0.9, ease: "power3" });
      const move = (e: PointerEvent) => {
        const px = e.clientX / window.innerWidth - 0.5;
        const py = e.clientY / window.innerHeight - 0.5;
        rx(px * 8);
        ry(-py * 5);
        mx(px * 18);
      };
      window.addEventListener("pointermove", move);
      return () => window.removeEventListener("pointermove", move);
    },
    { scope: root }
  );

  // scroll exit
  useGSAP(
    () => {
      gsap.to(".hero-figure-wrap", {
        yPercent: 18,
        scale: 0.92,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
      });
      gsap.to([".hero-left", ".hero-right"], {
        yPercent: -60,
        opacity: 0,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "60% top", scrub: true },
      });
    },
    { scope: root }
  );

  // intro once the loader lifts
  useGSAP(
    () => {
      if (!loaded) return;
      const name = SplitText.create(".hero-name .ln", { type: "chars", charsClass: "char" });
      const tl = gsap.timeline({ delay: 0.5 });
      tl.from(".hero-figure-wrap", { yPercent: 30, opacity: 0, duration: 1.6, ease: "expo.out" })
        .from(".pf-title .pf-ch", { yPercent: 110, duration: 1, stagger: 0.04, ease: "expo.out" }, 0.1)
        .from(".hero-hello", { y: 20, opacity: 0, duration: 0.8, ease: "power3.out" }, 0.5)
        .from(name.chars, { yPercent: 110, duration: 1, stagger: 0.03, ease: "expo.out" }, 0.55)
        .from(".hero-role-sub", { y: 20, opacity: 0, duration: 0.8, ease: "power3.out" }, 0.7)
        .fromTo(
          ".hero-word-wrap",
          { clipPath: "inset(0% 100% 0% 0%)" },
          { clipPath: "inset(0% 0% 0% 0%)", duration: 1.2, ease: "expo.inOut" },
          0.8
        );

      // PORTFOLIO letters flip between solid and outline
      const chars = gsap.utils.toArray<HTMLElement>(".pf-title .pf-ch");
      const flip = gsap.timeline({ repeat: -1, repeatDelay: 2.2, delay: 2.4 });
      flip
        .to(chars, { rotationX: 360, duration: 1.1, stagger: { each: 0.07 }, ease: "power3.inOut" })
        .add(() => chars.forEach((c) => c.classList.toggle("is-outline")), 0.5);

      // rotating role word
      const words = gsap.utils.toArray<HTMLElement>(".hero-word");
      gsap.set(words.slice(1), { yPercent: 100, opacity: 0 });
      const loop = gsap.timeline({ repeat: -1, delay: 2.6 });
      words.forEach((w, i) => {
        const next = words[(i + 1) % words.length];
        loop
          .to(w, { yPercent: -100, opacity: 0, duration: 0.8, ease: "expo.inOut" }, "+=2")
          .fromTo(
            next,
            { yPercent: 100, opacity: 0 },
            { yPercent: 0, opacity: 1, duration: 0.8, ease: "expo.inOut", immediateRender: false },
            "<"
          );
      });
      return () => name.revert();
    },
    { scope: root, dependencies: [loaded] }
  );

  return (
    <section className="landing" id="home" ref={root}>
      <h2 className="pf-title" aria-hidden>
        {TITLE.map((c, i) => (
          <span className="pf-ch-wrap" key={i}>
            <span className={`pf-ch ${i % 2 ? "is-outline" : ""}`}>{c}</span>
          </span>
        ))}
      </h2>

      <div className="hero-glow" aria-hidden />

      <div className="hero-figure-wrap">
        <div className="hero-figure" ref={figure}>
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

      <div className="hero-left">
        <p className="hero-hello">Hello! I'm</p>
        <h1 className="hero-name">
          <span className="ln solid">{profile.firstName.toUpperCase()}</span>
          <span className="ln outline">{profile.lastName.toUpperCase()}</span>
        </h1>
      </div>

      <div className="hero-right">
        <p className="hero-role-sub">I build</p>
        <div className="hero-word-wrap" aria-label={profile.heroWords.join(", ")}>
          {profile.heroWords.map((w) => (
            <span className="hero-word" key={w} aria-hidden>
              {w}
            </span>
          ))}
        </div>
        <p className="hero-role-foot">{profile.title} &amp; {profile.discipline}</p>
      </div>
    </section>
  );
};

export default Landing;
