export const metadata = {
  title: "Privacy policy — Daily Workspace",
  description:
    "How Daily Workspace stores data locally, when optional features contact third parties, and what permissions are used.",
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
            <a href="/newtab-extension#features">Features</a>
            <a href="/newtab-extension#get-started">Get started</a>
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
            Daily Workspace ·{" "}
            <a
              href="https://dikshant.xyz/"
              target="_blank"
              rel="noopener noreferrer"
            >
              By Dikshant Singh Adhikari
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
