"use client";

import { RoleGuard } from "@/components/auth/role-guard";
import { Navbar } from "@/components/layout/navbar";

export default function TutorLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <RoleGuard allowedRoles={["TUTOR"]}>
      <div className="min-h-screen" style={{ backgroundColor: "var(--bg)" }}>
        <Navbar />
        <main className="container mx-auto px-4 py-8 lg:py-12 animate-fade-in">
          {children}
        </main>
      </div>
    </RoleGuard>
  );
}
