import { MapPin } from "lucide-react";
import { education, experience, profile } from "../data/portfolio.js";

export function AboutPage() {
  return (
    <section className="mx-auto w-full max-w-[900px] py-[17px] font-[var(--body)] text-[11px] text-[var(--text)] max-[760px]:pt-[13px] max-[520px]:py-[10px]">
      <h1 className="m-0 font-[var(--heading)] text-[clamp(31px,3.6vw,42px)] leading-[1.08] font-bold tracking-[-0.04em] text-[#e3e7eb]">
        Who Am I<span className="text-[var(--accent)]">.</span>
      </h1>
      <p className="mt-[9px] max-w-[720px] text-[14px] leading-[1.7] text-[#9ba5ad] max-[520px]:text-[11px]">
        {profile.resumeSummary}
      </p>
      <div className="mt-[18px] flex flex-wrap items-center gap-2 text-[13px] text-[#8b969e]">
        <MapPin size={15} className="text-[var(--accent)]" />
        <span>{profile.location}</span>
      </div>
      <div className="my-[25px] h-px bg-[#30363a]" />
      <section className="max-w-[760px]">
        <h2 className="mb-[9px] text-[16px] font-medium text-[#d7dde1]">What I work on</h2>
        <p className="mt-2 leading-[1.75] text-[#9ba5ad] text-[13px]">
          {profile.intro} My work spans full-stack web development, backend
          APIs, Generative AI and RAG integrations, and workflow automation. I
          have built with MERN, Python and FastAPI, and Java with Spring Boot.
        </p>
        <p className="mt-2 leading-[1.75] text-[#9ba5ad] text-[13px]">{profile.bio[0]}</p>
      </section>
      <div className="mt-6 grid grid-cols-2 gap-[22px] border-y border-[#30363a] max-[520px]:grid-cols-1 max-[520px]:gap-0">
        <section className="min-w-0 py-[15px]">
          <span className="font-[var(--mono)] text-[10px] tracking-[0.1em] text-[#77858d]">CURRENT ROLE</span>
          <h2 className="mt-[7px] text-[15px] leading-[1.55] font-medium text-[#d8dfe2]">{experience[0].role}</h2>
          <p className="mt-1 font-[var(--mono)] text-[13px] text-[#9bcfc9]">
            {experience[0].company} <span className="px-[3px] text-[#5e696f]">/</span> {experience[0].period}
          </p>
          <p className="mt-2 leading-[1.75] text-[#9ba5ad] text-[12px]">{experience[0].highlights[0]}</p>
        </section>
        <section className="min-w-0 py-[15px]">
          <span className="font-[var(--mono)] text-[10px] tracking-[0.1em] text-[#77858d]">EDUCATION</span>
          <h2 className="mt-[7px] text-[14px] leading-[1.55] font-medium text-[#d8dfe2]">{education[0].degree}</h2>
          <p className="mt-1 font-[var(--mono)] text-[12px] text-[#9bcfc9]">
            {education[0].institution} <span className="px-[3px] text-[#5e696f]">/</span> {education[0].period}
          </p>
          <p className="mt-2 leading-[1.75] text-[#9ba5ad] text-[12px]">
            Previously completed a {education[1].degree} at{" "}
            {education[1].institution} ({education[1].period}).
          </p>
        </section>
      </div>
      <div className="my-[25px] h-px bg-[#30363a]" />
      <div>
        <h2 className="mb-0 text-[15px] font-medium text-[#d7dde1]">Areas of focus</h2>
        <div className="mt-3 flex flex-wrap gap-1.5 text-[10px]">
          {profile.focus.map((focus) => (
            <span className="inline-flex min-h-[27px] items-center rounded-[3px] border border-[#35534f] bg-[#1c2928] px-[9px] py-1 font-[var(--mono)] text-[#b7d9d3]" key={focus}>{focus}</span>
          ))}
        </div>
      </div>
      <div className="mt-7 flex items-start gap-[10px] border-t border-[#2d3337] pt-[15px] text-[12px] leading-[1.7] text-[#9ea7ae]">
        <span className="mt-[5px] inline-block h-[7px] w-[7px] shrink-0 rounded-full bg-[#85c692] shadow-[0_0_0_3px_#85c69220]" />
        <div className="min-w-0">
          {profile.bio.map((line) => (
            <p className="mt-2 first:mt-0" key={line}>{line}</p>
          ))}
        </div>
      </div>
    </section>
  );
}
