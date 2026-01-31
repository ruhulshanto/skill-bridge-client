"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminCategoriesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Categories</h1>
        <p className="text-muted-foreground">Manage subject categories.</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Category list</CardTitle>
          <CardDescription>
            GET /api/admin/categories, POST /api/admin/categories, PATCH /api/admin/categories/:id, DELETE /api/admin/categories/:id.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Wire a table and form: list categories (name, slug, description), add/edit/delete with API calls.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
