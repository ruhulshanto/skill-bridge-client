"use client";

import { useRef, useState, useEffect } from "react";
import { Container } from "@/components/ui/container";
import { ShieldCheck, Award, Globe, Clock } from "lucide-react";
import { SiGoogle, SiMeta, SiStripe, SiNotion, SiVercel, SiNetflix } from "react-icons/si";
import { FaMicrosoft, FaAmazon, FaApple, FaSpotify, FaSlack, FaGithub, FaLinkedin, FaFigma } from "react-icons/fa";

const trustBadges = [
  { icon: ShieldCheck, label: "SSL Secured", sub: "Enterprise-grade 256-bit encryption protecting your data." },
  { icon: Award, label: "Top Rated", sub: "Consistently rated 4.9/5 on Trustpilot by our users." },
  { icon: Globe, label: "Global Reach", sub: "Connect with expert tutors from over 120+ countries." },
  { icon: Clock, label: "Always On", sub: "Guaranteed 99.9% uptime for uninterrupted learning." },
];

const partners = [
  { name: "Google", icon: SiGoogle, desc: "Empowering search and cloud infrastructure." },
  { name: "Microsoft", icon: FaMicrosoft, desc: "Tools and platforms for modern productivity." },
  { name: "Amazon", icon: FaAmazon, desc: "Scalable cloud solutions and global logistics." },
  { name: "Apple", icon: FaApple, desc: "Innovative hardware and seamless ecosystems." },
  { name: "Meta", icon: SiMeta, desc: "Connecting the world through social technologies." },
  { name: "Netflix", icon: SiNetflix, desc: "Pioneering global streaming entertainment." },
  { name: "Spotify", icon: FaSpotify, desc: "Audio streaming and media services provider." },
  { name: "Stripe", icon: SiStripe, desc: "Financial infrastructure for the internet." },
  { name: "Slack", icon: FaSlack, desc: "Bringing team communication into one place." },
  { name: "GitHub", icon: FaGithub, desc: "Where the world builds software." },
  { name: "LinkedIn", icon: FaLinkedin, desc: "Connecting the world's professionals." },
  { name: "Notion", icon: SiNotion, desc: "The all-in-one workspace for your notes and tasks." },
  { name: "Figma", icon: FaFigma, desc: "The collaborative interface design tool." },
  { name: "Vercel", icon: SiVercel, desc: "Developing and deploying modern web experiences." },
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

export default function TrustSection() {
  const { ref, visible } = useReveal();
  const [hoveredBadge, setHoveredBadge] = useState<number | null>(null);
  
  const sliderRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    let animationFrameId: number;
    let lastTime = performance.now();
    let rotation = 0;

    const animate = (time: number) => {
      const deltaTime = time - lastTime;
      lastTime = time;
      
      // Slower animation: 60 seconds per full rotation -> 6 degrees per second
      if (!isHovered) {
        rotation = (rotation + (360 / 60000) * deltaTime) % 360;
        if (sliderRef.current) {
          sliderRef.current.style.transform = `rotateX(-16deg) rotateY(${rotation}deg)`;
        }
      }

      // Determine active index
      let closestIdx = 0;
      let minDiff = Infinity;
      for (let i = 0; i < partners.length; i++) {
        const itemAngle = i * (360 / partners.length);
        let absAngle = (itemAngle + rotation) % 360;
        if (absAngle > 180) absAngle -= 360;
        const diff = Math.abs(absAngle);
        if (diff < minDiff) {
          minDiff = diff;
          closestIdx = i;
        }
      }

      setActiveIndex((prev) => (prev !== closestIdx ? closestIdx : prev));
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isHovered]);

  return (
    <section className="py-24 relative overflow-hidden" style={{ backgroundColor: "var(--bg)" }}>
      {/* Decorative background glow */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-[150px] opacity-10 pointer-events-none"
        style={{ background: "radial-gradient(circle, var(--accent) 0%, transparent 70%)" }}
      />

      <Container>
        {/* Trusted by text */}
        <div
          ref={ref}
          className="text-center mb-20 relative z-10"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.6s ease, transform 0.6s cubic-bezier(0.16,1,0.3,1)",
          }}
        >
          <p className="text-sm font-black uppercase tracking-[0.2em] mb-8" style={{ color: "var(--text-muted)" }}>
            Trusted by professionals from
          </p>

          <div className="w-full overflow-hidden mb-24 py-16 relative">
            {/* 3D Circular Partner logos */}
            <div className="banner">
              
              {/* Center Text */}
              <div className="center-text-container pointer-events-none">
                {partners.map((partner, idx) => (
                  <div 
                    key={`center-${partner.name}`}
                    className="absolute inset-0 flex flex-col items-center justify-center transition-all duration-700"
                    style={{
                      opacity: activeIndex === idx ? 1 : 0,
                      transform: activeIndex === idx ? "translateY(0) scale(1)" : "translateY(20px) scale(0.9)",
                    }}
                  >
                    <partner.icon className="h-10 w-10 mb-4 opacity-20 transition-all duration-700" style={{ color: "var(--text)", transform: activeIndex === idx ? "scale(1)" : "scale(0.8)" }} />
                    <h4 
                      className="text-4xl md:text-5xl font-black tracking-tighter mb-4" 
                      style={{ 
                        background: "linear-gradient(to right, var(--text), var(--accent))",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        textShadow: "0 4px 20px rgba(134, 198, 255, 0.3)",
                        fontFamily: "var(--font-ubuntu), sans-serif" 
                      }}
                    >
                      {partner.name}
                    </h4>
                    <p className="text-sm font-medium px-4" style={{ color: "var(--text-muted)" }}>
                      {partner.desc}
                    </p>
                  </div>
                ))}
              </div>

              <div 
                className="slider z-10" 
                ref={sliderRef}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                {partners.map((partner, idx) => {
                  const isActive = activeIndex === idx;
                  return (
                    <div
                      key={`${partner.name}-${idx}`}
                      className="item group flex flex-col items-center justify-center cursor-pointer"
                      style={{ "--position": idx + 1 } as React.CSSProperties}
                    >
                      <div 
                        className={`w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center backdrop-blur-xl transition-all duration-500 ${isActive ? "scale-110" : "opacity-40 hover:opacity-100"}`}
                        style={{ 
                          backgroundColor: isActive ? "var(--bg-card)" : "rgba(255, 255, 255, 0.03)",
                          border: isActive ? "1px solid var(--accent)" : "1px solid var(--border)",
                          boxShadow: isActive ? "0 10px 30px -5px var(--accent)" : "0 10px 30px -10px rgba(0,0,0,0.2)"
                        }}>
                        <partner.icon 
                          className="h-8 w-auto md:h-10 transition-colors duration-500" 
                          style={{ color: isActive ? "var(--accent)" : "var(--text)" }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Premium Trust Badges */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
          {trustBadges.map((badge, i) => (
            <div
              key={i}
              className="group relative p-[1px] rounded-[32px] overflow-hidden"
              onMouseEnter={() => setHoveredBadge(i)}
              onMouseLeave={() => setHoveredBadge(null)}
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? (hoveredBadge === i ? "translateY(-8px)" : "translateY(0)") : "translateY(32px)",
                transition: `all 0.5s cubic-bezier(0.16,1,0.3,1) ${i * 100}ms`,
                background: hoveredBadge === i 
                  ? "linear-gradient(180deg, var(--accent) 0%, transparent 100%)" 
                  : "linear-gradient(180deg, var(--border) 0%, transparent 100%)",
                boxShadow: hoveredBadge === i ? "0 20px 40px -10px rgba(0,0,0,0.2)" : "none"
              }}
            >
              <div 
                className="relative h-full flex flex-col items-center text-center px-6 py-10 rounded-[31px] transition-all duration-500"
                style={{ 
                  backgroundColor: "var(--bg-card)",
                }}
              >
                {/* Background radial glow on hover */}
                <div 
                  className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-40 blur-[40px] opacity-0 group-hover:opacity-15 transition-opacity duration-500 pointer-events-none"
                  style={{ backgroundColor: "var(--accent)" }}
                />

                <div
                  className="relative z-10 h-20 w-20 rounded-2xl flex items-center justify-center mb-6 transition-all duration-500"
                  style={{ 
                    backgroundColor: hoveredBadge === i ? "var(--accent)" : "var(--bg-subtle)", 
                    color: hoveredBadge === i ? "var(--bg)" : "var(--text-muted)",
                    boxShadow: hoveredBadge === i ? "0 10px 30px -5px var(--accent)" : "none",
                  }}
                >
                  <badge.icon className="h-8 w-8" />
                </div>
                
                <h3 className="relative z-10 font-black text-xl mb-3 transition-colors duration-300" style={{ color: "var(--text)", fontFamily: "var(--font-ubuntu), sans-serif" }}>
                  {badge.label}
                </h3>
                <p className="relative z-10 text-sm leading-relaxed transition-colors duration-300" style={{ color: "var(--text-muted)" }}>
                  {badge.sub}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
      
      <style>{`
        .banner {
          width: 100%;
          height: 350px;
          position: relative;
          perspective: 1200px;
          transform-style: preserve-3d;
        }
        .banner .slider {
          position: absolute;
          width: 80px;
          height: 80px;
          top: calc(50% - 40px);
          left: calc(50% - 40px);
          transform-style: preserve-3d;
          transform: rotateX(-16deg) rotateY(0deg);
        }
        .banner .slider .item {
          position: absolute;
          inset: 0 0 0 0;
          transform: rotateY(calc( (var(--position) - 1) * (360 / ${partners.length}) * 1deg )) translateZ(160px);
        }
        .center-text-container {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) translateZ(0);
          width: 320px;
          height: 200px;
          transform-style: preserve-3d;
        }
        @media (min-width: 768px) {
          .banner {
            height: 400px;
          }
          .banner .slider .item {
            transform: rotateY(calc( (var(--position) - 1) * (360 / ${partners.length}) * 1deg )) translateZ(350px);
          }
          .banner .slider {
            width: 100px;
            height: 100px;
            top: calc(50% - 50px);
            left: calc(50% - 50px);
          }
        }
      `}</style>
    </section>
  );
}
