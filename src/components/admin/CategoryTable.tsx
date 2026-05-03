"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Edit, Trash2, Tag, ChevronRight, MoreVertical } from "lucide-react";
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
      <Card 
        className="overflow-hidden rounded-[2.5rem] border-[#a3c7e6] shadow-xl"
        style={{ backgroundColor: "#e5f2ff" }}
      >
        <CardHeader className="bg-white/30 border-b border-[#a3c7e6]/50">
          <CardTitle className="text-xl font-black text-[#0A2540]">Subject Categories</CardTitle>
          <CardDescription className="text-[#2d6a9f] font-medium">Synchronizing category data...</CardDescription>
        </CardHeader>        
        <CardContent className="h-64 flex items-center justify-center">
           <div className="h-10 w-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
        </CardContent>
      </Card>
    );
  }

  if (categories.length === 0) {
    return (
      <Card 
        className="overflow-hidden rounded-[2.5rem] border-[#a3c7e6] shadow-xl"
        style={{ backgroundColor: "#e5f2ff" }}
      >
        <CardHeader className="bg-white/30 border-b border-[#a3c7e6]/50">
          <CardTitle className="text-xl font-black text-[#0A2540]">Subject Categories</CardTitle>
          <CardDescription className="text-[#2d6a9f] font-medium">No categories currently active</CardDescription>
        </CardHeader>
        <CardContent className="p-12">
          <div className="text-center py-8">
            <div className="w-20 h-20 bg-white border border-[#a3c7e6] rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-sm">
              <Tag className="h-10 w-10 text-[#2d6a9f]" />
            </div>
            <p className="text-[#2d6a9f] font-bold text-lg">Empty Directory</p>
            <p className="text-sm text-[#2d6a9f]/70 mt-2">Create your first subject category to begin organizing tutors.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card 
      className="overflow-hidden rounded-[2.5rem] border-[#a3c7e6] shadow-xl"
      style={{ backgroundColor: "#e5f2ff" }}
    >
      <CardHeader className="bg-white/30 border-b border-[#a3c7e6]/50 p-8">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-2xl font-black text-[#0A2540]">Category Directory</CardTitle>
            <CardDescription className="text-[#2d6a9f] font-bold uppercase tracking-widest text-[10px] mt-1">
              {categories.length} Active subject classifications
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-white/20">
              <TableRow className="hover:bg-transparent border-[#a3c7e6]/50">
                <TableHead className="py-6 px-8 text-[10px] font-black uppercase tracking-widest text-[#2d6a9f] w-24">Visual</TableHead>
                <TableHead className="py-6 px-8 text-[10px] font-black uppercase tracking-widest text-[#2d6a9f]">Classification</TableHead>
                <TableHead className="py-6 px-8 text-[10px] font-black uppercase tracking-widest text-[#2d6a9f]">Identification</TableHead>
                <TableHead className="py-6 px-8 text-[10px] font-black uppercase tracking-widest text-[#2d6a9f]">Context</TableHead>
                <TableHead className="py-6 px-8 text-[10px] font-black uppercase tracking-widest text-[#2d6a9f] text-right">Management</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories.map((category) => (
                <TableRow 
                  key={category.id} 
                  className="border-b border-[#a3c7e6]/20 hover:bg-white/40 transition-all group"
                >
                  <TableCell className="py-6 px-8">
                    <div className="relative h-14 w-14 group-hover:scale-110 transition-transform duration-500">
                      <div className="absolute inset-0 bg-primary/10 blur-md rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      <div className="relative h-full w-full bg-white border border-[#a3c7e6] rounded-2xl flex items-center justify-center text-primary shadow-sm">
                        {renderIcon(category.icon || "BookOpen")}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="py-6 px-8">
                    <div className="font-black text-[#0A2540] text-lg leading-tight group-hover:text-primary transition-colors">
                      {category.name}
                    </div>
                    <div className="flex items-center gap-1.5 mt-1">
                      <div className="h-1.5 w-1.5 rounded-full bg-emerald-500"></div>
                      <span className="text-[10px] font-black text-emerald-600 uppercase tracking-tighter">Active Status</span>
                    </div>
                  </TableCell>
                  <TableCell className="py-6 px-8">
                    <div className="px-3 py-1.5 rounded-xl bg-white border border-[#a3c7e6] text-[#2d6a9f] font-black text-xs w-fit shadow-sm">
                      {category.slug}
                    </div>
                  </TableCell>
                  <TableCell className="py-6 px-8">
                    <p className="max-w-xs text-sm text-[#2d6a9f] font-medium line-clamp-2">
                      {category.description || "No classification details provided for this subject."}
                    </p>
                  </TableCell>
                  <TableCell className="py-6 px-8 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => onEdit(category)}
                        className="h-10 w-10 rounded-xl bg-white border border-transparent hover:border-[#a3c7e6] text-[#2d6a9f] hover:text-primary transition-all shadow-sm"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button 
                            size="icon" 
                            variant="ghost"
                            className="h-10 w-10 rounded-xl bg-white border border-transparent hover:border-rose-200 text-[#2d6a9f] hover:text-rose-600 transition-all shadow-sm"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent className="rounded-[2rem] border-[#a3c7e6] bg-[#e5f2ff]">
                          <AlertDialogHeader>
                            <AlertDialogTitle className="text-2xl font-black text-[#0A2540]">Confirm Deletion</AlertDialogTitle>
                            <AlertDialogDescription className="text-[#2d6a9f] font-medium">
                              You are about to remove the <span className="font-black text-[#0A2540]">"{category.name}"</span> category. This will affect subject filtering across the platform. This action is irreversible.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter className="mt-6">
                            <AlertDialogCancel className="rounded-xl border-[#a3c7e6] bg-white font-black text-xs uppercase tracking-widest">Cancel</AlertDialogCancel>
                            <AlertDialogAction 
                              onClick={() => onDelete(category.id)}
                              className="rounded-xl bg-rose-500 hover:bg-rose-600 text-white font-black text-xs uppercase tracking-widest border-0 shadow-lg hover:shadow-rose-500/20"
                            >
                              Confirm Deletion
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
