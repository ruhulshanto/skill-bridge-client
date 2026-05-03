import * as React from "react";
import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "h-10 w-full px-3 py-2 rounded-lg text-sm transition-colors duration-200",
        "placeholder:text-[var(--text-faint)]",
        "focus:outline-none focus:ring-2 focus:ring-[var(--border)]",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "file:border-0 file:bg-transparent file:text-sm file:font-medium",
        className,
      )}
      style={{
        backgroundColor: "var(--bg-card)",
        border: "1px solid var(--border)",
        color: "var(--text)",
      }}
      {...props}
    />
  );
}

export { Input };
