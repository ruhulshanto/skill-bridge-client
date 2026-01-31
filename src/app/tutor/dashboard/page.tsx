"use client";

import { useAuth } from "@/contexts/auth-context";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function TutorDashboardPage() {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Tutor Dashboard</h1>
        <p className="text-muted-foreground">
          Sessions and stats for {(user as { name?: string })?.name ?? "Tutor"}.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Sessions & stats</CardTitle>
            <CardDescription>
              View teaching sessions and earnings. Use GET /api/tutor/stats and GET /api/bookings/my.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild variant="outline">
              <Link href="/tutor/availability">Set Availability</Link>
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Profile</CardTitle>
            <CardDescription>Edit your tutor profile and subjects.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild>
              <Link href="/tutor/profile">Edit Profile</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
