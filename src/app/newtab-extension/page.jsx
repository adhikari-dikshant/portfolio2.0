"use client";

import { useEffect } from "react";

const CHROME_STORE_URL =
  "https://chromewebstore.google.com/detail/pebbieohhhbdklnkgeicihnbffdglhhh";
const FIREFOX_ADDON_URL =
  "https://addons.mozilla.org/en-US/firefox/addon/daily-workspace/";
const BUY_ME_A_COFFEE_URL = "https://buymeacoffee.com/ikshwaku";

function BrandMark() {
  return (
    <img
      className="brand-icon"
      src="/newtab-extension/icon-newtab.svg"
      width={34}
      height={34}
      alt=""
      aria-hidden="true"
    />
  );
}

function ProductHuntBadge({ className = "" }) {
  return (
    <a
      className={`product-hunt-badge ${className}`.trim()}
      href="https://www.producthunt.com/products/daily-workspace-new-tab-dashboard?embed=true&utm_source=badge-featured&utm_medium=badge&utm_campaign=badge-daily-workspace-new-tab-dashboard"
      target="_blank"
      rel="noopener noreferrer"
    >
      <img
        alt="Daily Workspace — New Tab Dashboard - Your tasks, notes, and favorite sites. One useful new tab. | Product Hunt"
        width={250}
        height={54}
        src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=1253031&theme=light&t=1789625506596"
      />
    </a>
  );
}

function StoreActions({ className = "" }) {
  return (
    <div className={`store-actions ${className}`.trim()}>
      <a
        className="button store-button store-chrome"
        href={CHROME_STORE_URL}
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          className="store-logo"
          src="/newtab-extension/chrom.svg"
          width={18}
          height={18}
          alt=""
          aria-hidden="true"
        />
        Add to Chrome
      </a>
      <a
        className="button store-button store-firefox"
        href={FIREFOX_ADDON_URL}
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          className="store-logo"
          src="/newtab-extension/firefox.svg"
          width={18}
          height={18}
          alt=""
          aria-hidden="true"
        />
        Get for Firefox
      </a>
    </div>
  );
}

