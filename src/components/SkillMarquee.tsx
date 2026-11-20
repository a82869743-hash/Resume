import Marquee from "react-fast-marquee";
import { competencies, industries } from "../data/resume";
import "./styles/SkillMarquee.css";

const rows = [competencies, industries];

const SkillMarquee = () => (
  <section className="skill-marquee" aria-label="Skills and industries">
    <div className="sm-label">
      <span className="eyebrow">What I do · Industries I've worked with</span>
    </div>
    {rows.map((row, r) => (
      <div className={`sm-row ${r ? "alt" : ""}`} key={r}>
        <Marquee speed={r ? 45 : 55} direction={r ? "right" : "left"} pauseOnHover autoFill>
          {row.map((c) => (
            <span className="sm-item" key={c}>
              {c}
              <i aria-hidden>✦</i>
            </span>
          ))}
        </Marquee>
      </div>
    ))}
  </section>
);

export default SkillMarquee;
