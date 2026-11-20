import { useRef } from "react";
import { FiArrowUpRight, FiMail, FiMapPin, FiPhone, FiDownload } from "react-icons/fi";
import { gsap, SplitText, useGSAP, isTouch } from "../lib/gsap";
import { profile } from "../data/resume";
import HoverLink from "./HoverLink";
import "./styles/Contact.css";

/* Layers cut from the illustration: [left %, top %, width %] of the square scene. */
const LAYERS = [
  { n: "plane", pos: [0.64, 35.73, 95.22], depth: 10 },
  { n: "mail", pos: [12.84, 10.85, 24.24], depth: 26 },
  { n: "phone", pos: [54.78, 6.62, 21.77], depth: 32 },
  { n: "calendar", pos: [70.73, 20.49, 23.84], depth: 22 },
  { n: "dots", pos: [6.3, 32.14, 20.1], depth: 18 },
];

const Contact = () => {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const split = SplitText.create(".ct-big .ln", { type: "lines", mask: "lines" });
      gsap.from(split.lines, {
        yPercent: 110,
        duration: 1.1,
        stagger: 0.12,
        ease: "expo.out",
        scrollTrigger: { trigger: ".ct-big", start: "top 80%" },
      });
      gsap.from(".ct-col", {
        y: 40,
        opacity: 0,
        stagger: 0.1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: ".ct-cols", start: "top 85%" },
      });
      // illustration: plane glides in, bubbles pop one by one, then everything floats
      const tl = gsap.timeline({ scrollTrigger: { trigger: ".ct-scene", start: "top 85%", once: true } });
      tl.from(".ct-plane", { xPercent: -40, yPercent: 30, rotate: -8, opacity: 0, duration: 1.4, ease: "expo.out" }).from(
        ".ct-mail, .ct-dots, .ct-phone, .ct-calendar",
        { scale: 0, opacity: 0, rotate: -12, transformOrigin: "50% 100%", stagger: 0.14, duration: 0.8, ease: "back.out(2)" },
        "-=0.8"
      );
      gsap.to(".ct-plane", { y: -12, rotate: -1.5, duration: 3, ease: "sine.inOut", yoyo: true, repeat: -1 });
      gsap.utils.toArray<HTMLElement>(".ct-mail, .ct-dots, .ct-phone, .ct-calendar").forEach((el, i) =>
        gsap.to(el, { y: -10 - i * 2, duration: 2.2 + i * 0.35, ease: "sine.inOut", yoyo: true, repeat: -1, delay: i * 0.3 })
      );
      let off = () => {};
      if (!isTouch()) {
        const layers = gsap.utils.toArray<HTMLElement>(".ct-l");
        const setters = layers.map((el) => ({
          d: Number(el.dataset.depth),
          x: gsap.quickTo(el, "x", { duration: 1, ease: "power3" }),
        }));
        const move = (e: PointerEvent) => {
          const px = e.clientX / window.innerWidth - 0.5;
          setters.forEach((s) => s.x(px * s.d));
        };
        window.addEventListener("pointermove", move);
        off = () => window.removeEventListener("pointermove", move);
      }
      // footer: giant words fill with the gradient as you reach the end
      gsap.fromTo(
        ".cg-fill",
        { backgroundSize: "0% 100%" },
        {
          backgroundSize: "100% 100%",
          ease: "power2.inOut",
          duration: 0.9,
          stagger: 0.35,
          scrollTrigger: { trigger: ".ct-giant", start: "top 95%", toggleActions: "play none none reverse" },
        }
      );
      gsap.from(".ct-giant i", {
        rotate: -180,
        scale: 0,
        stagger: 0.15,
        ease: "back.out(2)",
        duration: 1,
        scrollTrigger: { trigger: ".ct-giant", start: "top 90%" },
      });
      const clock = root.current!.querySelector<HTMLElement>(".cf-time");
      const tick = () => {
        if (clock)
          clock.textContent = new Intl.DateTimeFormat("en-IN", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
            timeZone: "Asia/Kolkata",
          }).format(new Date()) + " IST";
      };
      tick();
      const clockId = window.setInterval(tick, 20000);
      return () => {
        window.clearInterval(clockId);
        split.revert();
        off();
      };
    },
    { scope: root }
  );

  const year = new Date().getFullYear();

  return (
    <footer className="contact" id="contact" ref={root}>
      <div className="section ct-inner">
        <div className="ct-top">
          <div className="ct-copy">
            <span className="eyebrow">Contact</span>
            <h2 className="ct-big">
              <span className="ln">Let's build</span>
              <span className="ln">
                <em>what's next.</em>
              </span>
            </h2>

            <a className="ct-mail" href={`mailto:${profile.email}`} data-cursor="view" data-cursor-label="Write">
              {profile.email}
              <FiArrowUpRight />
            </a>
          </div>
          <div className="ct-right">
          <div className="ct-scene" aria-hidden>
            {LAYERS.map((l) => (
              <img
                key={l.n}
                className={`ct-l ct-${l.n}`}
                data-depth={l.depth}
                src={`./images/contact/${l.n}.webp`}
                alt=""
                loading="lazy"
                style={{ left: `${l.pos[0]}%`, top: `${l.pos[1]}%`, width: `${l.pos[2]}%` }}
              />
            ))}
          </div>
          </div>
        </div>

        <div className="ct-cols">
          <div className="ct-col">
            <h3>Phone</h3>
            <a href={profile.phoneHref}>
              <FiPhone /> <HoverLink>{profile.phone}</HoverLink>
            </a>
          </div>
          <div className="ct-col">
            <h3>Email</h3>
            <a href={`mailto:${profile.email}`}>
              <FiMail /> <HoverLink>Send an email</HoverLink>
            </a>
          </div>
          <div className="ct-col">
            <h3>Location</h3>
            <p>
              <FiMapPin /> {profile.location}
            </p>
          </div>
          <div className="ct-col">
            <h3>Resume</h3>
            <a href="./Aryan-Singh-Rajput-Resume.pdf" target="_blank" rel="noreferrer">
              <FiDownload /> <HoverLink>Download PDF</HoverLink>
            </a>
          </div>
        </div>

        <div className="ct-foot">
          <span className="cf-item">
            <i className="cf-dot" /> © {year} · All rights reserved
          </span>
          <span className="cf-item cf-mid">
            Crafted in Vadodara, India <b className="cf-time" />
          </span>
          <span className="cf-item cf-flow">
            Strategy <em>→</em> Code <em>→</em> Growth
          </span>
        </div>
      </div>
      <div className="ct-giant" aria-hidden>
        <span className="cg-line">
          <span className="cg-fill">BUILD</span>
          <i>✦</i>
          <span className="cg-fill">AUTOMATE</span>
          <i>✦</i>
          <span className="cg-fill">GROW</span>
        </span>
      </div>
    </footer>
  );
};

export default Contact;
