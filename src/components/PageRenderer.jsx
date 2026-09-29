import { AboutPage } from "../pages/AboutPage.jsx";
import { ContactPage } from "../pages/ContactPage.jsx";
import { ExperiencePage } from "../pages/ExperiencePage.jsx";
import { HomePage } from "../pages/HomePage.jsx";
import { ProjectsPage } from "../pages/ProjectsPage.jsx";

const pageComponents = {
  home: HomePage,
  about: AboutPage,
  projects: ProjectsPage,
  experience: ExperiencePage,
  contact: ContactPage,
};

export function PageRenderer({ pageId, onOpenDocument }) {
  const Page = pageComponents[pageId] ?? HomePage;
  return <Page onOpenDocument={onOpenDocument} />;
}
