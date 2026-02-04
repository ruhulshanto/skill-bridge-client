import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, Clock } from "lucide-react";
import Link from "next/link";
import { User } from "@/types";
import Image from "next/image";

interface TutorCardProps {
  tutor: User;
}

export default function TutorCard({ tutor }: TutorCardProps) {
  const profile = tutor.tutorProfile;

  // Show tutor even without complete profile
  const hasProfile = !!profile;
  const rating = hasProfile ? (profile.rating || 0) : 0;
  const subjects = hasProfile && profile.subjects ? profile.subjects : [];
  const hourlyRate = hasProfile ? (profile.hourlyRate || 0) : 0;
  const bio = hasProfile ? (profile.bio || "") : "";

  return (
    <Card className="group overflow-hidden border-slate-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 bg-white">
      {/* Image Section with Overlay Badges */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
        <Image
          src={tutor.image || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400"}
          alt={tutor.name}
          width={400}
          height={300}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {!hasProfile && (
            <Badge className="bg-blue-600/90 backdrop-blur-md text-white border-0 text-[10px] font-bold uppercase tracking-wider px-2 py-1">
              New Joining
            </Badge>
          )}
          {rating >= 4.5 && (
            <Badge className="bg-amber-500/90 backdrop-blur-md text-white border-0 text-[10px] font-bold uppercase tracking-wider px-2 py-1">
              Top Rated
            </Badge>
          )}
        </div>

        {/* Floating Rating Card */}
        <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-md rounded-xl p-2 shadow-xl border border-white/20 flex items-center gap-1.5 transition-transform group-hover:scale-110">
          <div className="p-1 rounded-lg bg-yellow-400 text-white">
            <Star className="h-3 w-3 fill-current" />
          </div>
          <span className="text-sm font-black text-slate-800">{rating.toFixed(1)}</span>
        </div>
      </div>

      <CardHeader className="pb-3 pt-5">
        <div className="space-y-1">
          <CardTitle className="text-xl font-black text-slate-900 line-clamp-1 group-hover:text-blue-600 transition-colors">
            {tutor.name}
          </CardTitle>
          <div className="flex flex-wrap gap-1.5 pt-1">
            {subjects.length > 0 ? (
              subjects.slice(0, 3).map((s, idx) => (
                <Badge key={idx} variant="secondary" className="bg-slate-50 text-[10px] text-slate-500 hover:bg-blue-50 hover:text-blue-600 transition-colors border-slate-100">
                  {s.subject.name}
                </Badge>
              ))
            ) : (
              <span className="text-xs text-slate-400 font-medium italic">Onboarding...</span>
            )}
            {subjects.length > 3 && (
              <Badge variant="secondary" className="bg-slate-50 text-[10px] text-slate-400 border-slate-100">
                +{subjects.length - 3}
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="pb-4">
        <div className="space-y-4">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-slate-500">
              <div className="p-1.5 rounded-lg bg-slate-50">
                <MapPin className="h-3.5 w-3.5" />
              </div>
              <span className="text-xs font-bold uppercase tracking-tight">Online</span>
            </div>

            <div className="flex items-center gap-2 text-slate-500">
              <div className="p-1.5 rounded-lg bg-slate-50">
                <Clock className="h-3.5 w-3.5" />
              </div>
              <span className="text-xs font-bold uppercase tracking-tight">
                {hasProfile ? `${profile?.experience || 0} Years` : "N/A"}
              </span>
            </div>
          </div>

          <div className="h-px bg-slate-100 w-full" />

          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Pricing</span>
              <span className="text-2xl font-black text-blue-600">
                ${hourlyRate}<small className="text-xs text-slate-400 font-bold">/hr</small>
              </span>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest block mb-1">Feedback</span>
              <div className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-[10px] font-black tracking-wider border border-green-100">
                {hasProfile ? `${profile?.totalReviews || 0} REVIEWS` : "PURE TALENT"}
              </div>
            </div>
          </div>

          {bio ? (
            <p className="text-sm text-slate-500 line-clamp-2 leading-relaxed font-medium pt-1">
              {bio}
            </p>
          ) : (
            <p className="text-sm text-slate-400 italic line-clamp-2 leading-relaxed pt-1">
              "Dedicated to providing exceptional learning experiences tailored to each student's unique needs."
            </p>
          )}
        </div>
      </CardContent>

      <CardFooter className="pt-0 pb-6 px-6">
        <Button asChild className="w-full h-12 bg-slate-900 hover:bg-blue-600 text-white font-black rounded-xl shadow-lg hover:shadow-blue-500/20 transition-all duration-300 active:scale-95 border-0">
          <Link href={`/tutors/${tutor.id}`}>
            Review Credentials
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
