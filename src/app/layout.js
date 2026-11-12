import { ViewTransitions } from "next-view-transitions";
import { Analytics } from "@vercel/analytics/next";

const title =
    "Dikshant Singh Adhikari | Software Engineer – Frontend (UI/UX Design & Development)";
const description =
    "Software Engineer – Frontend crafting interactive UI/UX — motion-rich interfaces, playful micro-interactions, and web experiences that feel alive.";

export const metadata = {
    metadataBase: new URL("https://dikshant.xyz"),
    title,
    description,
    icons: {
        icon: "/favicon.svg",
        shortcut: "/favicon.svg",
        apple: "/favicon.svg",
    },
    openGraph: {
        title,
        description,
        url: "https://dikshant.xyz",
        siteName: "Dikshant Singh Adhikari",
        locale: "en_US",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title,
        description,
        creator: "@ikshwaku03",
    },
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body cz-shortcut-listen="true">
                <ViewTransitions>
                    {children}
                </ViewTransitions>
                <Analytics />
            </body>
        </html>
    );
}
