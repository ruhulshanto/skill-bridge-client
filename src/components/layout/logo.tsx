import Link from "next/link";
import { GraduationCap } from "lucide-react";

export const Logo = () => {
    return (
        <Link href="/" className="flex items-center gap-2 transition-opacity hover:opacity-90">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm">
                <GraduationCap className="h-5 w-5" />
            </div>
            <span className="text-xl font-bold tracking-tight text-foreground">
                SkillBridge
            </span>
        </Link>
    );
};
