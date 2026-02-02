"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Edit, Trash2 } from "lucide-react";
import { renderIcon } from "@/lib/category-icons";
import { Category } from "@/services/admin.service";

interface CategoryTableProps {
  categories: Category[];
  loading: boolean;
  onEdit: (category: Category) => void;
  onDelete: (categoryId: string) => void;
}

export default function CategoryTable({
  categories,
  loading,
  onEdit,
  onDelete
}: CategoryTableProps) {
  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Category List</CardTitle>
          <CardDescription>Loading categories...</CardDescription>
        </CardHeader>        
      </Card>
    );
  }

  if (categories.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Category List</CardTitle>
          <CardDescription>No categories found</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <Edit className="h-8 w-8 text-gray-400" />
            </div>
            <p className="text-muted-foreground">No categories found. Create your first category to get started.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Category List</CardTitle>
        <CardDescription>
          Manage all subject categories available on the platform ({categories.length} total)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-b border-gray-200 dark:border-gray-700">
                <TableHead className="text-base font-semibold text-gray-700 dark:text-gray-300">Icon</TableHead>
                <TableHead className="text-base font-semibold text-gray-700 dark:text-gray-300">Name</TableHead>
                <TableHead className="text-base font-semibold text-gray-700 dark:text-gray-300">Slug</TableHead>
                <TableHead className="text-base font-semibold text-gray-700 dark:text-gray-300">Description</TableHead>
                <TableHead className="text-base font-semibold text-gray-700 dark:text-gray-300">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories.map((category) => (
                <TableRow 
                  key={category.id} 
                  className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                >
                  <TableCell className="py-4">
                    <div className="p-3 bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg w-fit text-primary border border-primary/20">
                      {renderIcon(category.icon || "BookOpen")}
                    </div>
                  </TableCell>
                  <TableCell className="py-4">
                    <div className="font-semibold text-gray-900 dark:text-gray-100">{category.name}</div>
                  </TableCell>
                  <TableCell className="py-4">
                    <code className="bg-muted px-2 py-1 rounded text-sm text-gray-600 dark:text-gray-400">
                      {category.slug}
                    </code>
                  </TableCell>
                  <TableCell className="py-4">
                    <div className="max-w-xs truncate text-sm text-gray-600 dark:text-gray-400">
                      {category.description || "No description"}
                    </div>
                  </TableCell>
                  <TableCell className="py-4">
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => onEdit(category)}
                        className="border-blue-200 hover:border-blue-300 hover:bg-blue-50 transition-colors"
                      >
                        <Edit className="h-3 w-3 mr-1" />
                        Edit
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button 
                            size="sm" 
                            variant="destructive"
                            className="bg-red-500 hover:bg-red-600 text-white border-0 shadow-md hover:shadow-lg transition-all duration-200"
                          >
                            <Trash2 className="h-3 w-3 mr-1" />
                            Delete
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Category</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete "{category.name}"? This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction 
                              onClick={() => onDelete(category.id)}
                              className="bg-red-500 hover:bg-red-600"
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
