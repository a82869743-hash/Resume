import type { ReactNode } from "react";
import {
  profile,
  competencies,
  experience,
  formatDates,
  education,
  projects,
  industries,
  skillGroups,
  socials,
  type Role,
} from "../data/resume";

const group = (t: string) => skillGroups.find((g) => g.title === t)?.items ?? [];

/* ---------- tiny inline icons (vector, print-crisp) ---------- */
const I = {
  phone: <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" />,
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z" />
      <circle cx="12" cy="10" r="2.5" />
    </>
  ),
};
const Icon = ({ d }: { d: ReactNode }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    {d}
  </svg>
);

const SideBlock = ({ title, children }: { title: string; children: ReactNode }) => (
  <section className="sb-block">
    <h3>{title}</h3>
    {children}
  </section>
);

const RoleBlock = ({ r }: { r: Role }) => (
  <article className="role">
    <span className="role-dot" />
    <header className="role-head">
      <div>
        <h4>{r.role.split(" - ")[0]}</h4>
        <p className="role-co">
          {r.company}
          {r.location ? <span> · {r.location}</span> : null}
        </p>
      </div>
      <span className="role-date">{formatDates(r)}</span>
    </header>
    {r.unit || r.role.includes(" - ") ? (
      <p className="role-unit">
        {[r.role.includes(" - ") ? r.role.split(" - ")[1] : null, r.unit].filter(Boolean).join(" · ")}
      </p>
    ) : null}
    <ul>
      {r.points.map((p) => (
        <li key={p}>{p}</li>
      ))}
    </ul>
  </article>
);

const Footer = ({ page }: { page: number }) => (
  <footer className="pg-foot">
    <span>
      {profile.name} — {profile.discipline}
    </span>
    <span>{page} / 2</span>
  </footer>
);

const ResumeDoc = () => {

  return (
    <div className="doc">
      {/* ================================================= PAGE 1 */}
      <div className="page">
        <header className="hero">
          <div className="hero-txt">
            <p className="hero-kicker">Curriculum Vitae</p>
            <h1>
              {profile.firstName} <span>{profile.lastName}</span>
            </h1>
            <p className="hero-role">
              {profile.title} <em>— {profile.discipline}</em>
            </p>
            <ul className="hero-contact">
              <li>
                <Icon d={I.phone} />
                {profile.phone}
              </li>
              <li>
                <Icon d={I.mail} />
                {profile.email}
              </li>
              <li>
                <Icon d={I.pin} />
                {profile.location}
              </li>
              {socials.map((x) => (
                <li key={x.label}>{x.url.replace(/^https?:\/\/(www\.)?/, "")}</li>
              ))}
            </ul>
          </div>
          <div className="hero-avatar">
            <img src="./images/aryan-avatar.webp" alt="Aryan Singh Rajput" />
          </div>
        </header>

        <div className="body">
          <aside className="side">
            <SideBlock title="At a glance">
              <dl className="glance">
                <div>
                  <dt>3+</dt>
                  <dd>Years building for clients</dd>
                </div>
                <div>
                  <dt>{projects.length}</dt>
                  <dd>Client projects</dd>
                </div>
                <div>
                  <dt>9</dt>
                  <dd>Business systems</dd>
                </div>
                <div>
                  <dt>{industries.length}</dt>
                  <dd>Industries</dd>
                </div>
              </dl>
            </SideBlock>
            <SideBlock title="Core competencies">
              <ul className="comp">
                {competencies.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            </SideBlock>
            <SideBlock title="Tech stack">
              {["Languages", "Frontend", "Backend", "Databases", "Cloud & Deploy"].map((t) => (
                <div className="stack" key={t}>
                  <p className="proj-h">{t}</p>
                  <p className="stack-t">{group(t).join(" · ")}</p>
                </div>
              ))}
            </SideBlock>
          </aside>

          <main className="main">
            <section className="sec">
              <h2>
                <span>01</span> Profile
              </h2>
              <p className="summary">{profile.summary}</p>
            </section>
            <section className="sec">
              <h2>
                <span>02</span> Professional experience
              </h2>
              <div className="timeline">
                {experience.slice(0, 2).map((r, i) => (
                  <RoleBlock r={r} key={i} />
                ))}
              </div>
            </section>
          </main>
        </div>
        <Footer page={1} />
      </div>

      {/* ================================================= PAGE 2 */}
      <div className="page">
        <header className="mini">
          <span className="mini-name">
            {profile.firstName} <b>{profile.lastName}</b>
          </span>
          <span className="mini-role">{profile.discipline}</span>
        </header>
        <div className="body">
          <aside className="side">
            <SideBlock title="Education">
              {education.map((e) => (
                <div className="edu" key={e.degree}>
                  <p className="edu-score">{e.score}</p>
                  <h4>{e.degree}</h4>
                  <p>{e.school}</p>
                  <p className="edu-period">{e.period}</p>
                </div>
              ))}
            </SideBlock>
            <SideBlock title="AI · Automation · Data">
              <p className="stack-t">{[...group("AI & ML"), ...group("Automation").slice(0, 2), ...group("Media & Maps").slice(0, 2)].join(" · ")}</p>
            </SideBlock>
            <SideBlock title="Marketing & business">
              <p className="stack-t">{[...group("Marketing"), ...group("Business")].join(" · ")}</p>
            </SideBlock>
            <SideBlock title="Industries">
              <ul className="comp">
                {industries.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
            </SideBlock>
          </aside>

          <main className="main">
            <section className="sec">
              <h2>
                <span>02</span> Experience <em>continued</em>
              </h2>
              <div className="timeline">
                {experience.slice(2).map((r, i) => (
                  <RoleBlock r={r} key={i} />
                ))}
              </div>
            </section>
            <section className="sec">
              <h2>
                <span>03</span> Selected projects
              </h2>
              <ul className="projs">
                {projects
                  .filter((p) => p.featured)
                  .map((p) => (
                    <li key={`${p.client}-${p.name}`}>
                      <b>
                        {p.client ? `${p.client} — ` : ""}
                        {p.name}
                      </b>
                      <span>{p.desc}</span>
                    </li>
                  ))}
              </ul>
            </section>
          </main>
        </div>
        <Footer page={2} />
      </div>
    </div>
  );
};

export default ResumeDoc;
