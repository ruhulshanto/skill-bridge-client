"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export function TutorHeaderSkeleton() {
  return (
    <div className="relative overflow-hidden rounded-[2.5rem] border border-[#a3c7e6] p-8 md:p-12 shadow-xl bg-[#e5f2ff]">
      <div className="relative z-10 space-y-10">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-4 rounded-full bg-white/50" />
            <Skeleton className="h-6 w-40 rounded-full bg-white/50" />
          </div>
          <Skeleton className="h-12 md:h-16 w-3/4 rounded-2xl bg-white/30" />
          <Skeleton className="h-6 w-full max-w-2xl rounded-xl bg-white/20" />
        </div>
        <div className="grid md:grid-cols-2 gap-8 pt-10 border-t border-[#a3c7e6]/30">
          {[1, 2].map((i) => (
            <div key={i} className="space-y-2 flex-1">
              <Skeleton className="h-3 w-32 bg-[#0A2540]/10" />
              <Skeleton className="h-12 w-full bg-[#2d6a9f]/10 rounded-xl" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}



export function TutorStatsSkeleton() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {[1, 2, 3, 4].map((i) => (
        <Card key={i} className="border border-[#a3c7e6] shadow-lg rounded-[2rem] bg-[#e5f2ff] overflow-hidden">
          <CardContent className="p-8">
            <div className="flex items-center justify-between mb-4">
              <Skeleton className="h-12 w-12 rounded-2xl bg-white" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-10 w-20 bg-white/40" />
              <Skeleton className="h-3 w-24 bg-white/20" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export function TutorQuickActionsSkeleton() {
  return (
    <Card className="overflow-hidden rounded-[2.5rem] border-[#a3c7e6] shadow-xl bg-[#e5f2ff]">
      <CardHeader className="bg-white/30 border-b border-[#a3c7e6]/50 p-8">
        <Skeleton className="h-8 w-48 bg-white/40" />
        <Skeleton className="h-3 w-32 bg-white/20 mt-2" />
      </CardHeader>
      <CardContent className="p-8">
        <div className="grid gap-4 sm:grid-cols-2">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="p-6 rounded-3xl border border-[#a3c7e6] bg-white/40 flex items-center justify-between">
              <div className="flex items-center gap-5">
                <div className="space-y-2">
                  <Skeleton className="h-5 w-32 bg-white/60" />
                  <Skeleton className="h-3 w-48 bg-white/30" />
                </div>
              </div>
              <Skeleton className="h-3 w-12 bg-white/20" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export function TutorSessionItemSkeleton() {
  return (
    <div className="border border-[#a3c7e6] shadow-md overflow-hidden rounded-[2.5rem] bg-white/60">
      <div className="flex flex-col lg:flex-row">
        <div className="hidden lg:flex w-40 flex-col items-center justify-center p-8 border-r border-[#a3c7e6]/30 bg-white/40 gap-2">
          <Skeleton className="h-3 w-12 bg-white/60" />
          <Skeleton className="h-12 w-12 bg-[#0A2540]/10 rounded-xl" />
          <Skeleton className="h-3 w-12 bg-white/40" />
        </div>
        <div className="flex-1 p-8 lg:p-10">
          <div className="flex flex-col lg:flex-row lg:items-center gap-10">
            <div className="flex items-center gap-6 lg:w-72">
              <Skeleton className="w-20 h-20 rounded-[1.5rem] bg-white shadow-lg" />
              <div className="space-y-2">
                <Skeleton className="h-6 w-32 bg-[#0A2540]/10" />
                <Skeleton className="h-3 w-40 bg-[#2d6a9f]/10" />
              </div>
            </div>
            <div className="flex-1 space-y-4">
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-8">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="space-y-2">
                    <Skeleton className="h-2 w-12 bg-[#2d6a9f]/10" />
                    <Skeleton className="h-4 w-24 bg-[#0A2540]/10" />
                  </div>
                ))}
              </div>
              <Skeleton className="h-12 w-full rounded-2xl bg-white/40" />
            </div>
            <div className="flex lg:flex-col gap-4 lg:w-56">
              <Skeleton className="h-10 w-full rounded-xl bg-white/60" />
              <Skeleton className="h-12 w-full rounded-xl bg-[#0A2540]/10" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function TutorDashboardSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-4 space-y-12 animate-fade-in">

      <TutorHeaderSkeleton />
      <TutorStatsSkeleton />
      <div className="grid gap-12 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-12">
          <TutorQuickActionsSkeleton />
          <Card className="overflow-hidden rounded-[2.5rem] border-[#a3c7e6] shadow-xl bg-[#e5f2ff]">
            <CardHeader className="bg-white/30 border-b border-[#a3c7e6]/50 p-8">
              <Skeleton className="h-8 w-48 bg-white/40" />
              <Skeleton className="h-3 w-32 bg-white/20 mt-2" />
            </CardHeader>
            <CardContent className="p-12 text-center">
              <Skeleton className="w-20 h-20 rounded-[2rem] bg-white mx-auto mb-6" />
              <Skeleton className="h-6 w-48 bg-white/40 mx-auto" />
              <Skeleton className="h-4 w-64 bg-white/20 mx-auto mt-4" />
            </CardContent>
          </Card>
        </div>
        <div className="space-y-8">
          <Card className="overflow-hidden rounded-[2.5rem] border-[#a3c7e6] shadow-xl bg-[#e5f2ff]">
            <CardHeader className="bg-white/30 border-b border-[#a3c7e6]/50 p-8">
              <Skeleton className="h-6 w-24 bg-white/40" />
            </CardHeader>
            <CardContent className="p-8 space-y-10">
              {[1, 2].map((i) => (
                <div key={i} className="space-y-4">
                  <div className="flex justify-between">
                    <Skeleton className="h-3 w-24 bg-white/40" />
                    <Skeleton className="h-3 w-12 bg-white/60" />
                  </div>
                  <Skeleton className="h-2 w-full rounded-full bg-white/50" />
                </div>
              ))}
              <Skeleton className="h-24 w-full rounded-3xl bg-white/50" />
              <Skeleton className="h-14 w-full rounded-xl bg-[#0A2540]/10" />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
