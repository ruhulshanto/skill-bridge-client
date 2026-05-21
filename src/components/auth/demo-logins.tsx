"use client";

import { Button } from "@/components/ui/button";
import { User, GraduationCap } from "lucide-react";
import { motion } from "framer-motion";

interface DemoLoginsProps {
  onSelect: (email: string, pass: string) => void;
  disabled?: boolean;
}

export const DemoLogins = ({ onSelect, disabled }: DemoLoginsProps) => {
  const demos = [
    {
      role: "Tutor",
      email: "tutor.f1@example.com",
      pass: "Tutor@123456",
      icon: GraduationCap,
      color: "bg-blue-500/5 text-blue-600 dark:text-blue-400 border-blue-500/10",
      hover: "hover:bg-blue-500/15 hover:border-blue-500/30",
    },
    {
      role: "Student",
      email: "student@example.com",
      pass: "Student@123456",
      icon: User,
      color: "bg-primary/10 text-primary border-primary/20",
      hover: "hover:bg-primary/20 hover:border-primary/40",
    },
  ];

  return (
    <div className="space-y-3">
      <div className="relative flex items-center py-2">
        <div className="flex-grow border-t border-border/50" />
        <span className="flex-shrink mx-4 text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">
          More Testing Roles
        </span>
        <div className="flex-grow border-t border-border/50" />
      </div>

      <div className="grid grid-cols-2 gap-3">
        {demos.map((demo, index) => (
          <motion.div
            key={demo.role}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Button
              variant="outline"
              size="sm"
              className={`w-full justify-center group transition-all duration-300 py-6 rounded-xl ${demo.color} ${demo.hover}`}
              onClick={() => onSelect(demo.email, demo.pass)}
              disabled={disabled}
            >
              <div className="flex flex-col items-center gap-1">
                <demo.icon className="w-4 h-4 mb-0.5" />
                <span className="font-bold text-[10px] tracking-wider uppercase">{demo.role}</span>
              </div>
            </Button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
