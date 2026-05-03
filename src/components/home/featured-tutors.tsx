"use client";

import { Container } from "@/components/ui/container";
import { Star, ArrowUpRight, CheckCircle } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { apiClient } from "@/lib/api";
import { TutorData } from "@/types";

function useReveal(delay = 0) {
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
  return { ref, visible, delay };
}

function TutorCard({ tutor, index }: { tutor: TutorData; index: number }) {
  const { ref, visible } = useReveal();
  const [hovered, setHovered] = useState(false);

  const subjects =
    tutor.tutorProfile?.subjects
      ?.slice(0, 2)
      .map((s: { subject?: { name?: string } }) => s.subject?.name)
      .filter((n): n is string => Boolean(n)) || [];
  const rating = tutor.tutorProfile?.rating ?? 0;
  const rate = tutor.tutorProfile?.hourlyRate ?? 0;
  const reviews = tutor.tutorProfile?.totalReviews ?? 0;

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(48px)",
        transition: `opacity 0.7s ease ${index * 100}ms, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${index * 100}ms`,
      }}
    >
      <Link
        href={`/tutors/${tutor.id}`}
        className="group block rounded-2xl overflow-hidden"
        style={{
          backgroundColor: "var(--bg-card)",
          border: "1px solid var(--border)",
          boxShadow: hovered
            ? "0 24px 48px -8px rgba(10,37,64,0.18), 0 0 0 1px var(--border)"
            : "0 2px 8px rgba(10,37,64,0.06)",
          transform: hovered ? "translateY(-6px)" : "translateY(0)",
          transition:
            "box-shadow 0.4s ease, transform 0.4s cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        {/* ── Image ── */}
        <div
          className="relative overflow-hidden"
          style={{ aspectRatio: "4/3", position: "relative" }}
        >
          <Image
            src={tutor.image || `https://i.pravatar.cc/400?img=${index + 10}`}
            alt={tutor.name}
            fill
            className="object-cover"
            style={{
              transform: hovered ? "scale(1.08)" : "scale(1)",
              transition: "transform 0.8s cubic-bezier(0.16,1,0.3,1)",
            }}
          />

          {/* gradient */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(160deg, transparent 40%, rgba(10,37,64,0.55) 100%)",
              opacity: hovered ? 1 : 0.4,
              transition: "opacity 0.4s ease",
            }}
          />

          {/* rating pill — top left */}
          <div
            className="absolute top-3 left-3 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold backdrop-blur-sm"
            style={{
              backgroundColor: "rgba(247,251,255,0.92)",
              color: "var(--text)",
              border: "1px solid rgba(169,215,255,0.4)",
            }}
          >
            <Star
              className="h-3 w-3 fill-current"
              style={{ color: "#f59e0b" }}
            />
            {rating > 0 ? rating.toFixed(1) : "New"}
            {reviews > 0 && (
              <span style={{ color: "var(--text-faint)" }}>({reviews})</span>
            )}
          </div>

          {/* rate pill — top right */}
          <div
            className="absolute top-3 right-3 px-3 py-1.5 rounded-full text-xs font-black backdrop-blur-sm"
            style={{
              backgroundColor: "var(--accent)",
              color: "var(--text)",
            }}
          >
            {rate === 0 ? "Free" : `$${rate}`}
            {rate !== 0 && (
              <span className="font-normal opacity-70">/hr</span>
            )}
          </div>

          {/* name overlay — slides up on hover */}
          <div
            className="absolute bottom-0 left-0 right-0 p-4"
            style={{
              transform: hovered ? "translateY(0)" : "translateY(6px)",
              opacity: hovered ? 1 : 0,
              transition:
                "transform 0.4s cubic-bezier(0.16,1,0.3,1), opacity 0.3s ease",
            }}
          >
            <p
              className="text-white font-bold text-sm leading-tight"
              style={{ fontFamily: "var(--font-ubuntu), sans-serif" }}
            >
              {tutor.name}
            </p>
            <p className="text-white/70 text-xs mt-0.5">
              {subjects[0] || "Expert Tutor"}
            </p>
          </div>
        </div>

        {/* ── Body ── */}
        <div className="p-5">
          {/* name + verified */}
          <div className="flex items-start justify-between gap-2 mb-3">
            <div>
              <h3
                className="font-bold text-[15px] leading-snug"
                style={{
                  color: "var(--text)",
                  fontFamily: "var(--font-ubuntu), sans-serif",
                }}
              >
                {tutor.name}
              </h3>
              <div className="flex items-center gap-1.5 mt-0.5">
                <CheckCircle
                  className="h-3 w-3"
                  style={{ color: "var(--accent)" }}
                />
                <span
                  className="text-[11px] font-semibold"
                  style={{ color: "var(--text-muted)" }}
                >
                  Verified Expert
                </span>
              </div>
            </div>

            {/* arrow icon */}
            <div
              className="shrink-0 h-8 w-8 rounded-lg flex items-center justify-center"
              style={{
                backgroundColor: hovered ? "var(--accent)" : "var(--bg-subtle)",
                color: "var(--text)",
                transform: hovered
                  ? "rotate(-45deg) scale(1.1)"
                  : "rotate(0deg) scale(1)",
                transition:
                  "background-color 0.3s ease, transform 0.4s cubic-bezier(0.16,1,0.3,1)",
              }}
            >
              <ArrowUpRight className="h-4 w-4" />
            </div>
          </div>

          {/* subject tags */}
          {subjects.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-4">
              {subjects.map((s) => (
                <span
                  key={s}
                  className="text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full"
                  style={{
                    backgroundColor: "var(--bg-subtle)",
                    color: "var(--text-muted)",
                    border: "1px solid var(--border)",
                  }}
                >
                  {s}
                </span>
              ))}
            </div>
          )}

          {/* bio */}
          <p
            className="text-xs leading-relaxed line-clamp-2 mb-4 min-h-[2.25rem]"
            style={{ color: "var(--text-muted)" }}
          >
            {tutor.tutorProfile?.bio?.trim()
              ? tutor.tutorProfile.bio.trim()
              : "Bio coming soon."}
          </p>

          {/* divider */}
          <div
            className="h-px mb-4"
            style={{ backgroundColor: "var(--border)" }}
          />

          {/* stats row */}
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                <Star
                  className="h-3.5 w-3.5 fill-current"
                  style={{ color: "#f59e0b" }}
                />
                <span className="font-bold" style={{ color: "var(--text)" }}>
                  {rating > 0 ? rating.toFixed(1) : "—"}
                </span>
              </div>
              <div
                className="h-3 w-px"
                style={{ backgroundColor: "var(--border)" }}
              />
              <span style={{ color: "var(--text-faint)" }}>
                {reviews > 0 ? `${reviews} reviews` : "No reviews yet"}
              </span>
            </div>

            <span
              className="font-black text-sm"
              style={{
                color: "var(--text)",
                fontFamily: "var(--font-ubuntu), sans-serif",
              }}
            >
              ${rate}
              <span
                className="text-[10px] font-normal ml-0.5"
                style={{ color: "var(--text-faint)" }}
              >
                /hr
              </span>
            </span>
          </div>
        </div>

        {/* bottom accent line */}
        <div
          className="h-[3px] rounded-b-2xl"
          style={{
            backgroundColor: "var(--accent)",
            width: hovered ? "100%" : "0%",
            transition: "width 0.5s cubic-bezier(0.16,1,0.3,1)",
          }}
        />
      </Link>
    </div>
  );
}

