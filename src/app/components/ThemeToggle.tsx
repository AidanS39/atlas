"use client";

import { useTheme } from "./ThemeProvider";
import { HiSun, HiMoon } from "react-icons/hi";

export default function ThemeToggle() {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className="p-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
        >
            {theme === "dark" ? <HiSun size={18} /> : <HiMoon size={18} />}
        </button>
    );
}
