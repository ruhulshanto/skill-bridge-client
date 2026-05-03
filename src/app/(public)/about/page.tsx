import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Users, Globe, Award, Target, BookOpen, Star, ArrowRight, CheckCircle2, ShieldCheck, Sparkles, Clock } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function AboutPage() {
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
          <div 
            className="absolute bottom-[-5%] left-[-5%] w-[40%] h-[40%] rounded-full blur-[100px] opacity-10 dark:opacity-20"
            style={{ backgroundColor: "#3b82f6" }}
          />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-[0.15]" />
        </div>

        <Container className="relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 text-[11px] font-bold uppercase tracking-[0.15em] animate-fade-in"
              style={{
                backgroundColor: "var(--bg-subtle)",
                border: "1px solid var(--border)",
                color: "var(--text-muted)",
                backdropFilter: "blur(10px)",
              }}
            >
              <span
                className="h-1.5 w-1.5 rounded-full animate-pulse"
                style={{ backgroundColor: "var(--accent)" }}
              />
              Our Mission & Vision
            </div>

            <h1 className="section-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-8 leading-[1.05]">
              Empowering the World Through <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--accent)] to-blue-500">
                Borderless Learning
              </span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
              We're on a mission to democratize education by connecting every curious mind with world-class mentors. 
              Knowledge shouldn't have boundaries, and neither should your potential.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button asChild size="lg" className="rounded-xl h-14 px-8 font-bold text-base transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/20" style={{ backgroundColor: "var(--accent)", color: "var(--bg)" }}>
                <Link href="/tutors">Explore Tutors <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-xl h-14 px-8 font-bold text-base bg-white/5 backdrop-blur-md border-white/10 hover:bg-white/10 transition-all">
                <Link href="/register">Join the Community</Link>
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
              { label: "Active Students", value: "10k+", icon: Users },
              { label: "Expert Tutors", value: "500+", icon: Award },
              { label: "Countries Reached", value: "50+", icon: Globe },
              { label: "Student Satisfaction", value: "99%", icon: Star },
            ].map((stat, idx) => (
              <div key={idx} className="flex flex-col items-center justify-center text-center group">
                <div 
                  className="h-14 w-14 rounded-2xl flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 shadow-sm"
                  style={{ backgroundColor: "var(--bg-subtle)", border: "1px solid var(--border)" }}
                >
                  <stat.icon className="h-6 w-6" style={{ color: "var(--accent)" }} />
                </div>
                <h3 className="text-3xl font-bold tracking-tight mb-1" style={{ color: "var(--text)" }}>{stat.value}</h3>
                <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">{stat.label}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 lg:py-32 relative overflow-hidden">
        <Container>
          <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
            <div className="relative group">
              <div 
                className="absolute -inset-4 rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"
                style={{ backgroundColor: "var(--bg-subtle)" }}
              />
              <div className="space-y-6">
                <div 
                  className="h-16 w-16 rounded-2xl flex items-center justify-center mb-8 shadow-inner"
                  style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border)" }}
                >
                  <Target className="h-8 w-8" style={{ color: "var(--accent)" }} />
                </div>
                <h2 className="text-3xl font-bold tracking-tight" style={{ color: "var(--text)" }}>Our Mission</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  To democratize education by connecting every learner with the perfect tutor,
                  making quality personal learning accessible to everyone, everywhere, regardless of their background or location.
                </p>
                <div className="pt-4 flex items-center gap-2 text-sm font-bold" style={{ color: "var(--accent)" }}>
                   <span className="h-1 w-8 rounded-full" style={{ backgroundColor: "var(--accent)" }} />
                   Accessibility First
                </div>
              </div>
            </div>

            <div className="relative group">
              <div 
                className="absolute -inset-4 rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"
                style={{ backgroundColor: "var(--bg-subtle)" }}
              />
              <div className="space-y-6">
                <div 
                  className="h-16 w-16 rounded-2xl flex items-center justify-center mb-8 shadow-inner"
                  style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border)" }}
                >
                  <Globe className="h-8 w-8" style={{ color: "var(--accent)" }} />
                </div>
                <h2 className="text-3xl font-bold tracking-tight" style={{ color: "var(--text)" }}>Our Vision</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  We envision a future where quality education is borderless. We strive to become the world's leading platform where technology and specialized human connection merge to foster lifelong learning.
                </p>
                <div className="pt-4 flex items-center gap-2 text-sm font-bold" style={{ color: "var(--accent)" }}>
                   <span className="h-1 w-8 rounded-full" style={{ backgroundColor: "var(--accent)" }} />
                   Global Connection
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* What We Offer */}
      <section className="py-24 lg:py-32" style={{ backgroundColor: "var(--bg-card)" }}>
        <Container>
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="section-heading text-3xl sm:text-4xl md:text-5xl mb-6" style={{ color: "var(--text)" }}>What We Offer</h2>
            <p className="text-lg text-muted-foreground">Comprehensive learning solutions designed for your success. We provide the tools you need to excel.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: ShieldCheck, title: "Verified Expert Tutors", desc: "Rigorous screening ensures you learn from the best in the field." },
              { icon: Sparkles, title: "Personalized Learning", desc: "1-on-1 sessions tailored specifically to your unique goals and pace." },
              { icon: Clock, title: "Flexible Scheduling", desc: "Book lessons that fit your busy lifestyle, anytime, anywhere." },
              { icon: Globe, title: "Global Network", desc: "Access diverse perspectives from mentors around the world." },
              { icon: Star, title: "Quality Assurance", desc: "Continuous monitoring ensures the highest educational standards." },
              { icon: Target, title: "Goal-Oriented", desc: "Structured paths to help you achieve specific academic milestones." },
            ].map((item, idx) => (
              <div 
                key={idx} 
                className="group p-8 rounded-[2rem] transition-all duration-300 hover:-translate-y-2"
                style={{ backgroundColor: "var(--bg)", border: "1px solid var(--border)" }}
              >
                <div 
                  className="h-14 w-14 rounded-2xl flex items-center justify-center mb-8 transition-transform duration-500 group-hover:rotate-[360deg]"
                  style={{ backgroundColor: "var(--bg-subtle)", border: "1px solid var(--border)" }}
                >
                  <item.icon className="h-6 w-6" style={{ color: "var(--accent)" }} />
                </div>
                <h3 className="text-xl font-bold mb-4" style={{ color: "var(--text)" }}>{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 lg:py-32">
        <Container>
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div className="space-y-10">
              <div>
                <h2 className="section-heading text-3xl sm:text-4xl md:text-5xl mb-6" style={{ color: "var(--text)" }}>Why Learners Choose SkillBridge?</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  We're different. We don't just connect you; we support your entire journey from the first click to the final exam ace.
                </p>
              </div>
 
              <div className="space-y-4">
                {[
                  "Proven Track Record with thousands of success stories.",
                  "Advanced platform features for a seamless learning flow.",
                  "Affordable pricing models that respect your budget.",
                  "24/7 Priority Support whenever you need assistance.",
                  "Vibrant community of learners for peer motivation."
                ].map((text, i) => (
                  <div key={i} className="flex items-start gap-4 p-5 rounded-2xl transition-all duration-300 hover:bg-white/5 group" style={{ border: "1px solid var(--border)" }}>
                    <div className="mt-1 p-1 rounded-full flex-shrink-0" style={{ backgroundColor: "rgba(34,197,94,0.1)" }}>
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                    </div>
                    <span className="font-semibold text-[15px]" style={{ color: "var(--text)" }}>{text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              {/* Background Glow */}
              <div 
                className="absolute -inset-10 rounded-full blur-[100px] opacity-20 -z-10"
                style={{ backgroundColor: "var(--accent)" }}
              />
              
              <div 
                className="relative p-1 rounded-[2.5rem] overflow-hidden"
                style={{ background: "linear-gradient(135deg, var(--border), transparent, var(--border))" }}
              >
                <div className="relative bg-background rounded-[2.4rem] p-8 md:p-12 space-y-10">
                  <div className="flex items-center gap-5 border-b pb-8" style={{ borderColor: "var(--border)" }}>
                    <div 
                      className="h-16 w-16 rounded-2xl flex items-center justify-center shadow-lg"
                      style={{ backgroundColor: "var(--bg-subtle)", border: "1px solid var(--border)" }}
                    >
                      <Star className="h-8 w-8 text-yellow-500 fill-yellow-500" />
                    </div>
                    <div>
                      <h3 className="font-black text-xl tracking-tight" style={{ color: "var(--text)" }}>Student Success</h3>
                      <p className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Rated 4.9/5 globally</p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <p className="italic text-xl md:text-2xl font-medium leading-relaxed" style={{ color: "var(--text)" }}>
                      "SkillBridge completely transformed my approach to learning. The verified tutors are top-notch and the platform is incredibly intuitive!"
                    </p>
                    <div className="flex items-center gap-4">
                      <img 
                        src="https://i.pravatar.cc/100?img=12" 
                        alt="Alex Thompson" 
                        className="h-14 w-14 rounded-full object-cover border-2"
                        style={{ borderColor: "var(--accent)" }}
                      />
                      <div>
                        <div className="font-black text-lg" style={{ color: "var(--text)" }}>Alex Thompson</div>
                        <div className="text-sm font-bold text-muted-foreground">Master's Student, Oxford</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-background -z-10" />
        <Container className="relative z-10">
          <div 
            className="max-w-5xl mx-auto rounded-[3rem] p-8 md:p-20 text-center relative overflow-hidden"
            style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border)" }}
          >
            {/* Background elements */}
            <div 
              className="absolute top-0 right-0 w-64 h-64 rounded-full blur-[80px] opacity-10"
              style={{ backgroundColor: "var(--accent)" }}
            />
            <div 
              className="absolute bottom-0 left-0 w-64 h-64 rounded-full blur-[80px] opacity-10"
              style={{ backgroundColor: "#3b82f6" }}
            />

            <div className="space-y-8 max-w-3xl mx-auto relative z-10">
              <div 
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest"
                style={{ backgroundColor: "var(--bg-subtle)", color: "var(--text-muted)", border: "1px solid var(--border)" }}
              >
                <Sparkles className="h-3 w-3" style={{ color: "var(--accent)" }} />
                <span>Start your transformation</span>
              </div>

              <h2 className="section-heading text-4xl md:text-5xl lg:text-6xl" style={{ color: "var(--text)" }}>
                Ready to Start Your <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--accent)] to-blue-400">
                  Learning Journey?
                </span>
              </h2>

              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                Join thousands of students who are already transforming their lives through quality education.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-10">
                <Button
                  asChild
                  size="lg"
                  className="h-14 px-10 text-base font-bold rounded-xl transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/20"
                  style={{ backgroundColor: "var(--accent)", color: "var(--bg)" }}
                >
                  <Link href="/register">
                    Get Started Now <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="h-14 px-10 text-base font-bold rounded-xl bg-white/5 backdrop-blur-md border-white/10 hover:bg-white/10 transition-all duration-300"
                >
                  <Link href="/tutors">
                    Explore Tutors
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

