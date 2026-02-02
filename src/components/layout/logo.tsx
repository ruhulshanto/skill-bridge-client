"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
    title?: string;
    subtitle?: string;
    collapsed?: boolean;
    className?: string;
}

export const Logo = ({
    title = "SkillBridge",
    subtitle = "BRIDGING SKILLS TO SUCCESS",
    collapsed = false,
    className
}: LogoProps) => {
    return (
        <Link href="/" className={cn("group flex items-center gap-3 transition-all hover:scale-[1.02] active:scale-95", className)}>
            {/* Logo Symbol */}
            <div className="relative flex-shrink-0">
                {/* Glow effect */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 blur-sm group-hover:from-blue-500/30 group-hover:to-purple-500/30 transition-all" />

                {/* Main logo container */}
                <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 shadow-lg shadow-blue-500/25 group-hover:shadow-blue-500/40 transition-all">
                    {/* Bridge icon */}
                    <svg
                        className="h-6 w-6 text-white"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                    >
                        {/* Bridge structure */}
                        <path d="M2 12L4 12M20 12L22 12M12 2V22M4 12V16M20 12V16"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        {/* Bridge cables/connections */}
                        <path d="M4 16L12 8L20 16"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path d="M4 8L12 16L20 8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>

                    {/* Subtle shine effect */}
                    <div className="absolute top-1 left-1 h-2 w-2 rounded-full bg-white/20 blur-sm" />
                </div>
            </div>

            {/* Logo Text */}
            {!collapsed && (
                <div className="flex flex-col overflow-hidden whitespace-nowrap">
                    <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 dark:from-white dark:via-gray-200 dark:to-white bg-clip-text text-transparent">
                        {title}
                    </span>
                    <span className="text-[10px] font-medium tracking-wider text-blue-600 dark:text-blue-400 opacity-80 uppercase">
                        {subtitle}
                    </span>
                </div>
            )}
        </Link>
    );
};