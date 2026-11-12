# Dikshant Singh Adhikari — Portfolio 2.0

Personal portfolio of a **Software Engineer – Frontend (UI/UX Design & Development)**. Focused on motion-rich interfaces, playful micro-interactions, and web experiences that feel alive.

**Live:** [dikshant.xyz](https://dikshant.xyz)

Built with Next.js 16, GSAP, Sanity CMS, and a fully integrated playground for interactive experiments.

## Features

- **Dynamic Hero** — Interactive typography with mouse-following image trails (`HeroTrail`).
- **Motion-first UI** — GSAP timelines, scroll-linked reveals, staggered work folders, and custom cursor.
- **Seamless Page Transitions** — View Transitions API for smooth navigation.
- **Project Showcase** — Work page with case studies, hover previews, and staggered folder animations.
- **Interactive Playground** — Creative coding experiments and UI snippets powered by Sanity CMS.
- **Snippet Detail Pages** — Live preview / code toggle, syntax highlighting, and Portable Text write-ups.
- **Sanity Studio** — Embedded at `/studio`; portfolio CSS isolated via route groups.
- **Open Graph & Twitter cards** — Dynamic `opengraph-image` / `twitter-image` routes (1200×630) themed to the site.
- **Custom Design System**
  - **Typography**: Big Shoulders Display (headings), PP Neue Montreal (body), PP Pangram Sans (UI), Playfair Display (accents), Geist Mono & Fira Code (code).
  - **Colour palette**: warm neutrals (`--base-100`–`--base-400`), orange (`--base-500`), yellow (`--base-600`), five accent colours.
  - **Aesthetics**: brutalist layout energy with refined motion.
- **Analytics** — Vercel Analytics.
- **Responsive** — Tuned across breakpoints; Turbopack in development.

## Tech Stack

| Layer | Technology |
| --- | --- |
| **Framework** | [Next.js 16](https://nextjs.org/) (App Router, Turbopack) |
| **Language** | React 19, JavaScript |
| **CMS** | [Sanity v5](https://www.sanity.io/) + `next-sanity` 12 |
| **Animation** | [GSAP](https://gsap.com/) + `@gsap/react`, `split-type` |
| **Smooth Scroll** | [Lenis](https://lenis.darkroom.engineering/) |
| **Styling** | Plain CSS, CSS custom properties, scoped component CSS |
| **Syntax Highlighting** | `react-syntax-highlighter` (Prism, One Dark) |
| **Rich Text** | `@portabletext/react` |
| **Icons** | `react-icons` |
| **Transitions** | `next-view-transitions` |
| **Analytics** | `@vercel/analytics` |
| **Deployment** | [Vercel](https://vercel.com/) |

## Getting Started

### Prerequisites

- Node.js 18+
- A Sanity project (free tier works)

### 1. Clone and install

```bash
git clone https://github.com/adhikari-dikshant/portfolio2.0.git
cd portfolio2.0
npm install
```

### 2. Environment variables

Create a `.env.local` at the project root:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_sanity_project_id
NEXT_PUBLIC_SANITY_DATASET=production
```

### 3. Run the dev server

```bash
npm run dev
```

- Portfolio: [http://localhost:3000](http://localhost:3000)
- Sanity Studio: [http://localhost:3000/studio](http://localhost:3000/studio)
- OG image preview: [http://localhost:3000/opengraph-image](http://localhost:3000/opengraph-image)

### 4. Build for production

```bash
npm run build && npm start
```

## Project Structure

```
src/
├── app/
│   ├── layout.js                  # Root metadata (title, description, OG/Twitter)
│   ├── opengraph-image.jsx        # Dynamic OG image (1200×630)
│   ├── twitter-image.jsx          # Twitter card image (re-exports OG)
│   ├── globals.css                # Global reset, custom properties, typography
│   ├── fonts.css                  # @font-face declarations
│   ├── (portfolio)/               # Route group — portfolio CSS + ClientLayout
│   │   ├── layout.js
│   │   ├── page.jsx               # Home
│   │   ├── work/                  # Project showcase + [slug] case studies
│   │   ├── playground/            # Experiments + [slug] snippet detail
│   │   └── contact/
│   ├── newtab-extension/          # Daily Workspace product page
│   └── studio/                    # Sanity Studio (no portfolio CSS)
├── components/                    # UI sections (HeroTrail, Menu, Projects, …)
├── hooks/
├── data/
│   └── projects.js                # Static project data
└── client-layout.js               # Lenis, Menu, CustomCursor

public/
└── fonts/og/                      # Static font files for OG image generation

sanity/
├── schemas/
└── lib/
```

## Social / OG

Sharing metadata is defined in `src/app/layout.js`. Images are generated at:

- `/opengraph-image`
- `/twitter-image`

Fonts for those routes live in `public/fonts/og/` (static TTFs — required by `next/og` / Satori).

After deploying a new OG design, refresh platform caches if previews look stale:

- [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/)
- [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)

## Key Design Decisions

- **Route groups** (`(portfolio)`) isolate portfolio chrome (Lenis, Menu, CustomCursor) from `/studio`.
- **PlaygroundItem / SnippetCard** share one card language; snippets render live iframes.
- **Snippet detail** uses a Preview / Code toggle instead of separate heavy sections.
- **Sanity** owns playground content; case studies stay in `src/data/projects.js`.

## License

[MIT](LICENSE)
