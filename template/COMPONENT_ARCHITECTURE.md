# Reusable Component Architecture

## Overview
This document outlines the reusable component patterns and architecture for building scalable applications.

---

## 1. Component Structure

### Atomic Design Pattern
```
atoms/
  ├── Button
  ├── Badge
  ├── Input
  └── Icon

molecules/
  ├── FormField (Input + Label)
  ├── SearchBar
  ├── AuthCard
  └── StatCard

organisms/
  ├── Header
  ├── SideNav
  ├── HeroSection
  └── CardGrid

templates/
  ├── DashboardLayout
  ├── AuthLayout
  ├── LandingLayout
  └── BlogLayout

pages/
  ├── Dashboard
  ├── Login
  └── Blog
```

---

## 2. Reusable Layout Components

### App Shell Layout
```jsx
// layouts/app-shell.tsx
import { Sidebar } from '@/components/organisms/sidebar'
import { Header } from '@/components/organisms/header'
import { Footer } from '@/components/organisms/footer'

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] min-h-screen">
      <Sidebar />
      <div className="flex flex-col">
        <Header />
        <main className="flex-1 overflow-auto">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  )
}
```

### Section Template
```jsx
// templates/section-template.tsx
import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

export function SectionTemplate({
  id,
  label,
  headline,
  highlightText,
  description,
  children,
}: {
  id: string
  label: string
  headline: string
  highlightText: string
  description?: string
  children: React.ReactNode
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id={id} className="py-24 px-4 relative">
      <div className="container mx-auto max-w-6xl" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-medium tracking-wider uppercase mb-4 block">
            {label}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-heading mb-6">
            {headline}{' '}
            <span className="gradient-text">{highlightText}</span>
          </h2>
          {description && (
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {description}
            </p>
          )}
        </motion.div>

        {/* Content */}
        {children}
      </div>
    </section>
  )
}
```

### Dashboard Layout
```jsx
// layouts/dashboard-layout.tsx
import { ThemeProvider } from '@/components/theme-provider'
import { Sidebar } from '@/components/organisms/sidebar'
import { Topbar } from '@/components/organisms/topbar'

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <div className="flex h-screen bg-background">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Topbar />
          <main className="flex-1 overflow-auto p-6">
            <div className="max-w-7xl mx-auto">
              {children}
            </div>
          </main>
        </div>
      </div>
    </ThemeProvider>
  )
}
```

---

## 3. Common UI Patterns

### Card Component
```jsx
// components/atoms/card.tsx
import { cn } from '@/lib/utils'

export function Card({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'bubble rounded-2xl p-6 transition-all duration-300',
        className
      )}
      {...props}
    />
  )
}
```

### Section Header
```jsx
// components/molecules/section-header.tsx
import { motion } from 'framer-motion'

export function SectionHeader({
  label,
  headline,
  highlightText,
  description,
  isInView,
  delay = 0,
}: {
  label: string
  headline: string
  highlightText: string
  description?: string
  isInView: boolean
  delay?: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      className="text-center mb-16"
    >
      <span className="text-primary text-sm font-medium tracking-wider uppercase mb-4 block">
        {label}
      </span>
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-heading mb-6">
        {headline}{' '}
        <span className="gradient-text">{highlightText}</span>
      </h2>
      {description && (
        <p className="text-muted-foreground max-w-2xl mx-auto">
          {description}
        </p>
      )}
    </motion.div>
  )
}
```

### Stat Card
```jsx
// components/molecules/stat-card.tsx
import { motion } from 'framer-motion'
import { LucideIcon } from 'lucide-react'

export function StatCard({
  icon: Icon,
  label,
  value,
  description,
  isInView,
  delay = 0,
}: {
  icon: LucideIcon
  label: string
  value: string | number
  description?: string
  isInView: boolean
  delay?: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
    >
      <div className="bubble rounded-2xl p-8 h-full">
        <Icon className="w-8 h-8 text-primary mb-4" />
        <p className="text-sm text-muted-foreground uppercase tracking-wider mb-2">
          {label}
        </p>
        <p className="text-3xl font-bold mb-2">{value}</p>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </div>
    </motion.div>
  )
}
```

### Badge Group
```jsx
// components/molecules/badge-group.tsx
import { Badge } from '@/components/ui/badge'

export function BadgeGroup({
  items,
  variant = 'default',
}: {
  items: string[]
  variant?: 'default' | 'outline'
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item) => (
        <Badge key={item} variant={variant}>
          {item}
        </Badge>
      ))}
    </div>
  )
}
```

---

## 4. Data-Driven Components

### Using JSON for Content
```json
// data/sections.json
{
  "hero": {
    "label": "WELCOME",
    "headline": "Build Amazing",
    "highlightText": "Apps",
    "description": "Your template description"
  },
  "features": {
    "label": "FEATURES",
    "headline": "Why Choose",
    "highlightText": "Us",
    "items": [
      {
        "icon": "Zap",
        "title": "Fast",
        "description": "Built for speed"
      }
    ]
  }
}
```

