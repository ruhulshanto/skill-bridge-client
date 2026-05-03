import { Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface ThemeToggleProps {
  scrolled?: boolean;
}

export function ThemeToggle({ scrolled }: ThemeToggleProps) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  if (!mounted) {
    return (
      <div className="h-10 w-10 rounded-lg flex items-center justify-center bg-[var(--bg-subtle)] border border-[var(--border)] opacity-0">
        <Sun className="h-4 w-4" style={{ color: "var(--text-muted)" }} />
      </div>
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      title={`Switch to ${isDark ? "light" : "dark"} mode`}
      className={cn(
        "h-10 w-10 rounded-lg flex items-center justify-center transition-all duration-300 relative group overflow-hidden",
        scrolled 
          ? "bg-primary/10 border-primary/30 text-primary shadow-lg shadow-primary/10" 
          : "bg-[var(--bg-subtle)] border border-[var(--border)] text-[var(--text-muted)]"
      )}
    >
      <div className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-5 transition-opacity" />
      {isDark ? (
        <Sun className="h-4 w-4 transition-transform duration-500 group-hover:rotate-90" />
      ) : (
        <Moon className="h-4 w-4 transition-transform duration-500 group-hover:-rotate-12" />
      )}
      <span className="sr-only">Toggle theme</span>
    </button>
  );
}
