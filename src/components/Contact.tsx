import { useRef } from "react";
import { FiArrowUpRight, FiMail, FiMapPin, FiPhone, FiDownload } from "react-icons/fi";
import { gsap, SplitText, useGSAP } from "../lib/gsap";
import { profile, services, socials } from "../data/resume";
import HoverLink from "./HoverLink";
import "./styles/Contact.css";

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
      gsap.from(".ct-card", {
        y: 50,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: { trigger: ".ct-top", start: "top 80%", once: true },
      });
      return () => split.revert();
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
          <aside className="ct-card">
            <p className="ct-card-k">
              <i /> {profile.status}
            </p>
            <h3>
              Have a business problem? <em>Let's build the system for it.</em>
            </h3>
            <ul>
              {services.map((s) => (
                <li key={s.no}>
                  <span>{s.no}</span>
                  {s.title}
                </li>
              ))}
            </ul>
            <div className="ct-card-cta">
              <a href={`mailto:${profile.email}?subject=Project%20enquiry`} className="ct-btn">
                Start a project <FiArrowUpRight />
              </a>
              <a href={profile.phoneHref} className="ct-btn ghost">
                Call <FiPhone />
              </a>
            </div>
          </aside>
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
          <span>
            © {year} {profile.name}
          </span>
          {socials.length ? (
            <span className="ct-socials">
              {socials.map((s) => (
                <a key={s.label} href={s.url} target="_blank" rel="noreferrer">
                  {s.label}
                </a>
              ))}
            </span>
          ) : null}
        </div>
      </div>
      <div className="ct-giant" aria-hidden>
        ARYAN
      </div>
    </footer>
  );
};

export default Contact;
