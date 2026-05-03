"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Tag, Sparkles, Filter, Search } from "lucide-react";
import adminService, { Category } from "@/services/admin.service";
import CategoryForm from "@/components/admin/CategoryForm";
import CategoryTable from "@/components/admin/CategoryTable";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await adminService.getCategories();
      setCategories(response.data);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleCreateCategory = async (data: Partial<Category>) => {
    try {
      const categoryData = {
        name: data.name || '',
        slug: data.slug || '',
        description: data.description || '',
        icon: data.icon || 'BookOpen',
      };
      await adminService.createCategory(categoryData);
      setIsCreateDialogOpen(false);
      toast.success("Category initialized successfully");
      fetchCategories();
    } catch (error) {
      console.error("Failed to create category:", error);
      toast.error("Failed to create category");
    }
  };

  const handleUpdateCategory = async (data: Partial<Category>) => {
    if (!editingCategory) return;

    try {
      const categoryData = {
        name: data.name || editingCategory.name,
        slug: data.slug || editingCategory.slug,
        description: data.description || editingCategory.description,
        icon: data.icon || editingCategory.icon,
      };
      await adminService.updateCategory(editingCategory.id, categoryData);
      setIsEditDialogOpen(false);
      setEditingCategory(null);
      toast.success("Classification refined successfully");
      fetchCategories();
    } catch (error) {
      console.error("Failed to update category:", error);
      toast.error("Failed to update category");
    }
  };

  const handleDeleteCategory = async (categoryId: string) => {
    try {
      await adminService.deleteCategory(categoryId);
      toast.success("Category removed from engine");
      fetchCategories();
    } catch (error) {
      console.error("Failed to delete category:", error);
      toast.error("Failed to delete category");
    }
  };

  const openEditDialog = (category: Category) => {
    setEditingCategory(category);
    setIsEditDialogOpen(true);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-1000 pb-20">
      {/* ── Header ── */}
      <div 
        className="relative overflow-hidden rounded-[2.5rem] border border-[#a3c7e6] p-8 md:p-10 shadow-xl"
        style={{ backgroundColor: "#e5f2ff" }}
      >
        <div className="absolute top-0 right-0 h-full w-1/3 bg-gradient-to-l from-primary/5 to-transparent pointer-events-none"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/50 border border-[#a3c7e6] text-[#2d6a9f] text-[10px] font-black uppercase tracking-widest shadow-sm mb-4">
               Taxonomy Engine
            </div>
            <h1 className="text-4xl font-black tracking-tight text-[#0A2540] mb-2">Categories</h1>
            <p className="text-[#2d6a9f] font-medium max-w-xl">
              Organize and classify tutoring subjects. Manage visual identifiers and meta-descriptions for better discoverability.
            </p>
          </div>
          <div className="flex items-center gap-3">
             <Button 
               onClick={() => setIsCreateDialogOpen(true)}
               className="rounded-xl h-14 px-8 font-black text-xs uppercase tracking-widest bg-primary hover:bg-primary/90 text-white border-0 shadow-lg hover:shadow-primary/20 transition-all"
             >
                <Plus className="h-5 w-5 mr-2" />
                Add New Category
             </Button>
          </div>
        </div>
      </div>

      {/* ── Quick Actions & Search ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div 
          className="md:col-span-2 rounded-[2rem] border border-[#a3c7e6] p-6 shadow-lg flex items-center gap-4"
          style={{ backgroundColor: "#e5f2ff" }}
        >
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[#2d6a9f]" />
            <Input 
              placeholder="Filter classifications by name or slug..." 
              className="h-12 pl-12 rounded-xl bg-white border-[#a3c7e6] focus:ring-primary/20 text-sm font-medium"
            />
          </div>
          <Button variant="outline" className="h-12 rounded-xl border-[#a3c7e6] bg-white text-[#2d6a9f] font-bold text-xs">
            <Filter className="h-4 w-4 mr-2" />
            Sort
          </Button>
        </div>
        
        <div 
          className="rounded-[2rem] border border-[#a3c7e6] p-6 shadow-lg flex items-center justify-between"
          style={{ backgroundColor: "#e5f2ff" }}
        >
          <div>
            <p className="text-[10px] font-black text-[#2d6a9f] uppercase tracking-widest mb-1">Total Scale</p>
            <h3 className="text-2xl font-black text-[#0A2540]">{categories.length} Nodes</h3>
          </div>
        </div>
      </div>

      {/* Categories Table */}
      <CategoryTable
        categories={categories}
        loading={loading}
        onEdit={openEditDialog}
        onDelete={handleDeleteCategory}
      />

      {/* Create Dialog */}
      <CategoryForm
        isOpen={isCreateDialogOpen}
        onClose={() => setIsCreateDialogOpen(false)}
        onSubmit={handleCreateCategory}
        title="Initialize Node"
        description="Expand the platform taxonomy by adding a new subject classification."
        submitButtonText="Create Category"
      />

      {/* Edit Dialog */}
      <CategoryForm
        isOpen={isEditDialogOpen}
        onClose={() => {
          setIsEditDialogOpen(false);
          setEditingCategory(null);
        }}
        onSubmit={handleUpdateCategory}
        initialData={editingCategory || undefined}
        title="Refine Classification"
        description="Update the metadata and visual representation of this category node."
        submitButtonText="Update Category"
      />
    </div>
  );
}