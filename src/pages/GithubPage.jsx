import { useEffect, useState } from "react";
import {
  ArrowUpRight,
  ExternalLink,
  Flame,
  GitFork,
  GitBranch,
  GitCommitHorizontal,
  Star,
} from "lucide-react";
import { profile } from "../data/portfolio.js";

const formatCount = (value) =>
  new Intl.NumberFormat("en", {
    notation: value > 9999 ? "compact" : "standard",
  }).format(value);

const getDateKey = (date) => date.toISOString().slice(0, 10);

function getCurrentStreak(contributions) {
  const countsByDate = new Map(
    contributions.map((contribution) => [
      contribution.date,
      contribution.count,
    ]),
  );
  const date = new Date();
  date.setUTCHours(0, 0, 0, 0);
  if ((countsByDate.get(getDateKey(date)) ?? 0) === 0) {
    date.setUTCDate(date.getUTCDate() - 1);
  }

  let streak = 0;
  while ((countsByDate.get(getDateKey(date)) ?? 0) > 0) {
    streak += 1;
    date.setUTCDate(date.getUTCDate() - 1);
  }
  return streak;
}

function groupContributionsByWeek(contributions) {
  const weeks = [];
  contributions.forEach((contribution) => {
    const weekday = new Date(`${contribution.date}T00:00:00Z`).getUTCDay();
    if (!weeks.length || weekday === 0) weeks.push(Array(7).fill(null));
    weeks[weeks.length - 1][weekday] = contribution;
  });
  return weeks;
}

const getMonthLabel = (week) => {
  const firstWeekOfMonth = week.find((day) => {
    if (!day) return false;
    return new Date(`${day.date}T00:00:00Z`).getUTCDate() <= 7;
  });
  return firstWeekOfMonth
    ? new Date(`${firstWeekOfMonth.date}T00:00:00Z`).toLocaleDateString("en", {
        month: "short",
        timeZone: "UTC",
      })
    : "";
};

const contributionCellColors = [
  "bg-[#24292f]",
  "bg-[#0e4429]",
  "bg-[#006d32]",
  "bg-[#26a641]",
  "bg-[#39d353]",
];

