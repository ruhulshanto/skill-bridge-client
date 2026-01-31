"use client";

import { useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";

type Role = "STUDENT" | "TUTOR" | "ADMIN";

interface RoleGuardProps {
  children: ReactNode;
  allowedRoles: Role[];
}

export function RoleGuard({ children, allowedRoles }: RoleGuardProps) {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;
    if (!user) {
      router.replace("/login");
      return;
    }
    const role = (user as { role?: string }).role;
    if (!role || !allowedRoles.includes(role as Role)) {
      if (role === "STUDENT") router.replace("/dashboard");
      else if (role === "TUTOR") router.replace("/tutor/dashboard");
      else if (role === "ADMIN") router.replace("/admin");
      else router.replace("/");
    }
  }, [user, isLoading, allowedRoles, router]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }
  if (!user) return null;
  const role = (user as { role?: string }).role;
  if (!role || !allowedRoles.includes(role as Role)) return null;
  return <>{children}</>;
}
