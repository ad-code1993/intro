# Best Practices & Implementation Guide

## Table of Contents
1. [Component Development](#component-development)
2. [Performance Optimization](#performance-optimization)
3. [Styling Best Practices](#styling-best-practices)
4. [Animation & Motion](#animation--motion)
5. [Data Management](#data-management)
6. [Testing Strategy](#testing-strategy)
7. [Accessibility Guidelines](#accessibility-guidelines)
8. [TypeScript Patterns](#typescript-patterns)

---

## Component Development

### 1. Component Composition Pattern

**Single Responsibility Principle**: Each component should do ONE thing well.

```jsx
// ❌ Bad: Too many responsibilities
export function ComplexCard({
  title,
  description,
  image,
  price,
  onBuy,
  rating,
  reviews,
  tags,
}) {
  return (
    <div>
      <Image src={image} />
      <h3>{title}</h3>
      <p>{description}</p>
      <div>{/* 50 lines of code */}</div>
    </div>
  )
}

// ✅ Good: Composed from smaller components
export function ProductCard({ product, onBuy }: ProductCardProps) {
  return (
    <Card>
      <ProductImage src={product.image} />
      <ProductInfo title={product.title} description={product.description} />
      <ProductMeta rating={product.rating} reviews={product.reviews} />
      <ProductActions price={product.price} onBuy={onBuy} />
    </Card>
  )
}
```

### 2. Props Interface Pattern

Always define prop interfaces explicitly:

```typescript
// ✅ Explicit and typed
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  isLoading?: boolean
  children: React.ReactNode
}

export function Button({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  children,
  ...props
}: ButtonProps) {
  // ...
}

// ❌ Avoid: Implicit/any types
export function Button(props: any) {
  // ...
}
```

### 3. Default Props Pattern

```typescript
interface CardProps {
  variant?: 'default' | 'highlighted'
  padding?: 'compact' | 'normal' | 'spacious'
  clickable?: boolean
}

export function Card({
  variant = 'default',
  padding = 'normal',
  clickable = false,
  ...props
}: CardProps) {
  // ...
}
```

### 4. Compound Components Pattern

For complex interactive components:

```jsx
// components/molecules/accordion.tsx
export function Accordion({ children }: AccordionProps) {
  const [openId, setOpenId] = useState<string | null>(null)

  return (
    <div>
      {React.Children.map(children, (child) =>
        React.cloneElement(child, { openId, setOpenId })
      )}
    </div>
  )
}

Accordion.Item = function AccordionItem({ id, title, children }: ItemProps) {
  return (
    <div>
      <button>{title}</button>
      {/* Item content */}
    </div>
  )
}

// Usage
<Accordion>
  <Accordion.Item id="1" title="Item 1">
    Content 1
  </Accordion.Item>
</Accordion>
```

### 5. Render Prop Pattern

For sharing logic:

```jsx
// ✅ Good for complex logic sharing
export function DataFetcher<T>({
  url,
  render,
}: {
  url: string
  render: (data: T, loading: boolean, error?: Error) => React.ReactNode
}) {
  const { data, loading, error } = useFetch<T>(url)
  return render(data, loading, error)
}

// Usage
<DataFetcher
  url="/api/users"
  render={(users, loading) =>
    loading ? <Spinner /> : <UserList users={users} />
  }
/>
```

---

## Performance Optimization

### 1. Code Splitting

```typescript
// lib/dynamic-imports.ts
import dynamic from 'next/dynamic'

// Load components only when needed
export const DashboardAsync = dynamic(
  () => import('@/components/organisms/dashboard'),
  { loading: () => <DashboardSkeleton /> }
)

export const ChartAsync = dynamic(
  () => import('@/components/molecules/chart'),
  { ssr: false } // Don't render on server
)

// Usage
import { DashboardAsync } from '@/lib/dynamic-imports'

function App() {
  return <DashboardAsync />
}
```

### 2. Image Optimization

```jsx
// ✅ Always use Next.js Image
import Image from 'next/image'

export function HeroImage() {
  return (
    <Image
      src="/hero.webp"
      alt="Hero"
      width={1200}
      height={600}
      priority // Load first image immediately
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      quality={75} // Auto-optimized
    />
  )
}

// ❌ Avoid: Standard img tag
<img src="/hero.png" alt="Hero" />
```

### 3. Memoization Pattern

```jsx
// Prevent unnecessary re-renders
export const MemoizedCard = React.memo(function Card({ 
  title, 
  description 
}: CardProps) {
  return <div>{title}</div>
}, (prevProps, nextProps) => {
  // Custom comparison
  return prevProps.title === nextProps.title
})

// For contexts
export const MemoizedProvider = React.memo(ThemeProvider)
```

### 4. Lazy Loading Components

```jsx
import { lazy, Suspense } from 'react'

const HeavyChart = lazy(() => import('@/components/charts/heavy-chart'))

export function Dashboard() {
  return (
    <Suspense fallback={<ChartSkeleton />}>
      <HeavyChart />
    </Suspense>
  )
}
```

### 5. Bundle Analysis

```bash
# Analyze bundle size
npm run analyze

# Monitor Core Web Vitals
npm run vitals
```

---

## Styling Best Practices

### 1. Utility-First Approach

```jsx
// ✅ Use Tailwind utilities
<button className="px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary/90 transition-colors">
  Click me
</button>

// ❌ Avoid: Custom CSS for simple styles
<button className="btn btn-primary">
  Click me
</button>
```

### 2. CSS Composition with `cn()`

```jsx
import { cn } from '@/lib/utils'

export function Button({ className, ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        // Base styles
        'inline-flex items-center justify-center',
        // Spacing
        'px-4 py-2',
        // Visual
        'rounded-lg bg-primary text-primary-foreground',
        // States
        'hover:bg-primary/90',
        'focus:outline-none focus:ring-2 focus:ring-ring',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        // Transitions
        'transition-colors',
        // Override with passed className
        className
      )}
      {...props}
    />
  )
}
```

### 3. Dark Mode Implementation

```jsx
// ✅ Good: Use CSS custom properties
export function ThemedComponent() {
  return (
    <div className="bg-background text-foreground">
      <Card className="bg-card">
        <p className="text-muted-foreground">Muted text</p>
      </Card>
    </div>
  )
}

// ❌ Bad: Hardcoded colors
<div style={{ backgroundColor: '#ffffff', color: '#0B1020' }}>
```

### 4. Responsive Design Mobile-First

```jsx
// ✅ Mobile-first
<div className="text-base md:text-lg lg:text-xl">
  Responsive text
</div>

// ❌ Desktop-first
<div className="text-xl lg:text-lg md:text-base">
  Not recommended
</div>
```

### 5. Custom CSS Only When Necessary

```css
/* globals.css - Only for truly custom effects */

/* ✅ Complex gradient animation */
@keyframes gradient-rotate {
  0% { --angle: 0deg; }
  100% { --angle: 360deg; }
}

.gradient-border {
  background: linear-gradient(var(--angle), #8B5CF6, #3B82F6);
  animation: gradient-rotate 4s linear infinite;
}

/* ❌ Don't repeat Tailwind */
.button {
  padding: 8px 16px;
  border-radius: 8px;
  /* Use Tailwind instead */
}
```

---

## Animation & Motion

### 1. Intersection Observer Pattern

```jsx
// hooks/use-intersection-observer.ts
import { useRef } from 'react'
import { useInView } from 'framer-motion'

export function useIntersection(options = {}) {
  const ref = useRef(null)
  const isInView = useInView(ref, {
    once: true,
    margin: '-100px',
    ...options,
  })

  return { ref, isInView }
}

// Usage
export function Section() {
  const { ref, isInView } = useIntersection()

  return (
    <section ref={ref}>
      <motion.div animate={isInView ? { opacity: 1 } : { opacity: 0 }}>
        Content
      </motion.div>
    </section>
  )
}
```

### 2. Stagger Animation Pattern

```jsx
// ✅ Smooth staggered animations
export function ItemList({ items }: ItemListProps) {
  const { ref, isInView } = useIntersection()

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={{
        visible: {
          transition: {
            staggerChildren: 0.1,
            delayChildren: 0.3,
          },
        },
      }}
    >
      {items.map((item, index) => (
        <motion.div
          key={index}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}
        >
          {item}
        </motion.div>
      ))}
    </motion.div>
  )
}
```

### 3. Gesture Animations

```jsx
// Framer Motion gestures
<motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  transition={{ type: 'spring', stiffness: 400, damping: 17 }}
>
  Click me
</motion.button>
```

### 4. Respect Prefers Reduced Motion

```jsx
// Always respect user preferences
export function AnimatedComponent() {
  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)')

  return (
    <motion.div
      animate={prefersReducedMotion ? {} : { opacity: 1 }}
      initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
    >
      Content
    </motion.div>
  )
}
```

---

## Data Management

### 1. Validation with Zod

```typescript
// types/schemas.ts
import { z } from 'zod'

export const UserSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  name: z.string().min(2).max(100),
  role: z.enum(['admin', 'user', 'guest']),
  createdAt: z.date(),
})

export type User = z.infer<typeof UserSchema>

// Usage
const user = UserSchema.parse(data)
```

### 2. Environment Variables

```bash
# .env.example
NEXT_PUBLIC_API_URL=https://api.example.com
NEXT_PUBLIC_GA_ID=UA-...
API_SECRET_KEY=...
DATABASE_URL=postgresql://...
```

```typescript
// lib/env.ts
const env = {
  apiUrl: process.env.NEXT_PUBLIC_API_URL,
  gaId: process.env.NEXT_PUBLIC_GA_ID,
  secretKey: process.env.API_SECRET_KEY,
}

export const getEnv = () => env
```

### 3. API Client Pattern

```typescript
// lib/api-client.ts
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL

export async function apiCall<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  })

  if (!response.ok) {
    throw new Error(`API error: ${response.statusText}`)
  }

  return response.json()
}

// Usage
const users = await apiCall<User[]>('/api/users')
```

### 4. Cache Strategy

```typescript
// lib/cache.ts
const cache = new Map<string, { data: any; timestamp: number }>()

export function getCached<T>(key: string, maxAge: number): T | null {
  const cached = cache.get(key)
  if (!cached) return null

  if (Date.now() - cached.timestamp > maxAge) {
    cache.delete(key)
    return null
  }

  return cached.data
}

export function setCached<T>(key: string, data: T) {
  cache.set(key, { data, timestamp: Date.now() })
}
```

---

## Testing Strategy

### 1. Component Testing with Vitest

```typescript
// components/button.test.tsx
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Button } from './button'

describe('Button', () => {
  it('renders with text', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument()
  })

  it('handles click events', async () => {
    const handleClick = vi.fn()
    render(<Button onClick={handleClick}>Click me</Button>)

    const user = userEvent.setup()
    await user.click(screen.getByRole('button'))

    expect(handleClick).toHaveBeenCalledOnce()
  })

  it('renders disabled state', () => {
    render(<Button disabled>Disabled</Button>)
    expect(screen.getByRole('button')).toBeDisabled()
  })
})
```

### 2. Accessibility Testing

```typescript
// components/form-field.test.tsx
import { render, screen } from '@testing-library/react'
import { axe, toHaveNoViolations } from 'jest-axe'
import { FormField } from './form-field'

expect.extend(toHaveNoViolations)

it('has no accessibility violations', async () => {
  const { container } = render(
    <FormField label="Email" required />
  )
  const results = await axe(container)
  expect(results).toHaveNoViolations()
})
```

### 3. E2E Testing with Playwright

```typescript
// e2e/navigation.spec.ts
import { test, expect } from '@playwright/test'

test('navigate to about section', async ({ page }) => {
  await page.goto('/')
  await page.click('a[href="#about"]')
  await expect(page.locator('#about')).toBeInViewport()
})
```

---

## Accessibility Guidelines

### 1. Semantic HTML

```jsx
// ✅ Good: Semantic elements
<header>
  <nav>Navigation</nav>
</header>

<main>
  <article>
    <h1>Title</h1>
    <p>Content</p>
  </article>
</main>

<footer>Footer</footer>

// ❌ Bad: Non-semantic
<div className="header">
  <div className="nav">Navigation</div>
</div>
```

### 2. ARIA Attributes

```jsx
// ✅ Good: ARIA labels
<button aria-label="Close menu" onClick={closeMenu}>
  ✕
</button>

<div role="status" aria-live="polite" aria-atomic="true">
  {message}
</div>

// ❌ Bad: Missing labels
<button onClick={closeMenu}>X</button>
```

### 3. Focus Management

```jsx
// ✅ Good: Visible focus states
export function InteractiveElement() {
  return (
    <button className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
      Click me
    </button>
  )
}

// ❌ Bad: No focus visible
<button className="outline-none">Click me</button>
```

### 4. Color Contrast

```css
/* ✅ Good: 7:1 contrast ratio (AAA) */
.text {
  color: #0B1020; /* Foreground */
  background-color: #FFFFFF; /* Background */
}

/* ❌ Bad: Low contrast */
.text {
  color: #E5E7EB; /* Too light */
  background-color: #F9FAFB; /* Similar color */
}
```

### 5. Form Accessibility

```jsx
// ✅ Good: Associated label
<label htmlFor="email">Email</label>
<input id="email" type="email" />

// ❌ Bad: Unassociated label
<label>Email</label>
<input type="email" />
```

---

## TypeScript Patterns

### 1. Strict Type Definitions

```typescript
// ✅ Strict types
interface UserProps {
  id: string
  name: string
  email: string
  role: 'admin' | 'user'
  metadata?: Record<string, unknown>
}

// ❌ Avoid: Too permissive
interface UserProps {
  [key: string]: any
}
```

### 2. Generic Components

```typescript
// ✅ Reusable with generics
export function List<T extends { id: string }>({
  items,
  renderItem,
}: {
  items: T[]
  renderItem: (item: T) => React.ReactNode
}) {
  return (
    <ul>
      {items.map((item) => (
        <li key={item.id}>{renderItem(item)}</li>
      ))}
    </ul>
  )
}

// Usage
<List<User> items={users} renderItem={(user) => <p>{user.name}</p>} />
```

### 3. Utility Types

```typescript
// Extract types from objects
const config = { theme: 'dark', lang: 'en' } as const
type Theme = typeof config.theme // 'dark'
type Language = typeof config.lang // 'en'

// Pick specific properties
interface User {
  id: string
  email: string
  name: string
  password: string
}

type PublicUser = Omit<User, 'password'>
type UserPreview = Pick<User, 'name' | 'email'>
```

### 4. Discriminated Unions

```typescript
// Type-safe state management
type Result<T> =
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; error: Error }

function handleResult<T>(result: Result<T>) {
  if (result.status === 'success') {
    console.log(result.data) // TypeScript knows data exists
  } else if (result.status === 'error') {
    console.error(result.error) // TypeScript knows error exists
  }
}
```

---

## Checklist: Best Practices Implementation

### Component Development
- [ ] Single responsibility per component
- [ ] Props interfaces explicitly defined
- [ ] Default props provided
- [ ] Compound components when appropriate
- [ ] Proper TypeScript types

### Performance
- [ ] Code splitting implemented
- [ ] Images optimized with Next.js Image
- [ ] Memoization where needed
- [ ] Bundle analysis done
- [ ] Core Web Vitals monitored

### Styling
- [ ] Utility-first Tailwind approach
- [ ] CSS composition with `cn()`
- [ ] Dark mode support
- [ ] Mobile-first responsive design
- [ ] Custom CSS only for complex effects

### Animations
- [ ] Intersection Observer for scroll animations
- [ ] Stagger animations implemented
- [ ] Prefers-reduced-motion respected
- [ ] Performance optimized

### Accessibility
- [ ] Semantic HTML elements
- [ ] ARIA attributes where needed
- [ ] Focus visible states
- [ ] Color contrast 7:1 (AAA)
- [ ] Form labels associated
- [ ] Keyboard navigation supported

### Testing
- [ ] Unit tests for utilities
- [ ] Component tests with Vitest
- [ ] Accessibility tests with jest-axe
- [ ] E2E tests with Playwright
- [ ] Coverage > 80%

### TypeScript
- [ ] Strict mode enabled
- [ ] No `any` types
- [ ] Generic components used
- [ ] Utility types leveraged
- [ ] Error handling typed

---

**Version**: 1.0  
**Last Updated**: 2025

Reference this guide regularly and share with your team for consistency!

