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
    <Card className="overflow-hidden transition-all hover:shadow-lg">
      <div className="aspect-video w-full overflow-hidden bg-muted">
        <Image
          src={tutor.image || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400"}
          alt={tutor.name}
          width={400}
          height={300}
          className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
      
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg line-clamp-1">{tutor.name}</CardTitle>
            <CardDescription className="text-sm">
              {subjects.length > 0 ? subjects.map(s => s.subject.name).join(", ") : "Setting up profile..."}
            </CardDescription>
            {!hasProfile && (
              <Badge variant="outline" className="mt-1 text-xs">
                New Tutor
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-1 text-sm font-medium text-yellow-600 ml-2">
            <Star className="h-4 w-4 fill-current" />
            {rating.toFixed(1)}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pb-3">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span>Online</span>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>{hasProfile ? `${profile.experience || 0} years experience` : "Experience not set"}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-lg font-semibold text-primary">
              ${hourlyRate}/hour
            </span>
            <Badge variant="secondary" className="text-xs">
              {hasProfile ? `${profile.totalReviews || 0} reviews` : "No reviews"}
            </Badge>
          </div>
          
          {bio && (
            <p className="text-sm text-muted-foreground line-clamp-2">
              {bio}
            </p>
          )}
          
          {!hasProfile && (
            <p className="text-sm text-muted-foreground italic">
              This tutor is setting up their profile. Check back soon for more details!
            </p>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="pt-0">
        <Button asChild className="w-full">
          <Link href={`/tutors/${tutor.id}`}>
            View Profile
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
