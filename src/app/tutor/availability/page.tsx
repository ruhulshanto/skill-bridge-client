"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function TutorAvailabilityPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Availability</h1>
        <p className="text-muted-foreground">Set your available time slots.</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Time slots</CardTitle>
          <CardDescription>
            Form to set dayOfWeek, startTime, endTime. Submit to PUT /api/tutor/availability.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Wire a form here that sends an array of &#123; dayOfWeek, startTime, endTime, isAvailable &#125; to the API.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
