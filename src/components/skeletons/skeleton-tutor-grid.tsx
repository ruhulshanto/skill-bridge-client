"use client";

import { SkeletonCard } from "@/components/skeletons/skeleton-card";

export function SkeletonTutorGrid() {
  return (
    <div>
      <div className="mb-4">
        <div className="h-4 w-44 rounded bg-[var(--bg-subtle)] animate-pulse" />
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <SkeletonCard count={6} />
      </div>
    </div>
  );
}

