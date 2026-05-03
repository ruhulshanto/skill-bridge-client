/* eslint-disable react/no-unescaped-entities */
"use client";

import { useRef, useState, useEffect } from "react";
import { Container } from "@/components/ui/container";
import { Check, Star, Zap } from "lucide-react";
import Link from "next/link";

const plans = [
  {
    name: "Starter",
    priceMonthly: "Free",
    priceAnnually: "Free",
    period: "",
    description: "Perfect for exploring the platform and trying your first session.",
    features: [
      "1 free trial session",
      "Browse all tutors",
      "Basic progress tracking",
      "Email support",
    ],
    cta: "Get Started Free",
    href: "/register",
    highlighted: false,
  },
  {
    name: "Pro",
    priceMonthly: "$49",
    priceAnnually: "$39",
    period: "/month",
    description: "For serious learners who want consistent, structured growth.",
    features: [
      "8 sessions per month",
      "Priority tutor matching",
      "Advanced progress reports",
      "Session recordings",
      "24/7 chat support",
      "Custom learning path",
    ],
    cta: "Start Pro Plan",
    href: "/register",
    highlighted: true,
    badge: "Most Popular",
  },
  {
    name: "Elite",
    priceMonthly: "$99",
    priceAnnually: "$79",
    period: "/month",
    description: "Unlimited access for professionals and fast-track learners.",
    features: [
      "Unlimited sessions",
      "Dedicated account manager",
      "1-on-1 career coaching",
      "Certificate of completion",
      "Group workshops access",
      "Priority support",
    ],
    cta: "Go Elite",
    href: "/register",
    highlighted: false,
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

export default function PricingSection() {
  const { ref, visible } = useReveal();
  const [isAnnual, setIsAnnual] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  return (
    <section className="py-24 overflow-hidden relative" style={{ backgroundColor: "var(--bg-subtle)" }}>
      {/* Decorative Glows */}
      <div 
        className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full blur-[150px] opacity-[0.03] pointer-events-none"
        style={{ background: "radial-gradient(circle, var(--accent) 0%, transparent 70%)" }}
      />

      <Container>
        {/* Header - Left Aligned */}
        <div
          ref={ref}
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-16 relative z-10"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.8s ease, transform 0.8s cubic-bezier(0.16,1,0.3,1)",
          }}
        >
          <div className="space-y-4 max-w-2xl text-left">
            <div className="flex items-center gap-3">
              <span className="h-px w-8" style={{ backgroundColor: "var(--accent)" }} />
              <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>
                Pricing
              </span>
            </div>
            <h2 className="section-heading text-5xl md:text-6xl" style={{ color: "var(--text)" }}>
              Simple, Transparent Pricing
            </h2>
            <p className="text-base leading-relaxed mt-2" style={{ color: "var(--text-muted)" }}>
              No hidden fees. Cancel anytime. Start free and upgrade when you're ready.
            </p>
          </div>
          
          {/* Billing Toggle */}
          <div className="flex items-center self-start lg:self-end bg-black/5 dark:bg-white/5 p-1.5 rounded-2xl backdrop-blur-sm w-full sm:w-auto" style={{ border: "1px solid var(--border)" }}>
            <button 
              onClick={() => setIsAnnual(false)}
              className="flex-1 sm:flex-none px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-300"
              style={{
                backgroundColor: !isAnnual ? "var(--bg-card)" : "transparent",
                color: !isAnnual ? "var(--text)" : "var(--text-muted)",
                boxShadow: !isAnnual ? "0 4px 12px rgba(0,0,0,0.05)" : "none",
                border: !isAnnual ? "1px solid var(--border)" : "1px solid transparent"
              }}
            >
              Monthly
            </button>
            <button 
              onClick={() => setIsAnnual(true)}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-300"
              style={{
                backgroundColor: isAnnual ? "var(--bg-card)" : "transparent",
                color: isAnnual ? "var(--text)" : "var(--text-muted)",
                boxShadow: isAnnual ? "0 4px 12px rgba(0,0,0,0.05)" : "none",
                border: isAnnual ? "1px solid var(--border)" : "1px solid transparent"
              }}
            >
              Annually <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full" style={{ backgroundColor: "rgba(var(--accent-rgb), 0.1)", color: "var(--accent)" }}>Save 20%</span>
            </button>
          </div>
        </div>

        {/* CSS Grid for Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 relative z-10">
          {plans.map((plan, i) => {
            const isHovered = hoveredCard === i;
            const isHighlighted = plan.highlighted;
            
            return (
              <div
                key={i}
                className="group relative p-[1px] rounded-[32px] overflow-hidden"
                onMouseEnter={() => setHoveredCard(i)}
                onMouseLeave={() => setHoveredCard(null)}
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible 
                    ? (isHovered || isHighlighted ? "translateY(-8px)" : "translateY(0)") 
                    : "translateY(40px)",
                  transition: `all 0.6s cubic-bezier(0.16,1,0.3,1) ${i * 100}ms`,
                  background: isHovered || isHighlighted
                    ? "linear-gradient(180deg, var(--accent) 0%, transparent 100%)" 
                    : "linear-gradient(180deg, var(--border) 0%, transparent 100%)",
                  boxShadow: isHovered || isHighlighted ? "0 20px 40px -10px rgba(0,0,0,0.15)" : "none"
                }}
              >
                <div 
                  className="relative h-full flex flex-col items-start px-8 py-10 rounded-[31px] transition-all duration-500"
                  style={{ backgroundColor: "var(--bg)" }}
                >
                  {/* Background radial glow */}
                  <div 
                    className={`absolute top-0 left-1/2 -translate-x-1/2 w-full h-40 blur-[50px] transition-opacity duration-500 pointer-events-none ${isHovered || isHighlighted ? 'opacity-10' : 'opacity-0'}`}
                    style={{ backgroundColor: "var(--accent)" }}
                  />

                  {plan.badge && (
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-b-xl flex items-center gap-1.5 shadow-lg" style={{ backgroundColor: "var(--accent)" }}>
                      <Star className="h-3 w-3 fill-current" style={{ color: "var(--text)" }} />
                      <span className="text-[10px] font-black uppercase tracking-wider whitespace-nowrap" style={{ color: "var(--text)" }}>
                        {plan.badge}
                      </span>
                    </div>
                  )}

                  <div className="w-full relative z-10">
                    <div className="flex items-center gap-2 mb-4">
                      {isHighlighted && <Zap className="h-5 w-5" style={{ color: "var(--accent)" }} />}
                      <h3 className="text-xl font-black tracking-tight" style={{ color: "var(--text)" }}>
                        {plan.name}
                      </h3>
                    </div>
                    
                    <div className="flex items-baseline gap-1 mb-3 transition-all duration-300">
                      <span 
                        className="text-5xl font-black tracking-tighter"
                        style={{ color: "var(--text)", fontFamily: "var(--font-ubuntu), sans-serif" }}
                      >
                        {isAnnual ? plan.priceAnnually : plan.priceMonthly}
                      </span>
                      {plan.period && (
                        <span className="text-sm font-medium" style={{ color: "var(--text-muted)" }}>
                          {plan.period}
                        </span>
                      )}
                    </div>
                    <p className="text-sm leading-relaxed min-h-[40px]" style={{ color: "var(--text-muted)" }}>
                      {plan.description}
                    </p>
                  </div>

                  <div className="w-full h-px my-8" style={{ backgroundColor: "var(--border)", opacity: 0.5 }} />

                  <ul className="space-y-4 flex-1 w-full relative z-10">
                    {plan.features.map((f, j) => (
                      <li key={j} className="flex items-start gap-3">
                        <div 
                          className="h-5 w-5 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                          style={{ backgroundColor: isHighlighted || isHovered ? "var(--accent)" : "var(--bg-subtle)" }}
                        >
                          <Check className="h-3 w-3" style={{ color: isHighlighted || isHovered ? "var(--text)" : "var(--text-muted)" }} />
                        </div>
                        <span className="text-sm font-medium" style={{ color: "var(--text)" }}>{f}</span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={plan.href}
                    className="w-full flex items-center justify-center h-14 rounded-xl font-black text-sm mt-8 transition-all duration-300 relative z-10 overflow-hidden group/btn"
                    style={{
                      backgroundColor: isHighlighted ? "var(--accent)" : "var(--bg-subtle)",
                      color: "var(--text)",
                      border: isHighlighted ? "none" : "1px solid var(--border)"
                    }}
                  >
                    <span className="relative z-10 transition-transform duration-300 group-hover/btn:scale-105">{plan.cta}</span>
                    {isHighlighted && (
                      <div className="absolute inset-0 opacity-0 group-hover/btn:opacity-20 transition-opacity duration-300" style={{ backgroundColor: "var(--text)" }} />
                    )}
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        <p className="text-center text-sm font-medium mt-12 relative z-10" style={{ color: "var(--text-muted)" }}>
          All plans include a <span style={{ color: "var(--text)" }}>7-day money-back guarantee</span>. No questions asked.
        </p>
      </Container>
    </section>
  );
}
