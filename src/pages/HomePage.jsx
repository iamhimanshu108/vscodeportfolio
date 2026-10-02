import { Braces, Download, FileText } from "lucide-react";
import { profile } from "../data/portfolio.js";

export function HomePage({ onOpenDocument }) {
  return (
    <>
      <div className="mb-5 font-[var(--mono)] text-[12px] leading-5 text-[#8c949d] max-[760px]:mb-[15px] [@media(max-height:650px)_and_(min-width:761px)]:mb-3">
        <span className="text-[#d2a0c7]">const</span>{" "}
        <span className="text-[#9bc6ee]">developer</span>{" "}
        <span className="text-[#7d8790]">=</span>{" "}
        <span className="text-[#e0bd75]">{"{"}</span>
      </div>
      <div className="grid grid-cols-[minmax(0,1.2fr)_minmax(260px,0.8fr)] items-center gap-[clamp(28px,5vw,76px)] text-[12px] max-[980px]:grid-cols-[minmax(0,1fr)_minmax(230px,0.8fr)] max-[980px]:gap-[26px] max-[760px]:grid-cols-1 max-[760px]:gap-6">
        <section className="py-1 pb-[10px] text-[12px] max-[760px]:pt-[5px]">
          <h1 className="mt-[22px] mb-1 text-[clamp(34px,4vw,52px)] leading-[1.1] font-semibold tracking-normal text-[#e7e9ec] max-[520px]:mt-[18px] max-[520px]:text-[clamp(33px,10vw,42px)]">
            {profile.name}
            <span className="text-[var(--accent)]">.</span>
          </h1>
          <p className="font-[var(--mono)] text-[15px] text-[#9ba4ad]">{profile.role}</p>
          <p className="mt-5 max-w-[450px] text-[16px] leading-[1.8] text-[#a3abb4] max-[520px]:text-[13px]">{profile.intro}</p>
          <div className="mt-[14px] flex flex-wrap gap-1.5">
            {profile.focus.map((focus) => (
              <span className="inline-flex min-h-[22px] items-center rounded-[3px] border border-[#343b3e] bg-[#1b2021] px-[7px] py-[3px] font-[var(--mono)] text-[9px] text-[#a8b5b6]" key={focus}>{focus}</span>
            ))}
          </div>
          <div className="mt-[26px] flex flex-wrap gap-[9px] max-[520px]:mt-5">
            <a className="inline-flex min-h-[34px] items-center justify-center gap-2 rounded-[3px] border border-[#367e79] bg-[#286a65] px-[11px] text-[11px] font-medium text-[#e2f7f4] no-underline transition hover:-translate-y-px hover:border-[#59aaa2] hover:bg-[#327d77] max-[520px]:text-[10px]" href={profile.resumeUrl} target="_blank" rel="noreferrer">
              <Download size={15} /> Resume
            </a>
            <button className="inline-flex min-h-[34px] items-center justify-center gap-2 rounded-[3px] border border-[#3d4348] bg-[#202326] px-[11px] text-[10px] font-medium text-[#bbc2c9] transition hover:-translate-y-px hover:border-[#606a72] hover:bg-[#2a2e32] max-[520px]:text-[10px]" onClick={() => onOpenDocument("about")}>
              <FileText size={15} /> Who Am I
            </button>
          </div>
        </section>
        <div className="max-w-full overflow-hidden rounded-[5px] border border-[#343a3e] bg-[#17191b] shadow-[0_14px_34px_#00000020] max-[760px]:max-w-[440px]" aria-label="Portfolio profile object">
          <div className="flex min-h-[34px] items-center justify-between border-b border-[#2c3134] bg-[#1d2022] px-3 font-[var(--mono)] text-[10px] text-[#7c858d]">
            <div className="mr-auto flex gap-1">
              <i className="h-[6px] w-[6px] rounded-full bg-[#bc746d]" />
              <i className="h-[6px] w-[6px] rounded-full bg-[#b89d5e]" />
              <i className="h-[6px] w-[6px] rounded-full bg-[#6ba77c]" />
            </div>
            <span className="mx-auto translate-x-[-11px]">{profile.preview.fileName}</span>
            <Braces size={15} />
          </div>
          <div className="overflow-x-auto px-[13px] pt-[15px] pb-[11px] font-[var(--mono)] text-[10px] leading-[2.15] whitespace-nowrap text-[#aeb6bf] max-[520px]:px-[7px] max-[520px]:text-[9px] [&>div:not(.code-cursor-row)]:block [&>div:not(.code-cursor-row)]:w-0 [&>div:not(.code-cursor-row)]:overflow-hidden [&>div:not(.code-cursor-row)]:whitespace-nowrap [&>div:not(.code-cursor-row)]:animate-type-code-line [&>div:nth-child(2)]:[animation-delay:1.6s] [&>div:nth-child(3)]:[animation-delay:3.2s] [&>div:nth-child(4)]:[animation-delay:4.8s] [&>div:nth-child(5)]:[animation-delay:6.4s]">
            <div className="min-h-[21px]">
              <span className="inline-block w-7 select-none pr-[11px] text-right text-[#5c646c] max-[520px]:w-[25px] max-[520px]:pr-2">01</span>
              <span className="text-[#d2a0c7]">export const</span>{" "}
              <span className="text-[#9bc6ee]">profile</span>{" "}
              <span className="text-[#7d8790]">=</span>{" "}
              <span className="text-[#e0bd75]">{"{"}</span>
            </div>
            <div className="min-h-[21px]">
              <span className="inline-block w-7 select-none pr-[11px] text-right text-[#5c646c] max-[520px]:w-[25px] max-[520px]:pr-2">02</span>
              <span className="text-[#a6c9e7]">name</span>
              <span className="text-[#7d8790]">:</span>{" "}
              <span className="text-[#d6ac86]">'{profile.name}'</span>
              <span className="text-[#7d8790]">,</span>
            </div>
            <div className="min-h-[21px]">
              <span className="inline-block w-7 select-none pr-[11px] text-right text-[#5c646c] max-[520px]:w-[25px] max-[520px]:pr-2">03</span>
              <span className="text-[#a6c9e7]">type</span>
              <span className="text-[#7d8790]">:</span>{" "}
              <span className="text-[#d6ac86]">'{profile.preview.kind}'</span>
              <span className="text-[#7d8790]">,</span>
            </div>
            <div className="min-h-[21px]">
              <span className="inline-block w-7 select-none pr-[11px] text-right text-[#5c646c] max-[520px]:w-[25px] max-[520px]:pr-2">04</span>
              <span className="text-[#a6c9e7]">status</span>
              <span className="text-[#7d8790]">:</span>{" "}
              <span className="text-[#d6ac86]">'{profile.preview.status}'</span>
            </div>
            <div className="min-h-[21px]">
              <span className="inline-block w-7 select-none pr-[11px] text-right text-[#5c646c] max-[520px]:w-[25px] max-[520px]:pr-2">05</span>
              <span className="text-[#e0bd75]">{"}"}</span>
            </div>
            <div className="flex min-h-[21px] items-center">
              <span className="inline-block w-7 select-none pr-[11px] text-right text-[#5c646c] max-[520px]:w-[25px] max-[520px]:pr-2">06</span>
              <span className="h-[13px] w-[7px] bg-[var(--accent)] animate-cursor-blink" />
            </div>
          </div>
          <div className="flex min-h-[29px] items-center justify-between border-t border-[#2c3134] bg-[#1d2022] px-3 font-[var(--mono)] text-[9px] text-[#7c858d]">
            <span className="flex items-center gap-[6px]">
              <span className="h-[6px] w-[6px] rounded-full bg-[var(--accent)]" /> {profile.preview.language}
            </span>
            <span>{profile.preview.encoding}</span>
          </div>
        </div>
      </div>
      <div className="my-[30px] mb-[25px] flex items-center gap-[14px] font-[var(--mono)] text-[15px] text-[#d4b46d] max-[760px]:my-[25px] max-[760px]:mb-5 [@media(max-height:650px)_and_(min-width:761px)]:my-5 [@media(max-height:650px)_and_(min-width:761px)]:mb-4">
        <span>{"}"}</span>
        <i className="h-px flex-1 bg-gradient-to-r from-[#343a3e] to-transparent" />
      </div>
      <div className="font-[var(--mono)] text-[12px] text-[#8c949d]">
        <span className="text-[#d2a0c7]">export default</span>{" "}
        <span className="text-[#9bc6ee]">developer</span>
        <span className="text-[#7d8790]">;</span>
        <span className="float-right text-[9px] tracking-[0.12em] text-[#74828a]">END OF FILE</span>
      </div>
    </>
  );
}
