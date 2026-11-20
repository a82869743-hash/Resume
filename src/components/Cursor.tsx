import { useEffect, useRef } from "react";
import { gsap, isTouch } from "../lib/gsap";
import "./styles/Cursor.css";

/** Two-part cursor: a precise dot and a lagging ring that morphs over
 *  interactive elements ([data-cursor="hover"|"view"|"drag"]). */
const Cursor = () => {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (isTouch()) return;
    document.documentElement.classList.add("has-cursor");
    const dx = gsap.quickTo(dot.current, "x", { duration: 0.08, ease: "power3" });
    const dy = gsap.quickTo(dot.current, "y", { duration: 0.08, ease: "power3" });
    const rx = gsap.quickTo(ring.current, "x", { duration: 0.45, ease: "power3" });
    const ry = gsap.quickTo(ring.current, "y", { duration: 0.45, ease: "power3" });

    const move = (e: MouseEvent) => {
      document.documentElement.classList.add("cursor-on");
      dx(e.clientX);
      dy(e.clientY);
      rx(e.clientX);
      ry(e.clientY);
      const t = (e.target as HTMLElement)?.closest<HTMLElement>("[data-cursor], a, button");
      const mode = t ? t.dataset.cursor || "hover" : "";
      ring.current!.dataset.mode = mode;
      if (label.current) label.current.textContent = t?.dataset.cursorLabel ?? "";
    };
    const leave = () => document.documentElement.classList.remove("cursor-on");
    const enter = () => document.documentElement.classList.add("cursor-on");
    const down = () => ring.current?.classList.add("down");
    const up = () => ring.current?.classList.remove("down");
    window.addEventListener("mousemove", move);
    document.addEventListener("mouseleave", leave);
    document.addEventListener("mouseenter", enter);
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);
    return () => {
      document.documentElement.classList.remove("has-cursor", "cursor-on");
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseleave", leave);
      document.removeEventListener("mouseenter", enter);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
    };
  }, []);

  return (
    <>
      <div className="cursor-dot" ref={dot} aria-hidden />
      <div className="cursor-ring" ref={ring} aria-hidden>
        <span ref={label} />
      </div>
    </>
  );
};

export default Cursor;
