"use client";

import { RoleGuard } from "@/components/auth/role-guard";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { AdminNavbar } from "@/components/admin/admin-navbar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RoleGuard allowedRoles={["ADMIN"]}>
      <div className="h-full relative bg-gray-50 dark:bg-gray-900">
        {/* Mobile Navbar */}
        <div className="md:hidden">
          <AdminNavbar />
        </div>

        {/* Desktop Sidebar */}
        <div className="hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 z-[80]">
          <AdminSidebar />
        </div>

        <main className="md:pl-72 min-h-screen pt-16 md:pt-0">
          <div className="h-full p-4 md:p-8">
            {children}
          </div>
        </main>
      </div>
    </RoleGuard>
  );
}
