export const metadata = {
  title: "Privacy policy — Daily Workspace",
  description:
    "How Daily Workspace stores data locally, when optional features contact third parties, and what permissions are used.",
  alternates: {
    canonical: "/newtab-extension/privacy",
  },
  openGraph: {
    title: "Privacy policy — Daily Workspace",
    description:
      "How Daily Workspace stores data locally, when optional features contact third parties, and what permissions are used.",
    url: "/newtab-extension/privacy",
    siteName: "Daily Workspace",
    type: "website",
    images: [
      {
        url: "/newtab-extension/dashboard-light.png",
        width: 1440,
        height: 900,
        alt: "Daily Workspace new tab dashboard",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy policy — Daily Workspace",
    description:
      "How Daily Workspace stores data locally, when optional features contact third parties, and what permissions are used.",
    images: ["/newtab-extension/dashboard-light.png"],
  },
};

export default function PrivacyPage() {
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
              <img
                className="brand-icon"
                src="/newtab-extension/icon-newtab.svg"
                width={34}
                height={34}
                alt=""
                aria-hidden="true"
              />
            </span>
            <span className="brand-text">
              <span className="brand-name">Daily Workspace</span>
              <span className="brand-tag">New Tab</span>
            </span>
          </a>
          <nav className="nav" aria-label="Main navigation">
            <a className="nav-link" href="/newtab-extension#features">
              Features
            </a>
            <a className="nav-link" href="/newtab-extension#get-started">
              Install
            </a>
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
              href="https://buymeacoffee.com/ikshwaku"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Buy me a coffee"
            >
              <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
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
              <span className="nav-btn-label">Coffee</span>
            </a>
            <a
              className="nav-install"
              href="https://chromewebstore.google.com/detail/pebbieohhhbdklnkgeicihnbffdglhhh"
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

        <main id="main" className="privacy-page">
          <p className="eyebrow">Privacy</p>
          <h1>Privacy policy</h1>
          <p className="privacy-lead">
            Daily Workspace is built to keep your day private. The extension
            runs on your device, does not require an account, and does not
            operate its own backend for your dashboard data.
          </p>

          <section aria-labelledby="local-title">
            <h2 id="local-title">What stays on your device</h2>
            <p>
              Settings, shortcuts, tasks, notes, saved workspaces, appearance
              preferences, and screen-time records are stored locally in your
              browser. You can export a backup from Customize → Data, and
              importing a backup replaces your current saved setup.
            </p>
          </section>

          <section aria-labelledby="online-title">
            <h2 id="online-title">What may go online</h2>
            <p>
              Some optional features contact third-party services directly from
              your browser when you use them:
            </p>
            <ul>
              <li>
                Weather may send location coordinates to weather and place-name
                services.
              </li>
              <li>
                Search suggestions may send typed queries to your chosen
                suggestion provider.
              </li>
              <li>
                Site icons may be fetched from the browser favicon API or an
                external icon service when a local icon is unavailable.
              </li>
            </ul>
          </section>

          <section aria-labelledby="permissions-title">
            <h2 id="permissions-title">Permissions</h2>
            <p>
              Required permissions cover local storage, alarms, and favicons.
              Optional permissions such as bookmarks, tabs, sessions, idle,
              notifications, and top sites are requested only when you enable
              the matching feature, and can be revoked in your browser’s
              extension settings.
            </p>
          </section>

          <section aria-labelledby="analytics-title">
            <h2 id="analytics-title">Analytics and accounts</h2>
            <p>
              Daily Workspace does not include analytics, advertising trackers,
              or an account system. We do not collect usage telemetry through
              the extension.
            </p>
          </section>

          <section aria-labelledby="contact-title">
            <h2 id="contact-title">Contact</h2>
            <p>
              Questions about this policy can be opened as a GitHub issue on the{" "}
              <a
                href="https://github.com/adhikari-dikshant/tab-extension/issues"
                target="_blank"
                rel="noopener noreferrer"
              >
                Daily Workspace repository
              </a>
              .
            </p>
          </section>

          <p className="privacy-back">
            <a href="/newtab-extension">← Back to Daily Workspace</a>
          </p>
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
            <a href="/newtab-extension/privacy" aria-current="page">
              Privacy policy
            </a>
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
