import { Braces, Code2, Database, GitBranch, Layers3, Server, Sparkles } from "lucide-react";
import { skills } from "../data/portfolio.js";

export function SkillsPage() {
  return (
    <section className="mx-auto w-full max-w-[900px] py-[17px] font-[var(--body)] text-[12px] text-[var(--text)] max-[760px]:pt-[13px] max-[520px]:py-[10px]">
      <h1 className="m-0 font-[var(--heading)] text-[clamp(31px,3.6vw,42px)] leading-[1.08] font-bold tracking-[-0.04em] text-[#e3e7eb] max-[520px]:text-[32px]">
        Skills<span className="text-[var(--accent)]">.</span>
      </h1>
      <div className="mt-[22px] grid grid-cols-2 gap-x-5 border-t border-[#30363a] max-[520px]:mt-[18px] max-[520px]:grid-cols-1 max-[520px]:gap-0">
        {skills.map((category, index) => (
          <section className="min-w-0 border-b border-[#30363a] py-4 max-[520px]:py-[14px]" key={category.id}>
            <div className="flex items-center gap-2 text-[11px]">
              <span className="grid h-6 w-6 place-items-center rounded-[3px] border border-[#334a47] bg-[#1c2625] text-[var(--accent)]">
                {index % 2 ? <Layers3 size={15} /> : <Code2 size={15} />}
              </span>
              <h2 className="m-0 text-[11px] font-medium text-[#d2d9de] max-[520px]:text-[10px]">{category.title}</h2>
            </div>
            <div className="mt-[10px] flex flex-wrap gap-[5px] max-[520px]:mt-[9px]">
              {category.items.map((item) => (
                <span className="inline-flex min-h-[22px] max-w-full items-center gap-[5px] rounded-[3px] border border-[#343b3e] bg-[#1b2021] px-[7px] py-[3px] font-[var(--mono)] text-[9px] text-[#a8b5b6] max-[520px]:px-[6px] max-[520px]:py-1" key={item}>
                  {index === 2 ? <Database className="shrink-0 text-[var(--accent)] max-[520px]:h-[10px] max-[520px]:w-[10px]" size={11} /> : index === 1 ? <Server className="shrink-0 text-[var(--accent)] max-[520px]:h-[10px] max-[520px]:w-[10px]" size={11} /> : index === 3 ? <GitBranch className="shrink-0 text-[var(--accent)] max-[520px]:h-[10px] max-[520px]:w-[10px]" size={11} /> : index === 4 ? <Sparkles className="shrink-0 text-[var(--accent)] max-[520px]:h-[10px] max-[520px]:w-[10px]" size={11} /> : <Braces className="shrink-0 text-[var(--accent)] max-[520px]:h-[10px] max-[520px]:w-[10px]" size={11} />}
                  {item}
                </span>
              ))}
            </div>
          </section>
        ))}
      </div>
    </section>
  );
}
