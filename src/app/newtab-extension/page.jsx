"use client";

import { useEffect } from "react";

export default function NewtabExtensionPage() {
    useEffect(() => {
        const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
        if (motion.matches || !("IntersectionObserver" in window)) return;

        const root = document.querySelector(".newtab-extension");
        if (!root) return;

        const panels = root.querySelectorAll(
            ".feature, .personal > *, .faq details, .install"
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
                    <a className="brand" href="#" aria-label="Daily Workspace home">
                        <svg viewBox="0 0 32 32" fill="none" aria-hidden="true">
                            <rect width="32" height="32" rx="8" fill="#2c493b" />
                            <path
                                d="M8 8h6v6H8zm10 0h6v10h-6zM8 18h6v6H8zm10 4h6v2h-6z"
                                fill="#e6edce"
                            />
                        </svg>
                        Daily Workspace
                    </a>
                    <nav className="nav" aria-label="Main navigation">
                        <a href="#features">Features</a>
                        <a href="#get-started">Get started</a>
                        <a
                            className="nav-source"
                            href="https://github.com/adhikari-dikshant/tab-extension"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            GitHub ↗
                        </a>
                    </nav>
                </header>

                <main id="main">
                    <div className="hero-bento">
                        <section className="hero" aria-labelledby="hero-title">
                            <span className="eyebrow">Your everyday tools. One new tab.</span>
                            <h1 id="hero-title">
                                A better place
                                <br />
                                to start your day.
                            </h1>
                            <p>
                                Your favorite sites, things to do, and ideas to keep. Daily
                                Workspace puts them together in a new tab that feels like yours.
                            </p>
                            <div className="actions">
                                <a className="button" href="#get-started">
                                    Get Daily Workspace <span aria-hidden="true">↗</span>
                                </a>
                                <a className="button secondary" href="#features">
                                    Explore the features
                                </a>
                            </div>
                            <p className="quiet">Free and open source · No account needed</p>
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
                                The dashboard, with sample data. Arrange it your way.
                            </figcaption>
                        </figure>
                    </div>

                    <section
                        className="section"
                        id="features"
                        aria-labelledby="features-title"
                    >
                        <div className="section-heading">
                            <div>
                                <p className="eyebrow">A little more useful</p>
                                <h2 id="features-title">The essentials, within reach.</h2>
                            </div>
                            <p>
                                Less switching between tools. More room for whatever you opened
                                your browser to do.
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
                                <h3>Your sites, one click away</h3>
                                <p>
                                    Keep shortcuts, bookmarks, apps, and your most visited pages
                                    close at hand.
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
                                <h3>A clear plan for today</h3>
                                <p>
                                    Add tasks, set due dates, and repeat daily or weekly routines.
                                    Start a focus timer when it’s time to get going.
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
                                <h3>Somewhere for your ideas</h3>
                                <p>
                                    Jot down a thought or save a useful link. Notes save
                                    automatically, with important ones pinned at the top.
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
                                <h3>A quick look at your day</h3>
                                <p>
                                    Check the time and local weather, see your browsing time, and
                                    enjoy a daily quote.
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
                                <h3>Pick up where you left off</h3>
                                <p>
                                    Reopen recently closed tabs or save a group of pages as a
                                    workspace for your next session.
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
                                <h3>Your setup stays with you</h3>
                                <p>
                                    Tasks, notes, and settings are saved in your browser. Export a
                                    backup whenever you need one.
                                </p>
                            </article>
                        </div>
                    </section>

                    <section className="personal" aria-labelledby="personal-title">
                        <div>
                            <p className="eyebrow">Make yourself comfortable</p>
                            <h2 id="personal-title">
                                A workspace with
                                <br />
                                your preferences.
                            </h2>
                            <p>
                                Choose light, dark, or your browser’s theme. Pick an accent
                                color, rearrange the cards, and keep the tools you use most.
                            </p>
                            <a href="#get-started">
                                Make it yours <span aria-hidden="true">↗</span>
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

                    <section
                        className="section faq-section"
                        aria-labelledby="faq-title"
                    >
                        <div className="faq">
                            <h2 id="faq-title">A few things to know.</h2>
                            <details>
                                <summary>Do I need to create an account?</summary>
                                <p>
                                    No. Daily Workspace works without an account or subscription.
                                    Your dashboard data is stored in your browser.
                                </p>
                            </details>
                            <details id="privacy">
                                <summary>What stays local, and what goes online?</summary>
                                <p>
                                    Settings, tasks, notes, saved workspaces, and screen-time
                                    records are stored locally. Online features contact third
                                    parties: weather sends location coordinates to weather and
                                    place-name services; search suggestions send typed queries to
                                    suggestion providers; site icons may be fetched from external
                                    icon services. Daily Workspace does not include analytics or
                                    an account system.
                                </p>
                            </details>
                            <details>
                                <summary>Can I choose which tools appear?</summary>
                                <p>
                                    Yes. Use Customize to show or hide cards and sidebar tools,
                                    adjust the appearance, and rearrange your dashboard. Optional
                                    browser permissions are requested for features such as
                                    bookmarks and screen time.
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
                            <p className="eyebrow">Start with your next tab</p>
                            <h2 id="install-title">Get Daily Workspace.</h2>
                            <p>
                                Follow the project’s setup guide for Chromium browsers or
                                Firefox. You’ll find the source code and installation steps on
                                GitHub.
                            </p>
                        </div>
                        <div className="actions">
                            <a
                                className="button"
                                href="https://github.com/adhikari-dikshant/tab-extension#-installation"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Installation guide <span aria-hidden="true">↗</span>
                            </a>
                            <a
                                className="button secondary"
                                href="https://github.com/adhikari-dikshant/tab-extension"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                View source on GitHub
                            </a>
                        </div>
                    </section>
                </main>

                <footer className="footer">
                    <span>Daily Workspace · <a href="https://dikshant.xyz/" target="blank">By Dikshant Singh Adhikari</a></span>
                    <div>
                        <a href="#privacy">Privacy details</a>
                        <a
                            href="https://github.com/adhikari-dikshant/tab-extension/issues"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Support
                        </a>
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
