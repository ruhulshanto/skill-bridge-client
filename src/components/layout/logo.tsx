"use client";

import Link from "next/link";
import Image from "next/image";
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
            {/* Logo Image - Slim & Integrated */}
            <div className="relative flex-shrink-0">
                <div className="relative flex h-12 w-12 items-center justify-center rounded-xl shadow-xl shadow-blue-500/25 group-hover:shadow-xl group-hover:shadow-blue-500/35 transition-all duration-300">
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/20 to-transparent" />
                    <Image
                        src="https://i.ibb.co.com/JFs6zhXY/logo.png"
                        alt="SkillBridge Logo"
                        width={100}
                        height={100}
                        priority
                        unoptimized={true}
                        className="w-8 h-8 object-contain opacity-90"
                    />
                </div>
            </div>

            {/* Logo Text */}
            {!collapsed && (
                <div className="flex flex-col overflow-hidden whitespace-nowrap">
                    <span className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                        {title}
                    </span>
                    <span className="text-[10px] font-medium tracking-wider text-blue-500 dark:text-blue-400 opacity-80 uppercase">
                        {subtitle}
                    </span>
                </div>
            )}
        </Link>
    );
};