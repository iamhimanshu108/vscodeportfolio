# Himanshu Yadav Portfolio

A responsive React + JavaScript portfolio presented as a VS Code-inspired workspace.

## Run locally

```sh
npm install
npm run dev
```

## Edit portfolio content

Update `src/data/portfolio.js` for the profile, contact and social links, projects, skills, experience, education, certificates, resume URL, and GitHub username. The page components read from this shared JavaScript file.

The GitHub page loads the public avatar, repository and follower counts, stars, forks, and recent repositories from the GitHub API. Change `profile.githubUsername` in the data file to use a different public account.

## Contact form

The contact form uses [Web3Forms](https://web3forms.com/) to deliver messages to the configured recipient. Set `VITE_WEB3FORMS_ACCESS_KEY` to your Web3Forms access key in `.env.local` for local development and in Vercel's project environment variables for deployments. Redeploy after changing the Vercel value. Vite embeds `VITE_` variables into client code, so this access key is public by design; use the key issued for your domain and configure its allowed domains in Web3Forms.

Web3Forms is a third-party service, so submissions are subject to its availability and plan limits. The form includes a honeypot field for basic spam filtering.