export default function FeaturedTutors() {
  const [tutors, setTutors] = useState<TutorData[]>([]);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);
  const [headerVisible, setHeaderVisible] = useState(true);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    setHeaderVisible(false);
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setHeaderVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.05 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [mounted]);

  useEffect(() => {
    if (!mounted) return;
    const load = async () => {
      try {
        const res = await apiClient.getTutors({ limit: 4 });
        if (res?.data?.data && Array.isArray(res.data.data))
          setTutors(res.data.data);
        else if (res?.data && Array.isArray(res.data)) setTutors(res.data);
      } catch {
        /* silent */
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [mounted]);

  if (!mounted || loading) {
    return (
      <section className="py-24" style={{ backgroundColor: "var(--bg)" }}>
        <Container>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="rounded-2xl overflow-hidden"
                style={{ border: "1px solid var(--border)" }}
              >
                <div
                  className="animate-pulse"
                  style={{
                    aspectRatio: "4/3",
                    backgroundColor: "var(--bg-subtle)",
                  }}
                />
                <div className="p-5 space-y-3">
                  <div
                    className="h-4 rounded-lg animate-pulse w-2/3"
                    style={{ backgroundColor: "var(--bg-subtle)" }}
                  />
                  <div
                    className="h-3 rounded-lg animate-pulse w-1/2"
                    style={{ backgroundColor: "var(--bg-subtle)" }}
                  />
                  <div
                    className="h-3 rounded-lg animate-pulse w-full"
                    style={{ backgroundColor: "var(--bg-subtle)" }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section
      className="py-24 relative"
      style={{ backgroundColor: "var(--bg)" }}
    >
      <div
        className="absolute top-0 left-0 w-full h-px"
        style={{
          background:
            "linear-gradient(to right, transparent, var(--border), transparent)",
        }}
      />

      <Container>
        {/* Header */}
        <div
          ref={headerRef}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14"
          style={{
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? "translateY(0)" : "translateY(24px)",
            transition:
              "opacity 0.6s ease, transform 0.6s cubic-bezier(0.16,1,0.3,1)",
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
                Top rated experts
              </span>
            </div>
            <h2
              className="section-heading text-5xl md:text-6xl"
              style={{ color: "var(--text)" }}
            >
              Featured Tutors
            </h2>
            <p
              className="text-base max-w-lg leading-relaxed"
              style={{ color: "var(--text-muted)" }}
            >
              Learn from{" "}
              <span className="font-semibold" style={{ color: "var(--text)" }}>
                verified expert tutors
              </span>{" "}
              ready to help you succeed.
            </p>
          </div>
          <Link
            href="/tutors"
            className="inline-flex items-center gap-2 text-sm font-bold transition-all duration-200 hover:gap-3 whitespace-nowrap self-start md:self-end"
            style={{ color: "var(--text)" }}
          >
            View all tutors <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Cards grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {tutors.map((tutor, i) => (
            <TutorCard key={tutor.id} tutor={tutor} index={i} />
          ))}
        </div>

        {/* Mobile CTA */}
        <div className="mt-10 md:hidden">
          <Link
            href="/tutors"
            className="flex items-center justify-center gap-2 w-full h-12 rounded-xl font-bold text-sm"
            style={{ backgroundColor: "var(--accent)", color: "var(--text)" }}
          >
            View All Tutors <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </Container>
    </section>
  );
}
