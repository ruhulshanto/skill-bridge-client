import { Container } from "@/components/ui/container";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";
import Link from "next/link";

// Mock data - will be replaced with API data
const featuredTutors = [
    {
        id: "1",
        name: "Sarah Johnson",
        subject: "Mathematics",
        rating: 4.9,
        reviews: 128,
        rate: 45,
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200",
        tags: ["Algebra", "Calculus"]
    },
    {
        id: "2",
        name: "David Chen",
        subject: "Computer Science",
        rating: 5.0,
        reviews: 85,
        rate: 60,
        image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=200",
        tags: ["React", "Node.js"]
    },
    {
        id: "3",
        name: "Emily Davis",
        subject: "English Literature",
        rating: 4.8,
        reviews: 210,
        rate: 35,
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200",
        tags: ["Essay Writing", "Literature"]
    },
];

export default function FeaturedTutors() {
    return (
        <section className="bg-muted/30 py-20">
            <Container>
                <div className="mb-12 flex items-end justify-between">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight">Featured Tutors</h2>
                        <p className="mt-4 text-muted-foreground">Learn from the very best.</p>
                    </div>
                    <Button variant="outline" className="hidden sm:flex" asChild>
                        <Link href="/tutors">View All Tutors</Link>
                    </Button>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {featuredTutors.map((tutor) => (
                        <Card key={tutor.id} className="overflow-hidden transition-all hover:shadow-lg">
                            <div className="aspect-video w-full overflow-hidden bg-muted">
                                <img
                                    src={tutor.image}
                                    alt={tutor.name}
                                    className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                                />
                            </div>
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <Badge variant="secondary" className="font-normal">{tutor.subject}</Badge>
                                    <div className="flex items-center gap-1 text-sm font-medium text-yellow-600">
                                        <Star className="h-3.5 w-3.5 fill-current" />
                                        {tutor.rating} <span className="text-muted-foreground">({tutor.reviews})</span>
                                    </div>
                                </div>
                                <CardTitle className="mt-2 line-clamp-1">{tutor.name}</CardTitle>
                                <CardDescription>${tutor.rate}/hour</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="flex flex-wrap gap-2">
                                    {tutor.tags.map(tag => (
                                        <span key={tag} className="rounded-md bg-muted px-2 py-1 text-xs text-muted-foreground">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button className="w-full" asChild>
                                    <Link href={`/tutors/${tutor.id}`}>View Profile</Link>
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </Container>
        </section>
    );
}
