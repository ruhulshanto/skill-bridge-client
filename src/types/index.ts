export interface User {
  id: string;
  email: string;
  name: string;
  role: "STUDENT" | "TUTOR" | "ADMIN";
  image?: string;
  createdAt: Date;
  updatedAt: Date;
  tutorProfile?: TutorProfile;
}

export interface TutorProfile {
  id: string;
  userId: string;
  bio: string;
  hourlyRate: number;
  experience: number;
  education?: string;
  rating: number;
  totalReviews: number;
  user?: User;
  subjects?: TutorSubject[];
}

export interface TutorSubject {
  id: string;
  tutorId: string;
  subjectId: string;
  subject: Subject;
}

export interface Subject {
  id: string;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
}

export interface Booking {
  id: string;
  studentId: string;
  tutorId: string;
  date: Date;
  startTime: string;
  endTime: string;
  status: "CONFIRMED" | "COMPLETED" | "CANCELLED";
  totalAmount: number;
  notes?: string;
}

export interface Review {
  id: string;
  bookingId: string;
  studentId: string;
  rating: number;
  comment?: string;
  createdAt: Date;
}
