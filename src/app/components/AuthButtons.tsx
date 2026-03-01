"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

export default function AuthButtons() {
    const { data: session, status } = useSession();

    if (status === "loading") {
        return (
            <div className="flex items-center gap-2">
                <ThemeToggle />
                <div className="w-16 h-8 bg-gray-200 dark:bg-gray-800 rounded-lg animate-pulse" />
            </div>
        );
    }

    if (session?.user) {
        return (
            <div className="flex items-center gap-3">
                <ThemeToggle />
                <span className="text-sm text-gray-600 dark:text-gray-300 hidden sm:inline">
                    {session.user.name || session.user.email}
                </span>
                <button
                    onClick={() => signOut({ callbackUrl: "/" })}
                    className="px-3 py-1.5 text-sm rounded-lg border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                    Sign Out
                </button>
            </div>
        );
    }

    return (
        <div className="flex items-center gap-2">
            <ThemeToggle />
            <Link
                href="/signin"
                className="px-3 py-1.5 text-sm rounded-lg border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
                Sign In
            </Link>
            <Link
                href="/signup"
                className="px-3 py-1.5 text-sm rounded-lg bg-blue-600 hover:bg-blue-500 text-white transition-colors"
            >
                Sign Up
            </Link>
        </div>
    );
}
