import { lazy, Suspense, useEffect, useMemo, useRef, useState } from "react";
import { gsap, useGSAP } from "../lib/gsap";
import { tools, reportKit, languages, skillGroups } from "../data/resume";
import "./styles/Toolkit.css";

const loadScene = () => import("./three/BlocksScene");
const BlocksScene = lazy(loadScene);

const Toolkit = () => {
  const root = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const [seen, setSeen] = useState(false);

  const blocks = useMemo(
    () => [
      ...reportKit.map((label) => ({ label, kind: "report" as const })),
      ...tools.map((label) => ({ label, kind: "tool" as const })),
      ...languages.map((label) => ({ label, kind: "lang" as const })),
    ],
    []
  );

  useEffect(() => {
    // fetch the physics chunk well before the section arrives
    const pre = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          loadScene();
          pre.disconnect();
        }
      },
      { rootMargin: "0px 0px 150% 0px" }
    );
    // drop the blocks as soon as the stage starts entering the screen
    const io = new IntersectionObserver(
      ([e]) => {
        setActive(e.isIntersecting);
        if (e.isIntersecting) setSeen(true);
      },
      { threshold: 0, rootMargin: "0px 0px -15% 0px" }
    );
    if (stage.current) {
      pre.observe(stage.current);
      io.observe(stage.current);
    }
    return () => {
      pre.disconnect();
      io.disconnect();
    };
  }, []);

  useGSAP(
    () => {
      gsap.from(".tk-copy > *", {
        y: 40,
        opacity: 0,
        stagger: 0.08,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 70%" },
      });
    },
    { scope: root }
  );

  return (
    <section className="section toolkit" id="toolkit" ref={root}>
      <div className="tk-copy">
        <span className="eyebrow">Toolkit</span>
        <h2 className="section-title">
          Tech <em>stack</em>
        </h2>
        <div className="tk-groups">
          {skillGroups.map((g) => (
            <div className="tk-group" key={g.title}>
              <h3>{g.title}</h3>
              <p>{g.items.join(" · ")}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="tk-stage" ref={stage} data-cursor="drag" data-cursor-label="Push">
        <span className="tk-hint">Move your cursor through the blocks</span>
        {seen ? (
          <Suspense fallback={null}>
            <BlocksScene blocks={blocks} active={active} />
          </Suspense>
        ) : null}
      </div>
    </section>
  );
};

export default Toolkit;
