import { ArrowUpRight, ExternalLink, GitBranch } from "lucide-react";
import { projects } from "../data/portfolio.js";

export function ProjectsPage() {
  return (
    <section className="mx-auto w-full max-w-[900px] py-[17px] font-[var(--body)] text-[12px] text-[var(--text)] max-[760px]:pt-[13px] max-[520px]:py-[10px]">
      <div className="flex items-end justify-between gap-4 max-[520px]:items-start">
        <div>
          <h1 className="m-0 font-[var(--heading)] text-[clamp(31px,3.6vw,42px)] leading-[1.08] font-bold tracking-[-0.04em] text-[#e3e7eb]">
            Projects<span className="text-[var(--accent)]">.</span>
          </h1>
        </div>
        <span className="whitespace-nowrap pt-[9px] font-[var(--mono)] text-[12px] text-[#77828b] max-[520px]:text-[8px]">
          {String(projects.length).padStart(2, "0")} projects
        </span>
      </div>
      <div className="mt-5">
        {projects.map((project, index) => (
          <article
            className="grid grid-cols-2 items-center gap-8 border-b border-[#30363a] py-7 max-[760px]:grid-cols-1 max-[760px]:gap-4 max-[760px]:py-5"
            key={project.id}
          >
            <div className={`min-w-0 ${index % 2 ? "order-2 max-[760px]:order-1" : ""}`}>
              <div className="flex items-center justify-between">
                <span className="font-[var(--mono)] text-[10px] text-[#707c84]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="inline-flex items-center gap-[5px] font-[var(--mono)] text-[9px] uppercase text-[#94c7a0]">
                  <span className="h-[5px] w-[5px] rounded-full bg-[#78bf88]" />
                  {project.status}
                </span>
              </div>
              <h2 className="mt-3 mb-[6px] text-[17px] font-medium text-[#d9dfe3]">
                {project.title}
              </h2>
              <p className="m-0 text-[13px] leading-[1.65] text-[#929ca4]">
                {project.description}
              </p>
              <div className="mt-3 flex flex-wrap gap-[5px]">
                {project.technologies.map((technology) => (
                  <span
                    className="inline-flex min-h-[20px] items-center rounded-[3px] border border-[#343b3e] bg-[#1b2021] px-[7px] py-[3px] font-[var(--mono)] text-[10px] text-[#a8b5b6]"
                    key={technology}
                  >
                    {technology}
                  </span>
                ))}
              </div>
              <div className="mt-[13px] flex flex-wrap items-center gap-x-4 gap-y-2">
                <a
                  className="inline-flex items-center gap-[6px] text-[12px] text-[#a9d9d4] no-underline transition-colors hover:text-[#e1f4f1]"
                  href={project.repoUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  <GitBranch size={14} /> View source{" "}
                  <ArrowUpRight className="ml-[3px]" size={13} />
                </a>
                {project.liveUrl && (
                  <a
                    className="inline-flex items-center gap-[6px] text-[12px] text-[#a9d9d4] no-underline transition-colors hover:text-[#e1f4f1]"
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <ExternalLink size={14} /> Live{" "}
                    <ArrowUpRight size={13} />
                  </a>
                )}
              </div>
            </div>
            <img
              className={`aspect-[16/10] w-full rounded border border-[#30373b] object-cover ${index % 2 ? "order-1 max-[760px]:order-2" : "order-2"}`}
              src={project.imageUrl}
              alt={`${project.title} project preview`}
              loading="lazy"
            />
          </article>
        ))}
      </div>
    </section>
  );
}
