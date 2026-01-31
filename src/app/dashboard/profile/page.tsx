"use client";

import { useAuth } from "@/contexts/auth-context";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function StudentProfilePage() {
  const { user } = useAuth();
  const u = user as { name?: string; email?: string; role?: string };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Profile</h1>
        <p className="text-muted-foreground">Manage your account info.</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Your info</CardTitle>
          <CardDescription>Update name, email, etc. (form can be wired to auth update.)</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <p><span className="font-medium">Name:</span> {u?.name ?? "—"}</p>
          <p><span className="font-medium">Email:</span> {u?.email ?? "—"}</p>
          <p><span className="font-medium">Role:</span> {u?.role ?? "—"}</p>
        </CardContent>
      </Card>
    </div>
  );
}
