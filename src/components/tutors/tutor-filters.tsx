"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

const categories = [
  { name: "Programming", slug: "programming" },
  { name: "Mathematics", slug: "mathematics" },
  { name: "Languages", slug: "languages" },
  { name: "Science", slug: "science" },
  { name: "Arts", slug: "arts" },
  { name: "Music", slug: "music" },
];

export default function TutorFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [priceRange, setPriceRange] = useState([0, 200]);
  const [rating, setRating] = useState(0);

  const currentCategory = searchParams.get("category");
  const currentSearch = searchParams.get("search");

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
    setPriceRange([0, 200]);
    setRating(0);
  };

  const hasActiveFilters = currentCategory || currentSearch || rating > 0 || priceRange[0] > 0 || priceRange[1] < 200;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Filters</CardTitle>
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAllFilters}
              className="text-xs"
            >
              Clear all
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Categories */}
        <div>
          <h3 className="font-medium mb-3">Category</h3>
          <div className="space-y-2">
            {categories.map((category) => (
              <Button
                key={category.slug}
                variant={currentCategory === category.slug ? "default" : "ghost"}
                size="sm"
                className="w-full justify-start"
                onClick={() => updateFilters({ category: currentCategory === category.slug ? null : category.slug })}
              >
                {category.name}
              </Button>
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div>
          <h3 className="font-medium mb-3">Price Range</h3>
          <div className="space-y-3">
            <Slider
              value={priceRange}
              onValueChange={(value) => {
                setPriceRange(value);
                updateFilters({
                  minRate: value[0] === 0 ? null : value[0].toString(),
                  maxRate: value[1] === 200 ? null : value[1].toString(),
                });
              }}
              max={200}
              step={5}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>${priceRange[0]}</span>
              <span>${priceRange[1]}</span>
            </div>
          </div>
        </div>

        {/* Rating */}
        <div>
          <h3 className="font-medium mb-3">Minimum Rating</h3>
          <div className="space-y-2">
            {[4, 3, 2, 1].map((value) => (
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
                {value}+ Stars
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
                  {categories.find(c => c.slug === currentCategory)?.name}
                  <X
                    className="h-3 w-3 cursor-pointer"
                    onClick={() => updateFilters({ category: null })}
                  />
                </Badge>
              )}
              {rating > 0 && (
                <Badge variant="secondary" className="gap-1">
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
              {(priceRange[0] > 0 || priceRange[1] < 200) && (
                <Badge variant="secondary" className="gap-1">
                  ${priceRange[0]} - ${priceRange[1]}
                  <X
                    className="h-3 w-3 cursor-pointer"
                    onClick={() => {
                      setPriceRange([0, 200]);
                      updateFilters({ minRate: null, maxRate: null });
                    }}
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
