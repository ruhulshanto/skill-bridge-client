"use client";

import { Container } from "@/components/ui/container";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { renderIcon } from "@/lib/category-icons";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  tutorCount: number;
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Simulate fetching categories
    const mockCategories: Category[] = [
      {
        id: "1",
        name: "Programming",
        slug: "programming",
        description: "Learn web development, mobile apps, and software engineering",
        icon: "Code",
        tutorCount: 12
      },
      {
        id: "2",
        name: "Mathematics",
        slug: "mathematics",
        description: "Master algebra, calculus, statistics, and more",
        icon: "Calculator",
        tutorCount: 8
      },
      {
        id: "3",
        name: "Languages",
        slug: "languages",
        description: "Speak fluent English, Spanish, French, and other languages",
        icon: "Globe",
        tutorCount: 15
      },
      {
        id: "4",
        name: "Science",
        slug: "science",
        description: "Explore physics, chemistry, biology, and environmental science",
        icon: "Microscope",
        tutorCount: 10
      },
      {
        id: "5",
        name: "Arts & Design",
        slug: "arts-design",
        description: "Develop your creativity in drawing, painting, and digital design",
        icon: "Palette",
        tutorCount: 6
      },
      {
        id: "6",
        name: "Music",
        slug: "music",
        description: "Learn instruments, music theory, and production",
        icon: "Music",
        tutorCount: 4
      }
    ];

    setTimeout(() => {
      setCategories(mockCategories);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <Container className="py-8">
        <div className="flex items-center justify-center flex-col mb-8">
          <div className="h-8 w-8 rounded-lg bg-gray-600 flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-sm">SB</span>
          </div>
          <h1 className="text-3xl font-bold mb-4">Loading Categories...</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="animate-pulse">
              <Card className="h-full">
                <CardHeader>
                  <div className="h-12 w-12 bg-gray-200 rounded-lg mb-4"></div>
                  <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                </CardHeader>
                <CardContent>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-8">
      {/* Enhanced Header Section */}
      <div className="text-center mb-12">
        <div className="relative inline-block mb-6">
          <div className="absolute inset-0 rounded-full blur-xl opacity-20"></div>
          <div className="relative flex items-center justify-center gap-3 px-6 py-3 rounded-full shadow-lg">
            <div className="h-6 w-6 rounded-lg bg-gray-800 flex items-center justify-center">
              <span className="text-white font-bold text-xs">SB</span>
            </div>
            <h1 className="text-2xl font-bold">Categories</h1>
          </div>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
            Discover Your Learning Path
          </h2>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Browse our wide range of subjects and find the perfect tutor for your learning journey. 
            From beginner to advanced, we have the right category for you.
          </p>
          
          {/* Quick Stats */}
          <div className="flex items-center justify-center gap-8 mb-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-1">{categories.length}</div>
              <div className="text-sm text-gray-500">Categories</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600  mb-1">
                {categories.reduce((sum, cat) => sum + cat.tutorCount, 0)}+
              </div>
              <div className="text-sm text-gray-500">Expert Tutors</div>
            </div>
            <div className="text-center"> 
              <div className="text-3xl font-bold text-blue-600 mb-1">24/7</div>
              <div className="text-sm text-gray-500">Support</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search categories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <Button variant="outline" className="border-gray-200 hover:bg-gray-50">
          <Filter className="h-4 w-4 mr-2" />
          Filter
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {filteredCategories.map((category) => (
          <Card key={category.id} className="group hover:shadow-lg transition-all duration-200 hover:border-blue-200 cursor-pointer border-2">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto mb-4 p-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl text-blue-600 border-2 border-blue-100 group-hover:shadow-md transition-shadow">
                {renderIcon(category.icon)}
              </div>
              <CardTitle className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                {category.name}
              </CardTitle>
              <CardDescription className="text-gray-600 line-clamp-2">
                {category.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex items-center justify-between">
                <Badge variant="secondary" className="bg-blue-50 text-blue-700 border-blue-200">
                  {category.tutorCount} tutors
                </Badge>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="border-blue-200 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                >
                  Explore
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredCategories.length === 0 && (
        <div className="text-center py-12">
          <div className="w-20 h-20 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Search className="h-10 w-10 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No Categories Found</h3>
          <p className="text-gray-500">
            Try adjusting your search terms to find what you're looking for.
          </p>
        </div>
      )}
    </Container>
  );
}