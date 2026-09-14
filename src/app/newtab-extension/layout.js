import { Plus_Jakarta_Sans } from "next/font/google";
import "./style.css";

const jakarta = Plus_Jakarta_Sans({
    subsets: ["latin"],
    display: "swap",
    variable: "--font-jakarta",
});

export const metadata = {
    title: "Daily Workspace — Your everyday tools, one new tab",
    description:
        "Daily Workspace brings tasks, notes, shortcuts, weather and focus tools together in a customizable new tab dashboard.",
    themeColor: "#f7f8f4",
};

export default function NewtabExtensionLayout({ children }) {
    return (
        <div className={`newtab-extension ${jakarta.variable}`}>{children}</div>
    );
}
