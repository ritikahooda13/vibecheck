# VIBECHECK — SINGHX LABS

A full-stack, bilingual personality quiz website with a Node.js/Express backend, SQLite database, and password-protected admin dashboard.

## Features
- Responsive landing page and quiz experience
- English / Hindi language toggle
- 8-question personality quiz with four outcomes
- Share result using native share sheet or clipboard fallback
- Quiz attempts saved to a local SQLite database
- Admin dashboard with total attempts, today's attempts, result breakdown, and recent attempts
- Rate limits on quiz submissions and admin login
- Admin password and session secret configured through environment variables

## Requirements
- Node.js 18 or newer
- npm

## Run locally
1. Extract the ZIP folder.
2. Open a terminal inside the extracted `vibecheck_fullstack` folder.
3. Install dependencies:
   ```bash
   npm install
   ```
4. Create your environment file:
   - Windows PowerShell: `Copy-Item .env.example .env`
   - macOS/Linux: `cp .env.example .env`
5. Open `.env` and change `SESSION_SECRET` and `ADMIN_PASSWORD`.
6. Start the website:
   ```bash
   npm start
   ```
7. Open `http://localhost:3000` in your browser.
8. Admin dashboard: `http://localhost:3000/admin`

## Important security and deployment notes
- Change the default admin password and session secret before using the site.
- The included SQLite database is stored in `data/vibecheck.sqlite` and is created automatically.
- For production hosting, choose a host with persistent disk storage if you keep SQLite. Some serverless hosts have ephemeral filesystems; in that case use a managed database such as PostgreSQL.
- Set `NODE_ENV=production` when deployed behind HTTPS so secure session cookies are enabled.
- Use HTTPS in production.
- This starter stores quiz answers but does not collect names, email addresses, or other direct identifiers.
- Add a privacy policy and cookie/session disclosure before a public launch.
- The project has not been penetration-tested or independently browser-tested. Review and test it before accepting public traffic.

## Project structure
- `server.js` — Express API, sessions, SQLite database, admin routes
- `public/index.html` — public website
- `public/styles.css` — responsive styling
- `public/app.js` — quiz logic and API integration
- `public/admin.html` — admin dashboard
- `.env.example` — configuration template
