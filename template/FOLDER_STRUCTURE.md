# Scalable Folder Structure

## Modern Next.js 16 App Router Architecture

```
project-root/
│
├── 📁 app/
│   ├── layout.tsx                 # Root layout
│   ├── page.tsx                   # Home page
│   ├── globals.css                # Global styles & design tokens
│   ├── robots.ts
│   ├── sitemap.ts
│   │
│   ├── 📁 (dashboard)/            # Dashboard route group
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── 📁 [id]/
│   │   │   ├── page.tsx
│   │   │   └── layout.tsx
│   │   └── 📁 settings/
│   │       └── page.tsx
│   │
│   ├── 📁 (auth)/                 # Auth route group
│   │   ├── layout.tsx
│   │   ├── 📁 login/
│   │   │   └── page.tsx
│   │   └── 📁 signup/
│   │       └── page.tsx
│   │
│   ├── 📁 api/                    # API routes
│   │   ├── 📁 auth/
│   │   │   └── [...nextauth].ts
│   │   ├── 📁 users/
│   │   │   ├── route.ts
│   │   │   └── 📁 [id]/
│   │   │       └── route.ts
│   │   └── 📁 data/
│   │       └── route.ts
│   │
│   └── 📁 not-found.tsx           # 404 page
│
├── 📁 components/
│   │
│   ├── 📁 ui/                     # Shadcn/UI components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   ├── dialog.tsx
│   │   ├── dropdown-menu.tsx
│   │   ├── sheet.tsx              # Mobile menu
│   │   ├── sidebar.tsx
│   │   ├── tabs.tsx
│   │   ├── toast.tsx
│   │   ├── toaster.tsx
│   │   └── ... (other UI components)
│   │
│   ├── 📁 atoms/                  # Smallest components
│   │   ├── button-icon.tsx
│   │   ├── status-badge.tsx
│   │   ├── avatar-circle.tsx
│   │   └── logo.tsx
│   │
│   ├── 📁 molecules/              # Combination of atoms
│   │   ├── form-field.tsx         # Input + Label
│   │   ├── search-bar.tsx         # Input + Icon + Button
│   │   ├── stat-card.tsx          # Icon + Text + Number
│   │   ├── breadcrumb-nav.tsx
│   │   ├── feature-card.tsx
│   │   ├── testimonial-card.tsx
│   │   └── pricing-card.tsx
│   │
│   ├── 📁 organisms/              # Complex components
│   │   ├── header.tsx             # Navigation + Logo
│   │   ├── sidebar.tsx
│   │   ├── footer.tsx
│   │   ├── navbar.tsx
│   │   ├── hero-section.tsx
│   │   ├── features-grid.tsx
│   │   ├── testimonials-section.tsx
│   │   ├── pricing-section.tsx
│   │   ├── faq-section.tsx
│   │   ├── stats-section.tsx
│   │   ├── contact-form.tsx
│   │   └── team-section.tsx
│   │
│   ├── 📁 templates/              # Page layouts
│   │   ├── app-shell.tsx          # App layout wrapper
│   │   ├── dashboard-layout.tsx   # Dashboard layout
│   │   ├── auth-layout.tsx        # Auth pages layout
│   │   ├── landing-layout.tsx     # Landing pages layout
│   │   ├── blog-layout.tsx        # Blog post layout
│   │   └── section-template.tsx   # Reusable section wrapper
│   │
│   ├── theme-provider.tsx         # Theme context + provider
│   └── index.ts                   # Barrel export
│
├── 📁 hooks/
│   ├── use-mobile.ts              # Mobile breakpoint hook
│   ├── use-scroll-visibility.ts   # Visibility on scroll
│   ├── use-intersection.ts        # Intersection Observer
│   ├── use-local-storage.ts       # Local storage state
│   ├── use-previous.ts            # Track previous value
│   ├── use-debounce.ts
│   ├── use-throttle.ts
│   ├── use-copy-to-clipboard.ts
│   ├── use-fetch.ts               # Custom fetch hook
│   ├── use-form.ts                # Form state management
│   └── index.ts                   # Barrel export
│
├── 📁 lib/
│   ├── utils.ts                   # Utility functions (cn, etc)
│   ├── seo.ts                     # SEO utilities
│   ├── api-client.ts              # Fetch wrapper
│   ├── validators.ts              # Zod/Validation schemas
│   ├── constants.ts               # App constants
│   ├── animations.ts              # Framer Motion variants
│   ├── config.ts                  # App configuration
│   └── type-utils.ts              # TypeScript utilities
│
├── 📁 data/
│   ├── site-config.json           # Site metadata
│   ├── navigation.json            # Menu items
│   ├── hero.json                  # Hero section content
│   ├── features.json              # Features section content
│   ├── testimonials.json          # Testimonials data
│   ├── pricing.json               # Pricing tiers
│   ├── faq.json                   # FAQ items
│   ├── team.json                  # Team members
│   ├── services.json              # Services offered
│   ├── projects.json              # Portfolio projects
│   ├── skills.json                # Skills/technologies
│   └── social-links.json          # Social media links
│
├── 📁 styles/
│   ├── globals.css                # (also in app/)
│   ├── variables.css              # CSS custom properties
│   ├── animations.css             # Animation keyframes
│   ├── typography.css             # Font styles
│   └── utilities.css              # Utility classes
│
├── 📁 public/
│   ├── 📁 images/
│   │   ├── logo.png
│   │   ├── hero-image.png
│   │   ├── 📁 icons/
│   │   │   └── social-icons.svg
│   │   └── 📁 patterns/
│   │       └── background.svg
│   │
│   ├── 📁 fonts/
│   │   └── custom-font.woff2
│   │
│   ├── 📁 docs/
│   │   └── resume.pdf
│   │
│   ├── robots.txt
│   ├── sitemap.xml
│   └── favicon.ico
│
├── 📁 contexts/                   # React Contexts
│   ├── theme-context.tsx
│   ├── auth-context.tsx
│   ├── user-context.tsx
│   └── modal-context.tsx
│
├── 📁 stores/                     # State management (Zustand)
│   ├── auth-store.ts
│   ├── ui-store.ts
│   ├── user-store.ts
│   └── index.ts
│
├── 📁 server/                     # Server-side logic
│   ├── actions.ts                 # Server Actions
│   ├── queries.ts                 # Data fetching
│   ├── 📁 db/
│   │   ├── schema.ts              # Database schema
│   │   └── client.ts              # DB connection
│   └── 📁 services/
│       ├── auth-service.ts
│       ├── user-service.ts
│       └── email-service.ts
│
├── 📁 types/
│   ├── index.ts
│   ├── api.ts                     # API response types
│   ├── user.ts                    # User types
│   ├── auth.ts                    # Auth types
│   ├── ui.ts                      # UI component types
│   └── forms.ts                   # Form types
│
├── 📁 utils/
│   ├── format.ts                  # Formatting utilities
│   ├── date.ts                    # Date utilities
│   ├── string.ts                  # String utilities
│   ├── array.ts                   # Array utilities
│   └── number.ts                  # Number utilities
│
├── 📁 config/
│   ├── site.config.ts             # Site configuration
│   ├── routes.config.ts           # Route definitions
│   ├── api.config.ts              # API endpoints
│   └── feature-flags.ts           # Feature flags
│
├── 📁 middleware/
│   ├── auth.ts                    # Auth middleware
│   └── logging.ts                 # Logging middleware
│
├── 📁 testing/
│   ├── 📁 unit/
│   │   └── utils.test.ts
│   ├── 📁 integration/
│   │   └── api.test.ts
│   ├── setup.ts
│   └── jest.config.js
│
├── 📁 .github/
│   └── 📁 workflows/
│       ├── test.yml
│       ├── deploy.yml
│       └── lint.yml
│
├── 📁 template/                   # Template docs
│   ├── DESIGN_TOKENS.md
│   ├── COMPONENT_ARCHITECTURE.md
│   ├── FOLDER_STRUCTURE.md
│   ├── template.md
│   └── BEST_PRACTICES.md
│
├── 📁 docs/
│   ├── ARCHITECTURE.md            # Your ARCHITECTURE.md
│   ├── API.md                     # API documentation
│   ├── DEPLOYMENT.md              # Deployment guide
│   ├── CONTRIBUTING.md            # Contributing guide
│   └── TROUBLESHOOTING.md         # Common issues
│
├── next.config.mjs
├── tailwind.config.ts             # Tailwind configuration
├── tsconfig.json
├── postcss.config.mjs
├── eslint.config.mjs
├── package.json
├── pnpm-lock.yaml
├── .env.example
├── .env.local
├── .gitignore
├── .prettierrc
├── .prettierignore
├── README.md
└── middleware.ts                  # Next.js middleware
```

