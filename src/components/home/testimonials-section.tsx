/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */
"use client";

import { useRef, useState, useEffect } from "react";
import { Container } from "@/components/ui/container";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Software Engineer",
    avatar: "https://i.pravatar.cc/80?img=47",
    rating: 5,
    text: "SkillBridge completely transformed how I learn. My tutor was incredibly patient and tailored every session to my exact needs. I landed my dream job within 3 months.",
  },
  {
    name: "Marcus Chen",
    role: "Data Science Student",
    avatar: "https://i.pravatar.cc/80?img=53",
    rating: 5,
    text: "I tried multiple platforms before SkillBridge. The quality of tutors here is unmatched. My Python skills went from beginner to job-ready in just 8 weeks.",
  },
  {
    name: "Amelia Torres",
    role: "UX Designer",
    avatar: "https://i.pravatar.cc/80?img=44",
    rating: 5,
    text: "The flexibility is what sold me. I could book sessions around my full-time job. My tutor was always prepared and the progress tracking kept me motivated.",
  },
  {
    name: "James Okafor",
    role: "High School Teacher",
    avatar: "https://i.pravatar.cc/80?img=60",
    rating: 5,
    text: "As a tutor on SkillBridge, the platform makes everything seamless. Scheduling, payments, student communication — all in one place. My student base tripled.",
  },
  {
    name: "Priya Sharma",
    role: "Product Manager",
    avatar: "https://i.pravatar.cc/80?img=45",
    rating: 5,
    text: "I needed to upskill fast for a promotion. SkillBridge matched me with the perfect mentor who had real industry experience. Worth every penny.",
  },
  {
    name: "Daniel Kim",
    role: "Freelance Developer",
    avatar: "https://i.pravatar.cc/80?img=57",
    rating: 5,
    text: "The verified tutor system gives me confidence. I know I'm learning from someone who actually knows their stuff. Best investment I've made in my career.",
  },
];

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

export default function TestimonialsSection() {
  const { ref, visible } = useReveal();
  const [hoveredBadge, setHoveredBadge] = useState<number | null>(null);

  return (
    <section className="py-24 overflow-hidden relative" style={{ backgroundColor: "var(--bg-subtle)" }}>
      {/* Decorative Glows */}
      <div 
        className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full blur-[150px] opacity-[0.03] pointer-events-none"
        style={{ background: "radial-gradient(circle, var(--accent) 0%, transparent 70%)" }}
      />
      <div 
        className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full blur-[150px] opacity-[0.03] pointer-events-none"
        style={{ background: "radial-gradient(circle, var(--text) 0%, transparent 70%)" }}
      />

      <Container>
        {/* Header */}
        <div
          ref={ref}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16 relative z-10"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.8s ease, transform 0.8s cubic-bezier(0.16,1,0.3,1)",
          }}
        >
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="h-px w-8" style={{ backgroundColor: "var(--accent)" }} />
              <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>
                Student stories
              </span>
            </div>
            <h2 className="section-heading text-5xl md:text-6xl" style={{ color: "var(--text)" }}>
              What Our Learners Say
            </h2>
            <p className="text-base max-w-lg leading-relaxed mt-2" style={{ color: "var(--text-muted)" }}>
              Real results from real students. See how SkillBridge changed their careers.
            </p>
          </div>
          
          <div className="flex flex-col md:items-end gap-2 self-start md:self-end bg-black/5 dark:bg-white/5 p-5 rounded-2xl backdrop-blur-sm" style={{ border: "1px solid var(--border)" }}>
            <div className="flex items-center gap-1.5">
              {[1,2,3,4,5].map(i => (
                <Star key={i} className="h-4 w-4 fill-current" style={{ color: "#f59e0b" }} />
              ))}
            </div>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xl font-black" style={{ color: "var(--text)" }}>4.9/5</span>
              <span className="text-xs font-medium" style={{ color: "var(--text-muted)" }}>from 2,400+ reviews</span>
            </div>
          </div>
        </div>

        {/* CSS Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 relative z-10">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="group relative p-[1px] rounded-[32px] overflow-hidden"
              onMouseEnter={() => setHoveredBadge(i)}
              onMouseLeave={() => setHoveredBadge(null)}
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? (hoveredBadge === i ? "translateY(-6px)" : "translateY(0)") : "translateY(40px)",
                transition: `all 0.6s cubic-bezier(0.16,1,0.3,1) ${i * 100}ms`,
                background: hoveredBadge === i 
                  ? "linear-gradient(180deg, var(--accent) 0%, transparent 100%)" 
                  : "linear-gradient(180deg, var(--border) 0%, transparent 100%)",
                boxShadow: hoveredBadge === i ? "0 20px 40px -10px rgba(0,0,0,0.15)" : "none"
              }}
            >
              <div 
                className="relative h-full flex flex-col items-start px-8 py-10 rounded-[31px] transition-all duration-500"
                style={{ 
                  backgroundColor: "var(--bg-card)",
                }}
              >
                {/* Background radial glow on hover */}
                <div 
                  className="absolute top-0 right-0 w-40 h-40 blur-[40px] opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none"
                  style={{ backgroundColor: "var(--accent)" }}
                />

                <Quote 
                  className="absolute top-8 right-8 h-10 w-10 opacity-[0.04] transition-all duration-500 group-hover:opacity-[0.08]" 
                  style={{ color: "var(--text)" }} 
                />
                
                {/* stars */}
                <div className="flex gap-1 mb-6 relative z-10">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="h-4 w-4 fill-current" style={{ color: "#f59e0b" }} />
                  ))}
                </div>

                {/* text */}
                <p className="text-base font-medium leading-relaxed flex-1 mb-8 relative z-10" style={{ color: "var(--text)" }}>
                  "{t.text}"
                </p>

                {/* author */}
                <div className="flex items-center gap-4 relative z-10 w-full pt-6" style={{ borderTop: "1px solid var(--border)" }}>
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="h-12 w-12 rounded-full object-cover"
                    style={{ border: "2px solid var(--border)" }}
                  />
                  <div>
                    <h4 className="text-sm font-black tracking-tight" style={{ color: "var(--text)" }}>{t.name}</h4>
                    <p className="text-xs font-bold mt-1 tracking-wide uppercase" style={{ color: "var(--text-muted)" }}>{t.role}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