export function GithubPage() {
  const [github, setGithub] = useState(null);
  const [repositories, setRepositories] = useState([]);
  const [loadState, setLoadState] = useState("loading");
  const [contributions, setContributions] = useState([]);
  const [contributionTotal, setContributionTotal] = useState(null);
  const [contributionState, setContributionState] = useState("loading");

  useEffect(() => {
    const controller = new AbortController();
    const loadContributionData = async () => {
      try {
        const response = await fetch(
          `https://github-contributions-api.jogruber.de/v4/${profile.githubUsername}?y=last`,
          { signal: controller.signal },
        );
        if (!response.ok)
          throw new Error("Contribution history is unavailable");
        const data = await response.json();
        setContributions(data.contributions);
        setContributionTotal(data.total.lastYear);
        setContributionState("ready");
      } catch (error) {
        if (error.name !== "AbortError") setContributionState("unavailable");
      }
    };
    const loadGithubData = async () => {
      try {
        const headers = { Accept: "application/vnd.github+json" };
        const response = await fetch(
          `https://api.github.com/users/${profile.githubUsername}`,
          { headers, signal: controller.signal },
        );
        if (!response.ok) throw new Error("GitHub profile is unavailable");
        const account = await response.json();
        let nextUrl = `${account.repos_url}?per_page=100&sort=updated`;
        const allRepositories = [];
        while (nextUrl && allRepositories.length < 1000) {
          const repositoryResponse = await fetch(nextUrl, {
            headers,
            signal: controller.signal,
          });
          if (!repositoryResponse.ok)
            throw new Error("GitHub repositories are unavailable");
          allRepositories.push(...(await repositoryResponse.json()));
          const linkHeader = repositoryResponse.headers.get("Link") ?? "";
          const nextLink = linkHeader
            .split(",")
            .find((link) => link.includes('rel="next"'));
          nextUrl = nextLink?.match(/<([^>]+)>/)?.[1] ?? "";
        }
        allRepositories.sort(
          (first, second) =>
            new Date(second.pushed_at ?? second.updated_at) -
            new Date(first.pushed_at ?? first.updated_at),
        );
        setGithub({
          ...account,
          stars: allRepositories.reduce(
            (total, repository) => total + repository.stargazers_count,
            0,
          ),
          forks: allRepositories.reduce(
            (total, repository) => total + repository.forks_count,
            0,
          ),
        });
        setRepositories(allRepositories.slice(0, 5));
        setLoadState("ready");
      } catch (error) {
        if (error.name !== "AbortError") setLoadState("unavailable");
      }
    };
    loadGithubData();
    loadContributionData();
    return () => controller.abort();
  }, []);

  const contributionWeeks = groupContributionsByWeek(contributions);
  const currentStreak =
    contributionState === "ready" ? getCurrentStreak(contributions) : null;

  const stats = [
    { label: "Repositories", value: github?.public_repos, Icon: GitBranch },
    { label: "Followers", value: github?.followers, Icon: GitBranch },
    { label: "Total stars", value: github?.stars, Icon: Star },
    { label: "Total forks", value: github?.forks, Icon: GitFork },
    {
      label: "Contributions (1Y)",
      value: contributionTotal,
      Icon: GitCommitHorizontal,
      title: "GitHub calendar contributions, including more than commits",
    },
    {
      label: "Current streak",
      value: currentStreak,
      suffix: currentStreak == null ? "" : "days",
      Icon: Flame,
    },
  ];

  return (
    <section
      className="mx-auto w-full max-w-[900px] py-[17px] font-[var(--body)] text-[12px] text-[var(--text)] max-[760px]:pt-[7px] max-[520px]:py-[10px]"
      aria-busy={loadState === "loading"}
    >
      <div className="mt-[19px] flex items-center gap-[14px] max-[760px]:gap-[9px] max-[520px]:gap-[9px]">
        {github?.avatar_url ? (
          <img
            className="h-[58px] w-[58px] flex-none rounded-full border-2 border-[#73998f] bg-[#21282a] object-cover max-[760px]:h-12 max-[760px]:w-12 max-[760px]:basis-12 max-[520px]:h-10 max-[520px]:w-10 max-[520px]:basis-10"
            src={github.avatar_url}
            alt={`${github.login} avatar`}
            referrerPolicy="no-referrer"
          />
        ) : (
          <div className="grid h-[58px] w-[58px] flex-none place-items-center rounded-full border-2 border-[#73998f] bg-[#21282a] text-[#a9d5cd] max-[760px]:h-12 max-[760px]:w-12 max-[760px]:basis-12 max-[520px]:h-10 max-[520px]:w-10 max-[520px]:basis-10">
            <GitBranch size={25} />
          </div>
        )}
        <div className="min-w-0">
          <h1 className="wrap-anywhere font-[var(--mono)] text-[20px] font-semibold text-[#e3e7eb] max-[760px]:text-base max-[520px]:text-[13px]">{github?.name || profile.name}</h1>
          <span className="mt-1 block font-[var(--mono)] text-[11px] text-[#8b969f] max-[520px]:text-[9px]">@{github?.login || profile.githubUsername}</span>
        </div>
        <a
          className="ml-auto inline-flex items-center gap-[7px] whitespace-nowrap rounded border border-[#3b4746] bg-[#26312f] px-[11px] py-2 font-[var(--mono)] text-[10px] text-[#d7e8e5] no-underline transition-colors hover:border-[#5c817a] hover:bg-[#2c3d39] max-[760px]:gap-[5px] max-[760px]:p-[7px] max-[760px]:text-[9px] max-[760px]:[&>svg:last-child]:hidden max-[520px]:gap-1 max-[520px]:p-[6px] max-[520px]:text-[8px] max-[520px]:[&>svg:first-child]:w-[13px]"
          href={profile.githubUrl}
          target="_blank"
          rel="noreferrer"
        >
          <GitBranch size={15} /> View Profile <ExternalLink size={12} />
        </a>
      </div>
      <div className="my-3 mb-4 h-px bg-[#30363a]" />
      <div className="grid grid-cols-6 gap-[9px] max-[760px]:grid-cols-3 max-[760px]:gap-[6px] max-[520px]:grid-cols-2">
        {stats.map(({ label, value, Icon, title, suffix }) => (
          <div className="flex min-h-[94px] min-w-0 flex-col items-center justify-center gap-2 rounded border border-[#30383b] bg-[#191d1f] max-[760px]:min-h-[82px] max-[760px]:gap-[6px] max-[520px]:min-h-[72px]" key={label} title={title}>
            <Icon className="text-[#a1c9be]" size={16} />
            <strong className="font-[var(--mono)] text-[23px] font-semibold text-[#e1e6e8] max-[760px]:text-[19px] max-[520px]:text-[17px]">{value == null ? "--" : formatCount(value)}</strong>
            <span className="text-center font-[var(--mono)] text-[8px] tracking-[0.07em] text-[#879198] uppercase max-[760px]:text-[7px]">
              {label}
              {suffix ? ` / ${suffix}` : ""}
            </span>
          </div>
        ))}
      </div>
      {loadState === "unavailable" && (
        <p className="mt-[11px] text-[10px] leading-[1.6] text-[#d7b97c]">
          Live GitHub stats could not be loaded. Visit the public profile for
          current activity.
        </p>
      )}
      <section
        className="mt-[18px] rounded border border-[#30383b] bg-[#171a1c] px-[13px] pt-3 pb-[10px]"
        aria-label="GitHub contributions in the last year"
      >
        <div className="mb-3 flex items-center justify-between gap-3">
          <h2 className="m-0 font-[var(--mono)] text-[11px] font-semibold tracking-[0.04em] text-[#d3d9de] uppercase">Contribution activity / last year</h2>
          {contributionState === "ready" && (
            <span className="font-[var(--mono)] text-[9px] text-[#86929a]">{formatCount(contributionTotal)} total</span>
          )}
        </div>
        {contributionState === "loading" && (
          <div className="py-[19px] font-[var(--mono)] text-[10px] text-[#818c94]">Loading contribution history...</div>
        )}
        {contributionState === "unavailable" && (
          <p className="mt-[11px] text-[10px] leading-[1.6] text-[#d7b97c]">
            Contribution history could not be loaded. View the activity on
            GitHub.
          </p>
        )}
        {contributionState === "ready" && (
          <div className="overflow-x-auto pb-[3px] [scrollbar-color:#394144_transparent] [scrollbar-width:thin]">
            <div
              className="w-full min-w-[676px]"
              style={{ "--week-count": contributionWeeks.length }}
            >
              <div className="relative block h-[15px] w-full font-[var(--mono)] text-[8px] text-[#818c94]" aria-hidden="true">
                {contributionWeeks.map((week, index) => {
                  const month = getMonthLabel(week);
                  const previousMonth =
                    index > 0
                      ? getMonthLabel(contributionWeeks[index - 1])
                      : "";
                  return month && month !== previousMonth ? (
                    <span className="absolute top-0 whitespace-nowrap" key={index} style={{ left: `${index * 13}px` }}>
                      {month}
                    </span>
                  ) : null;
                })}
              </div>
              <div
                className="flex w-full items-start gap-[3px]"
                role="img"
                aria-label={`${contributionTotal} GitHub contributions during the last year`}
              >
                {contributionWeeks.map((week, weekIndex) => (
                  <div className="grid min-w-[7px] flex-[1_1_0] grid-rows-[repeat(7,10px)] gap-[3px]" key={weekIndex}>
                    {week.map((day, dayIndex) => (
                      <span
                        className={`block h-[10px] w-full rounded-[2px] ${contributionCellColors[day?.level ?? 0]}`}
                        title={
                          day
                            ? `${day.count} contributions on ${day.date}`
                            : "No contribution data"
                        }
                        key={day?.date ?? `${weekIndex}-${dayIndex}`}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>
            <div
              className="mt-[9px] flex items-center justify-end gap-1 font-[var(--mono)] text-[8px] text-[#818c94]"
              aria-label="Contribution intensity legend"
            >
              <span>Less</span>
              {[0, 1, 2, 3, 4].map((level) => (
                <i className={`block h-[9px] w-[9px] rounded-[2px] ${contributionCellColors[level]}`} key={level} />
              ))}
              <span>More</span>
            </div>
          </div>
        )}
      </section>
      <div className="mt-[25px] flex items-center justify-between gap-3">
        <h2 className="m-0 font-[var(--mono)] text-[11px] font-semibold tracking-[0.04em] text-[#d3d9de] uppercase max-[520px]:text-[9px]">Recent public repositories</h2>
        <a
          className="inline-flex items-center gap-1 whitespace-nowrap text-[9px] text-[#91c5bc] no-underline hover:text-[#d2eae5] max-[520px]:text-[8px]"
          href={`${profile.githubUrl}?tab=repositories`}
          target="_blank"
          rel="noreferrer"
        >
          All repositories <ArrowUpRight size={13} />
        </a>
      </div>
      {loadState === "loading" && (
        <div className="py-[19px] font-[var(--mono)] text-[10px] text-[#818c94]">
          Loading public profile and repositories...
        </div>
      )}
      {loadState === "ready" && (
        <div className="mt-[10px] border-t border-[#30363a]">
          {repositories.map((repository) => (
            <a
              className="flex min-h-[54px] min-w-0 items-center gap-[13px] border-b border-[#30363a] px-[2px] py-2 text-[#aeb7be] no-underline transition-colors hover:bg-[#191e20] max-[760px]:[&>.repository-language]:hidden max-[520px]:gap-2 max-[520px]:[&>.repository-arrow]:hidden"
              href={repository.html_url}
              target="_blank"
              rel="noreferrer"
              key={repository.id}
            >
              <span className="flex min-w-0 flex-1 flex-col gap-1">
                <strong className="overflow-hidden font-[var(--mono)] text-[10px] text-ellipsis whitespace-nowrap text-[#b9d9d2]">{repository.name}</strong>
                <small className="max-w-full overflow-hidden text-[9px] text-ellipsis whitespace-nowrap text-[#808b93] max-[520px]:max-w-[190px]">{repository.description || "Public repository"}</small>
              </span>
              <span className="min-w-[60px] text-[9px] text-[#8c969d]">
                {repository.language || "Code"}
              </span>
              <span className="inline-flex items-center gap-1 font-[var(--mono)] text-[9px] text-[#8e9aa1] max-[520px]:text-[8px]">
                <Star className="text-[#c5ae75]" size={12} />
                {formatCount(repository.stargazers_count)}
              </span>
              <span className="inline-flex items-center gap-1 font-[var(--mono)] text-[9px] text-[#8e9aa1] max-[520px]:text-[8px]">
                <GitFork className="text-[#c5ae75]" size={12} />
                {formatCount(repository.forks_count)}
              </span>
              <ArrowUpRight size={13} className="text-[#77828a]" />
            </a>
          ))}
        </div>
      )}
      <a
        className="mt-[14px] inline-flex items-center gap-1 text-[9px] text-[#91c5bc] no-underline hover:text-[#d2eae5]"
        href={`${profile.githubUrl}?tab=overview`}
        target="_blank"
        rel="noreferrer"
      >
        View contribution activity on GitHub <ArrowUpRight size={13} />
      </a>
    </section>
  );
}
