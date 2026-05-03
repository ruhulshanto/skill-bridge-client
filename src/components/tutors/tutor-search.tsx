"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Sparkles, User, BookOpen } from "lucide-react";
import aiService, { AISuggestion } from "@/services/ai.service";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export default function TutorSearch() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get("search") || "");
  const [suggestions, setSuggestions] = useState<AISuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSearchTerm(searchParams.get("search") || "");
  }, [searchParams]);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (searchTerm.length >= 2) {
        const results = await aiService.getSearchSuggestions(searchTerm);
        setSuggestions(results);
        setShowSuggestions(results.length > 0);
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    };

    const timer = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (e?: React.FormEvent, term: string = searchTerm) => {
    e?.preventDefault();
    setShowSuggestions(false);
    
    const params = new URLSearchParams(searchParams.toString());
    if (term.trim()) {
      params.set("search", term.trim());
    } else {
      params.delete("search");
    }
    router.push(`/tutors?${params.toString()}`);
  };

  const handleSuggestionClick = (suggestion: AISuggestion) => {
    setSearchTerm(suggestion.text);
    handleSearch(undefined, suggestion.text);
  };

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <form onSubmit={(e) => handleSearch(e)} className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            type="text"
            placeholder="Search by name or subject (AI Suggestions active)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
            className="pl-10 h-11 rounded-xl bg-background border-muted-foreground/20 focus:border-primary transition-all shadow-sm"
          />
          {searchTerm.length >= 2 && (
             <div className="absolute right-3 top-1/2 -translate-y-1/2">
                <Sparkles className="h-3.5 w-3.5 text-primary animate-pulse" />
             </div>
          )}
        </div>
        <Button type="submit" className="h-11 px-6 rounded-xl font-bold bg-primary text-primary-foreground shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all active:scale-95">
          Search
        </Button>
      </form>

      <AnimatePresence>
        {showSuggestions && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            className="absolute z-50 w-full mt-2 bg-card border border-border rounded-2xl shadow-2xl overflow-hidden p-2"
            style={{ backdropFilter: "blur(12px)" }}
          >
            <div className="px-3 py-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground border-b border-border mb-1">
              AI Suggestions
            </div>
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="w-full flex items-center gap-3 px-3 py-3 text-sm text-left hover:bg-muted/50 rounded-xl transition-all group"
              >
                <div className="p-2 rounded-lg bg-background border border-border group-hover:border-primary/30 group-hover:text-primary transition-colors">
                  {suggestion.type === "tutor" ? (
                    <User className="h-3.5 w-3.5" />
                  ) : (
                    <BookOpen className="h-3.5 w-3.5" />
                  )}
                </div>
                <div>
                   <p className="font-bold text-foreground">{suggestion.text}</p>
                   <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{suggestion.type}</p>
                </div>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