export default function NewtabExtensionPage() {
  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motion.matches || !("IntersectionObserver" in window)) return;

    const root = document.querySelector(".newtab-extension");
    if (!root) return;

    const panels = root.querySelectorAll(
      ".feature, .personal > *, .faq details, .install, .support, .problem-card, .problem-proof li"
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(({ target, isIntersecting }) => {
          if (!isIntersecting) return;
          target.classList.remove("reveal-pending");
          target.classList.add("reveal-enter");
          target.addEventListener(
            "animationend",
            () => target.classList.remove("reveal-enter"),
            { once: true }
          );
          observer.unobserve(target);
        });
      },
      { threshold: 0.08 }
    );

    panels.forEach((panel, index) => {
      panel.style.setProperty("--reveal-delay", `${(index % 3) * 65}ms`);
      panel.classList.add("reveal-pending");
      observer.observe(panel);
    });

    const onMotionChange = () => {
      if (!motion.matches) return;
      observer.disconnect();
      panels.forEach((panel) =>
        panel.classList.remove("reveal-pending", "reveal-enter")
      );
    };

    motion.addEventListener("change", onMotionChange);

    return () => {
      observer.disconnect();
      motion.removeEventListener("change", onMotionChange);
    };
  }, []);

  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <div className="dw-container">
        <header className="header">
          <a
            className="brand"
            href="/newtab-extension"
            aria-label="Daily Workspace home"
          >
            <span className="brand-mark">
              <BrandMark />
            </span>
            <span className="brand-text">
              <span className="brand-name">Daily Workspace</span>
              <span className="brand-tag">New Tab</span>
            </span>
          </a>
          <nav className="nav" aria-label="Main navigation">
            <a className="nav-link" href="#features">Features</a>
            <a className="nav-link" href="#get-started">Install</a>
            <a
              className="nav-source"
              href="https://github.com/adhikari-dikshant/tab-extension"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <img
                className="nav-source-icon"
                src="/newtab-extension/github.svg"
                width={16}
                height={16}
                alt=""
                aria-hidden="true"
              />
              <span className="nav-btn-label">GitHub</span>
            </a>
            <a
              className="nav-coffee"
              href={BUY_ME_A_COFFEE_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Buy me a coffee"
            >
              <CoffeeGlyph />
              <span className="nav-btn-label">Coffee</span>
            </a>
            <a
              className="nav-install"
              href={CHROME_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Add to Chrome"
            >
              <img
                className="nav-install-icon"
                src="/newtab-extension/chrom.svg"
                width={16}
                height={16}
                alt=""
                aria-hidden="true"
              />
              <span className="nav-btn-label">Add to Chrome</span>
            </a>
          </nav>
        </header>

        <main id="main">
          <div className="hero-bento">
            <section className="hero" aria-labelledby="hero-title">
              <span className="eyebrow">The new-tab problem</span>
              <h1 id="hero-title">
                Stop starting
                <br />
                your day scattered.
              </h1>
              <p>
                A blank new tab, a noisy feed, five open tools — and the thing you
                meant to do still isn’t in front of you. Daily Workspace replaces
                that dead end with one calm dashboard: tasks, notes, shortcuts,
                weather, and focus, ready the moment you open a tab.
              </p>
              <StoreActions className="hero-store-actions" />
              <ProductHuntBadge className="hero-product-hunt" />
              <p className="quiet">
                Free · Open source · No account · Works offline for your data
              </p>
            </section>

            <figure
              className="preview"
              aria-label="Daily Workspace dashboard preview"
            >
              <div className="browser-bar" aria-hidden="true">
                <i></i>
                <i></i>
                <i></i>
                <span>New Tab</span>
              </div>
              <img
                src="/newtab-extension/dashboard-light.png"
                width={1440}
                height={900}
                alt="Daily Workspace in light mode, showing a greeting, search, shortcuts, tasks, weather, most visited sites, notes and screen time."
                fetchPriority="high"
              />
              <figcaption className="preview-caption">
                One tab in. Everything you need already there.
              </figcaption>
            </figure>
          </div>

          <section className="section problem-section" aria-labelledby="problem-title">
            <div className="problem-shell">
              <div className="section-heading problem-heading">
                <div>
                  <p className="eyebrow">Why it exists</p>
                  <h2 id="problem-title">
                    Your day doesn’t
                    <br />
                    live in one place.
                  </h2>
                </div>
                <p>
                  Tasks in one app, notes in another, bookmarks buried, weather in a
                  widget you forget to open. Daily Workspace pulls the essentials
                  into the page you open constantly — so less hunting, more doing.
                </p>
              </div>

              <div className="problem-stage">
                <article className="problem-card">
                  <div className="compare-frame compare-frame-photo" aria-hidden="true">
                    <div className="problem-badge problem-badge-before">The usual new tab</div>
                    <img
                      className="compare-before-img"
                      src="/newtab-extension/chrome.png"
                      width={720}
                      height={450}
                      loading="lazy"
                      alt=""
                    />
                    <div className="chaos-chips">
                      <span className="chaos-chip chip-1">Mail</span>
                      <span className="chaos-chip chip-2">Tasks</span>
                      <span className="chaos-chip chip-3">Notes</span>
                      <span className="chaos-chip chip-4">Weather</span>
                      <span className="chaos-chip chip-5">Focus?</span>
                    </div>
                  </div>
                  <div className="problem-copy">
                    <p className="problem-label">Before</p>
                    <h3>Scattered across tabs</h3>
                    <p>
                      Blank search. Five more tabs. The morning starts with hunting
                      for the day you already planned.
                    </p>
                  </div>
                </article>

                <div className="problem-morph" aria-hidden="true">
                  <span className="problem-morph-ring"></span>
                  <span className="problem-morph-arrow">→</span>
                  <span className="problem-morph-label">becomes</span>
                </div>

                <article className="problem-card problem-card-after">
                  <div className="compare-frame compare-frame-after" aria-hidden="true">
                    <div className="problem-badge problem-badge-after">With Daily Workspace</div>
                    <div className="compare-chrome">
                      <i></i>
                      <i></i>
                      <i></i>
                      <div className="compare-tabs">
                        <span className="compare-tab active after">New Tab</span>
                      </div>
                    </div>
                    <img
                      className="compare-after-img"
                      src="/newtab-extension/dashboard-light.png"
                      width={720}
                      height={450}
                      loading="lazy"
                      alt=""
                    />
                    <div className="after-glow"></div>
                  </div>
                  <div className="problem-copy">
                    <p className="problem-label">After</p>
                    <h3>One calm dashboard</h3>
                    <p>
                      Tasks, shortcuts, notes, weather, and focus already waiting.
                      The day starts where you left it.
                    </p>
                  </div>
                </article>
              </div>

              <ul className="problem-proof">
                <li>
                  <strong>0</strong>
                  <span>extra apps to open</span>
                </li>
                <li>
                  <strong>1</strong>
                  <span>new tab to start from</span>
                </li>
                <li>
                  <strong>Local</strong>
                  <span>data stays on your device</span>
                </li>
              </ul>
            </div>
          </section>

          <section
            className="section"
            id="features"
            aria-labelledby="features-title"
          >
            <div className="section-heading">
              <div>
                <p className="eyebrow">What replaces the blank page</p>
                <h2 id="features-title">The tools you already switch between.</h2>
              </div>
              <p>
                Built for the moments between tabs — not another app to manage,
                just the essentials within reach.
              </p>
            </div>

            <div className="features">
              <article className="feature featured">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  aria-hidden="true"
                >
                  <rect x="4" y="4" width="6" height="6" rx="1" />
                  <rect x="14" y="4" width="6" height="6" rx="1" />
                  <rect x="4" y="14" width="6" height="6" rx="1" />
                  <rect x="14" y="14" width="6" height="6" rx="1" />
                </svg>
                <h3>Sites without the scavenger hunt</h3>
                <p>
                  Shortcuts, bookmarks, apps, and most-visited pages stay one click
                  away — instead of lost in a sea of tabs.
                </p>
                <div className="shortcut-demo" aria-hidden="true">
                  <span>
                    <i>M</i>Mail
                  </span>
                  <span>
                    <i>D</i>Drive
                  </span>
                  <span>
                    <i>C</i>Calendar
                  </span>
                  <span>
                    <i>N</i>Notes
                  </span>
                </div>
              </article>

              <article className="feature">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  aria-hidden="true"
                >
                  <path d="m4 7 2 2 4-4m-6 12 2 2 4-4m3-7h7m-7 10h7" />
                </svg>
                <h3>A plan that shows up with the tab</h3>
                <p>
                  Capture to-dos, set due dates, repeat daily or weekly work, and
                  start a focus timer when it’s time to get going.
                </p>
              </article>

              <article className="feature">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  aria-hidden="true"
                >
                  <path d="M13 4H5a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-8M9 15l1-4 8-8 3 3-8 8-4 1Z" />
                </svg>
                <h3>Ideas that don’t vanish mid-scroll</h3>
                <p>
                  Jot a thought or save a link. Notes autosave, and the important
                  ones stay pinned where you’ll see them.
                </p>
              </article>

              <article className="feature">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  aria-hidden="true"
                >
                  <circle cx="12" cy="12" r="4" />
                  <path d="M12 2v3m0 14v3M2 12h3m14 0h3M5 5l2 2m10 10 2 2M5 19l2-2M17 7l2-2" />
                </svg>
                <h3>Context without another open tab</h3>
                <p>
                  Clock, local weather, screen time, and a daily quote — the
                  ambient details you usually leave the page to check.
                </p>
              </article>

              <article className="feature">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  aria-hidden="true"
                >
                  <rect x="3" y="7" width="15" height="14" rx="2" />
                  <path d="M7 3h12a2 2 0 0 1 2 2v12M3 11h15" />
                </svg>
                <h3>Sessions you can reopen later</h3>
                <p>
                  Recover recently closed tabs or save a group of pages as a
                  workspace for the next deep session.
                </p>
              </article>

              <article className="feature">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  aria-hidden="true"
                >
                  <path d="m12 3 8 3v6c0 4-4 7-8 9-4-2-8-5-8-9V6l8-3Z" />
                  <path d="m8 12 3 3 5-6" />
                </svg>
                <h3>Your setup stays on your machine</h3>
                <p>
                  Tasks, notes, and settings live in the browser. Export a backup
                  whenever you need one — no account required.
                </p>
              </article>
            </div>
          </section>

          <section className="personal" aria-labelledby="personal-title">
            <div>
              <p className="eyebrow">Make it fit the way you work</p>
              <h2 id="personal-title">
                Same browser.
                <br />
                Your rhythm.
              </h2>
              <p>
                Light, dark, or system theme. Accent colors, card layout, wallpaper,
                and which tools stay visible — so the dashboard matches how you
                actually start a day.
              </p>
              <a href="#get-started">
                Install and shape it <span aria-hidden="true">↗</span>
              </a>
            </div>
            <img
              src="/newtab-extension/dashboard-dark.png"
              width={1440}
              height={900}
              loading="lazy"
              alt="The same customizable bento dashboard in dark mode."
            />
          </section>

          <section className="section faq-section" aria-labelledby="faq-title">
            <div className="faq">
              <h2 id="faq-title">A few things to know.</h2>
              <details>
                <summary>Do I need to create an account?</summary>
                <p>
                  No. Daily Workspace works without an account or subscription.
                  Your dashboard data is stored in your browser.
                </p>
              </details>
              <details>
                <summary>What stays local, and what goes online?</summary>
                <p>
                  Settings, tasks, notes, saved workspaces, and screen-time records
                  are stored locally. Online features contact third parties:
                  weather sends location coordinates to weather and place-name
                  services; search suggestions send typed queries to suggestion
                  providers; site icons may be fetched from external icon services.
                  Daily Workspace does not include analytics or an account system.
                </p>
              </details>
              <details>
                <summary>Can I choose which tools appear?</summary>
                <p>
                  Yes. Use Customize to show or hide cards and sidebar tools,
                  adjust the appearance, and rearrange your dashboard. Optional
                  browser permissions are requested for features such as bookmarks
                  and screen time.
                </p>
              </details>
              <details>
                <summary>Can I back up my setup?</summary>
                <p>
                  Use Customize → Data to export your dashboard. Keep the backup
                  file somewhere safe; importing a backup replaces your current
                  saved setup.
                </p>
              </details>
            </div>
          </section>

          <section
            className="install"
            id="get-started"
            aria-labelledby="install-title"
          >
            <div>
              <p className="eyebrow">Fix your next new tab</p>
              <h2 id="install-title">Install Daily Workspace.</h2>
              <p>
                One click from the store. Available on Chrome and Firefox — free,
                open source, and ready before your next blank tab.
              </p>
            </div>
            <div className="install-actions">
              <StoreActions />
              <ProductHuntBadge />
              <a
                className="button secondary source-link"
                href="https://github.com/adhikari-dikshant/tab-extension"
                target="_blank"
                rel="noopener noreferrer"
              >
                View source on GitHub
              </a>
            </div>
          </section>

          <section className="support" id="support" aria-labelledby="support-title">
            <div className="support-visual">
              <img
                className="support-image"
                src="/newtab-extension/bmac.webp"
                width={640}
                height={640}
                loading="lazy"
                alt=""
                aria-hidden="true"
              />
            </div>

            <div className="support-copy">
              <p className="eyebrow">Keep it growing</p>
              <h2 id="support-title">
                Fuel the next
                <br />
                quiet morning.
              </h2>
              <p>
                Daily Workspace is free and open source. If it made your mornings a
                little less scattered, a coffee helps fund the next round of polish
                and features.
              </p>
              <div className="support-actions">
                <a
                  className="button coffee-button"
                  href={BUY_ME_A_COFFEE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <CoffeeGlyph />
                  Buy me a coffee
                  <span aria-hidden="true">↗</span>
                </a>
                <p className="support-note">One-time tip · No account required</p>
              </div>
            </div>
          </section>
        </main>

        <footer className="footer">
          <span>
            Daily Workspace · By{" "}
            <a
              className="footer-author"
              href="https://dikshant.xyz/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Dikshant Singh Adhikari
            </a>
          </span>
          <div>
            <a href="/newtab-extension/privacy">Privacy policy</a>
            <a href="#support">Support</a>
            <a
              href="https://github.com/adhikari-dikshant/tab-extension/blob/main/LICENSE"
              target="_blank"
              rel="noopener noreferrer"
            >
              GPL-3.0 license
            </a>
          </div>
        </footer>
      </div>
    </>
  );
}

function CoffeeGlyph() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <path
        d="M5 8h11v6.5A3.5 3.5 0 0 1 12.5 18h-4A3.5 3.5 0 0 1 5 14.5V8Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path
        d="M16 9.5h1.8A2.2 2.2 0 0 1 20 11.7v.6A2.2 2.2 0 0 1 17.8 14.5H16"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path
        d="M4 20h13M8 5.5c.4-.8.4-1.5 0-2.2M11 5.5c.4-.8.4-1.5 0-2.2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}