### Component Integration
```jsx
// components/organisms/features-section.tsx
import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import featuresData from '@/data/sections.json'

export function FeaturesSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const { label, headline, highlightText, items } = featuresData.features

  return (
    <section id="features" className="py-24 px-4">
      <div className="container mx-auto max-w-6xl" ref={ref}>
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-primary text-sm font-medium tracking-wider uppercase">
            {label}
          </span>
          <h2 className="text-4xl font-bold font-heading">
            {headline} <span className="gradient-text">{highlightText}</span>
          </h2>
        </div>

        {/* Items Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bubble rounded-2xl p-6"
            >
              <h3 className="text-xl font-bold mb-3">{item.title}</h3>
              <p className="text-muted-foreground">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

---

## 5. Animation Patterns

### Intersection Observer Hook
```jsx
// hooks/use-section-animation.ts
import { useRef } from 'react'
import { useInView } from 'framer-motion'

export function useSectionAnimation() {
  const ref = useRef(null)
  const isInView = useInView(ref, {
    once: true,
    margin: '-100px',
  })

  return { ref, isInView }
}
```

### Common Motion Variants
```javascript
// lib/animation-variants.ts
export const fadeInVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
}

export const slideInVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
}

export const slideLeftVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0 },
}

export const slideRightVariants = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0 },
}

export const scaleVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1 },
}

export const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
}

export const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}
```

---

## 6. Form Patterns

### Form Field Component
```jsx
// components/molecules/form-field.tsx
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'

export function FormField({
  label,
  error,
  required,
  ...inputProps
}: {
  label: string
  error?: string
  required?: boolean
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="space-y-2">
      <Label>
        {label}
        {required && <span className="text-destructive">*</span>}
      </Label>
      <Input {...inputProps} />
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  )
}
```

---

## 7. Module Federation Pattern
For micro-frontends and component sharing:

```javascript
// webpack.config.js
module.exports = {
  plugins: [
    new ModuleFederationPlugin({
      name: 'template',
      filename: 'remoteEntry.js',
      exposes: {
        './Button': './components/ui/button.tsx',
        './Card': './components/molecules/card.tsx',
        './SectionTemplate': './templates/section-template.tsx',
      },
      shared: {
        react: { singleton: true, requiredVersion: false },
        'react-dom': { singleton: true, requiredVersion: false },
      },
    }),
  ],
}
```

---

## 8. Component Export Convention

### Organized Exports
```typescript
// components/index.ts
// Atoms
export { Button } from './atoms/button'
export { Badge } from './atoms/badge'
export { Input } from './atoms/input'

// Molecules
export { FormField } from './molecules/form-field'
export { StatCard } from './molecules/stat-card'
export { BadgeGroup } from './molecules/badge-group'

// Organisms
export { Header } from './organisms/header'
export { Sidebar } from './organisms/sidebar'

// Templates
export { DashboardLayout } from './templates/dashboard-layout'
export { SectionTemplate } from './templates/section-template'
```

### Usage
```jsx
import { Button, Card, SectionTemplate } from '@/components'
```

---

## 9. Composition Pattern

### Higher-Order Components
```jsx
// hoc/with-animation.tsx
import { motion } from 'framer-motion'

export function withAnimation<P extends object>(
  Component: React.ComponentType<P>,
  variants = { hidden: { opacity: 0 }, visible: { opacity: 1 } }
) {
  return function AnimatedComponent(props: P) {
    return (
      <motion.div variants={variants} initial="hidden" animate="visible">
        <Component {...props} />
      </motion.div>
    )
  }
}

// Usage
export const AnimatedCard = withAnimation(Card)
```

---

## 10. Styling Best Practices

### Using `cn()` Utility
```jsx
import { cn } from '@/lib/utils'

export function Button({ className, ...props }) {
  return (
    <button
      className={cn(
        'px-4 py-2 rounded-lg bg-primary text-primary-foreground',
        'hover:bg-primary/90 transition-colors',
        'focus-visible:outline-none focus-visible:ring-2',
        className
      )}
      {...props}
    />
  )
}
```

### Consistent Naming
```jsx
// ✅ Good
className="px-4 py-2 rounded-lg bg-primary hover:bg-primary/90"

// ❌ Avoid
className="px-[16px] py-[8px] rounded-[24px] bg-[#8B5CF6]"
```

---

## Checklist: Reusable Component Architecture

- [ ] Atomic design principles applied
- [ ] Components accept data via props and JSON
- [ ] Layout components encapsulate common patterns
- [ ] Animation patterns use consistent variants
- [ ] Dark mode support in all components
- [ ] Accessibility attributes included
- [ ] TypeScript types defined
- [ ] Component stories/examples documented
- [ ] Responsive design mobile-first
- [ ] Shared utilities in lib/ folder

