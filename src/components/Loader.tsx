import { useEffect, useRef, useState } from "react";
import Marquee from "react-fast-marquee";
import { useLoading } from "../context/LoadingProvider";
import { gsap, prefersReducedMotion } from "../lib/gsap";
import "./styles/Loader.css";

type Tok = [string, string]; // [className, text]
const CODE: Tok[][] = [
  [["k", "const "], ["v", "aryan"], ["p", " = {"]],
  [["i", "  role"], ["p", ": "], ["s", '"Full-Stack Developer"'], ["p", ","]],
  [["i", "  strategy"], ["p", ": "], ["s", '"Digital Business"'], ["p", ","]],
  [["i", "  stack"], ["p", ": ["], ["s", '"React"'], ["p", ", "], ["s", '"Node"'], ["p", ", "], ["s", '"Python"'], ["p", "],"]],
  [["i", "  ai"], ["p", ": ["], ["s", '"Voice Agents"'], ["p", ", "], ["s", '"n8n"'], ["p", "],"]],
  [["i", "  growth"], ["p", ": ["], ["s", '"Meta Ads"'], ["p", ", "], ["s", '"Content"'], ["p", "],"]],
  [["i", "  projects"], ["p", ": "], ["n", "26"], ["p", ","]],
  [["i", "  industries"], ["p", ": "], ["n", "7"], ["p", ","]],
  [["i", "  mode"], ["p", ": "], ["s", '"freelance + agency"'], ["p", ","]],
  [["p", "};"]],
  [["c", "// strategy first, then code"]],
  [["f", "build"], ["p", "(aryan)."], ["f", "deploy"], ["p", "();"]],
];
const FLOORS = CODE.length;
const STAGES = [
  "Initialising workspace",
  "Installing dependencies",
  "Compiling components",
  "Wiring REST APIs",
  "Connecting databases",
  "Training AI agents",
  "Running n8n automations",
  "Launching Meta campaigns",
  "Optimising bundle",
  "Deploying to production",
];

const Loader = () => {
  const { sceneReady, setLoaded } = useLoading();
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);
  const [gone, setGone] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const readyRef = useRef(false);

  // Wait for fonts + the hero scene (with a safety timeout) before finishing.
  useEffect(() => {
    if (sceneReady) readyRef.current = true;
  }, [sceneReady]);

  useEffect(() => {
    let fontsReady = false;
    document.fonts?.ready.then(() => (fontsReady = true));
    const started = performance.now();
    const fast = prefersReducedMotion();
    let value = 0;
    const id = window.setInterval(() => {
      const elapsed = performance.now() - started;
      const canFinish = (readyRef.current && fontsReady && elapsed > (fast ? 300 : 2400)) || elapsed > 9000;
      const cap = canFinish ? 100 : 92;
      const step = canFinish ? 4 : Math.random() * 2.4 + 0.4;
      value = Math.min(cap, value + step);
      setProgress(Math.floor(value));
      if (value >= 100) {
        window.clearInterval(id);
        setDone(true);
      }
    }, 40);
    return () => window.clearInterval(id);
  }, []);

  // Exit choreography
  useEffect(() => {
    if (!done || !root.current) return;
    const q = gsap.utils.selector(root);
    const tl = gsap.timeline({
      delay: 0.35,
      onComplete: () => setGone(true),
    });
    tl.to(q(".ld-status, .ld-bar"), { opacity: 0, y: 12, duration: 0.4, ease: "power2.in" })
      .to(q(".ld-count-in"), { yPercent: -110, duration: 0.7, ease: "power4.in" }, "<")
      .to(q(".ld-editor"), { y: -40, opacity: 0, duration: 0.6, ease: "power3.in" }, "<0.1")
      .to(q(".ld-meta"), { opacity: 0, duration: 0.3 }, "<")
      .add(() => setLoaded(true), "-=0.15")
      .to(q(".ld-door.top"), { yPercent: -100, duration: 1.1, ease: "expo.inOut" }, "+=0.05")
      .to(q(".ld-door.bottom"), { yPercent: 100, duration: 1.1, ease: "expo.inOut" }, "<")
      .to(q(".ld-seam"), { scaleX: 0, opacity: 0, duration: 0.6, ease: "power2.out" }, "<");
    return () => {
      tl.kill();
    };
  }, [done, setLoaded]);

  if (gone) return null;

  const builtFloors = Math.round((progress / 100) * FLOORS);
  const stage = STAGES[Math.min(STAGES.length - 1, Math.floor((progress / 100) * STAGES.length))];

  return (
    <div className={`loader ${done ? "is-done" : ""}`} ref={root} role="status" aria-label={`Loading ${progress}%`}>
      <div className="ld-door top" />
      <div className="ld-door bottom" />
      <div className="ld-seam" />

      <div className="ld-bg-marquee" aria-hidden>
        <Marquee speed={60} autoFill>
          <span>FULL STACK • AI AGENTS • AUTOMATION • GROWTH •&nbsp;</span>
        </Marquee>
      </div>

      <div className="ld-meta ld-tl">
        <span className="ld-logo">AR<i>.</i></span>
        <span>Portfolio — 2026</span>
      </div>
      <div className="ld-meta ld-tr">
        <span>Vadodara, IN</span>
        <span>22.31° N · 73.18° E</span>
      </div>

      <div className="ld-center">
        <div className="ld-editor" aria-hidden>
          <div className="ld-ed-bar">
            <i />
            <i />
            <i />
            <span>aryan.config.ts</span>
          </div>
          <pre className="ld-code">
            {CODE.map((line, i) => (
              <span key={i} className={`ld-line ${i < builtFloors ? "on" : ""} ${i === builtFloors - 1 ? "cur" : ""}`}>
                <em>{String(i + 1).padStart(2, "0")}</em>
                {line.map(([c, t], j) => (
                  <b key={j} className={`t-${c}`}>
                    {t}
                  </b>
                ))}
              </span>
            ))}
          </pre>
        </div>

        <div className="ld-count" aria-hidden>
          <div className="ld-count-in">
            <span className="ld-num">{progress}</span>
            <span className="ld-pct">%</span>
          </div>
        </div>
      </div>

      <div className="ld-status">
        <span className="ld-dot" />
        <span>{stage}</span>
        <span className="ld-slab">
          Build {String(builtFloors).padStart(2, "0")}/{FLOORS}
        </span>
      </div>
      <div className="ld-bar">
        <div className="ld-bar-fill" style={{ transform: `scaleX(${progress / 100})` }} />
      </div>
    </div>
  );
};

export default Loader;
