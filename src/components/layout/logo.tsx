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
        <Link href="/" className={cn(
            "group flex items-center transition-all hover:scale-[1.02] active:scale-95", 
            collapsed ? "justify-center" : "gap-3",
            className
        )}>
            {/* Logo Image - Slim & Integrated */}
            <div className="relative flex-shrink-0">
                <div className="relative flex h-12 w-12 items-center justify-center rounded-xl shadow-xl transition-all duration-300 group-hover:shadow-2xl"
                    style={{ 
                        backgroundColor: "var(--bg-card)",
                        boxShadow: "0 10px 25px -5px rgb(var(--primary) / 0.25)",
                        border: "1px solid var(--border)"
                    }}
                >
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
                <div className="flex flex-col -space-y-1.5">
                    <div className="flex items-center">
                        <span className="text-2xl font-black tracking-tighter transition-all group-hover:tracking-tight" style={{ color: "var(--text)" }}>
                            Skill
                        </span>
                        <span className="text-2xl font-black tracking-tighter group-hover:tracking-tight transition-all" style={{ color: "var(--accent)" }}>
                            Bridge
                        </span>
                        <div className="ml-1 h-1.5 w-1.5 rounded-full animate-pulse" style={{ backgroundColor: "var(--accent)" }} />
                    </div>
                    <span className="text-[8px] font-black tracking-[0.25em] uppercase pt-1 pl-0.5 opacity-80" style={{ color: "var(--text-muted)" }}>
                        {subtitle}
                    </span>
                </div>
            )}
        </Link>
    );
};