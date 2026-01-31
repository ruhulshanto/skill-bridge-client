"use client";

import { RoleGuard } from "@/components/auth/role-guard";
import { Navbar } from "@/components/layout/navbar";
import Link from "next/link";

export default function TutorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RoleGuard allowedRoles={["TUTOR"]}>
      <div className="min-h-screen">
        <Navbar />
        <nav className="border-b bg-muted/40 px-4 py-2">
          <div className="flex gap-4">
            <Link href="/tutor/dashboard" className="text-sm font-medium hover:underline">
              Dashboard
            </Link>
            <Link href="/tutor/availability" className="text-sm font-medium hover:underline">
              Availability
            </Link>
            <Link href="/tutor/profile" className="text-sm font-medium hover:underline">
              Profile
            </Link>
          </div>
        </nav>
        <main className="container mx-auto px-4 py-6">{children}</main>
      </div>
    </RoleGuard>
  );
}
