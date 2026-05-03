import { Button } from "@/components/ui/button";
import { Star, MapPin, Clock, DollarSign } from "lucide-react";
import Link from "next/link";
import { User } from "@/types";
import Image from "next/image";

interface TutorCardProps {
  tutor: User;
}

export default function TutorCard({ tutor }: TutorCardProps) {
  const profile = tutor.tutorProfile;
  const hasProfile = !!profile;
  const rating = hasProfile ? (profile.rating || 0) : 0;
  const subjects = hasProfile && profile.subjects ? profile.subjects : [];
  const hourlyRate = hasProfile ? (profile.hourlyRate || 0) : 0;
  const bio = hasProfile ? (profile.bio || "") : "";

  return (
    <div className="group flex flex-col overflow-hidden rounded-[10px] transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
      style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border)" }}>
      {/* Image */}
      <div className="relative aspect-[4/3] w-full overflow-hidden"
        style={{ backgroundColor: "var(--bg-subtle)" }}>
        <Image
          src={tutor.image || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400"}
          alt={tutor.name}
          width={400} height={300}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 grayscale-[0.2] group-hover:grayscale-0"
        />
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ background: "linear-gradient(to top, rgba(0,0,0,0.4), transparent)" }} />

         {/* Badges */}
         <div className="absolute top-3 left-3 flex flex-col gap-1.5">
           {!hasProfile && (
             <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider"
               style={{ backgroundColor: "var(--bg-card)", color: "var(--text-muted)" }}>
               New
             </span>
           )}
           {hourlyRate === 0 && (
             <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider"
               style={{ backgroundColor: "var(--accent)", color: "var(--accent-foreground)" }}>
               Free Tutor
             </span>
           )}
           {rating >= 4.5 && hourlyRate > 0 && (
             <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider"
               style={{ backgroundColor: "var(--bg-card)", color: "var(--text-muted)" }}>
               Top Rated
             </span>
           )}
         </div>

        {/* Rating badge */}
        <div className="absolute bottom-3 right-3 flex items-center gap-1.5 px-2 py-1 rounded-lg"
          style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border)" }}>
          <Star className="h-3 w-3 fill-current" style={{ color: "var(--text-muted)" }} />
          <span className="text-xs font-black" style={{ color: "var(--text)" }}>{rating.toFixed(1)}</span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5">
        <div className="mb-3">
          <h3 className="font-black text-lg line-clamp-1 mb-1" style={{ color: "var(--text)" }}>{tutor.name}</h3>
          <div className="flex flex-wrap gap-1">
            {subjects.length > 0 ? (
              subjects.slice(0, 3).map((s, idx) => (
                <span key={idx} className="px-2 py-0.5 rounded-full text-[10px] font-semibold"
                  style={{ backgroundColor: "var(--bg-subtle)", color: "var(--text-muted)" }}>
                  {s.subject.name}
                </span>
              ))
            ) : (
              <span className="text-xs italic" style={{ color: "var(--text-faint)" }}>Onboarding...</span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-4 mb-3">
          <div className="flex items-center gap-1.5" style={{ color: "var(--text-muted)" }}>
            <MapPin className="h-3.5 w-3.5" />
            <span className="text-xs font-semibold">Online</span>
          </div>
          <div className="flex items-center gap-1.5" style={{ color: "var(--text-muted)" }}>
            <Clock className="h-3.5 w-3.5" />
            <span className="text-xs font-semibold">{hasProfile ? `${profile?.experience || 0} yrs` : "N/A"}</span>
          </div>
        </div>

        <div className="h-px mb-3" style={{ backgroundColor: "var(--border)" }} />

        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-[10px] font-black uppercase tracking-widest" style={{ color: "var(--text-faint)" }}>Rate</span>
            <p className="text-xl font-black" style={{ color: "var(--text)" }}>
              {hourlyRate === 0 ? (
                <span className="text-green-600">Free</span>
              ) : (
                <>
                  ${hourlyRate}<small className="text-xs font-semibold ml-0.5" style={{ color: "var(--text-faint)" }}>/hr</small>
                </>
              )}
            </p>
          </div>
          <div className="text-right">
            <span className="text-[10px] font-black uppercase tracking-widest" style={{ color: "var(--text-faint)" }}>Reviews</span>
            <p className="text-sm font-bold" style={{ color: "var(--text-muted)" }}>
              {hasProfile ? `${profile?.totalReviews || 0}` : "—"}
            </p>
          </div>
        </div>

        {bio && (
          <p className="text-sm line-clamp-2 mb-4 flex-1" style={{ color: "var(--text-muted)" }}>{bio}</p>
        )}

        <Button asChild className="w-full h-10 rounded-[10px] font-bold mt-auto"
          style={{ backgroundColor: "var(--accent)", color: "var(--text)", border: "none" }}>
          <Link href={`/tutors/${tutor.id}`}>View Profile</Link>
        </Button>
      </div>
    </div>
  );
}
