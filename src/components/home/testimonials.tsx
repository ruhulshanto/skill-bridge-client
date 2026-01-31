import { Container } from "@/components/ui/container";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";

const testimonials = [
    {
        name: "Alex Thompson",
        role: "Computer Science Student",
        image: "https://i.pravatar.cc/100?img=1",
        rating: 5,
        text: "The tutors here are amazing! I went from struggling with React to building my own projects in just 3 months."
    },
    {
        name: "Maria Garcia",
        role: "Language Learner",
        image: "https://i.pravatar.cc/100?img=2",
        rating: 5,
        text: "Learning Spanish has never been easier. My tutor is patient, knowledgeable, and makes every lesson enjoyable."
    },
    {
        name: "James Wilson",
        role: "High School Student",
        image: "https://i.pravatar.cc/100?img=3",
        rating: 5,
        text: "Thanks to SkillBridge, my math grades improved dramatically. The platform makes finding qualified tutors so easy!"
    }
];

export default function Testimonials() {
    return (
        <section className="py-20">
            <Container>
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                        What Our Students Say
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Join thousands of satisfied learners who have achieved their goals with SkillBridge.
                    </p>
                </div>

                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {testimonials.map((testimonial, index) => (
                        <Card key={index} className="relative">
                            <CardContent className="pt-6">
                                <div className="mb-4">
                                    <Quote className="h-8 w-8 text-primary/20" />
                                </div>
                                <div className="flex gap-0.5 mb-4">
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                    ))}
                                </div>
                                <p className="text-muted-foreground mb-6">"{testimonial.text}"</p>
                                <div className="flex items-center gap-3">
                                    <img
                                        src={testimonial.image}
                                        alt={testimonial.name}
                                        className="h-12 w-12 rounded-full object-cover"
                                    />
                                    <div>
                                        <p className="font-semibold">{testimonial.name}</p>
                                        <p className="text-sm text-muted-foreground">{testimonial.role}</p>
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
