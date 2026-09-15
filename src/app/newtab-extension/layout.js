import { Plus_Jakarta_Sans } from "next/font/google";
import "./style.css";

const jakarta = Plus_Jakarta_Sans({
    subsets: ["latin"],
    display: "swap",
    variable: "--font-jakarta",
});

export const metadata = {
    title: "Daily Workspace — Stop starting your day scattered",
    description:
        "Replace the blank new tab with a calm dashboard for tasks, notes, shortcuts, weather, and focus. Free on Chrome and Firefox.",
    themeColor: "#f7f8f4",
    icons: {
        icon: "/newtab-extension/icon-newtab.svg",
        shortcut: "/newtab-extension/icon-newtab.svg",
        apple: "/newtab-extension/icon-newtab.svg",
    },
};

export default function NewtabExtensionLayout({ children }) {
    return (
        <div className={`newtab-extension ${jakarta.variable}`}>{children}</div>
    );
}
