"use client";

import { useState, useEffect } from "react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Star, MapPin, Globe, CheckCircle2, MessageSquare, Clock, Calendar as CalendarIcon, ShieldCheck, Medal, Users } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { apiClient } from "@/lib/api";
import BookingModal from "@/components/booking/booking-modal";
import LoginPromptModal from "@/components/auth/login-prompt-modal";
import { useAuth } from "@/contexts/auth-context";

interface TutorData {
    id: string;
    name: string;
    headline?: string;
    bio?: string;
    subject?: string;
    rating?: number;
    reviews?: number;
    rate?: number;
    image?: string;
    tags?: string[];
    location?: string;
    languages?: string[];
    lessonsGiven?: number;
    students?: number;
    responseTime?: string;
    education?: Array<{
        degree: string;
        school: string;
        year: string;
    }>;
    reviewsList?: Array<{
        id: string;
        user: string;
        userImage?: string;
        rating: number;
        date: string;
        comment: string;
        createdAt: string;
    }>;
    tutorProfile?: {
        id: string;
        bio?: string;
        hourlyRate?: number;
        experience?: number;
        education?: string;
        rating?: number;
        totalReviews?: number;
        isVerified?: boolean;
    };
}

export default function TutorDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { user } = useAuth();
    const [tutor, setTutor] = useState<TutorData | null>(null);
    const [loading, setLoading] = useState(true);
    const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
    const [isLoginPromptOpen, setIsLoginPromptOpen] = useState(false);
    const [reviewsLoading, setReviewsLoading] = useState(false);
    const [id, setId] = useState<string>("");

    useEffect(() => {
        const getParams = async () => {
            try {
                const { id: paramId } = await params;
                setId(paramId);
            } catch (error) {
                console.error("Error resolving params:", error);
            }
        };
        getParams();
    }, [params]);

    // Fetch reviews when tutor data is loaded
    useEffect(() => {
        if (tutor?.tutorProfile?.id) {
            const fetchReviews = async () => {
                try {
                    const tutorProfileId = tutor.tutorProfile!.id;
                    console.log("Fetching reviews for tutor ID:", tutorProfileId);
                    setReviewsLoading(true);
                    const response: any = await apiClient.getTutorReviews(tutorProfileId);

                    console.log("Reviews response:", response);

                    let newReviews = [];
                    if (response.data && Array.isArray(response.data)) {
                        newReviews = response.data;
                    } else if (response.data && response.data.data && Array.isArray(response.data.data)) {
                        newReviews = response.data.data;
                    }

                    if (newReviews.length > 0) {
                        setTutor(prev => prev ? {
                            ...prev,
                            reviewsList: newReviews
                        } : null);
                    }
                } catch (error) {
                    console.error("Failed to fetch reviews:", error);
                } finally {
                    setReviewsLoading(false);
                }
            };

            // Fetch reviews to get structured data even if we have some from tutor fetch
            fetchReviews();
        }
    }, [tutor?.tutorProfile?.id]);

    useEffect(() => {
        if (id) {
            const fetchTutor = async () => {
                try {
                    setLoading(true);
                    // Use the public service logic via apiClient
                    const response = await apiClient.getTutorById(id);

                    if (!response.data) {
                        setTutor(null);
                    } else {
                        // Transform the API response to match expected format
                        const rawTutor = (response.data as any)?.data || response.data;

                        // Map initial reviews if they exist in the tutor response
                        const initialReviews = rawTutor.reviews && Array.isArray(rawTutor.reviews)
                            ? rawTutor.reviews.map((r: any) => ({
                                id: r.id,
                                user: r.student?.name || 'Anonymous',
                                userImage: r.student?.image,
                                rating: r.rating || 0,
                                date: r.booking?.date || new Date().toISOString(),
                                comment: r.comment || '',
                                createdAt: r.createdAt || new Date().toISOString()
                            }))
                            : [];

                        const tutorData: TutorData = {
                            id: rawTutor.id,
                            name: rawTutor.name || 'Unknown Tutor',
                            headline: rawTutor.tutorProfile?.bio?.substring(0, 100) + '...' || '',
                            bio: rawTutor.tutorProfile?.bio || '',
                            subject: rawTutor.tutorProfile?.subjects?.[0]?.subject?.name || 'General',
                            rating: rawTutor.tutorProfile?.rating || 0,
                            reviews: rawTutor.tutorProfile?.totalReviews || 0,
                            rate: rawTutor.tutorProfile?.hourlyRate ? Math.round(rawTutor.tutorProfile.hourlyRate / 100) : 0,
                            image: rawTutor.image || '/placeholder-tutor.jpg',
                            tags: rawTutor.tutorProfile?.subjects?.map((s: any) => s.subject.name) || [],
                            location: 'Remote',
                            languages: ['English'],
                            lessonsGiven: 0,
                            students: 0,
                            responseTime: '24 hours',
                            education: rawTutor.tutorProfile?.education ? [{
                                degree: rawTutor.tutorProfile.education,
                                school: 'University',
                                year: '2020'
                            }] : [],
                            reviewsList: initialReviews,
                            tutorProfile: rawTutor.tutorProfile ? {
                                id: rawTutor.tutorProfile.id,
                                bio: rawTutor.tutorProfile.bio,
                                hourlyRate: rawTutor.tutorProfile.hourlyRate,
                                experience: rawTutor.tutorProfile.experience,
                                education: rawTutor.tutorProfile.education,
                                rating: rawTutor.tutorProfile.rating,
                                totalReviews: rawTutor.tutorProfile.totalReviews,
                                isVerified: rawTutor.tutorProfile.isVerified,
                            } : undefined
                        };
                        setTutor(tutorData);
                    }
                } catch (error) {
                    console.error("Failed to fetch tutor:", error);
                    setTutor(null);
                } finally {
                    setLoading(false);
                }
            };

            fetchTutor();
        }
    }, [id]);

    if (loading) {
        return (
            <Container className="py-20">
                <div className="animate-pulse">
                    <div className="h-8 bg-gray-200 rounded w-1/3 mb-8"></div>
                    <div className="flex gap-8">
                        <div className="w-32 h-32 bg-gray-200 rounded-full"></div>
                        <div className="flex-1 space-y-4">
                            <div className="h-6 bg-gray-200 rounded w-1/2"></div>
                            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                        </div>
                    </div>
                </div>
            </Container>
        );
    }

    if (!tutor) {
        return (
            <Container className="py-20 text-center">
                <h1 className="text-3xl font-bold mb-4">Tutor Not Found</h1>
                <p className="text-muted-foreground mb-8">The tutor you are looking for does not exist or has been removed.</p>
                <Button asChild>
                    <Link href="/tutors">Browse All Tutors</Link>
                </Button>
            </Container>
        );
    }

    const pageContent = (
        <div className="bg-background min-h-screen pb-20">
            {/* Header / Hero */}
            <div className="bg-muted/30 border-b">
                <Container className="py-12">
                    <div className="flex flex-col md:flex-row gap-8 items-start">
                        <div className="relative">
                            <Avatar className="h-32 w-32 md:h-40 md:w-40 border-4 border-background shadow-xl">
                                <AvatarImage src={tutor.image} alt={tutor.name} />
                                <AvatarFallback className="text-4xl">{tutor.name?.charAt(0) || 'T'}</AvatarFallback>
                            </Avatar>
                            <div className="absolute bottom-0 right-0 bg-green-500 h-6 w-6 rounded-full border-4 border-background" title="Online"></div>
                        </div>

                        <div className="flex-1 space-y-4">
                            <div>
                                <h1 className="text-3xl font-bold text-foreground mb-2 flex items-center gap-2">
                                    {tutor.name}
                                    <Badge variant="secondary" className="text-blue-600 bg-blue-50 hover:bg-blue-100 border-none">
                                        <CheckCircle2 className="h-3 w-3 mr-1" /> Verified
                                    </Badge>
                                </h1>
                                <p className="text-xl text-muted-foreground">{tutor.headline}</p>
                            </div>

                            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                                <div className="flex items-center gap-1">
                                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                                    <span className="font-semibold text-foreground">{tutor.rating || 'New'}</span>
                                    <span>({tutor.reviews || 0} reviews)</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <MapPin className="h-4 w-4" />
                                    {tutor.location || 'Remote'}
                                </div>
                                <div className="flex items-center gap-1">
                                    <Globe className="h-4 w-4" />
                                    {tutor.languages?.join(", ") || 'English'}
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-2 pt-2">
                                {tutor.tags?.map(tag => (
                                    <Badge key={tag} variant="outline" className="text-muted-foreground">
                                        {tag}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                    </div>
                </Container>
            </div>

            <Container className="py-12">
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Left Column: Content */}
                    <div className="lg:col-span-2 space-y-8">
                        <Tabs defaultValue="about" className="w-full">
                            <TabsList className="mb-8 w-full justify-start h-12 bg-muted/50 p-1">
                                <TabsTrigger value="about" className="px-6 h-10">About</TabsTrigger>
                                <TabsTrigger value="reviews" className="px-6 h-10">Reviews ({tutor.reviews})</TabsTrigger>
                                <TabsTrigger value="resume" className="px-6 h-10">Resume</TabsTrigger>
                            </TabsList>

                            <TabsContent value="about" className="space-y-8 animate-in fade-in-50 duration-500">
                                <div>
                                    <h2 className="text-2xl font-bold mb-4">About Me</h2>
                                    <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                                        {tutor.bio || "No bio information provided."}
                                    </p>
                                </div>

                                <div className="grid sm:grid-cols-3 gap-4">
                                    <Card>
                                        <CardContent className="pt-6 flex flex-col items-center text-center">
                                            <MessageSquare className="h-8 w-8 text-primary mb-2 opacity-80" />
                                            <div className="text-2xl font-bold">{tutor.lessonsGiven || 0}</div>
                                            <div className="text-xs text-muted-foreground uppercase tracking-wider">Lessons</div>
                                        </CardContent>
                                    </Card>
                                    <Card>
                                        <CardContent className="pt-6 flex flex-col items-center text-center">
                                            <Users className="h-8 w-8 text-blue-500 mb-2 opacity-80" />
                                            <div className="text-2xl font-bold">{tutor.students || 0}</div>
                                            <div className="text-xs text-muted-foreground uppercase tracking-wider">Students</div>
                                        </CardContent>
                                    </Card>
                                    <Card>
                                        <CardContent className="pt-6 flex flex-col items-center text-center">
                                            <Clock className="h-8 w-8 text-green-500 mb-2 opacity-80" />
                                            <div className="text-2xl font-bold">{tutor.responseTime || 'N/A'}</div>
                                            <div className="text-xs text-muted-foreground uppercase tracking-wider">Response Time</div>
                                        </CardContent>
                                    </Card>
                                </div>
                            </TabsContent>

                            <TabsContent value="reviews" className="animate-in fade-in-50 duration-500">
                                <div className="space-y-6">
                                    <div className="flex items-center gap-4 p-6 bg-yellow-50/50 rounded-xl border border-yellow-100">
                                        <div className="text-center">
                                            <div className="text-4xl font-bold text-yellow-600">{tutor.rating}</div>
                                            <div className="flex text-yellow-500 text-sm justify-center">
                                                <Star className="h-4 w-4 fill-current" />
                                            </div>
                                            <div className="text-xs text-muted-foreground mt-1">{tutor.reviews} ratings</div>
                                        </div>
                                        <div className="h-12 w-px bg-border"></div>
                                        <div className="flex-1">
                                            <p className="font-medium">{tutor.rating && tutor.rating > 4.5 ? "Excellent" : "Good"}</p>
                                            <p className="text-sm text-muted-foreground">Based on {tutor.reviews} reviews.</p>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        {reviewsLoading && (!tutor.reviewsList || tutor.reviewsList.length === 0) ? (
                                            <div className="flex items-center justify-center py-8">
                                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                                                <span className="ml-2 text-muted-foreground">Loading reviews...</span>
                                            </div>
                                        ) : tutor.reviewsList && tutor.reviewsList.length > 0 ? (
                                            tutor.reviewsList.map(review => (
                                                <div key={review.id} className="border-b pb-6 last:border-0">
                                                    <div className="flex items-center justify-between mb-2">
                                                        <div className="flex items-center gap-2">
                                                            <Avatar className="h-8 w-8">
                                                                <AvatarImage src={review.userImage} />
                                                                <AvatarFallback>{review.user?.charAt(0) || 'U'}</AvatarFallback>
                                                            </Avatar>
                                                            <span className="font-semibold">{review.user}</span>
                                                        </div>
                                                        <span className="text-xs text-muted-foreground">
                                                            {new Date(review.createdAt).toLocaleDateString()}
                                                        </span>
                                                    </div>
                                                    <div className="flex text-yellow-500 h-3 w-3 gap-0.5 mb-2">
                                                        {[...Array(Math.max(0, Math.floor(review.rating || 0)))].map((_, i) => <Star key={i} className="fill-current h-3 w-3" />)}
                                                    </div>
                                                    <p className="text-muted-foreground text-sm">{review.comment}</p>
                                                </div>
                                            ))
                                        ) : (
                                            <p className="text-muted-foreground text-center py-8">No reviews yet.</p>
                                        )}
                                    </div>
                                </div>
                            </TabsContent>

                            <TabsContent value="resume" className="animate-in fade-in-50 duration-500">
                                <div className="space-y-6">
                                    <div>
                                        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                                            <Medal className="h-5 w-5 text-primary" /> Education
                                        </h3>
                                        <div className="space-y-4">
                                            {tutor.education && tutor.education.length > 0 ? (
                                                tutor.education.map((edu, idx: number) => (
                                                    <div key={idx} className="flex gap-4">
                                                        <div className="mt-1 h-2 w-2 rounded-full bg-primary flex-shrink-0"></div>
                                                        <div>
                                                            <p className="font-medium">{edu.degree}</p>
                                                            <p className="text-sm text-muted-foreground">{edu.school}, {edu.year}</p>
                                                        </div>
                                                    </div>
                                                ))
                                            ) : (
                                                <p className="text-muted-foreground">No education information available.</p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </TabsContent>
                        </Tabs>
                    </div>

                    {/* Right Column: Booking Card (Sticky) */}
                    <div className="relative">
                        <div className="sticky top-24 space-y-6">
                            <Card className="shadow-lg border-2 border-primary/10 overflow-hidden">
                                <div className="bg-primary/5 p-4 border-b border-primary/10 text-center">
                                    <span className="text-sm font-medium text-muted-foreground">Hourly Rate</span>
                                    <div className="text-3xl font-bold text-primary mt-1">
                                        ${tutor.rate}<span className="text-sm font-normal text-muted-foreground">/hr</span>
                                    </div>
                                </div>
                                <CardContent className="p-6 space-y-6">
                                    <div className="space-y-3">
                                        <Button
                                            size="lg"
                                            className="w-full text-base font-semibold shadow-md bg-blue-600 hover:bg-blue-700"
                                            onClick={() => {
                                                if (user) {
                                                    setIsBookingModalOpen(true);
                                                } else {
                                                    setIsLoginPromptOpen(true);
                                                }
                                            }}
                                        >
                                            Book a Trial Lesson
                                        </Button>
                                        <Button variant="outline" size="lg" className="w-full">
                                            Message Tutor
                                        </Button>
                                    </div>

                                    <div className="space-y-3 text-sm text-muted-foreground">
                                        <div className="flex items-center gap-3">
                                            <Clock className="h-4 w-4 text-primary" />
                                            <span>Response time: <span className="font-medium text-foreground">{tutor.responseTime}</span></span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <CalendarIcon className="h-4 w-4 text-primary" />
                                            <span>Available for new students</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <ShieldCheck className="h-4 w-4 text-primary" />
                                            <span>100% Satisfaction Guarantee</span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <div className="bg-muted/50 rounded-xl p-4 text-xs text-muted-foreground text-center">
                                <p>Report this profile</p>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );

    return (
        <>
            {pageContent}
            <BookingModal
                isOpen={isBookingModalOpen}
                onClose={() => setIsBookingModalOpen(false)}
                tutor={{
                    id: tutor?.id || '',
                    tutorProfile: tutor?.tutorProfile,
                    name: tutor?.name || '',
                    rate: tutor?.rate || 0,
                    image: tutor?.image,
                    subject: tutor?.subject,
                }}
            />
            <LoginPromptModal
                isOpen={isLoginPromptOpen}
                onClose={() => setIsLoginPromptOpen(false)}
            />
        </>
    );
}
