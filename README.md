# ResumeKit

ResumeKit is a browser-based resume builder. Create multiple resumes, edit ten sections with a live A4 preview, and download a searchable PDF with clickable links.

## Features

- Personal information and profile summary
- Experience and internships
- Skills, projects, and project links
- Education, certifications, languages, and volunteering
- Live preview and real PDF export through `@react-pdf/renderer`
- Multiple resume documents in a local browser library
- Light and charcoal dark themes

## Data storage

Resume data is stored in the current browser’s `localStorage`. There is no account or cloud sync. The library is available only in the browser and device where it was created. Download the PDF to keep a portable copy. Clearing site data in the browser removes saved resumes.

## Run locally

```bash
npm install
npm run dev
```

## Checks

```bash
npm run lint
npx tsc --noEmit
npm run build
```

## Production SEO setup

Set `NEXT_PUBLIC_SITE_URL` to the public site origin before deploying. It is used to generate canonical URLs, the sitemap, robots sitemap reference, and share metadata. `.env.example` shows the required format.

The public sitemap contains the home page, features page, and resume writing guide. The resume library and editor are marked `noindex` because they are user workspaces.
