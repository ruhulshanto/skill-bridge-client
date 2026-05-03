"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { X, Star, Users, DollarSign } from "lucide-react";
import { apiClient } from "@/lib/api";

interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  color?: string;
  tutorCount?: number;
  subjects?: { id: string; name: string; slug: string }[];
}

export default function TutorFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [categories, setCategories] = useState<Category[]>([]);
  const [priceRange, setPriceRange] = useState([0, 200]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(200);
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(true);

  const currentCategory = searchParams.get("category");
  const currentSearch = searchParams.get("search");
  const currentMinRating = searchParams.get("minRating");
  const currentMinRate = searchParams.get("minRate");
  const currentMaxRate = searchParams.get("maxRate");
  const currentFree = searchParams.get("free");

  // Fetch categories and price stats on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [categoriesRes, statsRes] = await Promise.all([
          apiClient.getCategories(),
          apiClient.getTutorStats(),
        ]);

        if (categoriesRes && categoriesRes.data) {
          const cats = Array.isArray(categoriesRes.data)
            ? categoriesRes.data
            : (categoriesRes.data as any)?.data || [];
          setCategories(cats as Category[]);
        }

        if (statsRes && statsRes.data) {
          const stats = statsRes.data as { minPrice: number; maxPrice: number; avgPrice: number };
          setMinPrice(Math.min(stats.minPrice || 0, 0));
          const max = Math.max(stats.maxPrice || 200, 200);
          setMaxPrice(max);
          // Set initial slider range if URL doesn't override
          if (!currentMaxRate) {
            setPriceRange([0, max]);
          }
        }
      } catch (error) {
        console.error("Error fetching filter data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Sync state from URL params
  useEffect(() => {
    const ratingParam = searchParams.get("minRating");
    const minRateParam = searchParams.get("minRate");
    const maxRateParam = searchParams.get("maxRate");

    if (ratingParam) {
      setRating(parseFloat(ratingParam));
    } else {
      setRating(0);
    }

    // Sync price range from URL – store actual numbers internally
    const min = minRateParam ? parseInt(minRateParam) : minPrice;
    const max = maxRateParam ? parseInt(maxRateParam) : maxPrice;
    setPriceRange([min, max]);
  }, [searchParams, minPrice, maxPrice]);

  const updateFilters = (newParams: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(newParams).forEach(([key, value]) => {
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });

    router.push(`/tutors?${params.toString()}`);
  };

  const clearAllFilters = () => {
    router.push("/tutors");
    setRating(0);
    setPriceRange([minPrice, maxPrice]);
  };

  const hasActiveFilters =
    currentCategory ||
    currentSearch ||
    rating > 0 ||
    currentMinRate !== null ||
    currentMaxRate !== null ||
    currentFree === "true";

  const getCategoryDisplay = () => {
    if (currentCategory) {
      const cat = categories.find((c) => c.slug === currentCategory);
      return cat ? cat.name : currentCategory;
    }
    return null;
  };

  // If still loading, show minimal filter
  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="h-10 bg-muted animate-pulse rounded" />
            <div className="h-10 bg-muted animate-pulse rounded" />
            <div className="h-24 bg-muted animate-pulse rounded" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Filters</CardTitle>
          {hasActiveFilters && (
            <Button variant="ghost" size="sm" onClick={clearAllFilters} className="text-xs">
              Clear all
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Categories */}
        <div>
          <h3 className="font-medium mb-3 flex items-center gap-2">
            <Users className="h-4 w-4" />
            Category
          </h3>
          <div className="space-y-1">
            {/* All Tutors button */}
            <Button
              variant={!currentCategory ? "default" : "ghost"}
              size="sm"
              className="w-full justify-start font-semibold"
              onClick={() => updateFilters({ category: null })}
            >
              All Tutors
              <span className="ml-auto text-xs font-normal opacity-70">
                {categories.reduce((sum, c) => sum + (c.tutorCount || 0), 0)}
              </span>
            </Button>

            {categories.map((category) => (
              <Button
                key={category.slug}
                variant={currentCategory === category.slug ? "default" : "ghost"}
                size="sm"
                className="w-full justify-start"
                onClick={() =>
                  updateFilters({ category: currentCategory === category.slug ? null : category.slug })
                }
              >
                <span className="truncate">{category.name}</span>
                <span className="ml-auto text-xs font-normal opacity-70">
                  {category.tutorCount || 0}
                </span>
              </Button>
            ))}
          </div>
        </div>

        {/* Free Tutors Toggle */}
        <div>
          <h3 className="font-medium mb-3">Special Filters</h3>
          <Button
            variant={currentFree === "true" ? "default" : "ghost"}
            size="sm"
            className="w-full justify-start"
            onClick={() => {
              const newValue = currentFree === "true" ? null : "true";
              const newParams: Record<string, string | null> = { free: newValue };
              // If enabling free, clear maxRate to avoid conflict
              if (newValue === "true") {
                newParams.maxRate = null;
              }
              updateFilters(newParams);
            }}
          >
            <DollarSign className="h-4 w-4 mr-2" />
            Free Tutors Only
          </Button>
        </div>

        {/* Price Filter */}
        <div>
          <h3 className="font-medium mb-3 flex items-center gap-2">
            <DollarSign className="h-4 w-4" />
            Price Range ($/hr)
          </h3>

          {/* Free Tutors Toggle */}
          <Button
            variant={currentFree === "true" ? "default" : "outline"}
            size="sm"
            className="w-full mb-3"
            onClick={() => {
              const newValue = currentFree === "true" ? null : "true";
              updateFilters({ free: newValue, minRate: null, maxRate: null });
            }}
          >
            <DollarSign className="h-4 w-4 mr-2" />
            {currentFree === "true" ? "Showing Free Tutors" : "Free Tutors Only"}
          </Button>

          {/* Custom Min/Max Inputs - disabled when free filter active */}
          {currentFree !== "true" && (
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                {/* Min Price */}
                <div>
                  <label className="text-xs mb-1 block" style={{ color: "var(--text-muted)" }}>
                    Min ($)
                  </label>
                  <input
                    type="number"
                    min={minPrice}
                    max={maxPrice}
                    value={currentMinRate ? priceRange[0] : ""}
                    onChange={(e) => {
                      const raw = e.target.value;
                      if (raw === "") {
                        setPriceRange([minPrice, priceRange[1]]);
                        updateFilters({ minRate: null });
                      } else {
                        const val = parseInt(raw) || minPrice;
                        const newMin = Math.min(val, priceRange[1] - 5);
                        setPriceRange([newMin, priceRange[1]]);
                        updateFilters({ minRate: newMin.toString() });
                      }
                    }}
                    onBlur={(e) => {
                      const raw = e.target.value;
                      if (raw === "" || isNaN(parseInt(raw))) {
                        setPriceRange([minPrice, priceRange[1]]);
                      } else {
                        const val = parseInt(raw);
                        const clamped = Math.max(minPrice, Math.min(val, priceRange[1] - 5));
                        setPriceRange([clamped, priceRange[1]]);
                      }
                    }}
                    className="w-full px-3 py-2 text-sm rounded-md border"
                    style={{
                      backgroundColor: "var(--bg-subtle)",
                      borderColor: "var(--border)",
                      color: "var(--text)",
                    }}
                    placeholder="e.g. 25"
                  />
                </div>

                {/* Max Price */}
                <div>
                  <label className="text-xs mb-1 block" style={{ color: "var(--text-muted)" }}>
                    Max ($)
                  </label>
                  <input
                    type="number"
                    min={minPrice}
                    max={maxPrice}
                    value={currentMaxRate ? priceRange[1] : ""}
                    onChange={(e) => {
                      const raw = e.target.value;
                      if (raw === "") {
                        setPriceRange([priceRange[0], maxPrice]);
                        updateFilters({ maxRate: null });
                      } else {
                        const val = parseInt(raw) || maxPrice;
                        const newMax = Math.max(val, priceRange[0] + 5);
                        setPriceRange([priceRange[0], newMax]);
                        updateFilters({ maxRate: newMax.toString() });
                      }
                    }}
                    onBlur={(e) => {
                      const raw = e.target.value;
                      if (raw === "" || isNaN(parseInt(raw))) {
                        setPriceRange([priceRange[0], maxPrice]);
                      } else {
                        const val = parseInt(raw);
                        const clamped = Math.max(priceRange[0] + 5, Math.min(val, maxPrice));
                        setPriceRange([priceRange[0], clamped]);
                      }
                    }}
                    className="w-full px-3 py-2 text-sm rounded-md border"
                    style={{
                      backgroundColor: "var(--bg-subtle)",
                      borderColor: "var(--border)",
                      color: "var(--text)",
                    }}
                    placeholder="e.g. 80"
                  />
                </div>
              </div>

              {/* Current range display */}
              <div className="text-xs text-center" style={{ color: "var(--text-faint)" }}>
                {currentMinRate || currentMaxRate ? (
                  <span>
                    Filter: ${priceRange[0]} – ${priceRange[1]}
                    {priceRange[1] === maxPrice && "+"}
                  </span>
                ) : (
                  <span>All prices (${minPrice}–${maxPrice}+)</span>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Rating */}
        <div>
          <h3 className="font-medium mb-3 flex items-center gap-2">
            <Star className="h-4 w-4" />
            Minimum Rating
          </h3>
          <div className="space-y-1">
            {[4.5, 4, 3, 2, 1].map((value) => (
              <Button
                key={value}
                variant={rating === value ? "default" : "ghost"}
                size="sm"
                className="w-full justify-start"
                onClick={() => {
                  const newRating = rating === value ? 0 : value;
                  setRating(newRating);
                  updateFilters({ minRating: newRating === 0 ? null : newRating.toString() });
                }}
              >
                <div className="flex items-center gap-2">
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  <span>{value}+ Stars</span>
                </div>
              </Button>
            ))}
          </div>
        </div>

        {/* Active Filters */}
        {hasActiveFilters && (
          <div>
            <h3 className="font-medium mb-3">Active Filters</h3>
            <div className="flex flex-wrap gap-2">
              {currentCategory && (
                <Badge variant="secondary" className="gap-1">
                  {getCategoryDisplay()}
                  <X
                    className="h-3 w-3 cursor-pointer"
                    onClick={() => updateFilters({ category: null })}
                  />
                </Badge>
              )}
              {rating > 0 && (
                <Badge variant="secondary" className="gap-1">
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  {rating}+ Stars
                  <X
                    className="h-3 w-3 cursor-pointer"
                    onClick={() => {
                      setRating(0);
                      updateFilters({ minRating: null });
                    }}
                  />
                </Badge>
              )}
               {(currentMinRate !== null || currentMaxRate !== null) && (
                <Badge variant="secondary" className="gap-1">
                  ${priceRange[0]} - ${priceRange[1]}
                  <X
                    className="h-3 w-3 cursor-pointer"
                    onClick={() => {
                      setPriceRange([minPrice, maxPrice]);
                      updateFilters({ minRate: null, maxRate: null });
                    }}
                  />
                </Badge>
              )}
              {currentFree === "true" && (
                <Badge variant="secondary" className="gap-1">
                  <DollarSign className="h-3 w-3" />
                  Free Only
                  <X
                    className="h-3 w-3 cursor-pointer"
                    onClick={() => updateFilters({ free: null })}
                  />
                </Badge>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
