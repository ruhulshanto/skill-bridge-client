"use client";

import { useEffect, useState } from "react";
import { Container } from "@/components/ui/container";
import {
  ArrowRight,
  Code2,
  Globe2,
  FlaskConical,
  Music,
  Palette,
  Calculator,
} from "lucide-react";
import Link from "next/link";

const categories = [
  {
    name: "Programming",
    count: "120+ Tutors",
    icon: Code2,
    slug: "programming",
  },
  {
    name: "Languages",
    count: "85+ Tutors",
    icon: Globe2,
    slug: "languages",
  },
  {
    name: "Science",
    count: "90+ Tutors",
    icon: FlaskConical,
    slug: "science",
  },
  {
    name: "Mathematics",
    count: "110+ Tutors",
    icon: Calculator,
    slug: "mathematics",
  },
  {
    name: "Arts",
    count: "60+ Tutors",
    icon: Palette,
    slug: "arts",
  },
  {
    name: "Music",
    count: "45+ Tutors",
    icon: Music,
    slug: "music",
  },
];

export default function CategoriesSection() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section
      className="py-20 md:py-32"
      style={{ backgroundColor: "var(--bg)" }}
    >
      <Container>
        {/* Header with animation */}
        <div
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16 md:mb-20"
          style={{
            opacity: isLoaded ? 1 : 0,
            transform: isLoaded ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.6s cubic-bezier(0.16,1,0.3,1)",
          }}
        >
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span
                className="h-px w-8"
                style={{ backgroundColor: "var(--accent)" }}
              />
              <span
                className="text-xs font-bold uppercase tracking-widest"
                style={{ color: "var(--text-muted)" }}
              >
                Discover your path
              </span>
            </div>
            <h2
              className="section-heading text-4xl md:text-6xl"
              style={{ color: "var(--text)" }}
            >
              Explore Categories
            </h2>
            <p
              className="text-base max-w-lg leading-relaxed"
              style={{ color: "var(--text-muted)" }}
            >
              Find the perfect tutor for any subject you want to master.
            </p>
          </div>
          <Link
            href="/categories"
            className="inline-flex items-center gap-2 text-sm font-bold transition-all duration-300 hover:gap-3 whitespace-nowrap self-start md:self-end group"
            style={{ color: "var(--accent)" }}
          >
            View all categories
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>

        {/* 6-column responsive grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {categories.map((cat, i) => (
            <Link
              key={cat.slug}
              href={`/tutors?category=${cat.slug}`}
              className="group relative h-full"
              style={{
                opacity: isLoaded ? 1 : 0,
                transform: isLoaded ? "translateY(0)" : "translateY(30px)",
                transition: `all 0.5s cubic-bezier(0.16,1,0.3,1) ${i * 75}ms`,
              }}
            >
              {/* Card container with gradient background */}
              <div
                className="relative h-full flex flex-col items-center justify-center rounded-2xl p-6 text-center overflow-hidden transition-all duration-400 hover:-translate-y-3"
                style={{
                  backgroundColor: "var(--bg-card)",
                  border: "1.5px solid var(--border)",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                }}
              >
                {/* Icon wrapper with matched effects */}
                <div
                  className="relative mb-5 flex items-center justify-center rounded-2xl transition-all duration-400 group-hover:scale-110"
                  style={{
                    width: 64,
                    height: 64,
                    backgroundColor: "var(--bg-subtle)",
                  }}
                >
                  <cat.icon
                    className="relative z-10 h-8 w-8 transition-all duration-400"
                    style={{ color: "var(--text-muted)" }}
                  />
                </div>

                {/* Title */}
                <h3
                  className="text-base font-bold mb-2 transition-all duration-300"
                  style={{ color: "var(--text)" }}
                >
                  {cat.name}
                </h3>

                {/* Tutor count badge */}
                <span
                  className="text-xs font-semibold uppercase tracking-widest transition-all duration-300 px-2.5 py-1 rounded-full"
                  style={{
                    color: "var(--text-muted)",
                    backgroundColor: "var(--bg-subtle)",
                    border: "1px solid var(--border)",
                  }}
                >
                  {cat.count}
                </span>

                {/* Top accent bar */}
                <div
                  className="absolute top-0 left-0 h-[3px] w-0 group-hover:w-full transition-all duration-500 ease-out rounded-b"
                  style={{ backgroundColor: "var(--accent)" }}
                />
              </div>
            </Link>
          ))}
        </div>

        <style>{`
          @keyframes shimmer {
            0% { background-position: -1000px 0; }
            100% { background-position: 1000px 0; }
          }
          
          @keyframes pulse-glow {
            0%, 100% { opacity: 0.3; transform: scale(1); }
            50% { opacity: 0.6; transform: scale(1.1); }
          }
        `}</style>
      </Container>
    </section>
  );
}
