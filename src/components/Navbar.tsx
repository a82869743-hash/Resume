import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { FiDownload, FiFileText, FiGithub, FiInstagram, FiLinkedin, FiMail, FiMapPin, FiPhone } from "react-icons/fi";

const SOCIAL_ICON: Record<string, JSX.Element> = {
  GitHub: <FiGithub />,
  LinkedIn: <FiLinkedin />,
  Instagram: <FiInstagram />,
};
import HoverLink from "./HoverLink";
import { useLoading } from "../context/LoadingProvider";
import { gsap, ScrollTrigger, scrollToId } from "../lib/gsap";
import { profile, socials } from "../data/resume";
import "./styles/Navbar.css";

const LINKS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "work", label: "Work" },
  { id: "career", label: "Experience" },
  { id: "contact", label: "Contact" },
];

const RESUME = "./Aryan-Singh-Rajput-Resume.pdf";

const Navbar = () => {
  const { loaded } = useLoading();
  const nav = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");
  const [hidden, setHidden] = useState(false);
  const [compact, setCompact] = useState(false);
  const [time, setTime] = useState("");
  const pill = useRef<HTMLDivElement>(null);
  const ind = useRef<HTMLSpanElement>(null);
  const fab = useRef<HTMLAnchorElement>(null);

  // Vadodara local time
  useEffect(() => {
    const f = () =>
      setTime(new Intl.DateTimeFormat("en-IN", { hour: "2-digit", minute: "2-digit", hour12: false, timeZone: "Asia/Kolkata" }).format(new Date()));
    f();
    const id = window.setInterval(f, 20000);
    return () => window.clearInterval(id);
  }, []);

  // hide on scroll down, show on scroll up; compact after the hero
  useEffect(() => {
    if (!loaded) return;
    const st = ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => {
        fab.current?.style.setProperty("--p", String(self.progress * 100));
        const y = self.scroll();
        setCompact(y > 80);
        setHidden(self.direction === 1 && y > window.innerHeight * 0.8);
      },
    });
    const sts = LINKS.map((l) =>
      ScrollTrigger.create({
        trigger: `#${l.id}`,
        start: "top 50%",
        end: "bottom 50%",
        onToggle: (self) => self.isActive && setActive(l.id),
      })
    );
    return () => {
      st.kill();
      sts.forEach((t) => t.kill());
    };
  }, [loaded]);

  // sliding active indicator
  useLayoutEffect(() => {
    const btn = pill.current?.querySelector<HTMLElement>(`[data-id="${active}"]`);
    if (!btn || !ind.current) return;
    gsap.to(ind.current, { x: btn.offsetLeft, width: btn.offsetWidth, duration: 0.55, ease: "expo.out" });
  }, [active, loaded]);

  useEffect(() => {
    if (!loaded) return;
    gsap.fromTo(
      ".nav-reveal",
      { y: -30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, stagger: 0.06, ease: "expo.out", delay: 0.8 }
    );
    gsap.fromTo(
      ".rail-reveal",
      { x: -30, opacity: 0 },
      { x: 0, opacity: 1, duration: 1, stagger: 0.08, ease: "expo.out", delay: 1.1 }
    );
    gsap.fromTo(".resume-fab", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: "expo.out", delay: 1.2 });
  }, [loaded]);

  const go = (id: string) => {
    setOpen(false);
    scrollToId(id);
  };

  return (
    <>
      <header className={`navbar ${open ? "is-open" : ""} ${hidden && !open ? "is-hidden" : ""} ${compact ? "is-compact" : ""}`} ref={nav}>
        <button className="nav-logo nav-reveal" onClick={() => go("home")} aria-label="Back to top">
          <span className="nav-mark" aria-hidden>
            <svg viewBox="0 0 48 48">
              <path className="nm-a" d="M7 41 L24 8 L41 41" />
              <path className="nm-bar" d="M14.5 29 H33.5" />
              <circle className="nm-dot" cx="24" cy="8" r="4.2" />
            </svg>
          </span>
          <span className="nav-who">
            <b>{profile.name}</b>
            <small>{profile.title}</small>
          </span>
        </button>

        <nav className="nav-pill nav-reveal" aria-label="Primary" ref={pill}>
          <span className="nav-ind" ref={ind} aria-hidden />
          {LINKS.map((l) => (
            <button key={l.id} data-id={l.id} className={active === l.id ? "on" : ""} onClick={() => go(l.id)}>
              {l.label}
            </button>
          ))}
        </nav>

        <div className="nav-right nav-reveal">
          <span className="nav-time" aria-label="Local time in Vadodara">
            <i /> Vadodara <b>{time}</b>
          </span>
          <a className="nav-talk" href={`mailto:${profile.email}?subject=Project%20enquiry`}>
            <span className="nav-live" aria-hidden />
            <HoverLink>Let's talk</HoverLink>
          </a>
        </div>
        <button
          className="nav-burger nav-reveal"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          <span />
          <span />
        </button>

        <div className="nav-sheet" aria-hidden={!open}>
          {LINKS.map((l, i) => (
            <button key={l.id} onClick={() => go(l.id)} style={{ transitionDelay: `${0.05 * i + 0.1}s` }}>
              <small>0{i + 1}</small>
              {l.label}
            </button>
          ))}
          <a href={RESUME} target="_blank" rel="noreferrer" className="nav-sheet-cta">
            Download Resume <FiFileText />
          </a>
          <a href={`mailto:${profile.email}`} className="nav-sheet-mail">
            {profile.email}
          </a>
        </div>
      </header>

      <aside className="side-rail" aria-label="Contact shortcuts">
        <span className="rail-label rail-reveal" aria-hidden>
          Let's connect
        </span>
        <span className="rail-line rail-reveal" aria-hidden />
        <div className="rail-dock rail-reveal">
        {socials.map((s) => (
          <a key={s.label} className="rail-btn" href={s.url} target="_blank" rel="noreferrer" aria-label={s.label} data-tip={s.label}>
            {SOCIAL_ICON[s.label]}
          </a>
        ))}
        <a className="rail-btn" href={`mailto:${profile.email}`} aria-label="Email Aryan" data-tip="Email">
          <FiMail />
        </a>
        <a className="rail-btn" href={profile.phoneHref} aria-label="Call Aryan" data-tip="Call">
          <FiPhone />
        </a>
        <a
          className="rail-reveal"
          href="https://www.google.com/maps/place/Vadodara,+Gujarat"
          target="_blank"
          rel="noreferrer"
          aria-label={profile.location}
          data-tip="Vadodara"
        >
          <FiMapPin />
        </a>
        </div>
      </aside>

      <a className="resume-fab" href={RESUME} target="_blank" rel="noreferrer" aria-label="Download CV" ref={fab}>
        <svg className="fab-ring" viewBox="0 0 60 60" aria-hidden>
          <circle cx="30" cy="30" r="27" className="fab-track" />
          <circle cx="30" cy="30" r="27" className="fab-prog" pathLength={100} />
        </svg>
        <span className="fab-ico">
          <FiDownload />
        </span>
        <span className="fab-label">Download CV</span>
      </a>
    </>
  );
};

export default Navbar;
