import "./globals.css";
import ClientLayout from "@/client-layout";
import { ViewTransitions } from "next-view-transitions";

export const metadata = {
    title: "Dikshant Singh Adhikari | Frontend Developer & Web Designer",
    description: "I'm a frontend developer and web designer based in Udaipur, Rajasthan. I create beautiful, responsive, and user-friendly websites that help businesses and individuals achieve their goals.",
    icons: {
        icon: "/favicon.svg",
        shortcut: "/favicon.svg",
        apple: "/favicon.svg",
    },
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body cz-shortcut-listen="true">
                <ViewTransitions>
                    <ClientLayout>{children}</ClientLayout>
                </ViewTransitions>
            </body>
        </html>
    );
}