---

## Naming Conventions

### Components
```
Components use PascalCase with descriptive names:
- Button.tsx
- UserCard.tsx
- DashboardLayout.tsx
- FeaturesList.tsx
```

### Hooks
```
Hooks start with 'use' prefix:
- useAuth.ts
- useFetch.ts
- useModal.ts
- useScrollPosition.ts
```

### Utilities
```
Utils use camelCase:
- formatDate.ts
- validateEmail.ts
- parseJSON.ts
```

### Data Files
```
Data files use kebab-case:
- site-config.json
- navigation.json
- feature-list.json
```

---

## Route Conventions

### Public Routes
```
/ → Home page
/about → About page
/projects → Portfolio
/contact → Contact page
```

### Dashboard Routes (Protected)
```
/dashboard → Dashboard home
/dashboard/settings → User settings
/dashboard/profile → User profile
/dashboard/analytics → Analytics page
```

### Auth Routes
```
/auth/login → Login page
/auth/signup → Registration page
/auth/forgot-password → Password recovery
/auth/verify-email → Email verification
```

### API Routes
```
GET    /api/users → Get all users
POST   /api/users → Create user
GET    /api/users/[id] → Get user
PUT    /api/users/[id] → Update user
DELETE /api/users/[id] → Delete user
```

---

