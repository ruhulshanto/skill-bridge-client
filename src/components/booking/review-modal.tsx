"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Star, X, MessageSquare } from "lucide-react";
import { useAuth } from "@/contexts/auth-context";

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  booking: {
    id: string;
    tutor: {
      user: {
        name: string;
        image?: string;
      };
    };
    date: string;
    startTime: string;
    endTime: string;
  };
  onReviewSubmitted?: () => void;
}

export default function ReviewModal({ isOpen, onClose, booking, onReviewSubmitted }: ReviewModalProps) {
  const { user } = useAuth();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hoveredStar, setHoveredStar] = useState(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (rating === 0) {
      alert("Please select a rating");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000'}/api/reviews`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          bookingId: booking.id,
          rating,
          comment: comment.trim() || undefined,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || 'Failed to submit review');
      }

      const data = await response.json();
      console.log("Review submitted successfully:", data);
      
      alert("Review submitted successfully!");
      setRating(0);
      setComment("");
      onClose();
      
      if (onReviewSubmitted) {
        onReviewSubmitted();
      }
    } catch (error) {
      console.error("Error submitting review:", error);
      alert(error instanceof Error ? error.message : "Failed to submit review. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl">Leave a Review</CardTitle>
              <CardDescription>
                Share your experience with {booking.tutor.user.name}
              </CardDescription>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-8 w-8 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Tutor Info */}
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                {booking.tutor.user.image ? (
                  <img
                    src={booking.tutor.user.image}
                    alt={booking.tutor.user.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                ) : (
                  <span className="text-sm font-medium">
                    {booking.tutor.user.name.charAt(0)}
                  </span>
                )}
              </div>
              <div>
                <p className="font-medium">{booking.tutor.user.name}</p>
                <p className="text-sm text-gray-500">
                  {new Date(booking.date).toLocaleDateString()} • {booking.startTime} - {booking.endTime}
                </p>
              </div>
            </div>

            {/* Rating */}
            <div>
              <label className="block text-sm font-medium mb-2">Rating *</label>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    className="p-1 transition-colors"
                    onMouseEnter={() => setHoveredStar(star)}
                    onMouseLeave={() => setHoveredStar(0)}
                    onClick={() => setRating(star)}
                  >
                    <Star
                      className={`h-6 w-6 ${
                        star <= (hoveredStar || rating)
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  </button>
                ))}
              </div>
              {rating > 0 && (
                <p className="text-sm text-gray-600 mt-1">
                  {rating === 5 && "Excellent"}
                  {rating === 4 && "Very Good"}
                  {rating === 3 && "Good"}
                  {rating === 2 && "Fair"}
                  {rating === 1 && "Poor"}
                </p>
              )}
            </div>

            {/* Comment */}
            <div>
              <label htmlFor="comment" className="block text-sm font-medium mb-2">
                Comment (optional)
              </label>
              <Textarea
                id="comment"
                placeholder="Share your experience with this tutor..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={4}
                maxLength={500}
              />
              <p className="text-xs text-gray-500 mt-1">
                {comment.length}/500 characters
              </p>
            </div>

            {/* Actions */}
            <div className="flex gap-2 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1"
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1"
                disabled={isSubmitting || rating === 0}
              >
                {isSubmitting ? "Submitting..." : "Submit Review"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
