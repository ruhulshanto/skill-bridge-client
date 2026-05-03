"use client";

import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Rocket, Target, Users, Award, ShieldCheck, ArrowRight, CheckCircle2, Sparkles, Star, Globe } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/contexts/auth-context";

export default function BecomeATutorPage() {
  const { user } = useAuth();
  return (
    <div className="bg-background min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-8 pb-16 lg:pt-12 lg:pb-24 overflow-hidden">
        {/* Ambient Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
          <div 
            className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full blur-[120px] opacity-20 dark:opacity-30"
            style={{ backgroundColor: "var(--accent)" }}
          />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-[0.15]" />
        </div>

        <Container className="relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 text-[11px] font-bold uppercase tracking-[0.15em]"
              style={{
                backgroundColor: "var(--bg-subtle)",
                border: "1px solid var(--border)",
                color: "var(--text-muted)",
                backdropFilter: "blur(10px)",
              }}
            >
              <Rocket className="h-3.5 w-3.5" style={{ color: "var(--accent)" }} />
              Join the Elite Mentorship Network
            </div>

            <h1 className="section-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-8 leading-[1.05]">
              Share Your Knowledge <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--accent)] to-blue-500">
                Inspire the Next Generation
              </span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
              SkillBridge is looking for world-class experts to join our elite tutor network. 
              Teach what you love, on your own schedule, and make a global impact.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button asChild size="lg" className="rounded-xl h-14 px-10 font-black text-base shadow-xl shadow-blue-500/20 transition-all hover:-translate-y-1" style={{ backgroundColor: "var(--accent)", color: "var(--bg)" }}>
                <Link href={user ? "/become-a-tutor/apply" : "/login"}>Apply Now <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-xl h-14 px-10 font-bold text-base bg-white/5 backdrop-blur-md border-white/10 hover:bg-white/10 transition-all">
                <Link href="#why-teach">Learn More</Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Stats Section */}
      <section className="py-12 border-y" style={{ borderColor: "var(--border)", backgroundColor: "var(--bg-card)" }}>
        <Container>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { label: "Avg. Hourly Rate", value: "$45 - $120", icon: Target },
              { label: "Flexible Hours", value: "Anytime", icon: Award },
              { label: "Global Audience", value: "50+ Countries", icon: Globe },
              { label: "Growth Potential", value: "Unlimited", icon: Star },
            ].map((stat, idx) => (
              <div key={idx} className="flex flex-col items-center justify-center text-center group">
                <div 
                  className="h-14 w-14 rounded-2xl flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 shadow-sm"
                  style={{ backgroundColor: "var(--bg-subtle)", border: "1px solid var(--border)" }}
                >
                  <stat.icon className="h-6 w-6" style={{ color: "var(--accent)" }} />
                </div>
                <h3 className="text-2xl font-bold tracking-tight mb-1" style={{ color: "var(--text)" }}>{stat.value}</h3>
                <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">{stat.label}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Why Teach Section */}
      <section id="why-teach" className="py-24 lg:py-32 overflow-hidden">
        <Container>
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div className="space-y-10">
              <div>
                <h2 className="section-heading text-3xl sm:text-4xl md:text-5xl mb-6" style={{ color: "var(--text)" }}>Why Teach with SkillBridge?</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  We provide the platform, the tools, and the audience. You provide the expertise. Together, we build the future of education.
                </p>
              </div>

              <div className="space-y-4">
                {[
                  { title: "Set Your Own Rates", desc: "You decide how much your time is worth. No platform-enforced caps." },
                  { title: "Teach from Anywhere", desc: "All you need is a laptop and a stable internet connection." },
                  { title: "Professional Growth", desc: "Build your personal brand and reach thousands of students globally." },
                  { title: "Zero Paperwork", desc: "We handle the billing, scheduling, and admin so you can focus on teaching." }
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-5 p-6 rounded-2xl transition-all duration-300 hover:bg-white/5 group" style={{ border: "1px solid var(--border)" }}>
                    <div className="mt-1 p-2 rounded-xl flex-shrink-0" style={{ backgroundColor: "var(--bg-subtle)", border: "1px solid var(--border)" }}>
                      <CheckCircle2 className="h-5 w-5" style={{ color: "var(--accent)" }} />
                    </div>
                    <div>
                      <h4 className="font-black text-lg mb-1" style={{ color: "var(--text)" }}>{item.title}</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div 
                className="absolute -inset-10 rounded-full blur-[100px] opacity-20 -z-10"
                style={{ backgroundColor: "var(--accent)" }}
              />
              <div 
                className="relative p-1 rounded-[3rem] overflow-hidden shadow-2xl"
                style={{ background: "linear-gradient(135deg, var(--border), transparent, var(--border))" }}
              >
                <div className="relative bg-background rounded-[2.9rem] overflow-hidden aspect-[4/5] md:aspect-auto md:h-[600px]">
                   <img 
                     src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976&auto=format&fit=crop" 
                     alt="Tutor teaching" 
                     className="w-full h-full object-cover"
                   />
                   <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-80" />
                   <div className="absolute bottom-8 left-8 right-8 p-6 rounded-2xl border backdrop-blur-xl bg-white/5" style={{ borderColor: "var(--border)" }}>
                      <div className="flex items-center gap-4 mb-3">
                        <div className="flex -space-x-2">
                           {[1,2,3].map(i => (
                             <img key={i} src={`https://i.pravatar.cc/100?img=${i+10}`} className="h-8 w-8 rounded-full border-2 border-background" />
                           ))}
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-widest text-white">Join 500+ Experts</span>
                      </div>
                      <p className="text-sm font-bold text-white leading-relaxed">
                        "Joining SkillBridge was the best decision I made for my career. I love the freedom and the high-quality students."
                      </p>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <Container className="relative z-10">
          <div 
            className="max-w-5xl mx-auto rounded-[3rem] p-8 md:p-20 text-center relative overflow-hidden"
            style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border)" }}
          >
            <div className="space-y-8 max-w-3xl mx-auto relative z-10">
              <div 
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest"
                style={{ backgroundColor: "var(--bg-subtle)", color: "var(--text-muted)", border: "1px solid var(--border)" }}
              >
                <Sparkles className="h-3 w-3" style={{ color: "var(--accent)" }} />
                <span>Ready to start?</span>
              </div>

              <h2 className="section-heading text-4xl md:text-5xl lg:text-6xl" style={{ color: "var(--text)" }}>
                Start Your Teaching <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--accent)] to-blue-400">
                  Career Today
                </span>
              </h2>

              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                The application process takes less than 5 minutes. We review all applications within 48 hours.
              </p>

              <div className="pt-10">
                <Button
                  asChild
                  size="lg"
                  className="h-16 px-12 text-lg font-black rounded-xl transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl hover:shadow-blue-500/30"
                  style={{ backgroundColor: "var(--accent)", color: "var(--bg)" }}
                >
                  <Link href={user ? "/become-a-tutor/apply" : "/login"}>
                    Submit Application <ArrowRight className="ml-2 h-6 w-6" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
