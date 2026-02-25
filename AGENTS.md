# AGENTS.md

## Cursor Cloud specific instructions

This is a Next.js 15 portfolio website ("Polite Chaos") — a purely frontend app with no backend, database, or environment variables.

### Running the app

- **Dev server:** `npm run dev` (port 3000)
- **Build:** `npm run build`
- See `README.md` for full getting-started instructions.

### Key caveats

- There are no linting or test scripts configured in `package.json`. The only available scripts are `dev`, `build`, and `start`.
- No `.env` files or secrets are required.
- The app uses GSAP animations, Lenis smooth scroll, and the View Transitions API — these are all client-side and require no special server configuration.
- Static assets (fonts, images) are served from `public/`. Local font files are in `public/fonts/`.
- Path alias `@/*` maps to `./src/*` (configured in `jsconfig.json`).
