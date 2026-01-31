"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function TutorProfilePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Tutor Profile</h1>
        <p className="text-muted-foreground">Edit your tutor info and subjects.</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Profile & subjects</CardTitle>
          <CardDescription>
            Form for bio, hourlyRate, experience, education, subjects. Submit to PUT /api/tutor/profile.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Wire a form here for tutor profile fields and subject IDs, then call the API.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
