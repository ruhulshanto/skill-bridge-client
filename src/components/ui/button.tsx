import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
  {
    variants: {
      variant: {
        default:     "bg-[var(--accent)] text-[#0A2540] hover:opacity-90 active:opacity-80 font-bold",
        secondary:   "bg-[var(--bg-subtle)] text-[var(--text)] hover:bg-[var(--border)] border border-[var(--border)]",
        outline:     "border border-[var(--border)] bg-transparent text-[var(--text)] hover:bg-[var(--bg-subtle)]",
        ghost:       "bg-transparent text-[var(--text-muted)] hover:bg-[var(--bg-subtle)] hover:text-[var(--text)]",
        destructive: "bg-red-600 text-white hover:bg-red-700",
        link:        "bg-transparent text-[var(--text)] underline-offset-4 hover:underline p-0 h-auto",
      },
      size: {
        xs:      "h-7 px-2.5 text-xs",
        sm:      "h-8 px-3 text-sm",
        default: "h-10 px-4 py-2",
        lg:      "h-11 px-6 text-base",
        xl:      "h-12 px-8 text-lg",
        icon:    "size-10",
        "icon-sm": "size-8",
        "icon-lg": "size-12",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  }
);

function Button({
  className, variant = "default", size = "default", asChild = false, ...props
}: React.ComponentProps<"button"> & VariantProps<typeof buttonVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
