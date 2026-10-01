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

## Contact form to Google Sheets

1. Open the target spreadsheet and select **Extensions > Apps Script**.
2. Copy `google-apps-script/Code.gs` into the Apps Script editor and save.
3. Choose **Deploy > New deployment > Web app**. Set **Execute as** to your account and access to **Anyone**, then deploy and authorize it.
4. Copy the deployed web app URL into `.env.local` as `VITE_GOOGLE_SHEETS_ENDPOINT`, using `.env.example` as a template.
5. Restart the Vite server. Form submissions append timestamp, date, name, phone, email, and message to the `Sheet1` tab.

The web app URL is public so the portfolio can submit without Google sign-in. The Apps Script validates fields and includes a basic honeypot; it is not a substitute for stronger abuse protection if the form receives spam.