## Import Aliases

Configure in `tsconfig.json`:

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./*"],
      "@/components": ["./components"],
      "@/hooks": ["./hooks"],
      "@/lib": ["./lib"],
      "@/types": ["./types"],
      "@/utils": ["./utils"],
      "@/data": ["./data"],
      "@/config": ["./config"]
    }
  }
}
```

### Usage
```javascript
// ✅ Instead of
import { Button } from '../../../components/ui/button'

// Use
import { Button } from '@/components/ui/button'
```

---

## Environment Variables

Create `.env.example`:

```bash
# Site Configuration
NEXT_PUBLIC_SITE_NAME="My App"
NEXT_PUBLIC_SITE_URL="https://example.com"
NEXT_PUBLIC_ANALYTICS_ID="UA-..."

# API Configuration
NEXT_PUBLIC_API_URL="https://api.example.com"
API_SECRET_KEY="..."

# Database
DATABASE_URL="postgresql://..."

# Authentication
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="..."

# Third-party Services
STRIPE_PUBLIC_KEY="pk_..."
STRIPE_SECRET_KEY="sk_..."
SENDGRID_API_KEY="..."
```

---

## File Size Guidelines

Keep components focused:

- **Atoms**: < 100 lines
- **Molecules**: < 200 lines
- **Organisms**: < 400 lines
- **Pages**: < 300 lines
- **Hooks**: < 150 lines
- **Utilities**: < 100 lines

If larger, consider breaking into smaller files.

---

## Layering Strategy

```
Presentation Layer (UI Components)
         ↓
Business Logic Layer (Hooks, Contexts)
         ↓
Data Access Layer (Server Actions, API)
         ↓
Data/State Layer (Stores, Contexts)
         ↓
Infrastructure Layer (API Clients, DB)
```

---

## Scalability Pattern

For growing teams:

```
single-folder/
├── components/
├── hooks/
└── lib/

→ growth →

multi-team/
├── apps/
│   ├── web/
│   ├── admin/
│   └── mobile/
├── packages/
│   ├── ui/
│   ├── hooks/
│   ├── types/
│   └── utils/
└── shared/
    ├── config/
    ├── data/
    └── services/
```

Use monorepo (Turborepo/Nx) when:
- Multiple apps share code
- Teams need independence
- Shared component library needed
- Complex build orchestration

---

## Checklist: Folder Structure

- [ ] App folder contains pages and API routes
- [ ] Components organized by atomic design
- [ ] Hooks in dedicated hooks/ folder
- [ ] Utilities in lib/ and utils/ folders
- [ ] Data files in data/ folder (JSON)
- [ ] Types defined in types/ folder
- [ ] Public assets in public/ folder
- [ ] Environment variables documented
- [ ] Import aliases configured
- [ ] Each file < 300 lines (avg)
- [ ] Clear naming conventions applied
- [ ] Barrel exports (index.ts) for modules

