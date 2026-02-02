"use client";

import { RoleGuard } from "@/components/auth/role-guard";
import { Navbar } from "@/components/layout/navbar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Calendar, User, Clock, Users } from "lucide-react";

export default function TutorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const navItems = [
    {
      href: "/tutor/dashboard",
      label: "Dashboard",
      icon: Home,
    },
    {
      href: "/tutor/sessions",
      label: "Sessions",
      icon: Calendar,
    },
    {
      href: "/tutor/students",
      label: "Students",
      icon: Users,
    },
    {
      href: "/tutor/availability",
      label: "Availability",
      icon: Clock,
    },
    {
      href: "/tutor/profile",
      label: "Profile",
      icon: User,
    },
  ];

  return (
    <RoleGuard allowedRoles={["TUTOR"]}>
      <div className="min-h-screen">
        <Navbar />
        <nav className="border-b bg-white px-4 py-4 shadow-sm">
          <div className="container mx-auto">
            <div className="flex gap-2">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${isActive
                        ? "bg-blue-600 text-white shadow-md"
                        : "text-gray-600 hover:text-blue-600 hover:bg-gray-100"
                      }`}
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
