import { Container } from "@/components/ui/container";
import { Card, CardContent } from "@/components/ui/card";
import { Search, Calendar, Video, Star } from "lucide-react";

const steps = [
    {
        icon: Search,
        title: "Browse Tutors",
        description: "Search through our database of qualified tutors by subject, rating, and price."
    },
    {
        icon: Calendar,
        title: "Book a Session",
        description: "Choose a time that works for you and book your session instantly."
    },
    {
        icon: Video,
        title: "Learn & Grow",
        description: "Connect with your tutor and start learning at your own pace."
    },
    {
        icon: Star,
        title: "Leave a Review",
        description: "Share your experience and help others find great tutors."
    }
];

export default function HowItWorks() {
    return (
        <section className="py-20 bg-muted/30">
            <Container>
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                        How It Works
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Getting started with SkillBridge is easy. Follow these simple steps to find your perfect tutor.
                    </p>
                </div>

                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                    {steps.map((step, index) => (
                        <Card key={index} className="relative">
                            <CardContent className="pt-6">
                                <div className="flex flex-col items-center text-center">
                                    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                                        <step.icon className="h-8 w-8" />
                                    </div>
                                    <h3 className="mb-2 text-lg font-semibold">{step.title}</h3>
                                    <p className="text-sm text-muted-foreground">{step.description}</p>
                                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                                        {index + 1}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </Container>
        </section>
    );
}
