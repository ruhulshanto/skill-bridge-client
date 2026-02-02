"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import adminService, { Category } from "@/services/admin.service";
import CategoryForm from "@/components/admin/CategoryForm";
import CategoryTable from "@/components/admin/CategoryTable";

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
      // Ensure required fields are present
      const categoryData = {
        name: data.name || '',
        slug: data.slug || '',
        description: data.description || '',
        icon: data.icon || '',
      };
      await adminService.createCategory(categoryData);
      setIsCreateDialogOpen(false);
      fetchCategories();
    } catch (error) {
      console.error("Failed to create category:", error);
    }
  };

  const handleUpdateCategory = async (data: Partial<Category>) => {
    if (!editingCategory) return;

    try {
      // Ensure required fields are present
      const categoryData = {
        name: data.name || editingCategory.name,
        slug: data.slug || editingCategory.slug,
        description: data.description || editingCategory.description,
        icon: data.icon || editingCategory.icon,
      };
      await adminService.updateCategory(editingCategory.id, categoryData);
      setIsEditDialogOpen(false);
      setEditingCategory(null);
      fetchCategories();
    } catch (error) {
      console.error("Failed to update category:", error);
    }
  };

  const handleDeleteCategory = async (categoryId: string) => {
    try {
      await adminService.deleteCategory(categoryId);
      fetchCategories();
    } catch (error) {
      console.error("Failed to delete category:", error);
    }
  };

  const openEditDialog = (category: Category) => {
    setEditingCategory(category);
    setIsEditDialogOpen(true);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Category Management</h1>
          <p className="text-muted-foreground mt-1">
            Organize and manage subject categories for your tutoring platform
          </p>
        </div>
        <Button 
          onClick={() => setIsCreateDialogOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white border-0 shadow-md hover:shadow-lg transition-all duration-200"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Category
        </Button>
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
        title="Create New Category"
        description="Add a new subject category to the platform."
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
        title="Edit Category"
        description="Update the category information."
        submitButtonText="Update Category"
      />
    </div>
  );
}