"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminUsersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Users</h1>
        <p className="text-muted-foreground">Manage all users (students and tutors).</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>User list</CardTitle>
          <CardDescription>
            GET /api/admin/users (with session). PATCH /api/admin/users/:id for status (ban/unban).
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Wire a table here: fetch users, show name, email, role, status; add actions to update status.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
