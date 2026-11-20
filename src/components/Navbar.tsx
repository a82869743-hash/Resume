import { useEffect, useRef, useState } from "react";
import { FiFileText, FiGithub, FiInstagram, FiLinkedin, FiMail, FiMapPin, FiPhone } from "react-icons/fi";

const SOCIAL_ICON: Record<string, JSX.Element> = {
  GitHub: <FiGithub />,
  LinkedIn: <FiLinkedin />,
  Instagram: <FiInstagram />,
};
import HoverLink from "./HoverLink";
import { useLoading } from "../context/LoadingProvider";
import { gsap, scrollToId } from "../lib/gsap";
import { profile, socials } from "../data/resume";
import "./styles/Navbar.css";

const LINKS = [
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
      <header className={`navbar ${open ? "is-open" : ""}`} ref={nav}>
        <button className="nav-logo nav-reveal" onClick={() => go("home")} aria-label="Back to top">
          <span className="nav-initials">{profile.monogram}</span>
          <span className="nav-folder">
            <span>Portfolio</span>
          </span>
        </button>
        <a className="nav-mail nav-reveal" href={`mailto:${profile.email}`}>
          <HoverLink>{profile.email}</HoverLink>
        </a>
        <nav className="nav-links" aria-label="Primary">
          {LINKS.map((l) => (
            <button key={l.id} className="nav-reveal" onClick={() => go(l.id)}>
              <HoverLink>{l.label}</HoverLink>
            </button>
          ))}
        </nav>
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
        {socials.map((s) => (
          <a key={s.label} className="rail-reveal" href={s.url} target="_blank" rel="noreferrer" aria-label={s.label} data-tip={s.label}>
            {SOCIAL_ICON[s.label]}
          </a>
        ))}
        <a className="rail-reveal" href={`mailto:${profile.email}`} aria-label="Email Aryan" data-tip="Email">
          <FiMail />
        </a>
        <a className="rail-reveal" href={profile.phoneHref} aria-label="Call Aryan" data-tip="Call">
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
      </aside>

      <a className="resume-fab" href={RESUME} target="_blank" rel="noreferrer">
        <HoverLink>RESUME</HoverLink> <FiFileText />
      </a>
    </>
  );
};

export default Navbar;
