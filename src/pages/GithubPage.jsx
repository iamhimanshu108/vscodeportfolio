import { useEffect, useState } from "react";
import {
  ArrowUpRight,
  ExternalLink,
  GitFork,
  GitBranch,
  Star,
} from "lucide-react";
import { profile } from "../data/portfolio.js";

const formatCount = (value) =>
  new Intl.NumberFormat("en", {
    notation: value > 9999 ? "compact" : "standard",
  }).format(value);

export function GithubPage() {
  const [github, setGithub] = useState(null);
  const [repositories, setRepositories] = useState([]);
  const [loadState, setLoadState] = useState("loading");

  useEffect(() => {
    const controller = new AbortController();
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
    return () => controller.abort();
  }, []);

  const stats = [
    { label: "Repositories", value: github?.public_repos, Icon: GitBranch },
    { label: "Followers", value: github?.followers, Icon: GitBranch },
    { label: "Total stars", value: github?.stars, Icon: Star },
    { label: "Total forks", value: github?.forks, Icon: GitFork },
  ];

  return (
    <section
      className="portfolio-page github-page"
      aria-busy={loadState === "loading"}
    >
      <div className="page-kicker">OPEN SOURCE / GITHUB</div>
      <div className="github-profile-head">
        {github?.avatar_url ? (
          <img
            className="github-avatar"
            src={github.avatar_url}
            alt={`${github.login} avatar`}
            referrerPolicy="no-referrer"
          />
        ) : (
          <div className="github-avatar github-avatar-fallback">
            <GitBranch size={25} />
          </div>
        )}
        <div className="github-identity">
          <h1>{github?.name || profile.name}</h1>
          <span>@{github?.login || profile.githubUsername}</span>
        </div>
        <a
          className="github-profile-link"
          href={profile.githubUrl}
          target="_blank"
          rel="noreferrer"
        >
          <GitBranch size={15} /> View Profile <ExternalLink size={12} />
        </a>
      </div>
      <div className="github-profile-rule" />
      <div className="github-stats">
        {stats.map(({ label, value, Icon }) => (
          <div className="github-stat" key={label}>
            <Icon size={16} />
            <strong>{value == null ? "--" : formatCount(value)}</strong>
            <span>{label}</span>
          </div>
        ))}
      </div>
      {loadState === "unavailable" && (
        <p className="github-api-note">
          Live GitHub stats could not be loaded. Visit the public profile for
          current activity.
        </p>
      )}
      <div className="github-activity-heading">
        <h2>Recent public repositories</h2>
        <a
          href={`${profile.githubUrl}?tab=repositories`}
          target="_blank"
          rel="noreferrer"
        >
          All repositories <ArrowUpRight size={13} />
        </a>
      </div>
      {loadState === "loading" && (
        <div className="github-loading">
          Loading public profile and repositories...
        </div>
      )}
      {loadState === "ready" && (
        <div className="github-repository-list">
          {repositories.map((repository) => (
            <a
              className="github-repository"
              href={repository.html_url}
              target="_blank"
              rel="noreferrer"
              key={repository.id}
            >
              <span className="repository-main">
                <strong>{repository.name}</strong>
                <small>{repository.description || "Public repository"}</small>
              </span>
              <span className="repository-language">
                {repository.language || "Code"}
              </span>
              <span className="repository-metric">
                <Star size={12} />
                {formatCount(repository.stargazers_count)}
              </span>
              <span className="repository-metric">
                <GitFork size={12} />
                {formatCount(repository.forks_count)}
              </span>
              <ArrowUpRight size={13} className="repository-arrow" />
            </a>
          ))}
        </div>
      )}
      <a
        className="github-contributions-link"
        href={`${profile.githubUrl}?tab=overview`}
        target="_blank"
        rel="noreferrer"
      >
        View contribution activity on GitHub <ArrowUpRight size={13} />
      </a>
    </section>
  );
}
