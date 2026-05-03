"use client";

import { Container } from "@/components/ui/container";
import { Users, GraduationCap, BookOpen, Star, Target, Globe, Award, Zap } from "lucide-react";

const stats = [
  { label: "Learners Transformed", value: "50K+", description: "Future leaders worldwide", icon: Users },
  { label: "Expert Mentors", value: "10K+", description: "Industry professionals", icon: GraduationCap },
  { label: "Skills Mastered", value: "500+", description: "In-demand courses", icon: BookOpen },
  { label: "Success Rate", value: "4.9/5", description: "Average satisfaction rating", icon: Star },
  { label: "Career Goals Hit", value: "95%", description: "Placement rate", icon: Target },
  { label: "Global Reach", value: "120+", description: "Countries reached", icon: Globe },
  { label: "Awards Won", value: "25+", description: "Industry recognition", icon: Award },
  { label: "Faster Learning", value: "3x", description: "Than traditional methods", icon: Zap },
];

export default function StatsSection() {
  return (
    <section className="py-24" style={{ backgroundColor: "var(--bg-subtle)" }}>
      <Container>

        {/* Header — left aligned */}
        <div className="mb-14">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="h-px w-8" style={{ backgroundColor: "var(--accent)" }} />
              <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>
                By the numbers
              </span>
            </div>
            <h2 className="section-heading text-5xl md:text-6xl" style={{ color: "var(--text)" }}>
              Transforming Education
            </h2>
            <p className="text-base max-w-lg leading-relaxed" style={{ color: "var(--text-muted)" }}>
              Join the revolution where{" "}
              <span className="font-semibold" style={{ color: "var(--text)" }}>50,000+ learners</span>{" "}
              are already shaping their future with world-class mentors.
            </p>
          </div>
        </div>

        {/* Primary stat cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          {stats.slice(0, 4).map((stat, i) => (
            <div
              key={i}
              className="group relative rounded-[10px] p-6 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg bg-[#F0F8FF] dark:bg-[var(--bg-card)]"
              style={{ border: "1px solid var(--border)" }}
            >
              {/* large faint number watermark */}
              <span
                className="absolute -top-3 -right-1 text-[80px] font-black leading-none select-none pointer-events-none transition-opacity duration-300 opacity-[0.04] group-hover:opacity-[0.07]"
                style={{ color: "var(--text)" }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>

              <div className="relative z-10">
                <div
                  className="h-10 w-10 rounded-xl flex items-center justify-center mb-5"
                  style={{ backgroundColor: "var(--bg-subtle)", color: "var(--text-muted)" }}
                >
                  <stat.icon className="h-5 w-5" />
                </div>
                <p
                  className="text-4xl font-black mb-1 leading-none text-[#0f172a] dark:text-[var(--text)]"
                  style={{ fontFamily: "var(--font-ubuntu), sans-serif" }}
                >
                  {stat.value}
                </p>
                <p className="text-sm font-semibold mb-1 text-[#0f172a] dark:text-[var(--text)]">{stat.label}</p>
                <p className="text-xs text-[#475569] dark:text-[var(--text-faint)]">{stat.description}</p>
              </div>

              {/* bottom accent bar */}
              <div
                className="absolute bottom-0 left-0 h-[3px] w-0 group-hover:w-full transition-all duration-500 rounded-b-[10px]"
                style={{ backgroundColor: "var(--accent)" }}
              />
            </div>
          ))}
        </div>

        {/* Secondary compact cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.slice(4).map((stat, i) => (
            <div
              key={i}
              className="group rounded-[10px] p-4 flex items-center gap-4 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md bg-[#F0F8FF] dark:bg-[var(--bg-card)]"
              style={{ border: "1px solid var(--border)" }}
            >
              <div
                className="h-9 w-9 shrink-0 rounded-lg flex items-center justify-center transition-colors duration-300"
                style={{ backgroundColor: "var(--bg-subtle)", color: "var(--text-muted)" }}
              >
                <stat.icon className="h-4 w-4" />
              </div>
              <div className="min-w-0">
                <p
                  className="text-xl font-black leading-tight text-[#0f172a] dark:text-[var(--text)]"
                  style={{ fontFamily: "var(--font-ubuntu), sans-serif" }}
                >
                  {stat.value}
                </p>
                <p className="text-[11px] truncate text-[#475569] dark:text-[var(--text-faint)]">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>

      </Container>
    </section>
  );
}
