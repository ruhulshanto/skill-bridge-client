"use client";

import { useRef, useState, useEffect } from "react";
import { Container } from "@/components/ui/container";
import { Plus, Minus } from "lucide-react";
import Link from "next/link";

const faqs = [
  {
    q: "How do I find the right tutor for me?",
    a: "Use our smart search to filter tutors by subject, price range, rating, and availability. You can read detailed profiles, watch intro videos, and book a free trial session before committing.",
  },
  {
    q: "Is the first session really free?",
    a: "Yes! Every new student gets one free 30-minute trial session with any tutor. This lets you experience the platform and make sure the tutor is the right fit before paying anything.",
  },
  {
    q: "How are tutors verified?",
    a: "All tutors go through a rigorous vetting process including identity verification, qualification checks, a teaching demo, and background screening. Only the top 5% of applicants are accepted.",
  },
  {
    q: "Can I switch tutors if I'm not satisfied?",
    a: "Absolutely. You can switch tutors at any time with no penalty. We also offer a satisfaction guarantee — if you're not happy with a session, we'll refund it or credit your account.",
  },
  {
    q: "What subjects are available?",
    a: "We cover 500+ subjects across programming, mathematics, sciences, languages, arts, music, business, and more. If you don't see your subject, contact us and we'll find a specialist for you.",
  },
  {
    q: "How does scheduling work?",
    a: "Tutors set their own availability. You can book sessions as short as 30 minutes or as long as 3 hours. Recurring weekly sessions are also available for consistent learners.",
  },
  {
    q: "What technology do I need?",
    a: "Just a computer or tablet with a stable internet connection. Our platform includes built-in video calling, a shared whiteboard, code editor, and file sharing — no extra software needed.",
  },
  {
    q: "Can I become a tutor on SkillBridge?",
    a: "Yes! If you're an expert in your field and passionate about teaching, apply through our tutor registration page. The application takes about 20 minutes and we review within 3 business days.",
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
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.05 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

export default function FAQSection() {
  const { ref, visible } = useReveal();
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="py-24" style={{ backgroundColor: "var(--bg)" }}>
      <Container>
        <div className="grid lg:grid-cols-12 gap-16">
          {/* Left — sticky header */}
          <div
            ref={ref}
            className="lg:col-span-4 lg:sticky lg:top-28 self-start space-y-6"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(24px)",
              transition:
                "opacity 0.6s ease, transform 0.6s cubic-bezier(0.16,1,0.3,1)",
            }}
          >
            <div className="flex items-center gap-3">
              <span
                className="h-px w-8"
                style={{ backgroundColor: "var(--accent)" }}
              />
              <span
                className="text-xs font-bold uppercase tracking-widest"
                style={{ color: "var(--text-muted)" }}
              >
                FAQ
              </span>
            </div>
            <h2
              className="section-heading text-4xl md:text-5xl"
              style={{ color: "var(--text)" }}
            >
              Frequently Asked Questions
            </h2>
            <p
              className="text-base leading-relaxed"
              style={{ color: "var(--text-muted)" }}
            >
              Can't find what you're looking for? We're happy to help.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 h-11 px-6 rounded-xl font-bold text-sm transition-all hover:opacity-90"
              style={{ backgroundColor: "var(--accent)", color: "var(--text)" }}
            >
              Contact Support →
            </Link>
          </div>

          {/* Right — accordion */}
          <div className="lg:col-span-8 space-y-3">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="rounded-[10px] overflow-hidden transition-all duration-200"
                style={{
                  backgroundColor: "var(--bg-card)",
                  border:
                    open === i
                      ? "1px solid var(--accent)"
                      : "1px solid var(--border)",
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(16px)",
                  transition: `opacity 0.5s ease ${i * 50}ms, transform 0.5s cubic-bezier(0.16,1,0.3,1) ${i * 50}ms, border-color 0.2s ease`,
                }}
              >
                <button
                  className="w-full flex items-center justify-between gap-4 p-5 text-left"
                  onClick={() => setOpen(open === i ? null : i)}
                >
                  <span
                    className="font-semibold text-sm"
                    style={{ color: "var(--text)" }}
                  >
                    {faq.q}
                  </span>
                  <div
                    className="shrink-0 h-7 w-7 rounded-lg flex items-center justify-center transition-colors duration-200"
                    style={{
                      backgroundColor:
                        open === i ? "var(--accent)" : "var(--bg-subtle)",
                      color: "var(--text)",
                    }}
                  >
                    {open === i ? (
                      <Minus className="h-3.5 w-3.5" />
                    ) : (
                      <Plus className="h-3.5 w-3.5" />
                    )}
                  </div>
                </button>

                <div
                  style={{
                    maxHeight: open === i ? 300 : 0,
                    overflow: "hidden",
                    transition: "max-height 0.35s cubic-bezier(0.16,1,0.3,1)",
                  }}
                >
                  <p
                    className="px-5 pb-5 text-sm leading-relaxed"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {faq.a}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
