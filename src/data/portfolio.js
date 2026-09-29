export const profile = {
  name: "Himanshu Yadav",
  role: "Developer",
  eyebrow: "PERSONAL WORKSPACE",
  intro:
    "A space for the projects, notes, and experiences that shape my work. The collection is being assembled.",
  workspaceName: "HIMANSHU-PORTFOLIO",
  homeTitle: "Portfolio files",
  preview: {
    fileName: "profile.js",
    kind: "developer portfolio",
    status: "in progress",
    language: "JavaScript",
    encoding: "UTF-8",
  },
};

export const documents = [
  {
    id: "home",
    fileName: "home.jsx",
    title: "Portfolio",
    type: "react",
    shortDescription: "A personal workspace",
  },
  {
    id: "about",
    fileName: "about.md",
    title: "A little about me",
    type: "markdown",
    shortDescription: "Background and approach",
    description: "A short introduction to the person behind this workspace.",
    emptyTitle: "About details are on the way.",
    emptyDescription:
      "Personal background and a fuller introduction have not been added yet.",
  },
  {
    id: "projects",
    fileName: "projects.js",
    title: "Selected projects",
    type: "javascript",
    shortDescription: "Things I have worked on",
    description: "A collection of projects, experiments, and shipped work.",
    emptyTitle: "Project details have not been added yet.",
    emptyDescription:
      "Project descriptions and links will appear here when they are ready to share.",
  },
  {
    id: "experience",
    fileName: "experience.md",
    title: "Experience",
    type: "markdown",
    shortDescription: "Work and learning",
    description: "A concise timeline of roles, collaborations, and learning.",
    emptyTitle: "Experience details have not been added yet.",
    emptyDescription:
      "This section is reserved for verified roles, dates, and outcomes.",
  },
  {
    id: "contact",
    fileName: "contact.md",
    title: "Contact",
    type: "mail",
    shortDescription: "Ways to get in touch",
    description: "Contact details and profile links.",
    emptyTitle: "Contact links are not configured yet.",
    emptyDescription:
      "An email address or public profile can be added here when available.",
  },
];

export const portfolioPages = Object.fromEntries(
  documents
    .filter((document) => document.id !== "home")
    .map((document) => [document.id, document]),
);
