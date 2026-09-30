# anmolbajpai.com

Personal site. Editorial, typography-led, hand-built with Vite + React +
TypeScript. Warm-paper light theme with a dark mode. No template.

## Develop

```
npm install
npm run dev
```

## Add a log entry (the 2-minute job)

1. Create `src/content/log/day-05.md` (copy an existing file as a starting
   point). Frontmatter:

   ```
   ---
   day: 5
   slug: day-5
   title: Whatever actually happened
   date: 2026-07-XX
   summary: One sentence for the index page.
   ---
   ```

2. Write the body in Markdown below the frontmatter. Tables, code blocks, and
   blockquotes are styled.
3. `git add`, `git commit`, `git push` — the GitHub Action builds and deploys
   automatically. The home-page "Now" day counter follows the newest entry.

## Update the resume

Replace `public/Anmol_Bajpai_Resume.pdf` (keep the filename) and push.

## Deploy notes

- Deployment is the `.github/workflows/deploy.yml` action: build on push to
  `main`, publish `dist/` to GitHub Pages. In the repo settings, Pages must be
  set to "GitHub Actions" as the source (one-time setting).
- `404.html` is a copy of `index.html` so deep links (`/log/day-4`) load the
  app directly.
