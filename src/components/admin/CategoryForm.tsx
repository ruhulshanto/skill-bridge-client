"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { renderIcon, ICON_CATEGORIES } from "@/lib/category-icons";
import { Category } from "@/services/admin.service";

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
    name: initialData?.name || "",
    slug: initialData?.slug || "",
    description: initialData?.description || "",
    icon: initialData?.icon || "",
  });

  const handleSubmit = () => {
    if (!formData.name.trim()) return;
    onSubmit(formData);
    setFormData({ name: "", slug: "", description: "", icon: "" });
  };

  const handleClose = () => {
    setFormData({ name: "", slug: "", description: "", icon: "" });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="e.g., Mathematics"
              />
            </div>
            <div>
              <Label htmlFor="slug">Slug</Label>
              <Input
                id="slug"
                value={formData.slug}
                onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                placeholder="e.g., mathematics"
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Brief description of the subject"
              rows={3}
            />
          </div>
          
          <div>
            <Label htmlFor="icon">Icon</Label>
            <Select
              value={formData.icon}
              onValueChange={(value) => setFormData(prev => ({ ...prev, icon: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select an icon">
                  {formData.icon && (
                    <div className="flex items-center gap-2">
                      {renderIcon(formData.icon)}
                      <span>{formData.icon}</span>
                    </div>
                  )}
                </SelectValue>
              </SelectTrigger>
              <SelectContent className="max-h-[400px]">
                {ICON_CATEGORIES.map((category) => (
                  <div key={category.name}>
                    <div className="p-2 text-xs font-semibold text-muted-foreground border-b">
                      {category.name}
                    </div>
                    {category.icons.map((iconName) => (
                      <SelectItem key={iconName} value={iconName}>
                        <div className="flex items-center gap-2">
                          {renderIcon(iconName)}
                          <span>{iconName}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </div>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={!formData.name.trim()}>
            {submitButtonText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
