import { MapPin } from "lucide-react";
import { education, experience, profile } from "../data/portfolio.js";

export function AboutPage() {
  const currentRole = experience[0];
  const currentEducation = education[0];
  const previousEducation = education[1];

  return (
    <article className="about-markdown-preview">
      <header className="about-markdown-header">
        <p className="about-markdown-eyebrow">ABOUT.md</p>
        <p className="about-markdown-comment">&lt;!-- personal profile / updated 2026 --&gt;</p>
        <h1>Who Am I<span>.</span></h1>
        <p className="about-markdown-summary">{profile.resumeSummary}</p>
        <p className="about-markdown-location"><MapPin size={14} aria-hidden="true" /><span>{profile.location}</span></p>
      </header>
      <hr />
      <section>
        <h2>What I work on</h2>
        <p>{profile.intro} My work spans full-stack web development, backend APIs, Generative AI and RAG integrations, and workflow automation. I have built with MERN, Python and FastAPI, and Java with Spring Boot.</p>
        <p className="about-markdown-specialization">{profile.bio[0]}</p>
      </section>
      <hr />
      <section className="about-markdown-columns">
        <div className="about-markdown-card">
          <h2>Current Role</h2>
          <h3>{currentRole.role}</h3>
          <p className="about-markdown-meta">{currentRole.company} <span>/</span> {currentRole.period}</p>
          <p>{currentRole.highlights[0]}</p>
        </div>
        <div className="about-markdown-card">
          <h2>Education</h2>
          <h3>{currentEducation.degree}</h3>
          <p className="about-markdown-meta">{currentEducation.institution} <span>/</span> {currentEducation.period}</p>
          <p>Previously completed a {previousEducation.degree} at {previousEducation.institution} ({previousEducation.period}).</p>
        </div>
      </section>
      <hr />
      <section>
        <h2>Areas of focus</h2>
        <ul className="about-focus-list">
          {profile.focus.map((focus) => <li key={focus}>{focus}</li>)}
        </ul>
        <p className="about-markdown-note"><strong>Focus:</strong> {profile.bio[1].replace("Focus: ", "")}</p>
        <p className="about-markdown-closing">Building practical systems where thoughtful engineering meets useful AI.</p>
      </section>
    </article>
  );
}
