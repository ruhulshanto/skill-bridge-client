"use client";

import { useRef, useState, useEffect } from "react";
import { Container } from "@/components/ui/container";
import { Search, CalendarCheck, Video, TrendingUp } from "lucide-react";
import Link from "next/link";

const steps = [
  {
    number: "01",
    icon: Search,
    title: "Find Your Tutor",
    description: "Browse hundreds of verified experts by subject, rating, price, and availability. Use filters to find your perfect match.",
  },
  {
    number: "02",
    icon: CalendarCheck,
    title: "Book a Session",
    description: "Pick a time that works for you. Book a free trial lesson first — no commitment required until you're satisfied.",
  },
  {
    number: "03",
    icon: Video,
    title: "Learn Online",
    description: "Join your session via our integrated video platform. Share screens, use a whiteboard, and collaborate in real time.",
  },
  {
    number: "04",
    icon: TrendingUp,
    title: "Track Progress",
    description: "Monitor your improvement with session notes, progress reports, and milestone tracking built right into your dashboard.",
  },
];

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    setVisible(false);
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.05 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

export default function HowItWorksSection() {
  const { ref, visible } = useReveal();
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);

  return (
    <section className="py-24" style={{ backgroundColor: "var(--bg)" }}>
      <Container>
        {/* Background animated elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
          <div
            className="absolute rounded-full blur-[120px] opacity-30 animate-pulse"
            style={{
              width: 400,
              height: 400,
              background: "var(--accent)",
              top: "-100px",
              left: "-100px",
              animation: "float 8s ease-in-out infinite",
            }}
          />
          <div
            className="absolute rounded-full blur-[100px] opacity-20 animate-pulse"
            style={{
              width: 350,
              height: 350,
              background: "#3b82f6",
              bottom: "-80px",
              right: "-80px",
              animation: "float 10s ease-in-out infinite 2s",
            }}
          />
        </div>

        {/* Header */}
        <div
          ref={ref}
          className="relative z-10 mb-16 space-y-4"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.6s ease, transform 0.6s cubic-bezier(0.16,1,0.3,1)",
          }}
        >
          <div className="flex items-center gap-3">
            <span className="h-px w-8" style={{ backgroundColor: "var(--accent)" }} />
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>
              Simple process
            </span>
          </div>
          <div className="flex flex-col gap-4">
            <h2 className="section-heading text-5xl md:text-6xl" style={{ color: "var(--text)" }}>
              How It Works
            </h2>
            <p className="text-base max-w-2xl leading-relaxed" style={{ color: "var(--text-muted)" }}>
              Get started in minutes. From finding a tutor to your first session — it&apos;s that simple.
            </p>
          </div>
        </div>

        {/* Steps */}
        <div className="relative z-10">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, i) => (
              <div
                key={i}
                className="relative group flex flex-col p-8 rounded-[24px] cursor-pointer overflow-hidden"
                onMouseEnter={() => setHoveredStep(i + 1)}
                onMouseLeave={() => setHoveredStep(null)}
                style={{
                  backgroundColor: "var(--bg-card)",
                  border: "1px solid",
                  borderColor: hoveredStep === i + 1 ? "var(--accent)" : "var(--border)",
                  opacity: visible ? 1 : 0,
                  transform: visible ? (hoveredStep === i + 1 ? "translateY(-8px)" : "translateY(0)") : "translateY(32px)",
                  transition: `all 0.5s cubic-bezier(0.16,1,0.3,1) ${visible ? i * 100 : 0}ms`,
                  boxShadow: hoveredStep === i + 1 
                    ? "0 20px 40px -10px rgba(0,0,0,0.1), 0 0 20px -5px var(--accent)" 
                    : "0 4px 20px -10px rgba(0,0,0,0.05)",
                }}
              >
                {/* Background glow on hover */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: "radial-gradient(circle at top right, var(--accent), transparent 70%)"
                  }}
                />

                {/* Number & Icon Header */}
                <div className="relative z-10 flex items-center justify-between mb-8">
                  <span 
                    className="text-5xl font-black transition-colors duration-500"
                    style={{ 
                      color: "transparent", 
                      WebkitTextStroke: `1px ${hoveredStep === i + 1 ? "var(--accent)" : "var(--border)"}`,
                      opacity: hoveredStep === i + 1 ? 0.8 : 0.3
                    }}
                  >
                    {step.number}
                  </span>
                  <div 
                    className="h-14 w-14 rounded-[30px] border-2 flex items-center justify-center transition-all duration-500"
                    style={{
                      backgroundColor: hoveredStep === i + 1 ? "#86C6FF" : "var(--bg)",
                      transform: hoveredStep === i + 1 ? "scale(1.1)" : "scale(1)",
                      boxShadow: hoveredStep === i + 1 ? "0 10px 20px -5px #86C6FF" : "none"
                    }}
                  >
                    <step.icon 
                      className="h-6 w-6 transition-colors duration-500"
                      style={{
                        color: hoveredStep === i + 1 ? "var(--bg)" : "var(--text-muted)"
                      }}
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="relative z-10 flex-1">
                  <h3
                    className="text-xl font-bold mb-3 transition-colors duration-300"
                    style={{ color: hoveredStep === i + 1 ? "var(--accent)" : "var(--text)", fontFamily: "var(--font-ubuntu), sans-serif" }}
                  >
                    {step.title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed transition-colors duration-300"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {step.description}
                  </p>
                </div>

                {/* Bottom decorative line */}
                <div 
                  className="absolute bottom-0 left-0 h-1 transition-all duration-500"
                  style={{
                    width: hoveredStep === i + 1 ? "100%" : "0%",
                    backgroundColor: "var(--accent)"
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div
          className="relative z-10 mt-20 p-[1px] rounded-[32px] overflow-hidden group"
          style={{
            background: "linear-gradient(135deg, var(--accent), transparent 60%)",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(24px)",
            transition: `all 0.6s cubic-bezier(0.16,1,0.3,1) ${4 * 120 + 200}ms`,
            boxShadow: "0 20px 40px -10px rgba(0,0,0,0.1)",
          }}
        >
          <div 
            className="relative flex flex-col md:flex-row items-center justify-between gap-8 rounded-[31px] p-10 md:p-12 overflow-hidden"
            style={{ backgroundColor: "var(--bg-card)" }}
          >
            
            {/* Background glow */}
            <div 
              className="absolute inset-0 opacity-10 pointer-events-none transition-opacity duration-500 group-hover:opacity-20"
              style={{
                background: "radial-gradient(circle at left, var(--accent) 0%, transparent 60%)"
              }}
            />

            <div className="relative z-10 text-center md:text-left">
              <h3 className="font-black text-3xl md:text-4xl mb-3" style={{ color: "var(--text)", fontFamily: "var(--font-ubuntu), sans-serif" }}>
                Ready to level up your skills?
              </h3>
              <p className="text-lg" style={{ color: "var(--text-muted)" }}>
                Your first trial lesson is completely free. No credit card required.
              </p>
            </div>
            
            <div className="relative z-10 shrink-0">
              <Link
                href="/register"
                className="inline-flex items-center justify-center gap-2 h-14 px-10 rounded-2xl font-bold text-base whitespace-nowrap transition-all duration-300 hover:-translate-y-1"
                style={{ 
                  backgroundColor: "var(--accent)", 
                  color: "var(--accent-foreground)", 
                  boxShadow: "0 10px 30px -10px var(--accent)" 
                }}
              >
                Start for Free →
              </Link>
            </div>
          </div>
        </div>
      </Container>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-20px) scale(1.05); }
        }
      `}</style>
    </section>
  );
}

