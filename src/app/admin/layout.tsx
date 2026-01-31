"use client";

import { RoleGuard } from "@/components/auth/role-guard";
import { Navbar } from "@/components/layout/navbar";
import Link from "next/link";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RoleGuard allowedRoles={["ADMIN"]}>
      <div className="min-h-screen">
        <Navbar />
        <nav className="border-b bg-muted/40 px-4 py-2">
          <div className="flex gap-4">
            <Link href="/admin" className="text-sm font-medium hover:underline">
              Dashboard
            </Link>
            <Link href="/admin/users" className="text-sm font-medium hover:underline">
              Users
            </Link>
            <Link href="/admin/bookings" className="text-sm font-medium hover:underline">
              Bookings
            </Link>
            <Link href="/admin/categories" className="text-sm font-medium hover:underline">
              Categories
            </Link>
          </div>
        </nav>
        <main className="container mx-auto px-4 py-6">{children}</main>
      </div>
    </RoleGuard>
  );
}
