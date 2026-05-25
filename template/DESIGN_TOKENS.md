# Design Tokens System

## Overview
This document defines the reusable design tokens for consistent styling across applications built from this template.

---

## 1. Color Palette

### Primary Colors
- **Primary Purple**: `#8B5CF6` - Main brand color, calls-to-action, highlights
- **Primary Blue**: `#3B82F6` - Secondary emphasis, links
- **Primary Cyan**: `#06B6D4` - Tertiary accent, animations

### Semantic Colors
```css
/* Light Mode */
--background: #FFFFFF
--foreground: #0B1020
--card: #F9FAFB
--muted: #E5E7EB
--muted-foreground: #6B7280
--accent: #3B82F6
--destructive: #EF4444

/* Dark Mode */
--background: #0B1020
--foreground: #F9FAFB
--card: rgba(255, 255, 255, 0.06)
--muted: rgba(255, 255, 255, 0.1)
--muted-foreground: #9CA3AF
```

### Chart/Data Visualization Colors
- `--chart-1: #8B5CF6` (Purple)
- `--chart-2: #3B82F6` (Blue)
- `--chart-3: #06B6D4` (Cyan)
- `--chart-4: #EC4899` (Pink)
- `--chart-5: #F59E0B` (Amber)

---

## 2. Typography

### Font Families
```javascript
--font-sans: 'Inter', sans-serif          // Body, UI components
--font-mono: 'JetBrains Mono', monospace // Code, technical content
--font-heading: 'Space Grotesk', sans-serif // Headings, headlines
```

### Scale & Hierarchy
```
h1: text-4xl md:text-5xl lg:text-6xl (font-bold)
h2: text-3xl md:text-4xl (font-bold)
h3: text-2xl md:text-3xl (font-bold)
h4: text-xl md:text-2xl (font-semibold)
body: text-base leading-relaxed
small: text-sm muted-foreground
```

### Font Weights
- Light: 300
- Regular: 400
- Medium: 500 (labels, highlights)
- Semibold: 600 (headings)
- Bold: 700 (emphasis)

---

## 3. Spacing System

### Base Unit: 4px (rem: 0.25)

| Size | Value | Use Case |
|------|-------|----------|
| xs | 0.5rem (2px) | Line spacing, subtle gaps |
| sm | 0.75rem (3px) | Padding within tiny elements |
| base | 1rem (4px) | **Base unit** - all spacing |
| md | 1.5rem (6px) | Small padding/gaps |
| lg | 2rem (8px) | Default padding |
| xl | 2.5rem (10px) | Medium spacing |
| 2xl | 3rem (12px) | Section padding |
| 3xl | 3.5rem (14px) | Large padding |
| 4xl | 4rem (16px) | Major section spacing |
| 6xl | 6rem (24px) | **Section spacing** - py-24 |

### Common Patterns
```jsx
/* Section */
section: py-24 px-4

/* Container */
container: mx-auto max-w-6xl (1152px)

/* Cards/Bubbles */
p: py-6 px-6 or p-8

/* Grid gap */
gap-6 or gap-8

/* Component padding */
button: px-4 py-2
input: px-3 py-2
```

---

## 4. Border Radius

```css
--radius: 1.5rem (24px) - Base radius
--radius-sm: calc(var(--radius) - 4px) = 20px
--radius-md: calc(var(--radius) - 2px) = 22px
--radius-lg: var(--radius) = 24px
--radius-xl: calc(var(--radius) + 4px) = 28px
```

### Usage
- Buttons, inputs, badges: `rounded-lg` (24px)
- Cards, bubbles: `rounded-2xl` (28px)
- Hero images, large containers: `rounded-full`
- Small elements: `rounded-md` (22px)

---

## 5. Shadows

### Elevation System
```css
/* Subtle - Hover state */
box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04)

/* Medium - Default card */
box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08)

/* Strong - Elevated state */
box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08)

/* Extra strong - Modals */
box-shadow: 0 12px 32px rgba(0, 0, 0, 0.15)

/* Dark mode - multiplier effect */
Dark multiplier: 3-5x base shadow
```

---

## 6. Custom Effects

### Gradient Text
```css
.gradient-text {
  background: linear-gradient(135deg, #8B5CF6 0%, #3B82F6 50%, #06B6D4 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
```

