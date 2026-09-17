import { Plus_Jakarta_Sans } from "next/font/google";
import "./style.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jakarta",
});

const title = "Daily Workspace — Stop starting your day scattered";
const description =
  "Replace the blank new tab with a calm dashboard for tasks, notes, shortcuts, weather, and focus. Free on Chrome and Firefox.";
const url = "/newtab-extension";
const ogImage = {
  url: "/newtab-extension/dashboard-light.png",
  width: 1440,
  height: 900,
  alt: "Daily Workspace new tab dashboard with tasks, shortcuts, notes, weather, and focus tools",
};

export const metadata = {
  title,
  description,
  applicationName: "Daily Workspace",
  authors: [{ name: "Dikshant Singh Adhikari", url: "https://dikshant.xyz" }],
  creator: "Dikshant Singh Adhikari",
  keywords: [
    "new tab extension",
    "Chrome new tab",
    "Firefox new tab",
    "productivity dashboard",
    "Daily Workspace",
    "task manager",
    "notes",
    "focus timer",
  ],
  themeColor: "#f7f8f4",
  icons: {
    icon: "/newtab-extension/icon-newtab.svg",
    shortcut: "/newtab-extension/icon-newtab.svg",
    apple: "/newtab-extension/icon-newtab.svg",
  },
  alternates: {
    canonical: url,
  },
  openGraph: {
    title,
    description,
    url,
    siteName: "Daily Workspace",
    locale: "en_US",
    type: "website",
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    creator: "@ikshwaku03",
    images: [ogImage.url],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function NewtabExtensionLayout({ children }) {
  return (
    <div className={`newtab-extension ${jakarta.variable}`}>{children}</div>
  );
}
