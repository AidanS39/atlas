import type { Metadata } from "next";
import "./globals.css";
import Providers from "./components/Providers";
import ThemeProvider from "./components/ThemeProvider";
import { ensureIndexes } from "../lib/db";

//run on startup
ensureIndexes().catch(console.error);

export const metadata: Metadata = {
    title: "Stellar Papers",
    description: "Explore academic paper citation networks in a stellar graph visualization",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" className="dark" suppressHydrationWarning>
            <body
                style={{
                    margin: 0,
                    padding: 0,
                    width: "100vw",
                    height: "100vh",
                    overflow: "hidden",
                }}
            >
                <ThemeProvider>
                    <Providers>{children}</Providers>
                </ThemeProvider>
            </body>
        </html>
    );
}
