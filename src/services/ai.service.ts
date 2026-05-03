import { publicTutorService, PublicTutor } from "./tutor.service";
import { API_URL } from "@/config/api";

export interface AISuggestion {
  type: "subject" | "tutor" | "category";
  text: string;
  id?: string;
}

class AIService {
  private subjects = [
    "Mathematics", "Physics", "Chemistry", "Biology", 
    "Computer Science", "English Literature", "History", 
    "Art & Design", "Music Theory", "Business Studies",
    "Economics", "Psychology", "Sociology", "Geography",
    "Calculus", "Linear Algebra", "Data Structures", "Algorithms",
    "React", "Next.js", "Python", "JavaScript", "TypeScript"
  ];

  async getSearchSuggestions(query: string): Promise<AISuggestion[]> {
    if (!query || query.length < 2) return [];

    const suggestions: AISuggestion[] = [];
    const lowerQuery = query.toLowerCase();

    // 1. Match subjects
    const matchedSubjects = this.subjects
      .filter(s => s.toLowerCase().includes(lowerQuery))
      .slice(0, 3)
      .map(s => ({ type: "subject" as const, text: s }));
    suggestions.push(...matchedSubjects);

    // 2. Match Tutors (Fetch from public tutor service)
    try {
      const response = await publicTutorService.getTutors({ search: query, limit: 3 });
      const matchedTutors = response.data.map((t: PublicTutor) => ({ 
        type: "tutor" as const, 
        text: t.name, 
        id: t.id 
      }));
      suggestions.push(...matchedTutors);
    } catch (e) {
      console.error("AI Service: Failed to fetch tutors for suggestions", e);
    }

    return suggestions;
  }

  async getPersonalizedRecommendations(userId?: string) {
    try {
      const response = await publicTutorService.getTutors({ limit: 4 });
      
      // Personalized logic: 
      // For now, we recommend top rated or featured tutors.
      return response.data;
    } catch (e) {
      console.error("AI Service: Failed to get recommendations", e);
      return [];
    }
  }

  async getChatResponse(message: string, history: any[] = []): Promise<string> {
    const fullUrl = `${API_URL}/api/ai/chat`;
    console.log(`AI SERVICE: Fetching from ${fullUrl}`);
    
    try {
      const response = await fetch(fullUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message, history }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error("AI Backend Error:", errorData);
        throw new Error(errorData.details || errorData.error || "Failed to fetch AI response");
      }

      const data = await response.json();
      return data.response;
    } catch (error: any) {
      console.error("AI Service Error:", error);
      return `I'm having trouble connecting to my AI brain: ${error.message}. Please try again later!`;
    }
  }
}

const aiService = new AIService();
export default aiService;
