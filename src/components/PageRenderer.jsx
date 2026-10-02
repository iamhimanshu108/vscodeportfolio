import { AboutPage } from "../pages/AboutPage.jsx";
import { CertificatesPage } from "../pages/CertificatesPage.jsx";
import { ContactPage } from "../pages/ContactPage.jsx";
import { EducationPage } from "../pages/EducationPage.jsx";
import { ExperiencePage } from "../pages/ExperiencePage.jsx";
import { GithubPage } from "../pages/GithubPage.jsx";
import { HomePage } from "../pages/HomePage.jsx";
import { ProjectsPage } from "../pages/ProjectsPage.jsx";
import { ResumePage } from "../pages/ResumePage.jsx";
import { SkillsPage } from "../pages/SkillsPage.jsx";

const pageComponents = {
  home: HomePage,
  about: AboutPage,
  projects: ProjectsPage,
  experience: ExperiencePage,
  skills: SkillsPage,
  education: EducationPage,
  certificates: CertificatesPage,
  github: GithubPage,
  contact: ContactPage,
  resume: ResumePage,
};

export function PageRenderer({ pageId, onOpenDocument }) {
  const Page = pageComponents[pageId] ?? HomePage;
  return <Page onOpenDocument={onOpenDocument} />;
}
