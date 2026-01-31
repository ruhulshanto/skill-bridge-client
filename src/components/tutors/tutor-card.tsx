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
  
  if (!profile) return null;

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
              {profile.subjects?.map(s => s.subject.name).join(", ") || "No subjects"}
            </CardDescription>
          </div>
          <div className="flex items-center gap-1 text-sm font-medium text-yellow-600 ml-2">
            <Star className="h-4 w-4 fill-current" />
            {profile.rating.toFixed(1)}
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
            <span>{profile.experience} years experience</span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-lg font-semibold text-primary">
              ${profile.hourlyRate}/hour
            </span>
            <Badge variant="secondary" className="text-xs">
              {profile.totalReviews} reviews
            </Badge>
          </div>
          
          {profile.bio && (
            <p className="text-sm text-muted-foreground line-clamp-2">
              {profile.bio}
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
