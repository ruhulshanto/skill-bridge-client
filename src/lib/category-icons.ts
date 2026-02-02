import React from "react";
import {
  BookOpen, GraduationCap, Library, Pen, FileText,
  Brain, Lightbulb, Calculator, Atom, Microscope, FlaskConical,
  Cpu, Database, Code, Server, Monitor, Smartphone,
  Rocket, Zap, Settings, Wrench, Languages, Globe,
  Palette, Paintbrush, PenTool, Camera, Music, Headphones,
  Mic, Film, Briefcase, TrendingUp, DollarSign, Scale,
  Users, Target, Trophy, Heart, Dumbbell, Layout, Layers,
  Gamepad2, Plane, Car, Home, Leaf
} from "lucide-react";

// Icon mapping for dynamic rendering
export const ICON_MAP: Record<string, React.ComponentType<any>> = {
  // Academic & Education
  "BookOpen": BookOpen,
  "GraduationCap": GraduationCap,
  "Library": Library,
  "Pen": Pen,
  "FileText": FileText,
  "Brain": Brain,
  "Lightbulb": Lightbulb,
  
  // STEM & Sciences
  "Calculator": Calculator,
  "Atom": Atom,
  "Microscope": Microscope,
  "FlaskConical": FlaskConical,
  "Cpu": Cpu,
  "Database": Database,
  "Code": Code,
  "Server": Server,
  "Monitor": Monitor,
  "Smartphone": Smartphone,
  "Rocket": Rocket,
  "Zap": Zap,
  "Settings": Settings,
  "Wrench": Wrench,
  
  // Languages & Arts
  "Languages": Languages,
  "Globe": Globe,
  "Palette": Palette,
  "Paintbrush": Paintbrush,
  "PenTool": PenTool,
  "Camera": Camera,
  "Music": Music,
  "Headphones": Headphones,
  "Mic": Mic,
  "Film": Film,
  
  // Business & Social Sciences
  "Briefcase": Briefcase,
  "TrendingUp": TrendingUp,
  "DollarSign": DollarSign,
  "Scale": Scale,
  "Users": Users,
  "Target": Target,
  "Trophy": Trophy,
  
  // Health & Physical Education
  "Heart": Heart,
  "Dumbbell": Dumbbell,
  
  // Design & Layout
  "Layout": Layout,
  "Layers": Layers,
  
  // Entertainment & Games
  "Gamepad2": Gamepad2,
  
  // Travel & Geography
  "Plane": Plane,
  "Car": Car,
  "Home": Home,
  "Leaf": Leaf
};

// Icon categories for organized selection
export const ICON_CATEGORIES = [
  {
    name: "Academic & Education",
    icons: ["BookOpen", "GraduationCap", "Library", "Pen", "FileText", "Brain", "Lightbulb"]
  },
  {
    name: "STEM & Sciences",
    icons: ["Calculator", "Atom", "Microscope", "FlaskConical", "Cpu", "Database", "Code", "Server", "Monitor", "Smartphone", "Rocket", "Zap", "Settings", "Wrench"]
  },
  {
    name: "Languages & Arts",
    icons: ["Languages", "Globe", "Palette", "Paintbrush", "PenTool", "Camera", "Music", "Headphones", "Mic", "Film"]
  },
  {
    name: "Business & Social",
    icons: ["Briefcase", "TrendingUp", "DollarSign", "Scale", "Users", "Target", "Trophy"]
  },
  {
    name: "Other",
    icons: ["Heart", "Dumbbell", "Layout", "Layers", "Gamepad2", "Plane", "Car", "Home", "Leaf"]
  }
];

// Emoji to icon mapping for migration
export const EMOJI_TO_ICON_MAP: Record<string, string> = {
  "🧮": "Calculator",
  "⚛️": "Atom", 
  "🔬": "Microscope",
  "🧪": "FlaskConical",
  "💻": "Code",
  "🖥️": "Monitor",
  "📱": "Smartphone",
  "🌐": "Globe",
  "🎨": "Palette",
  "🎵": "Music",
  "📷": "Camera",
  "💼": "Briefcase",
  "📚": "BookOpen",
  "🎓": "GraduationCap",
  "✏️": "Pen",
  "📝": "FileText",
  "🧠": "Brain",
  "💡": "Lightbulb",
  "🏆": "Trophy",
  "❤️": "Heart",
  "💪": "Dumbbell",
  "🎮": "Gamepad2",
  "✈️": "Plane",
  "🚗": "Car",
  "🏠": "Home",
  "🍃": "Leaf"
};

// Icon rendering function
export const renderIcon = (iconName: string | null | undefined): React.ReactElement => {
  // If no icon name provided, use BookOpen
  if (!iconName) {
    return React.createElement(BookOpen, { className: "h-6 w-6" });
  }

  // If it's a valid icon name in our map, render it
  if (ICON_MAP[iconName]) {
    const IconComponent = ICON_MAP[iconName];
    return React.createElement(IconComponent, { className: "h-6 w-6" });
  }

  // If it's an emoji, try to map it to an icon
  if (EMOJI_TO_ICON_MAP[iconName]) {
    const mappedIconName = EMOJI_TO_ICON_MAP[iconName];
    const IconComponent = ICON_MAP[mappedIconName];
    return React.createElement(IconComponent, { className: "h-6 w-6" });
  }

  // Fallback to BookOpen for unrecognized icons
  return React.createElement(BookOpen, { className: "h-6 w-6" });
};
