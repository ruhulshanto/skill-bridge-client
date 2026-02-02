"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import TutorCard from "./tutor-card";
import { apiClient } from "@/lib/api";

export default function TutorGrid() {
  const [tutors, setTutors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const searchParams = useSearchParams();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const fetchTutors = async () => {
      try {
        setLoading(true);

        const params: any = {};
        const category = searchParams.get("category");
        const search = searchParams.get("search");
        const minRating = searchParams.get("minRating");
        const maxRate = searchParams.get("maxRate");

        if (category) params.category = category;
        if (search) params.search = search;
        if (minRating) params.minRating = minRating;
        if (maxRate) params.maxRate = maxRate;
        
        // Show all tutors by default - set high limit
        params.limit = 100; // Show up to 100 tutors by default
        params.page = 1;

        console.log('Fetching tutors with params:', params);
        const response = await apiClient.getTutors(params);

        console.log('API Response:', response);
        
        // The API returns { data: [...], pagination: {...} }
        if (response && response.data && Array.isArray(response.data.data)) {
          console.log('Successfully loaded', response.data.data.length, 'tutors');
          setTutors(response.data.data);
          // Capture total count from pagination
          const responseData = response.data as any;
          if (responseData.meta && responseData.meta.total !== undefined) {
            setTotalCount(responseData.meta.total);
            console.log('Total tutors available:', responseData.meta.total);
          } else if (responseData.pagination && responseData.pagination.total !== undefined) {
            setTotalCount(responseData.pagination.total);
            console.log('Total tutors available:', responseData.pagination.total);
          }
        } else if (response && response.data && Array.isArray(response.data)) {
          // Fallback if structure is different
          console.log('Successfully loaded', response.data.length, 'tutors (direct array)');
          setTutors(response.data);
          setTotalCount(response.data.length);
        } else {
          console.error('Invalid response structure:', response);
          setError("Failed to fetch tutors - invalid response format");
        }
      } catch (err) {
        console.error('Error fetching tutors:', err);
        setError("Failed to fetch tutors");
      } finally {
        setLoading(false);
      }
    };

    fetchTutors();
  }, [mounted, searchParams]);

  if (!mounted || loading) {
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
        <button onClick={() => window.location.reload()} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
          Retry
        </button>
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
    <div>
      {/* Show count information */}
      <div className="mb-4 text-sm text-muted-foreground">
        {totalCount > 0 ? (
          <span>Showing {tutors.length} of {totalCount} tutors</span>
        ) : (
          <span>Showing {tutors.length} tutors</span>
        )}
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {tutors.map((tutor: any) => (
          <TutorCard key={tutor.id} tutor={tutor} />
        ))}
      </div>
    </div>
  );
}
