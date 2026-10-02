import { MapPin } from "lucide-react";
import { education, experience, profile } from "../data/portfolio.js";

export function AboutPage() {
  return (
    <section className="portfolio-page about-page">
      <h1>
        Who Am I<span className="title-period">.</span>
      </h1>
      <p className="page-lede about-summary text-[11px]">{profile.resumeSummary}</p>
      <div className="about-location">
        <MapPin size={15} />
        <span>{profile.location}</span>
      </div>
      <div className="page-rule" />
      <section className="about-work">
        <h2>What I work on</h2>
        <p className="text-[12px]">
          {profile.intro} My work spans full-stack web development, backend
          APIs, Generative AI and RAG integrations, and workflow automation. I
          have built with MERN, Python and FastAPI, and Java with Spring Boot.
        </p>
        <p className="text-[12px]">{profile.bio[0]}</p>
      </section>
      <div className="about-details">
        <section className="about-detail">
          <span className="about-detail-label">CURRENT ROLE</span>
          <h2>{experience[0].role}</h2>
          <p className="about-detail-meta text-[12px]">
            {experience[0].company} <span>/</span> {experience[0].period}
          </p>
          <p className="text-[12px]">{experience[0].highlights[0]}</p>
        </section>
        <section className="about-detail">
          <span className="about-detail-label">EDUCATION</span>
          <h2>{education[0].degree}</h2>
          <p className="about-detail-meta text-[12px]">
            {education[0].institution} <span>/</span> {education[0].period}
          </p>
          <p className="text-[12px]">
            Previously completed a {education[1].degree} at{" "}
            {education[1].institution} ({education[1].period}).
          </p>
        </section>
      </div>
      <div className="page-rule" />
      <div className="about-focus">
        <h2>Areas of focus</h2>
        <div className="focus-list focus-list-large text-[10px]">
          {profile.focus.map((focus) => (
            <span key={focus}>{focus}</span>
          ))}
        </div>
      </div>
      <div className="about-note">
        <span className="live-dot" />
        <div>
          {profile.bio.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
      </div>
    </section>
  );
}
