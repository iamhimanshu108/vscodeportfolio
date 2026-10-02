import { ArrowUpRight, Award } from "lucide-react";
import { certificates } from "../data/portfolio.js";

export function CertificatesPage() {
  return (
    <section className="mx-auto w-full max-w-[900px] py-[17px] font-[var(--body)] text-[12px] text-[var(--text)] max-[760px]:pt-[13px] max-[520px]:py-[10px]">
      <div className="mb-[13px] font-[var(--mono)] text-[9px] tracking-[0.13em] text-[#78858d] max-[520px]:text-[8px]">LEARNING / CERTIFICATES</div>
      <h1 className="m-0 font-[var(--heading)] text-[clamp(31px,3.6vw,42px)] leading-[1.08] font-bold tracking-[-0.04em] text-[#e3e7eb]">
        Certificates<span className="text-[var(--accent)]">.</span>
      </h1>
      <p className="mt-[9px] max-w-[620px] text-[11px] leading-[1.7] text-[#9ba5ad] max-[520px]:text-[11px]">
        Courses and credentials across full-stack development and AI.
      </p>
      <div className="mt-[21px] grid border-t border-[#30363a]">
        {certificates.map((certificate) => (
          <article className="grid grid-cols-[34px_minmax(0,1fr)] gap-3 border-b border-[#30363a] py-[17px] max-[520px]:grid-cols-[28px_minmax(0,1fr)] max-[520px]:gap-[9px]" key={certificate.id}>
            <div className="grid h-[30px] w-[30px] place-items-center rounded border border-[#4a4331] bg-[#252219] text-[#d3b976] max-[520px]:h-[27px] max-[520px]:w-[27px]">
              <Award size={18} />
            </div>
            <div className="min-w-0">
              <div className="flex items-start justify-between gap-[10px]">
                <div>
                  <h2 className="m-0 text-[15px] leading-[1.5] font-medium text-[#dce1e5]">{certificate.title}</h2>
                  <p className="mt-1 text-[12px] text-[#849098]">
                    {certificate.issuer} <span className="px-1 text-[#59636a]">-</span> {certificate.issueDate}
                  </p>
                </div>
                <a
                  className="grid h-[27px] w-[27px] flex-none place-items-center rounded-[3px] border border-[#384044] text-[#a6d2cb] no-underline transition-colors hover:bg-[#26302f]"
                  href={certificate.certificateUrl}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`View ${certificate.title}`}
                  title="View certificate"
                >
                  <ArrowUpRight size={15} />
                </a>
              </div>
              <p className="mt-[9px] text-[13px] leading-[1.65] text-[#929ca4]">
                {certificate.description}
              </p>
              <div className="mt-2 flex flex-wrap gap-[5px]">
                {certificate.skills.map((skill) => (
                  <span className="inline-flex min-h-[20px] items-center rounded-[3px] border border-[#343b3e] bg-[#1b2021] px-[7px] py-[3px] font-[var(--mono)] text-[12px] text-[#a8b5b6]" key={skill}>{skill}</span>
                ))}
              </div>
              {certificate.credentialId && (
                <p className="mt-[9px] font-[var(--mono)] text-[11px] text-[#727e86]">
                  Credential ID <span className="ml-[5px] text-[#9ba5ad]">{certificate.credentialId}</span>
                </p>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
