"use client";

import { useState, useEffect } from "react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Star, MapPin, Clock, ShieldCheck, MessageCircle, Users, BookOpen } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { apiClient } from "@/lib/api";
import { useAuth } from "@/contexts/auth-context";
import BookingModal from "@/components/booking/booking-modal";
import LoginPromptModal from "@/components/auth/login-prompt-modal";
import { User, TutorProfile } from "@/types";

interface Review {
  id: string;
  user: string;
  userImage?: string | null;
  rating: number;
  comment?: string | null;
  createdAt: string;
}

type Tutor = User & { tutorProfile: TutorProfile };
type TutorApiPayload = Tutor & { reviews?: Review[] };

export default function TutorDetailPage() {
  const { user } = useAuth();
  const params = useParams();
  const tutorId = params?.id as string;

  const [tutor, setTutor] = useState<Tutor | null>(null);
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [reviewsLoading, setReviewsLoading] = useState(true);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isLoginPromptOpen, setIsLoginPromptOpen] = useState(false);

  useEffect(() => {
    const fetchTutor = async () => {
      if (!tutorId) return;
      try {
        setLoading(true);
        setReviewsLoading(true);

        const response = await apiClient.getTutorById(tutorId);
        const raw = response?.data as { data?: TutorApiPayload } | TutorApiPayload | undefined;
        const payload = raw && typeof raw === "object" && "data" in raw && raw.data !== undefined
          ? raw.data
          : (raw as TutorApiPayload | undefined);

        if (payload) {
          const { reviews: incoming, ...rest } = payload;

          setTutor(rest);

          if (Array.isArray(incoming)) {
            setReviews(incoming);
          } else if (payload.tutorProfile?.id) {
            const r = await apiClient.getTutorReviews(payload.tutorProfile.id);
            if (!r.error && Array.isArray(r.data)) setReviews(r.data as Review[]);
            else setReviews([]);
          } else {
            setReviews([]);
          }
        }
      } catch (error) {
        console.error("Error fetching tutor:", error);
      } finally {
        setLoading(false);
        setReviewsLoading(false);
      }
    };

    fetchTutor();
  }, [tutorId]);

  if (loading) {
    return (
      <Container className="py-20">
        <div className="animate-pulse space-y-8">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="h-40 w-40 rounded-full bg-muted"></div>
            <div className="flex-1 space-y-4">
              <div className="h-10 bg-muted rounded w-1/3"></div>
              <div className="h-6 bg-muted rounded w-2/3"></div>
              <div className="flex gap-4">
                <div className="h-6 bg-muted rounded w-20"></div>
                <div className="h-6 bg-muted rounded w-24"></div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    );
  }

  if (!tutor || !tutor.tutorProfile) {
    return (
      <Container className="py-20 text-center">
        <h1 className="text-3xl font-bold mb-4">Tutor Profile Incomplete</h1>
        <p className="text-muted-foreground mb-8">The tutor you're looking for hasn't completed their profile yet.</p>
        <Button asChild>
          <Link href="/tutors">Browse All Tutors</Link>
        </Button>
      </Container>
    );
  }

  const profile = tutor.tutorProfile;
  const hourlyRate = profile.hourlyRate;

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Hero Section */}
      <div className="border-b">
        <Container className="py-12">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            {/* Profile Image */}
            <div className="relative">
              <Avatar className="h-40 w-40 md:h-48 md:w-48 border-4 border-background shadow-2xl">
                <AvatarImage src={tutor.image || `https://i.pravatar.cc/300?img=${tutor.name.split(' ')[0].toLowerCase()}`} alt={tutor.name} />
                <AvatarFallback className="text-4xl">{tutor.name.charAt(0)}</AvatarFallback>
              </Avatar>
            </div>

            {/* Profile Info */}
            <div className="flex-1">
              <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h1 className="text-3xl md:text-4xl font-bold">{tutor.name}</h1>
                    {profile.isVerified && (
                      <Badge variant="secondary" className="gap-1 bg-green-100 text-green-700 border-green-200">
                        <ShieldCheck className="h-3 w-3" /> Verified
                      </Badge>
                    )}
                  </div>
                  <p className="text-lg text-muted-foreground">{profile.bio?.substring(0, 120)}...</p>
                </div>
              </div>

              {/* Stats Row */}
              <div className="flex flex-wrap gap-6 text-sm mb-6">
                <div className="flex items-center gap-1.5">
                  {profile.totalReviews > 0 ? (
                    <>
                      <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      <span className="font-bold text-lg">{profile.rating.toFixed(1)}</span>
                      <span className="text-muted-foreground">
                        ({profile.totalReviews} {profile.totalReviews === 1 ? "review" : "reviews"})
                      </span>
                    </>
                  ) : (
                    <span className="text-muted-foreground">No reviews yet</span>
                  )}
                </div>
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>{profile.experience} years experience</span>
                </div>
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>Online</span>
                </div>
              </div>

              {/* Subject Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {profile.subjects?.map((s) => (
                  <Badge key={s.subject.id} variant="secondary" className="px-3 py-1">
                    {s.subject.name}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Booking Card */}
            <div className="w-full md:w-80 lg:w-96">
              <Card className="shadow-xl border-2 border-primary/10 overflow-hidden sticky top-24">
                <div className="bg-primary/5 p-6 border-b border-primary/10">
                  <div className="text-sm font-medium text-muted-foreground mb-1">Hourly Rate</div>
                  <div className="text-3xl font-bold">
                    {hourlyRate === 0 ? (
                      <span className="text-green-600">Free</span>
                    ) : (
                      <>
                        ${hourlyRate}
                        <span className="text-lg font-normal text-muted-foreground">/hr</span>
                      </>
                    )}
                  </div>
                </div>
                <CardContent className="p-6 space-y-4">
                  <Button
                    size="lg"
                    className="w-full text-lg font-semibold"
                    onClick={() => {
                      if (user) setIsBookingModalOpen(true);
                      else setIsLoginPromptOpen(true);
                    }}
                  >
                    Book a Trial Lesson
                  </Button>
                  <Button variant="outline" size="lg" className="w-full">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Message Tutor
                  </Button>

                  <div className="space-y-3 text-sm pt-4 border-t">
                    <div className="flex items-center gap-3">
                      <BookOpen className="h-4 w-4 text-primary" />
                      <span>{profile.experience} years teaching</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Users className="h-4 w-4 text-primary" />
                      <span>{profile.totalReviews} student reviews</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <ShieldCheck className="h-4 w-4 text-primary" />
                      <span>Verified Tutor</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </Container>
      </div>

      {/* Main Content */}
      <Container className="py-12">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Left Column - Tabs */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="about" className="w-full">
              <TabsList className="mb-8 w-full justify-start h-11">
                <TabsTrigger value="about" className="px-6">About</TabsTrigger>
                <TabsTrigger value="subjects" className="px-6">Subjects</TabsTrigger>
                <TabsTrigger value="reviews" className="px-6">
                  Reviews ({reviews.length})
                </TabsTrigger>
                <TabsTrigger value="education" className="px-6">Education</TabsTrigger>
              </TabsList>

              {/* About Tab */}
              <TabsContent value="about" className="space-y-8">
                <div className="prose prose-slate max-w-none">
                  <h2 className="text-2xl font-bold mb-4">About Me</h2>
                  <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                    {profile.bio || "No bio available."}
                  </p>
                </div>
              </TabsContent>

              {/* Subjects Tab */}
              <TabsContent value="subjects" className="space-y-6">
                <h2 className="text-2xl font-bold mb-6">Subjects Taught</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {profile.subjects?.map(({ subject }) => (
                    <Card key={subject.id} className="border hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <h3 className="font-semibold mb-2">{subject.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          Expert-level tutoring available
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* Reviews Tab */}
              <TabsContent value="reviews" className="space-y-6">
                {/* Reviews Summary */}
                <Card className="border border-[var(--border)] bg-[var(--bg-card)]">
                  <CardContent className="p-8">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-8">
                      <div className="text-center sm:text-left">
                        {reviews.length === 0 ? (
                          <>
                            <p className="text-lg font-semibold text-[var(--text)] mb-2">No reviews yet</p>
                            <p className="text-sm text-muted-foreground">
                              Ratings appear here after students complete sessions and leave feedback.
                            </p>
                          </>
                        ) : (
                          <>
                            <div className="text-5xl font-bold text-[var(--text)]">{profile.rating.toFixed(1)}</div>
                            <div className="flex justify-center sm:justify-start my-2">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-6 w-6 ${i < Math.round(profile.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                                />
                              ))}
                            </div>
                            <p className="text-sm text-muted-foreground mt-2">
                              Based on {profile.totalReviews}{" "}
                              {profile.totalReviews === 1 ? "student review" : "student reviews"}
                            </p>
                          </>
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="text-xl font-semibold mb-2 text-[var(--text)]">
                          {reviews.length === 0
                            ? "Be the first to book"
                            : profile.rating >= 4.5
                              ? "Highly rated tutor"
                              : profile.rating >= 4
                                ? "Strong track record"
                                : "Growing reputation"}
                        </p>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                          {reviews.length === 0
                            ? "Book a lesson and share your experience to help others choose the right tutor."
                            : profile.rating >= 4.5
                              ? "Recent students rate lessons and communication positively."
                              : "Feedback reflects real sessions with this tutor."}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Reviews List */}
                <div className="space-y-6">
                  {reviewsLoading ? (
                    <div className="flex justify-center py-12">
                      <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
                    </div>
                  ) : reviews.length === 0 ? (
                    <Card className="text-center py-12 border-dashed">
                      <CardContent>
                        <MessageCircle className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
                        <p className="text-muted-foreground">No reviews yet. Be the first to book a lesson!</p>
                      </CardContent>
                    </Card>
                  ) : (
                    reviews.map((review) => (
                      <Card key={review.id} className="p-6">
                        <div className="flex items-start gap-4">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={review.userImage || undefined} />
                            <AvatarFallback>{review.user.charAt(0) || "U"}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <p className="font-semibold">{review.user}</p>
                              <p className="text-xs text-muted-foreground">
                                {new Date(review.createdAt).toLocaleDateString('en-US', {
                                  month: 'short',
                                  day: 'numeric',
                                  year: 'numeric'
                                })}
                              </p>
                            </div>
                            <div className="flex text-yellow-400 mb-2">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${i < review.rating ? 'fill-current' : 'text-gray-200'}`}
                                />
                              ))}
                            </div>
                            {review.comment ? (
                              <p className="text-muted-foreground leading-relaxed">{review.comment}</p>
                            ) : (
                              <p className="text-xs text-muted-foreground italic">No written comment.</p>
                            )}
                          </div>
                        </div>
                      </Card>
                    ))
                  )}
                </div>
              </TabsContent>

              {/* Education Tab */}
              <TabsContent value="education" className="space-y-8">
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="mt-1 h-3 w-3 rounded-full bg-primary flex-shrink-0"></div>
                      <div>
                        <h3 className="text-lg font-semibold mb-1">Education</h3>
                        <p className="text-muted-foreground">{profile.education || 'Education details not provided.'}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="mt-1 h-3 w-3 rounded-full bg-primary flex-shrink-0"></div>
                      <div>
                        <h3 className="text-lg font-semibold mb-1">Experience</h3>
                        <p className="text-muted-foreground">{profile.experience} years of professional tutoring</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </Container>

      {/* Booking Modal */}
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        tutor={{
          id: tutor.id,
          tutorProfile: tutor.tutorProfile,
          name: tutor.name,
          image: tutor.image || undefined,
          rate: profile.hourlyRate,
          subject: profile.subjects?.[0]?.subject.name,
        }}
      />

      {/* Login Prompt */}
      <LoginPromptModal
        isOpen={isLoginPromptOpen}
        onClose={() => setIsLoginPromptOpen(false)}
      />
    </div>
  );
}
