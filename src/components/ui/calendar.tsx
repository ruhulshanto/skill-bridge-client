"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { DayPicker } from "react-day-picker"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

export type CalendarProps = React.ComponentProps<typeof DayPicker>

function Calendar({
    className,
    classNames,
    showOutsideDays = true,
    ...props
}: CalendarProps) {
    return (
        <DayPicker
            showOutsideDays={showOutsideDays}
            className={cn("p-3", className)}
            classNames={{
                months: "flex flex-col sm:flex-row gap-4",
                month: "flex flex-col gap-4",
                caption: "flex justify-center pt-1 relative items-center w-full",
                caption_label: "text-sm font-medium",
                nav: "flex items-center gap-1",
                button_previous: cn(
                    buttonVariants({ variant: "outline" }),
                    "absolute left-1 h-7 w-7 bg-transparent p-0 opacity-60 hover:opacity-100"
                ),
                button_next: cn(
                    buttonVariants({ variant: "outline" }),
                    "absolute right-1 h-7 w-7 bg-transparent p-0 opacity-60 hover:opacity-100"
                ),
                month_grid: "w-full border-collapse",
                weekdays: "grid grid-cols-7 gap-1",
                weekday:
                    "text-muted-foreground text-center rounded-md w-9 h-9 leading-9 font-semibold text-[0.78rem]",
                week: "grid grid-cols-7 gap-1 mt-1",
                day: "h-9 w-9 p-0 text-center text-sm relative",
                day_button: cn(
                    buttonVariants({ variant: "ghost" }),
                    "h-9 w-9 p-0 font-normal aria-selected:opacity-100 rounded-full"
                ),
                selected:
                    "border-2 border-[var(--accent)] bg-[var(--bg-subtle)] text-[var(--text)] hover:bg-[var(--border)] focus:bg-[var(--bg-subtle)] font-semibold rounded-full shadow-sm",
                today:
                    "text-[var(--text-muted)] font-semibold bg-[var(--bg-card)] rounded-full ring-1 ring-[var(--border)]",
                outside: "text-muted-foreground opacity-35",
                disabled: "opacity-40 cursor-not-allowed",
                hidden: "invisible",
                ...classNames,
            }}
            components={{
                Chevron: ({ orientation }: { orientation: "left" | "right" }) =>
                    orientation === "left" ? (
                        <ChevronLeft className="h-4 w-4" />
                    ) : (
                        <ChevronRight className="h-4 w-4" />
                    ),
            } as any}
            {...props}
        />
    )
}
Calendar.displayName = "Calendar"

export { Calendar }
