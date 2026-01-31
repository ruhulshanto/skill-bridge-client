import { Container } from "@/components/ui/container";

export default function AboutPage() {
  return (
    <Container className="py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">About SkillBridge</h1>
          <p className="text-xl text-muted-foreground">
            Connecting learners with expert tutors worldwide
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 mb-12">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
            <p className="text-muted-foreground mb-4">
              SkillBridge is dedicated to making quality education accessible to everyone. 
              We connect passionate learners with experienced tutors who can help them 
              achieve their learning goals.
            </p>
            <p className="text-muted-foreground">
              Whether you're looking to learn a new skill, improve your grades, or 
              advance your career, our platform provides the perfect environment for growth.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-4">What We Offer</h2>
            <ul className="space-y-2 text-muted-foreground">
              <li>• Verified and experienced tutors</li>
              <li>• One-on-one personalized learning</li>
              <li>• Flexible scheduling options</li>
              <li>• Wide range of subjects</li>
              <li>• Affordable pricing</li>
              <li>• Secure online platform</li>
            </ul>
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">Join Our Community</h2>
          <p className="text-muted-foreground mb-6">
            Become part of a growing community of learners and tutors. 
            Start your learning journey today!
          </p>
          <div className="flex gap-4 justify-center">
            <a href="/register" className="bg-primary text-primary-foreground px-6 py-2 rounded-md hover:bg-primary/90">
              Get Started
            </a>
            <a href="/tutors" className="border border-border px-6 py-2 rounded-md hover:bg-accent">
              Browse Tutors
            </a>
          </div>
        </div>
      </div>
    </Container>
  );
}
