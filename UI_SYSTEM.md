# SkillBridge Global UI System

## 🎨 Design Philosophy

**3 Primary Colors + Neutral Palette:**

- **Primary (Blue)**: Main actions, CTAs, brand color - `#2563eb`
- **Secondary (Purple)**: Tutors, featured content - `#9333ea`
- **Success (Green)**: Confirmations, bookings - `#16a34a`
- **Neutral**: Backgrounds, borders, text

## 📁 Folder Structure

```
src/
├── app/
│   ├── globals.css              # Global styles & animations
│   └── layout.tsx               # Root layout with providers
│
├── components/
│   ├── ui/                      # Reusable primitive components
│   │   ├── button.tsx           # Button with variants
│   │   ├── card.tsx             # Card layouts
│   │   ├── input.tsx            # Input fields
│   │   ├── badge.tsx            # Status badges
│   │   ├── dialog.tsx           # Modal dialogs
│   │   ├── textarea.tsx         # Text areas
│   │   ├── select.tsx           # Dropdowns
│   │   └── ...other-ui
│   │
│   ├── theme-toggle.tsx         # Dark/light mode switcher
│   ├── layout/                  # Layout components
│   ├── home/                    # Home page components
│   ├── tutors/                  # Tutor browse components
│   ├── booking/                 # Booking components
│   ├── auth/                    # Auth components
│   └── admin/                   # Admin components
│
├── contexts/
│   ├── theme-context.tsx        # Theme provider & useTheme hook
│   ├── auth-context.tsx         # Auth provider
│   └── ...other-contexts
│
├── hooks/
│   ├── useTheme.ts              # Theme hook
│   └── ...other-hooks
│
├── lib/
│   └── utils.ts                 # cn() utility & helpers
│
├── styles/
│   └── ...styling utilities
│
└── types/
    └── ...TypeScript types
```

## 🎯 Color System

### Primary Colors

```tailwind
primary-50 to primary-950    # Blue shades for main UI
secondary-50 to secondary-950  # Purple for tutors
success-50 to success-950      # Green for confirmations
neutral-50 to neutral-950      # Grays for structure
```

### Usage Examples

```jsx
// Button variants
<Button variant="default">Primary CTA</Button>
<Button variant="secondary">Tutor Action</Button>
<Button variant="success">Confirm Booking</Button>
<Button variant="outline">Secondary</Button>
<Button variant="ghost">Tertiary</Button>

// Badge variants
<Badge variant="default">Active</Badge>
<Badge variant="secondary">Featured</Badge>
<Badge variant="success">Confirmed</Badge>
<Badge variant="outline">Pending</Badge>
```

## 🌓 Dark Mode Implementation

### Automatic Theme Detection

- Defaults to system preference
- Saves user preference to localStorage
- Updates on theme change

### Using Theme Hook

```tsx
"use client";
import { useTheme } from "@/hooks/useTheme";

export function MyComponent() {
  const { theme, effectiveTheme, setTheme, toggleTheme } = useTheme();

  return (
    <button onClick={toggleTheme}>
      Switch to {effectiveTheme === "dark" ? "light" : "dark"} mode
    </button>
  );
}
```

### Theme Toggle Button

```tsx
import { ThemeToggle } from "@/components/theme-toggle";

// Add to header
<ThemeToggle />;
```

## 📦 Core Components

### Button

```tsx
<Button variant="default" size="lg">
  Book Now
</Button>
```

**Variants:** `default`, `secondary`, `success`, `destructive`, `outline`, `ghost`, `link`
**Sizes:** `xs`, `sm`, `default`, `lg`, `xl`, `icon`, `icon-sm`, `icon-lg`

### Input

```tsx
<Input placeholder="Enter email..." type="email" className="max-w-md" />
```

### Card

```tsx
<Card>
  <CardHeader>
    <CardTitle>Tutor Profile</CardTitle>
    <CardDescription>View tutor details</CardDescription>
  </CardHeader>
  <CardContent>Content here</CardContent>
</Card>
```

### Dialog/Modal

