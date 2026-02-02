"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { LogIn, UserPlus } from "lucide-react";
import Link from "next/link";

interface LoginPromptModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoginPromptModal({ isOpen, onClose }: LoginPromptModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="text-center">
          <DialogTitle className="text-xl font-bold">Login Required</DialogTitle>
          <DialogDescription className="text-base">
            You need to be logged in to book a trial session. Would you like to login or create an account?
          </DialogDescription>
        </DialogHeader>
        
        <DialogFooter className="flex flex-col sm:flex-col gap-3 mt-6">
          <Button asChild className="w-full">
            <Link href="/login" className="flex items-center gap-2">
              <LogIn className="h-4 w-4" />
              Login to Continue
            </Link>
          </Button>
          
          <Button variant="outline" asChild className="w-full">
            <Link href="/register" className="flex items-center gap-2">
              <UserPlus className="h-4 w-4" />
              Create New Account
            </Link>
          </Button>
          
          <Button variant="ghost" onClick={onClose} className="w-full mt-2">
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}