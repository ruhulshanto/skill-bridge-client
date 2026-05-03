"use client";

import { RoleGuard } from "@/components/auth/role-guard";
import { Navbar } from "@/components/layout/navbar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Calendar, User } from "lucide-react";
import { cn } from "@/lib/utils";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const navItems = [
    {
      href: "/dashboard",
      label: "Overview",
      icon: Home,
    },
    {
      href: "/dashboard/bookings",
      label: "My Bookings",
      icon: Calendar,
    },
    {
      href: "/dashboard/profile",
      label: "Profile",
      icon: User,
    },
  ];

  return (
    <RoleGuard allowedRoles={["STUDENT"]}>
      <div className="min-h-screen bg-background">
        <Navbar />
        <nav className="border-b border-[var(--border)] bg-[var(--bg-card)] px-4 py-4">
          <div className="container mx-auto">
            <div className="flex flex-wrap gap-2">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-colors border",
                      isActive
                        ? "bg-[var(--accent)] text-[var(--text)] border-[var(--border)]"
                        : "bg-transparent text-[var(--text-muted)] border-transparent hover:bg-[var(--bg-subtle)] hover:text-[var(--text)] hover:border-[var(--border)]"
                    )}
                  >
                    <item.icon className="h-4 w-4" />
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>
        </nav>
        <main className="container mx-auto px-4 py-6">{children}</main>
      </div>
    </RoleGuard>
  );
}
