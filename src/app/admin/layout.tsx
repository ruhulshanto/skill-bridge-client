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
      <div className="h-full relative min-h-screen" style={{ backgroundColor: "#F0F8FF" }}>
        {/* Sidebar wraps the main content to handle dynamic padding */}
        <AdminSidebar>
          <main className="min-h-screen transition-all duration-500">
            <div className="h-full p-4 md:p-8 pt-24 md:pt-8 lg:p-10">
              {children}
            </div>
          </main>
        </AdminSidebar>
      </div>
    </RoleGuard>
  );
}
