"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import TutorCard from "./tutor-card";

export default function TutorGrid() {
  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();

  useEffect(() => {
    const fetchTutors = async () => {
      try {
        setLoading(true);
        
        // Build query parameters
        const params = new URLSearchParams();
        const category = searchParams.get("category");
        const search = searchParams.get("search");
        const minRating = searchParams.get("minRating");
        const maxRate = searchParams.get("maxRate");
        
        if (category) params.append("category", category);
        if (search) params.append("search", search);
        if (minRating) params.append("minRating", minRating);
        if (maxRate) params.append("maxRate", maxRate);

        const response = await fetch(`/api/tutors?${params.toString()}`);
        const data = await response.json();
        
        if (response.ok) {
          setTutors(data.data || []);
        } else {
          setError(data.error?.message || "Failed to fetch tutors");
        }
      } catch (err) {
        setError("Failed to fetch tutors");
      } finally {
        setLoading(false);
      }
    };

    fetchTutors();
  }, [searchParams]);

  if (loading) {
    return (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="bg-muted animate-pulse rounded-lg h-64"></div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (tutors.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No tutors found matching your criteria.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {tutors.map((tutor: any) => (
        <TutorCard key={tutor.id} tutor={tutor} />
      ))}
    </div>
  );
}
