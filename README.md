# Creative Portfolio 2.0

A personal portfolio website exploring the intersection of structure and creative chaos. Built with Next.js 16, GSAP, Sanity CMS, and a focus on micro-interactions, typographic hierarchy, and a fully integrated playground for interactive experiments.

## Features

- **Dynamic Hero Section** — Interactive typography with mouse-following image trails (`HeroTrail`).
- **Seamless Page Transitions** — Custom View Transitions API integration for smooth navigation between pages.
- **Project Showcase** — A "Work" page featuring project case studies with staggered folder-style animations and hover previews.
- **Interactive Playground** — A gallery of creative coding experiments and UI components (Magnetic Buttons, CSS snippets, JS demos) powered by Sanity CMS.
- **Snippet Detail Pages** — Each playground experiment has a dedicated page with a live preview / code toggle, syntax-highlighted source, and a rich-text breakdown article (via Sanity Portable Text).
- **Sanity Studio** — Embedded at `/studio` for content authoring; portfolio CSS is fully isolated from the studio via Next.js route groups.
- **Custom Design System**
  - **Typography**: Big Shoulders Display (headings), PP Neue Montreal (body), PP Pangram Sans (UI), Playfair Display (accents), Geist Mono & Fira Code (code).
  - **Colour palette**: warm neutrals (`--base-100` to `--base-400`), signature orange (`--base-500`), yellow (`--base-600`), and five accent colours.
  - **Aesthetics**: a theme blending brutalist layouts with refined motion and subtle glassmorphism.
- **Performance** — Turbopack dev server, optimised assets, and smooth 60 fps animations.
- **Responsive Design** — Fully responsive layout across all breakpoints.
- **Analytics** — Vercel Analytics integration.

## Tech Stack

| Layer | Technology |
| --- | --- |
| **Framework** | [Next.js 16](https://nextjs.org/) (App Router, Turbopack) |
| **Language** | React 19, JavaScript |
| **CMS** | [Sanity v5](https://www.sanity.io/) + `next-sanity` 12 |
| **Animation** | [GSAP](https://gsap.com/) + `@gsap/react`, `split-type` |
| **Smooth Scroll** | [Lenis](https://lenis.studiofreight.com/) |
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
- A Sanity project (free tier works fine)

### 1. Clone and install

```bash
git clone https://github.com/yourusername/portfolio-2.0.git
cd portfolio-2.0
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

Open [http://localhost:3000](http://localhost:3000) for the portfolio and [http://localhost:3000/studio](http://localhost:3000/studio) for the Sanity Studio.

### 4. Build for production

```bash
npm run build && npm start
```

## Project Structure

```
src/
├── app/
│   ├── layout.js                  # Root layout (html/body shell)
│   ├── globals.css                # Global reset, custom properties, typography
│   ├── fonts.css                  # @font-face declarations
│   ├── (portfolio)/               # Route group — gets portfolio CSS + ClientLayout
│   │   ├── layout.js              # Imports globals.css, wraps in Lenis/Menu/Cursor
│   │   ├── page.jsx               # Home page
│   │   ├── home.css
│   │   ├── work/                  # Project showcase
│   │   │   ├── page.jsx
│   │   │   └── [slug]/page.jsx    # Individual project case study
│   │   ├── playground/            # Interactive experiments
│   │   │   ├── page.jsx           # Grid of PlaygroundItem + SnippetCard
│   │   │   └── [slug]/page.jsx    # Snippet detail (preview/code toggle + article)
│   │   └── contact/page.jsx
│   └── studio/                    # Sanity Studio (no portfolio CSS)
│       └── [[...tool]]/
│           ├── page.jsx
│           └── StudioClient.jsx
├── components/
│   ├── PlaygroundItem/            # Static experiment card (preview + title + tag)
│   ├── SnippetCard/               # Dynamic Sanity snippet card (same style, with iframe)
│   ├── SnippetDetail/             # Snippet detail view (preview/code toggle + article)
│   ├── HeroTrail/                 # Mouse-following image trail hero
│   ├── Menu/                      # Navigation menu
│   ├── CustomCursor/              # Custom cursor
│   ├── Projects/                  # Work page project cards
│   ├── Showreel/                  # Video showreel section
│   ├── About/                     # About section
│   ├── CTACard/                   # Call-to-action card
│   ├── Spotlight/                 # Spotlight section
│   ├── TeamCards/                 # Team/traits cards
│   ├── Footer/                    # Site footer
│   ├── Copy/                      # Animated copy component
│   ├── Button/                    # Reusable button
│   ├── Preloader/                 # Page preloader
│   └── Sketches/                  # Standalone interactive sketches (MagneticButton, etc.)
├── hooks/
│   └── useViewTransition.js       # View Transitions API hook
├── data/
│   └── projects.js                # Static project data
└── client-layout.js               # Client wrapper (Lenis, Menu, CustomCursor)

sanity/
├── sanity.config.js               # Sanity studio configuration
├── schemas/
│   ├── index.js                   # Schema registry
│   └── snippet.js                 # Snippet document schema
└── lib/
    ├── client.js                  # Sanity client
    └── queries.js                 # GROQ queries
```

## Key Design Decisions

- **Route groups** (`(portfolio)`) isolate portfolio styles and layout (Lenis, Menu, CustomCursor) from the Sanity Studio at `/studio`, which loads its own UI untouched.
- **PlaygroundItem** is the single card style used across the site. `SnippetCard` reuses the same CSS classes and markup, only differing by rendering an iframe instead of React children.
- **Snippet detail pages** use a single surface with **Preview / Code** toggle pills instead of separate sections, keeping the experience compact and interactive.
- **Sanity** handles all playground content (snippets with HTML/CSS/JS + rich-text articles), while static project data lives in `src/data/projects.js`.

## License

[MIT](LICENSE)
