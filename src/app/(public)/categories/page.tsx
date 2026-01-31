import { Container } from "@/components/ui/container";

export default function CategoriesPage() {
  return (
    <Container className="py-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">Categories</h1>
        <p className="text-muted-foreground mb-8">
          Browse our wide range of subjects and find the perfect tutor for your needs.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {[
            { name: "Programming", icon: "💻", count: 12 },
            { name: "Mathematics", icon: "🔢", count: 8 },
            { name: "Languages", icon: "🌍", count: 15 },
            { name: "Science", icon: "🔬", count: 10 },
            { name: "Arts", icon: "🎨", count: 6 },
            { name: "Music", icon: "🎵", count: 4 },
          ].map((category) => (
            <div key={category.name} className="bg-card border rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer">
              <div className="text-4xl mb-4">{category.icon}</div>
              <h3 className="text-lg font-semibold mb-2">{category.name}</h3>
              <p className="text-sm text-muted-foreground">{category.count} tutors available</p>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
}
