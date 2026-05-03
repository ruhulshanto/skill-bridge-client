import { Container } from "@/components/ui/container";
import { TutorApplicationForm } from "@/components/forms/tutor-application-form";
import { Rocket } from "lucide-react";

export default function TutorApplyPage() {
  return (
    <div className="bg-background min-h-screen py-20 lg:py-32 overflow-hidden relative">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div 
          className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full blur-[120px] opacity-10"
          style={{ backgroundColor: "var(--accent)" }}
        />
        <div 
          className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full blur-[120px] opacity-10"
          style={{ backgroundColor: "#3b82f6" }}
        />
      </div>

      <Container>
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-6 text-[10px] font-black uppercase tracking-widest"
            style={{
              backgroundColor: "var(--bg-subtle)",
              border: "1px solid var(--border)",
              color: "var(--text-muted)",
            }}
          >
            <Rocket className="h-3 w-3" style={{ color: "var(--accent)" }} />
            Application Process
          </div>
          <h1 className="section-heading text-4xl md:text-5xl lg:text-6xl mb-6">
            Apply to <span style={{ color: "var(--accent)" }}>Teach</span>
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Fill out the form below to start your journey as a tutor on SkillBridge. 
            Tell us about your expertise and what makes you a great mentor.
          </p>
        </div>

        <div className="relative p-1 rounded-[2.5rem] bg-gradient-to-br from-[var(--border)] via-transparent to-[var(--border)] overflow-hidden shadow-2xl">
          <div className="relative bg-background rounded-[2.4rem] p-8 md:p-12 lg:p-16">
             <TutorApplicationForm />
          </div>
        </div>
      </Container>
    </div>
  );
}
