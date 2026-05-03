"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, Star, MapPin } from "lucide-react";
import aiService from "@/services/ai.service";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function AIRecommendations() {
  const [tutors, setTutors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecommendations = async () => {
      const data = await aiService.getPersonalizedRecommendations();
      setTutors(data);
      setLoading(false);
    };
    fetchRecommendations();
  }, []);

  if (loading || tutors.length === 0) return null;

  return (
    <section className="py-20 relative overflow-hidden bg-[var(--bg-card)]">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4" />

      <Container>
        <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 mb-4"
            >
              <div className="p-2 rounded-lg bg-primary/10 text-primary">
                <Sparkles className="h-4 w-4" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">
                AI Powered Insights
              </span>
            </motion.div>
            <h2 className="text-4xl font-black tracking-tight mb-4">
              Recommended <span className="text-primary italic">for You</span>
            </h2>
            <p className="text-muted-foreground text-lg font-medium max-w-lg">
              Our AI matched these top-rated tutors based on current learning trends and student success rates.
            </p>
          </div>
          <Link href="/tutors">
            <Button variant="outline" className="rounded-xl font-bold h-12 px-6 group transition-all">
              Explore All Tutors
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {tutors.map((tutor, index) => (
            <motion.div
              key={tutor.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group relative bg-background border border-border rounded-3xl p-6 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 hover:-translate-y-2"
            >
              <div className="absolute top-4 right-4">
                 <div className="flex items-center gap-1 bg-primary/10 text-primary px-2 py-1 rounded-full text-[10px] font-black uppercase">
                    <Star className="h-3 w-3 fill-current" />
                    {tutor.averageRating?.toFixed(1) || "5.0"}
                 </div>
              </div>

              <div className="flex flex-col items-center text-center mb-6">
                <Avatar className="h-20 w-20 mb-4 ring-4 ring-primary/5 group-hover:ring-primary/20 transition-all">
                  <AvatarImage src={tutor.user?.image} alt={tutor.user?.name} />
                  <AvatarFallback className="font-black text-xl">{tutor.user?.name?.[0]}</AvatarFallback>
                </Avatar>
                <h3 className="font-black text-lg group-hover:text-primary transition-colors">{tutor.user?.name}</h3>
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mt-1">{tutor.subjects?.[0] || "Expert Tutor"}</p>
              </div>

              <div className="space-y-4">
                <div className="flex flex-wrap justify-center gap-2">
                   {tutor.subjects?.slice(0, 2).map((sub: string) => (
                      <span key={sub} className="text-[9px] font-bold px-2 py-1 bg-muted rounded-lg">{sub}</span>
                   ))}
                </div>
                
                <div className="pt-4 border-t border-border/50 flex items-center justify-between">
                   <div className="flex items-center text-[10px] text-muted-foreground font-bold">
                      <MapPin className="h-3 w-3 mr-1" />
                      {tutor.location || "Remote"}
                   </div>
                   <div className="text-sm font-black text-primary">
                      ${tutor.hourlyRate}<span className="text-[10px] text-muted-foreground font-bold italic">/hr</span>
                   </div>
                </div>

                <Link href={`/tutors/${tutor.id}`} className="block">
                  <Button className="w-full rounded-xl font-bold h-10 shadow-lg shadow-primary/10">
                    Book Trial Session
                  </Button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
