import type { Metadata } from "next";
import "./globals.css";
import Providers from "./components/Providers";
import ThemeProvider from "./components/ThemeProvider";
import { Orbitron, Space_Mono } from "next/font/google";

const orbitron = Orbitron({
    subsets: ["latin"],
    weight: ["400", "600", "900"],
    variable: "--font-orbitron",
});

const spaceMono = Space_Mono({
    subsets: ["latin"],
    weight: ["400", "700"],
    variable: "--font-space-mono",
});

export const metadata: Metadata = {
    title: "Stellar Papers",
    description: "Explore academic paper citation networks in a stellar graph visualization",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html
            lang="en"
            className={`dark ${orbitron.variable} ${spaceMono.variable}`}
            suppressHydrationWarning
        >
            <body className="bg-white dark:bg-gray-950 text-gray-900 dark:text-white transition-colors font-mono">
                <ThemeProvider>
                    <Providers>{children}</Providers>
                </ThemeProvider>
            </body>
        </html>
    );
}
