import TutorGrid from "@/components/tutors/tutor-grid";
import TutorFilters from "@/components/tutors/tutor-filters";
import TutorSearch from "@/components/tutors/tutor-search";
import { Container } from "@/components/ui/container";

// Force dynamic rendering to prevent prerendering issues
export const dynamic = 'force-dynamic';

export default function TutorsPage() {
    return (
        <Container className="py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-4">Browse Tutors</h1>
                <p className="text-muted-foreground">Find your perfect tutor from our verified experts</p>
            </div>
            
            <div className="flex flex-col lg:flex-row gap-8">
                {/* Filters Sidebar */}
                <div className="w-full lg:w-64 flex-shrink-0">
                    <TutorFilters />
                </div>
                
                {/* Main Content */}
                <div className="flex-1">
                    <div className="mb-6">
                        <TutorSearch />
                    </div>
                    
                    <TutorGrid />
                </div>
            </div>
        </Container>
    );
}
