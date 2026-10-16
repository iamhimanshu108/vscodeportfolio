# Himanshu Yadav Portfolio

A responsive React portfolio presented as a VS Code-inspired workspace.

## Getting started

```sh
npm install
cp .env.example .env.local
```

Add your Web3Forms access key to `.env.local`:

```env
VITE_WEB3FORMS_ACCESS_KEY=your_web3forms_access_key
```

Start the development server:

```sh
npm run dev
```

## Project commands

```sh
npm run build
npm run lint
npm run preview
```

## Portfolio content

Content is maintained in focused modules under `src/data/`:

- `profileData.js`: name, email, social URLs, resume URL, and GitHub username.
- `contactData.js`: social links shown on the Contact page.
- `projectsData.js`, `skillsData.js`, `experienceData.js`, `educationData.js`, and `certificatesData.js`: portfolio entries for each page.
- `homeData.js`, `aboutData.js`, and `navigationData.js`: home/about copy and workspace navigation.
- `githubData.js`: public GitHub and contribution API endpoints.

The GitHub page loads public profile and repository details from the GitHub API, plus contribution history from the configured contribution API. Set `profile.githubUsername` in `src/data/profileData.js` to use another account.

## Contact form

The form sends messages through [Web3Forms](https://web3forms.com/). Set `VITE_WEB3FORMS_ACCESS_KEY` in `.env.local` for local development and in your Vercel project environment variables for deployments. Select the environments where the form should work and redeploy after changing the variable.

Because Vite embeds `VITE_` variables in client code, this access key is public by design. Do not use it for private credentials. Web3Forms availability and plan limits apply; the form also includes a honeypot field for basic spam filtering.
