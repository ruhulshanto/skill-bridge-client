/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, Play, Pause, ChevronDown } from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { useAuth } from "@/contexts/auth-context";

const VIDEO_SRC =
  "https://res.cloudinary.com/dtph8gqgi/video/upload/q_auto,f_auto/v1777632976/6672525-hd_1280_720_24fps_csucok.mp4";
const POSTER =
  "https://res.cloudinary.com/dtph8gqgi/image/upload/v1777633048/Screenshot_2026-05-01_165649_yqzhw2.png";

export default function HeroSection() {
  const { user } = useAuth();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(true);
  const [loaded, setLoaded] = useState(false);
  const [visible, setVisible] = useState(false);
  const [, setCanPlay] = useState(false);

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play().catch(() => {
        setPlaying(false);
        console.warn("Auto-play failed");
      });
      setPlaying(true);
    } else {
      v.pause();
      setPlaying(false);
    }
  };

  // Handle video loading and playback
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    const handleCanPlay = () => {
      setCanPlay(true);
      setLoaded(true);
      // Attempt autoplay
      const playPromise = v.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setPlaying(true);
          })
          .catch(() => {
            console.warn("Autoplay failed, user interaction may be required");
            setPlaying(false);
          });
      }
    };

    const handleLoadedData = () => {
      setLoaded(true);
    };

    const handlePlay = () => {
      setPlaying(true);
    };

    const handlePause = () => {
      setPlaying(false);
    };

    const handleError = () => {
      console.error("Video failed to load");
      setLoaded(false);
      setCanPlay(false);
    };

    // Add event listeners
    v.addEventListener("canplay", handleCanPlay);
    v.addEventListener("loadeddata", handleLoadedData);
    v.addEventListener("play", handlePlay);
    v.addEventListener("pause", handlePause);
    v.addEventListener("error", handleError);

    // Set the video to load and attempt autoplay
    v.load();

    return () => {
      v.removeEventListener("canplay", handleCanPlay);
      v.removeEventListener("loadeddata", handleLoadedData);
      v.removeEventListener("play", handlePlay);
      v.removeEventListener("pause", handlePause);
      v.removeEventListener("error", handleError);
    };
  }, []);

  /* staggered content reveal */
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 200);
    return () => clearTimeout(t);
  }, []);

  const ease = "cubic-bezier(0.16,1,0.3,1)";

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ height: "100svh", minHeight: 640 }}
    >
      {/* ── Video ── */}
      <video
        ref={videoRef}
        poster={POSTER}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover"
        style={{
          opacity: loaded ? 1 : 0,
          transition: "opacity 1.2s ease",
          display: "block",
        }}
        controlsList="nodownload"
      >
        <source src={VIDEO_SRC} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* poster fallback */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${POSTER})`,
          opacity: loaded ? 0 : 1,
          transition: "opacity 1.2s ease",
          pointerEvents: loaded ? "none" : "auto",
        }}
      />

      {/* ── Overlays ── */}
      {/* main dark */}
      <div
        className="absolute inset-0"
        style={{ background: "rgba(4,12,24,0.62)" }}
      />
      {/* left-side gradient for text contrast */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(105deg, rgba(4,12,24,0.55) 40%, transparent 100%)",
        }}
      />
      {/* bottom fade into page */}
      <div
        className="absolute bottom-0 left-0 right-0"
        style={{
          height: 160,
          background: "linear-gradient(to bottom, transparent, var(--bg))",
        }}
      />

      {/* ── Main content ── */}
      <Container className="relative z-10 h-full flex flex-col justify-center pt-24 pb-20">
        <div className="max-w-2xl">
          {/* eyebrow pill */}
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 text-[11px] font-bold uppercase tracking-[0.15em]"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(16px)",
              transition: `opacity 0.7s ease 0.1s, transform 0.7s ${ease} 0.1s`,
              backgroundColor: "rgba(134,198,255,0.12)",
              border: "1px solid rgba(134,198,255,0.3)",
              color: "#86C6FF",
              backdropFilter: "blur(10px)",
            }}
          >
            <span
              className="h-1.5 w-1.5 rounded-full animate-pulse"
              style={{ backgroundColor: "#86C6FF" }}
            />
            Elite Mentorship Network
          </div>

          {/* heading */}
          <h1
            className="section-heading mb-6"
            style={{
              fontSize: "clamp(2.8rem, 7vw, 5.5rem)",
              lineHeight: 1.08,
              color: "#ffffff",
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(24px)",
              transition: `opacity 0.7s ease 0.2s, transform 0.7s ${ease} 0.2s`,
            }}
          >
            Unlock Your <br />
            <span style={{ color: "#86C6FF" }}>Full Potential</span>
          </h1>

          {/* subheading */}
          <p
            className="text-lg max-w-lg mb-10 leading-relaxed"
            style={{
              color: "rgba(255,255,255,0.65)",
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(24px)",
              transition: `opacity 0.7s ease 0.32s, transform 0.7s ${ease} 0.32s`,
            }}
          >
            Connect with world-class tutors and master any skill — at your own
            pace, on your own schedule.
          </p>

          {/* CTAs */}
          <div
            className="flex flex-col sm:flex-row gap-3 mb-14"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(24px)",
              transition: `opacity 0.7s ease 0.42s, transform 0.7s ${ease} 0.42s`,
            }}
          >
            <Link
              href={user ? (user.role === "TUTOR" ? "/tutor/dashboard" : user.role === "ADMIN" ? "/admin" : "/dashboard") : "/tutors?free=true"}
              className="inline-flex items-center justify-center gap-2 h-13 px-8 rounded-xl font-bold text-[15px] transition-all duration-300 hover:-translate-y-0.5 hover:brightness-110"
              style={{
                backgroundColor: "#86C6FF",
                color: "#0A2540",
                height: 52,
              }}
            >
              {user ? "Go to Dashboard" : "Start Learning Free"} <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/tutors"
              className="inline-flex items-center justify-center gap-2 px-8 rounded-xl font-bold text-[15px] transition-all duration-300 hover:-translate-y-0.5"
              style={{
                height: 52,
                backgroundColor: "rgba(255,255,255,0.08)",
                border: "1.5px solid rgba(255,255,255,0.22)",
                color: "#ffffff",
                backdropFilter: "blur(10px)",
              }}
            >
              Explore Tutors
            </Link>
          </div>

          {/* social proof */}
          <div
            className="flex items-center gap-5"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(16px)",
              transition: `opacity 0.7s ease 0.52s, transform 0.7s ${ease} 0.52s`,
            }}
          >
            <div className="flex -space-x-2.5">
              {[31, 32, 33, 34, 35].map((n) => (
                <img
                  key={n}
                  src={`https://i.pravatar.cc/48?img=${n}`}
                  alt="learner"
                  className="h-9 w-9 rounded-full object-cover"
                  style={{ border: "2px solid rgba(255,255,255,0.25)" }}
                />
              ))}
            </div>
            <div
              className="h-8 w-px"
              style={{ backgroundColor: "rgba(255,255,255,0.15)" }}
            />
            <div>
              <div className="flex items-center gap-0.5 mb-0.5">
                {[1, 2, 3, 4, 5].map((i) => (
                  <svg
                    key={i}
                    className="h-3 w-3 fill-current"
                    style={{ color: "#f59e0b" }}
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>
                <span className="font-bold text-white">12,000+</span> learners
                trust us
              </p>
            </div>
          </div>
        </div>
      </Container>

      {/* ── Bottom bar: scroll indicator (center) + play/pause (right) ── */}
      <div className="absolute bottom-0 left-0 right-0 z-20 flex items-end justify-between px-6 pb-7">
        {/* spacer */}
        <div className="w-10" />

        {/* Scroll indicator — center */}
        <div className="flex flex-col items-center gap-2">
          <span
            className="text-[9px] font-bold uppercase tracking-[0.2em]"
            style={{ color: "rgba(255,255,255,0.35)" }}
          >
            scroll
          </span>
          {/* mouse outline */}
          <div
            className="relative flex justify-center"
            style={{
              width: 22,
              height: 34,
              borderRadius: 11,
              border: "1.5px solid rgba(255,255,255,0.3)",
            }}
          >
            {/* dot inside mouse */}
            <div
              className="scroll-dot absolute top-[5px] rounded-full"
              style={{
                width: 4,
                height: 4,
                backgroundColor: "rgba(255,255,255,0.7)",
              }}
            />
          </div>
          <ChevronDown
            className="h-3.5 w-3.5 opacity-40"
            style={{
              color: "#fff",
              animation: "scrollDot 2s ease-in-out infinite 0.4s",
            }}
          />
        </div>

        {/* Play / Pause — right */}
        <button
          onClick={togglePlay}
          className="h-10 w-10 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 hover:brightness-110"
          style={{
            backgroundColor: "rgba(255,255,255,0.12)",
            border: "1px solid rgba(255,255,255,0.2)",
            backdropFilter: "blur(10px)",
            color: "#ffffff",
            cursor: "pointer",
          }}
          aria-label={playing ? "Pause video" : "Play video"}
        >
          {playing ? (
            <Pause className="h-3.5 w-3.5 fill-current" />
          ) : (
            <Play className="h-3.5 w-3.5 fill-current ml-0.5" />
          )}
        </button>
      </div>

      <style>{`
        @keyframes scrollDot {
          0%, 100% {
            opacity: 0.3;
            transform: translateY(0);
          }
          50% {
            opacity: 1;
            transform: translateY(8px);
          }
        }
      `}</style>
    </section>
  );
}
