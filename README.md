# My Creative Portfolio 2.0 (With Playground in progress)

A personal portfolio website exploring the intersection of structure and creative chaos. Built with Next.js 15, GSAP, and a focus on micro-interactions and typographic hierarchy.

## Features

- **Dynamic Hero Section**: Interactive typography with mouse-following image trails (`HeroTrail`).
- **Seamless Page Transitions**: Custom view transitions API integration for smooth navigation.
- **Interactive Playground (WIP)**: A gallery of creative coding experiments and UI components (e.g., Magnetic Buttons).
- **Project Showcase**: A dynamic "Work" page featuring project case studies with staggered animations.
- **Custom Design System**:
    - **Typography**: Big Shoulders Display (Headings), PP Neue Montreal (Body), Playfair Display (Accents), Geist Mono (Technical).
    - **Aesthetics**: "Polite Chaos" theme blending brutalist layouts with refined motion.
- **Performance**: Optimized for fast loading and smooth interactions.
- **Responsive Design**: Fully responsive layout for all devices.

## Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Styling**: CSS Modules, Custom Properties (Variables)
- **Animation**: [GSAP](https://gsap.com/) + `@gsap/react`, `split-type`
- **Fonts**: `next/font` (Google Fonts & Local Fonts)
- **Smooth Scroll**: [Lenis](https://lenis.studio/)
- **Icons**: `react-icons`

## Getting Started

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/yourusername/polite-chaos.git
    cd polite-chaos
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    ```

4.  **Open locally:**
    Navigate to [http://localhost:3000](http://localhost:3000).

## Project Structure

- `src/app`: App Router pages (`page.jsx`, `layout.js`, `globals.css`).
- `src/components`: Reusable UI components (`HeroTrail`, `Menu`, `Projects`, `PlaygroundItem`).
- `src/hooks`: Custom hooks (e.g., `useViewTransition`).
- `public`: Static assets (images, fonts).

## License

[MIT](LICENSE)
