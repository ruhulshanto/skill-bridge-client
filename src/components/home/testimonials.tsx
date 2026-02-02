"use client";

import { Container } from "@/components/ui/container";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const testimonials = [
    {
        name: "Ruhul Amin",
        role: "Business Professional",
        image: "https://i.ibb.co.com/Sw9Ff6St/shanto-Img.jpg",
        rating: 5,
        text: "SkillBridge helped me master data analysis skills that I use daily at work. The flexible scheduling fits perfectly with my busy lifestyle."
    },
   
    {
        name: "Maria Omi",
        role: "Language Learner",
        image: "https://i.ibb.co.com/Pnkc7Bg/Moana.jpg",
        rating: 5,
        text: "Learning Spanish has never been easier. My tutor is patient, knowledgeable, and makes every lesson enjoyable. I can now converse confidently."
    },
    {
        name: "James Wilson",
        role: "High School Student",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=face&auto=format",
        rating: 5,
        text: "Thanks to SkillBridge, my math grades improved dramatically. The platform makes finding qualified tutors so easy! Highly recommended for any student."
    },
    {
        name: "Sophie Chen",
        role: "Music Student",
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop&crop=face&auto=format",
        rating: 5,
        text: "I've learned piano faster than I ever thought possible. My tutor understands my learning style and adapts each lesson perfectly. Best investment in myself!"
    },
     {
        name: "Alex Thompson",
        role: "Computer Science Student",
        image: "https://i.ibb.co.com/NnyWhpzh/526374557-17869992054410848-5829952187626490279-n.jpg",
        rating: 5,
        text: "The tutors here are amazing! I went from struggling with React to building my own projects in just 3 months. The 1-on-1 guidance was exactly what I needed."
    },
    
    {
        name: "Emma Johnson",
        role: "Medical Student",
        image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=64&h=64&fit=crop&crop=face&auto=format",
        rating: 5,
        text: "The anatomy tutors here are incredible! They break down complex concepts into simple, understandable lessons. My exam scores have never been better."
    }
];

export default function Testimonials() {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextTestimonial = () => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    };

    const prevTestimonial = () => {
        setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    const goToTestimonial = (index: number) => {
        setCurrentIndex(index);
    };

    return (
        <section className="py-16 bg-muted/30">
            <Container>
                {/* Header */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                        What Our Students Say
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Join thousands of satisfied learners who have achieved their goals with SkillBridge.
                    </p>
                </div>

                {/* Carousel */}
                <div className="relative max-w-4xl mx-auto">
                    <div className="overflow-hidden rounded-2xl">
                        <div 
                            className="flex transition-transform duration-500 ease-in-out"
                            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                        >
                            {testimonials.map((testimonial, index) => (
                                <div key={index} className="w-full flex-shrink-0 px-4">
                                    <div className="bg-white rounded-2xl border p-8 md:p-12 text-center">
                                        {/* Quote Icon */}
                                        <Quote className="h-12 w-12 text-primary/20 mx-auto mb-6" />

                                        {/* Rating */}
                                        <div className="flex justify-center gap-1 mb-6">
                                            {[...Array(testimonial.rating)].map((_, i) => (
                                                <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                                            ))}
                                        </div>

                                        {/* Testimonial Text */}
                                        <p className="text-lg text-muted-foreground mb-8 leading-relaxed max-w-2xl mx-auto">
                                            "{testimonial.text}"
                                        </p>

                                        {/* Author Info */}
                                        <div className="flex flex-col items-center">
                                            <img
                                                src={testimonial.image}
                                                alt={testimonial.name}
                                                className="h-16 w-16 rounded-full object-cover ring-2 ring-background mb-4"
                                            />
                                            <p className="font-semibold text-foreground">{testimonial.name}</p>
                                            <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Navigation Buttons */}
                    <Button
                        variant="outline"
                        size="icon"
                        className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white shadow-md hover:bg-gray-50"
                        onClick={prevTestimonial}
                    >
                        <ChevronLeft className="h-4 w-4" />
                        <span className="sr-only">Previous testimonial</span>
                    </Button>
                    <Button
                        variant="outline"
                        size="icon"
                        className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white shadow-md hover:bg-gray-50"
                        onClick={nextTestimonial}
                    >
                        <ChevronRight className="h-4 w-4" />
                        <span className="sr-only">Next testimonial</span>
                    </Button>
                </div>

                {/* Dots Indicator */}
                <div className="flex justify-center gap-2 mt-8">
                    {testimonials.map((_, index) => (
                        <button
                            key={index}
                            className={`w-2 h-2 rounded-full transition-colors ${
                                index === currentIndex 
                                    ? "bg-primary" 
                                    : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                            }`}
                            onClick={() => goToTestimonial(index)}
                        >
                            <span className="sr-only">Go to testimonial {index + 1}</span>
                        </button>
                    ))}
                </div>
            </Container>
        </section>
    );
}
