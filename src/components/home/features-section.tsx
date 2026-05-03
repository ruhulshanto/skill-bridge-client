/* eslint-disable react/no-unescaped-entities */
"use client";

import { Container } from "@/components/ui/container";
import { BookOpen, Calendar, Shield, Users, ArrowRight } from "lucide-react";
import Link from "next/link";

const features = [
  {
    icon: Users,
    title: "Expert Tutors",
    stat: "500+ Verified",
    description: "Learn from industry professionals and verified experts who are genuinely passionate about teaching.",
  },
  {
    icon: Calendar,
    title: "Flexible Scheduling",
    stat: "24/7 Availability",
    description: "Book sessions that fit your lifestyle. Learn at your own pace, anytime, anywhere in the world.",
  },
  {
    icon: Shield,
    title: "Verified & Secure",
    stat: "100% Secure",
    description: "Every tutor is background-checked. Payments are encrypted. Your satisfaction is guaranteed.",
  },
  {
    icon: BookOpen,
    title: "Personalized Learning",
    stat: "Custom Paths",
    description: "Get lesson plans tailored to your specific goals, learning style, and preferred pace.",
  },
];

export default function FeaturesSection() {
  return (
    <section className="py-24" style={{ backgroundColor: "var(--bg-subtle)" }}>
      <Container>

        {/* Header — left aligned */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-14">
          <div className="space-y-4">
            {/* eyebrow */}
            <div className="flex items-center gap-3">
              <span className="h-px w-8" style={{ backgroundColor: "var(--accent)" }} />
              <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>
                Why us
              </span>
            </div>
            <h2 className="section-heading text-5xl md:text-6xl" style={{ color: "var(--text)" }}>
              Why Choose SkillBridge?
            </h2>
            <p className="text-base max-w-lg leading-relaxed" style={{ color: "var(--text-muted)" }}>
              We provide the{" "}
              <span className="font-semibold" style={{ color: "var(--text)" }}>best environment</span>{" "}
              for learning and growth here's what sets us apart.
            </p>
          </div>

          <div className="lg:self-start lg:pt-16">
            <Link
              href="/tutors"
              className="inline-flex items-center gap-2 text-sm font-bold transition-all duration-200 hover:gap-3 whitespace-nowrap"
              style={{ color: "var(--text)" }}
            >
              Explore all tutors <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* Feature cards */}
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => (
            <div
              key={i}
              className="group relative rounded-[10px] p-7 flex flex-col min-h-[320px] overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg bg-[#F0F8FF] dark:bg-[var(--bg-card)]"
              style={{ border: "1px solid var(--border)" }}
            >
              {/* faint index watermark */}
              <span
                className="absolute -top-2 -right-1 text-[72px] font-black leading-none select-none pointer-events-none opacity-[0.04] group-hover:opacity-[0.07] transition-opacity duration-300"
                style={{ color: "var(--text)", fontFamily: "var(--font-ubuntu), sans-serif" }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>

              <div className="relative z-10 flex flex-col flex-1">
                {/* icon */}
                <div
                  className="h-12 w-12 rounded-xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110"
                  style={{ backgroundColor: "var(--bg-subtle)", color: "var(--text-muted)" }}
                >
                  <f.icon className="h-6 w-6" />
                </div>

                {/* title + stat pill */}
                <div className="mb-3 flex flex-col gap-2">
                  <h3
                    className="text-lg font-bold leading-tight text-[#0f172a] dark:text-[var(--text)]"
                  >
                    {f.title}
                  </h3>
                  <span
                    className="self-start text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full"
                    style={{ backgroundColor: "var(--bg-subtle)", color: "var(--text-muted)", border: "1px solid var(--border)" }}
                  >
                    {f.stat}
                  </span>
                </div>

                <p className="text-sm leading-relaxed mt-auto text-[#334155] dark:text-[var(--text-muted)]">
                  {f.description}
                </p>
              </div>

              {/* bottom accent bar on hover */}
              <div
                className="absolute bottom-0 left-0 h-[3px] w-0 group-hover:w-full transition-all duration-500 rounded-b-[10px]"
                style={{ backgroundColor: "var(--accent)" }}
              />
            </div>
          ))}
        </div>

        {/* Bottom CTA strip */}
        <div
          className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 rounded-[10px] px-6 py-4"
          style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border)" }}
        >
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2">
              {[41, 42, 43, 44].map((n) => (
                <img
                  key={n}
                  src={`https://i.pravatar.cc/32?img=${n}`}
                  className="h-8 w-8 rounded-full object-cover"
                  style={{ border: "2px solid var(--bg-card)" }}
                  alt="learner"
                />
              ))}
            </div>
            <span className="text-sm" style={{ color: "var(--text-muted)" }}>
              Join <span className="font-bold" style={{ color: "var(--text)" }}>10,000+</span> happy learners
            </span>
          </div>
          <Link
            href="/tutors"
            className="inline-flex items-center gap-2 text-sm font-bold px-5 py-2.5 rounded-lg transition-all duration-200 hover:opacity-80"
            style={{ backgroundColor: "var(--accent)", color: "var(--text)" }}
          >
            Get Started Today <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

      </Container>
    </section>
  );
}
