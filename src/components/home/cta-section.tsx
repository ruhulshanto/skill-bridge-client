"use client";

import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function CTASection() {
  return (
    <section className="py-24" style={{ backgroundColor: "var(--bg-subtle)" }}>
      <Container>
        <div 
          className="max-w-4xl mx-auto text-center rounded-3xl p-12 md:p-20 bg-[#F0F8FF] dark:bg-[var(--bg-card)]"
          style={{ border: "1px solid var(--border)" }}
        >
          <h2 className="section-heading text-4xl md:text-6xl mb-6 leading-tight text-[#0f172a] dark:text-[var(--text)]">
            Ready to Start Your <br />
            <span className="text-[#334155] dark:text-[var(--text-muted)]">Learning Journey?</span>
          </h2>

          <p className="text-lg mb-10 max-w-xl mx-auto text-[#475569] dark:text-[var(--text-muted)]">
            Join over{" "}
            <span className="font-black text-[#0f172a] dark:text-[var(--text)]">12,000+ active scholars</span>{" "}
            building their future with the world's most elite mentors.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="h-14 px-10 text-base font-black rounded-xl hover:-translate-y-1 transition-transform border-none" asChild
              style={{ backgroundColor: "var(--accent)", color: "var(--text)" }}>
              <Link href="/register">
                Get Started Free <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="h-14 px-10 text-base font-bold rounded-xl hover:-translate-y-1 transition-transform border-[1.5px] border-[var(--border)] text-[#0f172a] dark:text-[var(--text)] bg-transparent" asChild>
              <Link href="/tutors">Explore Experts</Link>
            </Button>
          </div>

          <div className="mt-14 pt-10 flex items-center justify-center gap-10 border-t border-[rgba(15,23,42,0.1)] dark:border-[var(--border)]">
            {[
              { value: "24/7", label: "Support" },
              { value: "100%", label: "Secure" },
              { value: "Elite", label: "Tutors" },
            ].map((item, i, arr) => (
              <div key={item.label} className="flex items-center gap-10">
                <div className="text-center">
                  <p className="text-2xl font-black text-[#0f172a] dark:text-[var(--text)]">{item.value}</p>
                  <p className="text-[10px] font-bold uppercase tracking-widest mt-1 text-[#64748b] dark:text-[var(--text-faint)]">{item.label}</p>
                </div>
                {i < arr.length - 1 && <div className="w-px h-10 bg-[rgba(15,23,42,0.1)] dark:bg-[var(--border)]" />}
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
