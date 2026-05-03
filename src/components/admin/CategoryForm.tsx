"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { renderIcon, ICON_CATEGORIES } from "@/lib/category-icons";
import { Category } from "@/services/admin.service";
import { Tag, X, Check } from "lucide-react";

interface CategoryFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Partial<Category>) => void;
  initialData?: Category;
  title: string;
  description: string;
  submitButtonText: string;
}

export default function CategoryForm({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  title,
  description,
  submitButtonText
}: CategoryFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    description: "",
    icon: "BookOpen",
  });

  // Synchronize form data when initialData changes or dialog opens
  useEffect(() => {
    if (isOpen) {
      setFormData({
        name: initialData?.name || "",
        slug: initialData?.slug || "",
        description: initialData?.description || "",
        icon: initialData?.icon || "BookOpen",
      });
    }
  }, [initialData, isOpen]);

  const handleSubmit = () => {
    if (!formData.name.trim()) return;
    onSubmit(formData);
    // State is reset in useEffect when dialog closes/opens, but we can clear it here too for safety
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl rounded-[2.5rem] border-[#a3c7e6] p-0 overflow-hidden shadow-2xl" style={{ backgroundColor: "#e5f2ff" }}>
        <div className="absolute top-0 right-0 h-32 w-32 bg-primary/5 blur-3xl rounded-full -mr-16 -mt-16"></div>
        
        <DialogHeader className="p-8 pb-0 relative z-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-xl bg-white border border-[#a3c7e6] shadow-sm">
              <Tag className="h-5 w-5 text-primary" />
            </div>
            <DialogTitle className="text-2xl font-black text-[#0A2540]">{title}</DialogTitle>
          </div>
          <DialogDescription className="text-[#2d6a9f] font-medium">{description}</DialogDescription>
        </DialogHeader>

        <div className="p-8 space-y-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-[10px] font-black uppercase tracking-widest text-[#2d6a9f] ml-1">Category Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="e.g., Mathematics"
                className="h-12 rounded-xl bg-white/50 border-[#a3c7e6] focus:bg-white transition-all shadow-sm"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="slug" className="text-[10px] font-black uppercase tracking-widest text-[#2d6a9f] ml-1">URL Identifier (Slug)</Label>
              <Input
                id="slug"
                value={formData.slug}
                onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                placeholder="e.g., mathematics"
                className="h-12 rounded-xl bg-white/50 border-[#a3c7e6] focus:bg-white transition-all shadow-sm"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description" className="text-[10px] font-black uppercase tracking-widest text-[#2d6a9f] ml-1">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Brief description of the subjects covered in this category..."
              rows={3}
              className="rounded-xl bg-white/50 border-[#a3c7e6] focus:bg-white transition-all shadow-sm resize-none"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="icon" className="text-[10px] font-black uppercase tracking-widest text-[#2d6a9f] ml-1">Visual Representation (Icon)</Label>
            <Select
              value={formData.icon}
              onValueChange={(value) => setFormData(prev => ({ ...prev, icon: value }))}
            >
              <SelectTrigger className="h-14 rounded-xl bg-white/50 border-[#a3c7e6] focus:bg-white transition-all shadow-sm">
                <SelectValue placeholder="Select an icon">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-lg bg-white border border-[#a3c7e6] flex items-center justify-center text-primary shadow-inner">
                      {renderIcon(formData.icon)}
                    </div>
                    <span className="font-bold text-[#0A2540]">{formData.icon}</span>
                  </div>
                </SelectValue>
              </SelectTrigger>
              <SelectContent className="rounded-2xl border-[#a3c7e6] bg-[#e5f2ff] max-h-[400px] p-2 shadow-2xl">
                {ICON_CATEGORIES.map((category) => (
                  <div key={category.name} className="mb-4 last:mb-0">
                    <div className="px-3 py-2 text-[9px] font-black uppercase tracking-widest text-[#2d6a9f] border-b border-[#a3c7e6]/30 mb-2">
                      {category.name}
                    </div>
                    <div className="grid grid-cols-2 gap-1">
                      {category.icons.map((iconName) => (
                        <SelectItem 
                          key={iconName} 
                          value={iconName}
                          className="rounded-lg hover:bg-white/50 focus:bg-white/50 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <div className="h-7 w-7 rounded-md bg-white border border-[#a3c7e6]/50 flex items-center justify-center text-primary/70">
                              {renderIcon(iconName)}
                            </div>
                            <span className="text-xs font-bold text-[#0A2540]">{iconName}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </div>
                  </div>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter className="p-8 bg-white/30 border-t border-[#a3c7e6]/50 gap-3">
          <Button 
            variant="ghost" 
            onClick={handleClose}
            className="rounded-xl h-12 px-6 font-black text-xs uppercase tracking-widest text-[#2d6a9f] hover:bg-white transition-all"
          >
            <X className="h-4 w-4 mr-2" />
            Discard
          </Button>
          <Button 
            onClick={handleSubmit} 
            disabled={!formData.name.trim()}
            className="rounded-xl h-12 px-8 font-black text-xs uppercase tracking-widest bg-primary hover:bg-primary/90 text-white border-0 shadow-lg hover:shadow-primary/20 transition-all"
          >
            {submitButtonText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