```tsx
<Dialog>
  <DialogTrigger asChild>
    <Button>Open</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Title</DialogTitle>
      <DialogDescription>Description</DialogDescription>
    </DialogHeader>
    {/* Content */}
  </DialogContent>
</Dialog>
```

### Badge

```tsx
<Badge variant="success">Confirmed</Badge>
<Badge variant="secondary">Featured Tutor</Badge>
```

## 🎨 Tailwind Classes Reference

### Spacing Scale

```
xs: 0.25rem (4px)
sm: 0.5rem (8px)
md: 1rem (16px)
lg: 1.5rem (24px)
xl: 2rem (32px)
2xl: 2.5rem (40px)
3xl: 3rem (48px)
```

### Border Radius Scale

```
xs: 0.25rem
sm: 0.375rem
md: 0.5rem
lg: 0.75rem
xl: 1rem
2xl: 1.5rem
```

### Transitions

```
duration-fast: 150ms
duration-base: 200ms
duration-slow: 300ms
```

### Common Utilities

```tailwind
# Container
.container-responsive

# Effects
.glass              # Glass morphism
.gradient-primary   # Primary gradient
.gradient-secondary # Secondary gradient

# Animations
.animate-fade-in
.animate-fade-in-up
```

## ✅ Best Practices

### 1. Responsive Design

```tsx
// Mobile-first approach
<div className="text-sm md:text-base lg:text-lg">
  Responsive text
</div>

<Button size="sm" className="md:size-default lg:size-lg">
  Responsive button
</Button>
```

### 2. Dark Mode Support

```tsx
// Always use dark: prefix for dark mode styles
<div className="bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-50">
  Dark mode aware
</div>
```

### 3. Component Composition

```tsx
// ✅ Good: Use existing components
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
  </CardHeader>
</Card>

// ❌ Avoid: Random divs
<div className="border p-4 rounded">
  ...
</div>
```

### 4. Color Usage

```tsx
// ✅ Use semantic colors
<Badge variant="success">Confirmed</Badge>
<Button variant="secondary">For Tutors</Button>

// ❌ Avoid: Random colors
<div className="bg-purple-400 text-red-500">
  Conflicting
</div>
```

### 5. Focus States

```tsx
// Tailwind handles focus states automatically:
// - Button: focus-visible:focus-ring
// - Input: focus:outline-none focus:ring-2 focus:ring-primary-500
```

## 🔧 Customization

### Adding New Colors

Edit `tailwind.config.ts`:

```typescript
theme: {
  extend: {
    colors: {
      newColor: {
        50: "#...",
        600: "#...",
        900: "#...",
      }
    }
  }
}
```

### Adding New Breakpoints

```typescript
screens: {
  'sm': '640px',
  'md': '768px',
  'lg': '1024px',
  'xl': '1280px',
  '2xl': '1536px',
}
```

## 📚 Usage Examples

### Booking Card

```tsx
<Card className="w-full max-w-md">
  <CardHeader>
    <CardTitle className="text-lg">Sarah Johnson</CardTitle>
    <CardDescription>Mathematics • $45/hr</CardDescription>
  </CardHeader>
  <CardContent>
    <Badge variant="success" className="mb-4">
      Verified Tutor
    </Badge>
    <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
      Experienced educator with 7 years of teaching...
    </p>
    <Button className="w-full">Book Session</Button>
  </CardContent>
</Card>
```

### Modal Dialog

```tsx
<Dialog>
  <DialogTrigger asChild>
    <Button>Book Now</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Confirm Booking</DialogTitle>
      <DialogDescription>
        Are you sure you want to book this session?
      </DialogDescription>
    </DialogHeader>
    <div className="flex gap-2 mt-6">
      <Button variant="outline">Cancel</Button>
      <Button>Confirm</Button>
    </div>
  </DialogContent>
</Dialog>
```

## ⚠️ Common Gotchas

1. **Always use className, not inline styles** - Ensures consistent theming
2. **Use dark: prefix for dark mode** - Never hardcode colors
3. **Use semantic Button variants** - Not random colors
4. **Wrap components in ThemeProvider** - Already done in root layout
5. **Test both light and dark modes** - Use browser dev tools

---

**Last Updated:** May 1, 2026
**Component Library:** Radix UI + Tailwind CSS v4
