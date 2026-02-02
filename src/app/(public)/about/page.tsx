import { Container } from "@/components/ui/container";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, Globe, Award, Target, BookOpen, Star, ArrowRight, CheckCircle2, ShieldCheck, Sparkles } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function AboutPage() {
  return (
    <div className="bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        {/* Background Decorations */}
        <div className="absolute inset-0 -z-10 h-full w-full bg-background bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
          <div className="absolute left-1/3 top-0 -z-10 h-[400px] w-[400px] rounded-full bg-primary/20 opacity-20 blur-[100px]"></div>
          <div className="absolute right-0 bottom-0 -z-10 h-[300px] w-[300px] rounded-full bg-blue-500/10 opacity-30 blur-[120px]"></div>
        </div>

        <Container className="text-center relative z-10">
          <Badge variant="secondary" className="mb-6 px-4 py-2 text-sm rounded-full backdrop-blur-sm bg-muted/50 border-primary/20">
            <Sparkles className="w-3 h-3 mr-2 text-primary fill-primary" />
            Empowering the Future of Education
          </Badge>

          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl mb-6">
            Redefining How the <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600">World Learns</span>
          </h1>

          <p className="max-w-2xl mx-auto text-xl text-muted-foreground mb-10 leading-relaxed">
            Connect with expert mentors, master new skills, and unlock your full potential.
            We're building a global community where knowledge knows no boundaries.
          </p>
        </Container>
      </section>

      {/* Stats Section */}
      <section className="border-y bg-muted/30 py-12">
        <Container>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { label: "Active Students", value: "10k+", icon: Users },
              { label: "Expert Tutors", value: "500+", icon: Award },
              { label: "Countries Reached", value: "50+", icon: Globe },
              { label: "Student Satisfaction", value: "99%", icon: Star },
            ].map((stat, idx) => (
              <div key={idx} className="flex flex-col items-center justify-center text-center group">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <stat.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-3xl font-bold tracking-tight mb-1">{stat.value}</h3>
                <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">{stat.label}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 lg:py-32">
        <Container>
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            <Card className="relative overflow-hidden border-2 hover:border-primary/50 transition-colors group">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <CardHeader>
                <div className="h-14 w-14 rounded-2xl bg-blue-500/10 flex items-center justify-center mb-4">
                  <Target className="h-7 w-7 text-blue-600" />
                </div>
                <CardTitle className="text-2xl font-bold">Our Mission</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-lg text-muted-foreground text-foreground/80 leading-relaxed">
                  To democratize education by connecting every learner with the perfect tutor,
                  making quality personal learning accessible to everyone, everywhere, regardless of their background or location.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden border-2 hover:border-purple-500/50 transition-colors group">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <CardHeader>
                <div className="h-14 w-14 rounded-2xl bg-purple-500/10 flex items-center justify-center mb-4">
                  <Globe className="h-7 w-7 text-purple-600" />
                </div>
                <CardTitle className="text-2xl font-bold">Our Vision</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-lg text-muted-foreground text-foreground/80 leading-relaxed">
                  We envision a future where quality education is borderless. We strive to become the world's leading platform where technology and specialized human connection merge to foster lifelong learning.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </Container>
      </section>

      {/* What We Offer */}
      <section className="py-20 bg-muted/30">
        <Container>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">What We Offer</h2>
            <p className="text-lg text-muted-foreground">Comprehensive learning solutions designed for your success. We provide the tools you need to excel.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: ShieldCheck, title: "Verified Expert Tutors", desc: "Rigorous screening ensures you learn from the best in the field." },
              { icon: Sparkles, title: "Personalized Learning", desc: "1-on-1 sessions tailored specifically to your unique goals and pace." },
              { icon: Clock, title: "Flexible Scheduling", desc: "Book lessons that fit your busy lifestyle, anytime, anywhere." },
              { icon: Globe, title: "Global Network", desc: "Access diverse perspectives from mentors around the world." },
              { icon: Star, title: "Quality Assurance", desc: "Continuous monitoring ensures the highest educational standards." },
              { icon: Target, title: "Goal-Oriented", desc: "Structured paths to help you achieve specific academic milestones." },
            ].map((item, idx) => (
              <Card key={idx} className="bg-background border-none shadow-sm hover:shadow-md transition-shadow">
                <CardHeader>
                  <item.icon className="h-10 w-10 text-primary mb-2 opacity-80" />
                  <CardTitle className="text-xl">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    {item.desc}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 lg:py-32">
        <Container>
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Why Learners Choose SkillBridge?</h2>
              <p className="text-lg text-muted-foreground">
                We're different. We don't just connect you; we support your entire journey from the first click to the final exam ace.
              </p>

              <div className="space-y-6">
                {[
                  "Proven Track Record with thousands of success stories.",
                  "Advanced platform features for a seamless video checkout.",
                  "Affordable pricing models that respect your budget.",
                  "24/7 Priority Support whenever you need assistance.",
                  "Vibrant community of learners for peer motivation."
                ].map((text, i) => (
                  <div key={i} className="flex items-start gap-4 p-4 rounded-xl bg-muted/30 border border-transparent hover:border-primary/20 transition-colors">
                    <div className="mt-1 bg-green-500/10 p-1 rounded-full">
                      <CheckCircle2 className="h-5 w-5 text-green-600" />
                    </div>
                    <span className="font-medium">{text}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-blue-500/20 rounded-3xl blur-3xl transform rotate-3"></div>
              <div className="relative bg-background rounded-3xl border shadow-2xl p-8 space-y-8">
                <div className="flex items-center gap-4 border-b pb-6">
                  <div className="h-12 w-12 rounded-full bg-yellow-100 flex items-center justify-center">
                    <Star className="h-6 w-6 text-yellow-600 fill-yellow-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Student Success</h3>
                    <p className="text-sm text-muted-foreground">Rated 4.9/5 by our community</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <p className="italic text-muted-foreground text-lg">
                    "SkillBridge completely transformed my approach to learning. The verified tutors are top-notch!"
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-gray-200"></div>
                    <div className="font-semibold">Alex Thompson</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[url('/grid.svg')] opacity-10"></div>
        <Container className="text-center max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-6">
            Ready to Start Your Learning Journey?
          </h2>
          <p className="text-xl text-primary-foreground/80 mb-10 max-w-2xl mx-auto">
            Join thousands of students who are already transforming their lives through quality education.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="h-14 px-8 text-lg font-semibold shadow-lg hover:shadow-xl transition-all" asChild>
              <Link href="/tutors">
                Find Your Tutor <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="h-14 px-8 text-lg font-semibold bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary" asChild>
              <Link href="/register?role=tutor">
                Become a Tutor
              </Link>
            </Button>
          </div>
        </Container>
      </section>
    </div>
  );
}

// Helper icon component for specific needs
function Clock({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
  )
}