### Bubble Design
```css
.bubble {
  background: var(--card);
  border: 1px solid var(--border);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  transition: all 0.3s ease;
}

.bubble:hover {
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
  transform: translateY(-2px);
}
```

### Glass Morphism
```css
.glass {
  background: rgba(255, 255, 255, 0.06);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  -webkit-backdrop-filter: blur(20px);
}
```

### Glowing Effects
```css
.glow-primary {
  box-shadow: 0 0 20px rgba(139, 92, 246, 0.5), 
              0 0 40px rgba(139, 92, 246, 0.25);
}

.glow-gradient {
  box-shadow: 0 0 30px rgba(139, 92, 246, 0.4), 
              0 0 60px rgba(59, 130, 246, 0.2);
}
```

---

## 7. Animations

### Transitions
```css
/* Default */
transition: all 0.3s ease

/* Quick */
transition: all 0.2s ease

/* Smooth */
transition: all 0.5s ease-in-out
```

### Motion Presets (Framer Motion)
```javascript
// Fade In + Slide In
{
  initial: { opacity: 0, y: 50 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
}

// Slide In X
{
  initial: { opacity: 0, x: -50 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.8 }
}

// Stagger
{
  transition: { duration: 0.6, delay: index * 0.2 }
}

// Hover Animation
{
  whileHover: { y: -8 }
}
```

### Keyframe Animations
- `float`: Smooth vertical float 3s
- `pulse-glow`: Pulsing glow effect 2s
- `gradient-rotate`: 360° gradient border 4s
- Built-in: `animate-pulse`, `animate-spin`, etc.

---

## 8. Breakpoints

```javascript
sm: 640px   // Mobile landscape
md: 768px   // Tablet
lg: 1024px  // Desktop
xl: 1280px  // Large desktop
2xl: 1536px // Extra large
```

### Mobile First Pattern
```jsx
// Base (mobile)
className="text-xl px-4"

// Tablet and up
className="md:text-2xl md:px-6"

// Desktop and up
className="lg:text-3xl lg:px-8"
```

---

## 9. Icons

### Library
**Lucide React** - 564+ icons

### Usage
```javascript
import { FileText, Download, ExternalLink } from 'lucide-react'

// In JSX
<Download className="w-4 h-4" />
```

### Size Classes
- `w-4 h-4` (16px) - Small/inline
- `w-5 h-5` (20px) - Default/toolbar
- `w-6 h-6` (24px) - Medium/cards
- `w-8 h-8` (32px) - Large buttons
- `w-12 h-12` (48px) - Hero section

---

## 10. Accessibility

### Color Contrast
- Foreground on background: 7:1+ (AAA)
- Muted text: 4.5:1+ (AA)

### Focus States
```css
outline: 2px solid var(--ring);
outline-offset: 2px;
```

### Semantic HTML
- Use `<section>`, `<article>`, `<nav>` appropriately
- Heading hierarchy: h1 → h2 → h3 (never skip)
- ARIA labels on interactive elements
- Form labels associated with inputs

---

## Implementation

### CSS Variables Approach
All tokens are defined as CSS variables in `globals.css`:

```css
:root {
  --color-primary: #8B5CF6;
  --radius: 1.5rem;
  --spacing-md: 1.5rem;
}
```

### Tailwind Integration
Custom theme extends Tailwind with token values:

```javascript
theme: {
  colors: {
    primary: 'var(--color-primary)',
  },
  borderRadius: {
    lg: 'var(--radius-lg)',
  },
}
```

### Usage in Components
```jsx
className="px-4 py-2 rounded-lg bg-primary text-primary-foreground"
```

---

## Theme Switching

Support both light and dark modes:

```javascript
// Dark mode selector
.dark .bubble {
  background: rgba(255, 255, 255, 0.06);
}

// In theme provider
<ThemeProvider attribute="class" defaultTheme="dark">
  {children}
</ThemeProvider>
```

---

## Consistency Checklist

- [ ] All spacing uses base 4px unit multiples
- [ ] Typography follows hierarchy with Space Grotesk headings
- [ ] Color palette limited to defined primary/semantic colors
- [ ] Shadows follow elevation system
- [ ] Border radius from predefined scale
- [ ] Animations use standard durations (0.2s, 0.3s, 0.6s)
- [ ] Dark mode provides adequate contrast
- [ ] Accessibility: WCAG AAA minimum

