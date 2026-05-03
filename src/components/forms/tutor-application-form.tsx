"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Rocket, CheckCircle2, ChevronRight, GraduationCap, Briefcase, DollarSign, ArrowLeft } from "lucide-react";
import { useAuth } from "@/contexts/auth-context";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  expertise: z.string().min(2, "Expertise is required"),
  bio: z.string().min(50, "Bio must be at least 50 characters"),
  experience: z.string().min(1, "Years of experience is required"),
  education: z.string().min(2, "Education background is required"),
  hourlyRate: z.string().min(1, "Hourly rate is required"),
  portfolioUrl: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
  subjects: z.string().min(2, "Please list at least one subject"),
});

export function TutorApplicationForm() {
  const { user } = useAuth();
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [appStatus, setAppStatus] = useState<string | null>(null);

  useEffect(() => {
    const fetchAppStatus = async () => {
      try {
        const res = await fetch("/api/tutor/application");
        if (res.ok) {
          const json = await res.json();
          const data = json.data;
          if (data) {
            setAppStatus(data.status);
            if (data.status === 'PENDING' || data.status === 'APPROVED' || data.status === 'REJECTED') {
              setIsSubmitted(true);
            }
          }
        }
      } catch (error) {
        console.error("Error fetching application status:", error);
      }
    };
    if (user) {
      fetchAppStatus();
    }
  }, [user]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      expertise: "",
      bio: "",
      experience: "",
      education: "",
      hourlyRate: "",
      portfolioUrl: "",
      subjects: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/tutor/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error?.message || "Failed to submit application");
      }

      setIsSubmitted(true);
      setAppStatus('PENDING');
      toast.success("Application submitted successfully!");
    } catch (error: any) {
      toast.error(error.message || "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted || appStatus) {
    return (
      <div className="text-center py-12 animate-fade-in">
        <div className={cn(
          "h-20 w-20 rounded-full flex items-center justify-center mx-auto mb-8",
          appStatus === 'REJECTED' ? "bg-red-500/10" : "bg-green-500/10"
        )}>
          {appStatus === 'REJECTED' ? (
            <Rocket className="h-10 w-10 text-red-500" />
          ) : (
            <CheckCircle2 className="h-10 w-10 text-green-500" />
          )}
        </div>
        <h2 className="text-3xl font-black mb-4" style={{ color: "var(--text)" }}>
          {appStatus === 'APPROVED' ? "Application Approved!" : 
           appStatus === 'REJECTED' ? "Application Rejected" : 
           "Application Received!"}
        </h2>
        <p className="text-muted-foreground max-w-md mx-auto mb-10 leading-relaxed">
          {appStatus === 'APPROVED' ? "Welcome to SkillBridge! Your tutor profile is now active." :
           appStatus === 'REJECTED' ? "Unfortunately, your application was not approved at this time." :
           "Thank you for applying to be a tutor at SkillBridge. Our team will review your profile and get back to you within 48 hours via email."}
        </p>
        <Button asChild className="rounded-xl h-12 px-8 font-bold" style={{ backgroundColor: "var(--accent)", color: "var(--bg)" }}>
          <button onClick={() => router.push(appStatus === 'APPROVED' ? "/tutor/dashboard" : "/")}>
            {appStatus === 'APPROVED' ? "Go to Dashboard" : "Back to Home"}
          </button>
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress Bar */}
      <div className="flex items-center justify-between mb-12 relative">
         <div className="absolute top-1/2 left-0 w-full h-0.5 bg-border -z-10 -translate-y-1/2" />
         {[1, 2, 3].map((s) => (
           <div 
             key={s}
             className={cn(
               "h-10 w-10 rounded-full flex items-center justify-center font-black transition-all duration-300",
               step >= s ? "bg-[var(--accent)] text-white scale-110 shadow-lg" : "bg-[var(--bg-card)] border border-border text-muted-foreground"
             )}
           >
             {step > s ? <CheckCircle2 className="h-5 w-5" /> : s}
           </div>
         ))}
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {step === 1 && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex items-center gap-3 mb-2">
                <Briefcase className="h-5 w-5" style={{ color: "var(--accent)" }} />
                <h3 className="text-xl font-black" style={{ color: "var(--text)" }}>Professional Profile</h3>
              </div>
              
              <FormField
                control={form.control}
                name="expertise"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Primary Expertise</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Senior Software Engineer, Ph.D. in Physics" {...field} className="h-12 rounded-xl" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="experience"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Years of Experience</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="e.g. 8" {...field} className="h-12 rounded-xl" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="education"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Highest Education</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. MS in Computer Science" {...field} className="h-12 rounded-xl" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex justify-end pt-6">
                <Button 
                  type="button" 
                  onClick={async () => {
                    const isValid = await form.trigger(['expertise', 'experience', 'education']);
                    if (isValid) setStep(2);
                  }}
                  className="rounded-xl h-12 px-8 font-bold"
                  style={{ backgroundColor: "var(--accent)", color: "var(--bg)" }}
                >
                  Next Step <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex items-center gap-3 mb-2">
                <GraduationCap className="h-5 w-5" style={{ color: "var(--accent)" }} />
                <h3 className="text-xl font-black" style={{ color: "var(--text)" }}>Teaching Details</h3>
              </div>

              <FormField
                control={form.control}
                name="subjects"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Subjects You Can Teach</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. React, Python, Data Structures" {...field} className="h-12 rounded-xl" />
                    </FormControl>
                    <FormDescription>Separate subjects with commas</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tutor Biography</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Tell students about your teaching style, philosophy, and background..." 
                        className="min-h-[150px] rounded-xl" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-between pt-6">
                <Button variant="ghost" onClick={() => setStep(1)} className="rounded-xl h-12 font-bold">
                  <ArrowLeft className="mr-2 h-4 w-4" /> Back
                </Button>
                <Button 
                  type="button" 
                  onClick={async () => {
                    const isValid = await form.trigger(['subjects', 'bio']);
                    if (isValid) setStep(3);
                  }}
                  className="rounded-xl h-12 px-8 font-bold"
                  style={{ backgroundColor: "var(--accent)", color: "var(--bg)" }}
                >
                  Final Details <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex items-center gap-3 mb-2">
                <DollarSign className="h-5 w-5" style={{ color: "var(--accent)" }} />
                <h3 className="text-xl font-black" style={{ color: "var(--text)" }}>Rates & Links</h3>
              </div>

              <FormField
                control={form.control}
                name="hourlyRate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Expected Hourly Rate ($)</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="45" {...field} className="h-12 rounded-xl" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="portfolioUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Portfolio or LinkedIn URL (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="https://linkedin.com/in/yourprofile" {...field} className="h-12 rounded-xl" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-between pt-6">
                <Button variant="ghost" onClick={() => setStep(2)} className="rounded-xl h-12 font-bold">
                  <ArrowLeft className="mr-2 h-4 w-4" /> Back
                </Button>
                <Button 
                  type="submit" 
                  disabled={isLoading}
                  className="rounded-xl h-12 px-10 font-black shadow-xl shadow-blue-500/20"
                  style={{ backgroundColor: "var(--accent)", color: "var(--bg)" }}
                >
                  {isLoading ? "Submitting..." : "Submit Application"}
                  {!isLoading && <Rocket className="ml-2 h-4 w-4" />}
                </Button>
              </div>
            </div>
          )}
        </form>
      </Form>
    </div>
  );
}
