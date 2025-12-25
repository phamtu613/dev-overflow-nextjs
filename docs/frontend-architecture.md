# Frontend Architecture Guide

> **Version**: 2.0 - Clean Feature-Driven Architecture  
> **Last Updated**: 2025-12-24  
> **Status**: ✅ Final Specification

This document defines the architectural standards for our TurboRepo monorepo. We follow a **Strict Feature-Driven Architecture** with clear separation between routing, domain logic, and shared infrastructure.

---

## 📋 Table of Contents

- [High-Level Principles](#-high-level-principles)
- [Final Folder Structure](#-final-folder-structure)
- [Layer Definitions](#-layer-definitions)
- [Architectural Rules](#-architectural-rules)
- [Import Guidelines](#-import-guidelines)
- [Feature Development Guide](#-feature-development-guide)
- [Migration from Old Structure](#-migration-from-old-structure)

---

## 🎯 High-Level Principles

### Core Philosophy

1. **Feature-First Organization** 
   - Code is organized by *domain capability* (what it does), not technical category (what type it is)
   - Each feature is a self-contained vertical slice of business value
   - Features should be independently deletable

2. **Thin Routing Layer**
   - `apps/web/app/` is ONLY for routing and composition
   - Zero business logic in route files
   - Pages fetch data and render feature components

3. **Shared by Purpose, Not by Type**
   - No `components/`, `hooks/`, `lib/` directories in `apps/web/`
   - Shared UI → `packages/ui` (generic design system)
   - Shared logic → `packages/utils`, `packages/hooks` (generic utilities)
   - Feature-specific → `features/[name]/components` (domain-specific)

4. **Clear Dependency Graph**
   - Routing → Features → Packages
   - Features are independent (no sibling imports)
   - Packages are generic (no business logic)

---

## 🏗 Final Folder Structure

### 🌲 Complete Tree

```text
dev-overflow-nextjs/
│
├── apps/
│   └── web/                              # Main Next.js Application
│       │
│       ├── app/                          # 🟢 LAYER 1: ROUTING
│       │   ├── (auth)/                   # Route group: Auth pages
│       │   │   ├── sign-in/page.tsx
│       │   │   ├── sign-up/page.tsx
│       │   │   └── layout.tsx
│       │   │
│       │   ├── (root)/                   # Route group: Main app
│       │   │   ├── page.tsx              # Home page
│       │   │   └── layout.tsx            # Root layout with navbar
│       │   │
│       │   ├── dashboard/
│       │   │   └── page.tsx
│       │   │
│       │   ├── questions/
│       │   │   ├── [id]/page.tsx         # Dynamic route
│       │   │   ├── new/page.tsx
│       │   │   └── page.tsx              # List view
│       │   │
│       │   ├── settings/
│       │   │   └── page.tsx
│       │   │
│       │   ├── layout.tsx                # Root app layout
│       │   ├── globals.css               # Global styles
│       │   └── favicon.ico
│       │
│       ├── features/                     # 🔵 LAYER 2: DOMAIN FEATURES
│       │   │
│       │   ├── auth/                     # Feature: Authentication
│       │   │   ├── components/
│       │   │   │   ├── login-form.tsx
│       │   │   │   ├── register-form.tsx
│       │   │   │   └── oauth-buttons.tsx
│       │   │   ├── actions/
│       │   │   │   ├── sign-in.action.ts
│       │   │   │   └── sign-up.action.ts
│       │   │   ├── hooks/
│       │   │   │   └── use-auth.ts
│       │   │   ├── store/
│       │   │   │   └── auth-store.ts     # Zustand/other state
│       │   │   ├── api/                  # (optional) API service layer
│       │   │   │   └── auth.service.ts
│       │   │   └── types.ts
│       │   │
│       │   ├── questions/                # Feature: Q&A System
│       │   │   ├── components/
│       │   │   │   ├── question-card.tsx
│       │   │   │   ├── question-list.tsx
│       │   │   │   ├── question-form.tsx
│       │   │   │   └── answer-section.tsx
│       │   │   ├── actions/
│       │   │   │   ├── create-question.ts
│       │   │   │   ├── get-questions.ts
│       │   │   │   └── vote-question.ts
│       │   │   ├── hooks/
│       │   │   │   └── use-questions.ts
│       │   │   └── types.ts
│       │   │
│       │   ├── layout/                   # Feature: App Shell & Navigation
│       │   │   ├── components/
│       │   │   │   ├── navbar.tsx
│       │   │   │   ├── sidebar.tsx
│       │   │   │   ├── footer.tsx
│       │   │   │   └── mobile-nav.tsx
│       │   │   └── store/
│       │   │       └── sidebar-store.ts  # Sidebar open/close state
│       │   │
│       │   ├── theme/                    # Feature: Theme Management
│       │   │   ├── components/
│       │   │   │   └── theme-toggle.tsx
│       │   │   ├── providers/
│       │   │   │   └── theme-provider.tsx
│       │   │   └── store/
│       │   │       └── theme-store.ts
│       │   │
│       │   └── modals/                   # Feature: Modal System
│       │       ├── components/
│       │       │   ├── confirm-modal.tsx
│       │       │   └── modal-container.tsx
│       │       └── store/
│       │           └── modal-store.ts
│       │
│       ├── config/                       # ⚙️ APP CONFIGURATION
│       │   ├── env.ts                    # Environment variables (validated)
│       │   ├── constants.ts              # App-wide constants
│       │   └── routes.ts                 # Route definitions
│       │
│       ├── providers/                    # 🔌 ROOT PROVIDERS
│       │   ├── index.tsx                 # AppProviders (composition)
│       │   ├── query-provider.tsx        # React Query
│       │   └── auth-provider.tsx         # Clerk/Auth wrapper
│       │
│       ├── public/                       # Static assets
│       │   ├── social/
│       │   └── favicon.ico
│       │
│       ├── next.config.js
│       ├── tsconfig.json
│       ├── tailwind.config.ts
│       └── package.json
│
└── packages/                             # 🎁 SHARED PACKAGES
    │
    ├── ui/                               # Design System (Shadcn/UI)
    │   ├── button.tsx
    │   ├── input.tsx
    │   ├── card.tsx
    │   ├── dialog.tsx
    │   ├── toast.tsx
    │   └── ...primitives
    │
    ├── utils/                            # Pure Utility Functions
    │   ├── cn.ts                         # Tailwind class merger
    │   ├── format-date.ts
    │   ├── slugify.ts
    │   └── validators.ts
    │
    ├── hooks/                            # Generic React Hooks
    │   ├── use-media-query.ts
    │   ├── use-local-storage.ts
    │   ├── use-debounce.ts
    │   └── use-intersection-observer.ts
    │
    ├── schemas/                          # Zod Validation Schemas
    │   ├── auth.ts                       # LoginSchema, RegisterSchema
    │   ├── question.ts                   # QuestionSchema
    │   └── user.ts
    │
    ├── client/                           # API Client Library
    │   ├── api-client.ts                 # Generic HTTP client
    │   ├── types.ts
    │   └── package.json
    │
    └── configs/                          # Shared Configurations
        ├── eslint-config/
        ├── typescript-config/
        └── tailwind-config/
```

---


---

## 🎨 Feature Types

This project uses two types of features:

### Domain Features
**Purpose**: Represent business domains and core application functionality

**Characteristics**:
- Contain business logic specific to a domain
- Manage domain-specific data and state
- Provide domain-specific UI components
- Independent and self-contained

**Examples**:
- `features/auth/` - Authentication and authorization
- `features/questions/` - Q&A system
- `features/users/` - User management
- `features/tags/` - Tag system

**Structure**:
```text
features/auth/
├── components/       # LoginForm, RegisterForm
├── actions/          # signIn, signUp
├── api/             # auth.service.ts
├── hooks/           # useAuth
├── store/           # auth-store.ts
└── types.ts
```

### UI Features  
**Purpose**: Handle UI-specific state and behavior across the application

**Characteristics**:
- Manage UI state (theme, sidebar, modals)
- Provide app-wide UI components (navbar, footer)
- No business domain logic
- Can be used by any domain feature

**Examples**:
- `features/layout/` - App shell, navigation, sidebar
- `features/modals/` - Global modal management
- `features/theme/` - Theme switching and persistence

**Structure**:
```text
features/theme/
├── components/       # ThemeToggle
├── providers/        # ThemeProvider
└── store/           # theme-store.ts
```

---

## 📐 Layer Definitions

### Layer 1: Routing (`apps/web/app/`)

**Purpose**: Define routes and compose features

**Responsibilities**:
- Route definitions (folders & `page.tsx`)
- Data fetching (Server Components)
- Layout composition
- SEO metadata exports

**NOT allowed**:
- Business logic
- Component implementation
- State management
- Utility functions

**Example**:
```tsx
// ✅ apps/web/app/questions/[id]/page.tsx
import { QuestionDetail } from "@/features/questions/components/question-detail"
import { getQuestionById } from "@/features/questions/actions/get-question"
import { notFound } from "next/navigation"

export async function generateMetadata({ params }: Props) {
  const question = await getQuestionById(params.id)
  return { title: question.title }
}

export default async function QuestionPage({ params }: Props) {
  const question = await getQuestionById(params.id)
  if (!question) notFound()
  
  return <QuestionDetail question={question} />
}
```

---

### Layer 2: Features (`apps/web/features/`)

**Purpose**: Implement domain business logic as vertical slices

**Responsibilities**:
- Feature-specific UI components
- Feature-specific hooks
- Server Actions
- API calls
- Local state management
- Feature-specific types

**Structure Template**:
```text
features/[feature-name]/
├── components/        # UI components for this feature
├── actions/           # Server Actions (Next.js)
├── api/              # (Optional) API service layer
├── hooks/            # React hooks specific to feature
├── store/            # State management (Zustand, etc.)
├── utils/            # Feature-specific utilities (if any)
└── types.ts          # TypeScript definitions
```

**Feature Categories**:

1. **Domain Features** (Business Logic)
   - `auth/` - Authentication & authorization
   - `questions/` - Q&A system
   - `users/` - User profiles
   - `tags/` - Tag management

2. **App Features** (Application Infrastructure)
   - `layout/` - Navigation, shell, sidebar
   - `theme/` - Theme switching
   - `modals/` - Modal system

---

### Layer 3: Packages (`packages/`)

**Purpose**: Generic, reusable code shared across apps

**Responsibilities**:
- Design system primitives
- Generic utilities (no business logic)
- Generic hooks
- Validation schemas
- Shared configurations

| Package | Purpose | Examples |
|---------|---------|----------|
| `@repo/ui` | Design system components | `Button`, `Input`, `Dialog` |
| `@repo/utils` | Pure functions | `formatDate`, `cn`, `slugify` |
| `@repo/hooks` | Generic React hooks | `useMediaQuery`, `useDebounce` |
| `@repo/schemas` | Zod schemas | `LoginSchema`, `QuestionSchema` |
| `@repo/client` | API client | `apiClient`, HTTP utilities |

**Package Creation Checklist**:
- [ ] Is this code generic enough for multiple apps?
- [ ] Does it have zero business logic?
- [ ] Could it be open-sourced?
- [ ] Is it framework-agnostic (where possible)?

---

### Infrastructure: Config & Providers

#### `apps/web/config/`
**Purpose**: App-level configuration and constants

```typescript
// config/env.ts - Type-safe environment variables
import { z } from "zod"

const envSchema = z.object({
  NEXT_PUBLIC_API_URL: z.string().url(),
  CLERK_SECRET_KEY: z.string(),
})

export const env = envSchema.parse(process.env)
```

```typescript
// config/routes.ts - Centralized route definitions
export const ROUTES = {
  HOME: "/",
  SIGN_IN: "/sign-in",
  DASHBOARD: "/dashboard",
  QUESTIONS: {
    LIST: "/questions",
    DETAIL: (id: string) => `/questions/${id}`,
    NEW: "/questions/new",
  },
} as const
```

#### `apps/web/providers/`
**Purpose**: Root-level provider composition

```tsx
// providers/index.tsx
import { ThemeProvider } from "@/features/theme/providers/theme-provider"
import { QueryProvider } from "./query-provider"
import { AuthProvider } from "./auth-provider"

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <QueryProvider>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </QueryProvider>
    </AuthProvider>
  )
}
```

---

## ✅ Architectural Rules

### DO ✅

#### 1. Keep Routes Minimal
```tsx
// ✅ GOOD: apps/web/app/dashboard/page.tsx
import { DashboardView } from "@/features/dashboard/components/dashboard-view"
import { getUserStats } from "@/features/dashboard/actions"

export default async function DashboardPage() {
  const stats = await getUserStats()
  return <DashboardView stats={stats} />
}
```

#### 2. Keep Features Independent
```tsx
// ✅ GOOD: features/questions/components/question-card.tsx
import { Button } from "@repo/ui/button"           // ✅ Import from packages
import { formatDate } from "@repo/utils"           // ✅ Import from packages
import { VoteButton } from "./vote-button"         // ✅ Import from same feature

export function QuestionCard({ question }: Props) {
  // Feature logic here
}
```

#### 3. Promote Code Strategically
**Decision Tree**:
```
Is this code used in multiple places?
├─ No → Keep it in the component file
└─ Yes
   ├─ Is it feature-specific?
   │  └─ Yes → Move to features/[name]/components or hooks
   └─ Is it generic?
      └─ Yes → Move to packages/ui or packages/hooks
```

#### 4. Use Server Actions for Data Mutations
```tsx
// ✅ GOOD: features/questions/actions/create-question.ts
"use server"

import { db } from "@/lib/db"
import { QuestionSchema } from "@repo/schemas"

export async function createQuestion(data: unknown) {
  const validated = QuestionSchema.parse(data)
  return await db.question.create({ data: validated })
}
```

---

### DON'T ❌

#### 1. ❌ Never Create These Folders in `apps/web/`
```text
apps/web/
├── ❌ components/     → Use packages/ui or features/[name]/components
├── ❌ hooks/          → Use packages/hooks or features/[name]/hooks
├── ❌ lib/            → Use packages/utils or packages/client
├── ❌ utils/          → Use packages/utils
└── ❌ shared/         → Use packages/* or features/layout
```

#### 2. ❌ Don't Put Business Logic in Packages
```tsx
// ❌ BAD: packages/utils/get-user-questions.ts
export async function getUserQuestions(userId: string) {
  // Database query - this is business logic!
}

// ✅ GOOD: packages/utils/group-by.ts
export function groupBy<T>(array: T[], key: keyof T) {
  // Generic utility function
}
```

#### 3. ❌ Don't Cross-Import Between Sibling Features
```tsx
// ❌ BAD: features/questions/components/question-card.tsx
import { UserAvatar } from "@/features/users/components/user-avatar"

// ✅ GOOD Option 1: Promote to shared package
import { Avatar } from "@repo/ui/avatar"

// ✅ GOOD Option 2: Pass as prop from page
export function QuestionCard({ userAvatar }: Props) {
  return <div>{userAvatar}</div>
}
```

#### 4. ❌ Don't Put UI Primitives in Features
```tsx
// ❌ BAD: features/auth/components/button.tsx
// Generic button should be in packages/ui

// ✅ GOOD: features/auth/components/login-form.tsx
// Specific to auth feature
```

---

## 🔀 Import Guidelines

### Import Hierarchy

```text
Allowed Dependencies:
├── app/           → features/, packages/
├── features/      → packages/, config/, layout, theme, modals
├── providers/     → features/, packages/
├── config/        → packages/
└── packages/      → other packages/ (minimal)
```

### Path Aliases Configuration

```json
// apps/web/tsconfig.json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./*"],
      "@/features/*": ["./features/*"],
      "@/config/*": ["./config/*"],
      "@repo/ui": ["../../packages/ui"],
      "@repo/utils": ["../../packages/utils"],
      "@repo/hooks": ["../../packages/hooks"],
      "@repo/schemas": ["../../packages/schemas"],
      "@repo/client": ["../../packages/client"]
    }
  }
}
```

### Import Examples by Layer

#### From `app/` (Routing Layer)
```tsx
// ✅ Import features
import { LoginForm } from "@/features/auth/components/login-form"

// ✅ Import packages
import { Button } from "@repo/ui/button"

// ❌ Don't import from config
import { env } from "@/config/env"  // Features should handle this
```

#### From `features/` (Domain Layer)
```tsx
// ✅ Import from packages
import { Button } from "@repo/ui/button"
import { cn } from "@repo/utils"

// ✅ Import from app features (layout, theme, modals)
import { Navbar } from "@/features/layout/components/navbar"

// ✅ Import from config
import { ROUTES } from "@/config/routes"

// ❌ Don't import from sibling domain features
import { UserCard } from "@/features/users/components/user-card"
```

#### From `packages/` (Shared Layer)
```tsx
// ✅ Import from other packages (sparingly)
import { cn } from "@repo/utils"

// ❌ Never import from apps
import { LoginForm } from "../../apps/web/features/auth"  // ❌
```

---

## 🚀 Feature Development Guide

### Creating a New Feature

**Example: Creating a `notifications/` feature**

#### Step 1: Create Feature Structure
```bash
mkdir -p apps/web/features/notifications/{components,actions,hooks,store}
touch apps/web/features/notifications/types.ts
```

#### Step 2: Define Types
```typescript
// features/notifications/types.ts
export interface Notification {
  id: string
  title: string
  message: string
  type: "info" | "success" | "warning" | "error"
  read: boolean
  createdAt: Date
}
```

#### Step 3: Create Store (if needed)
```typescript
// features/notifications/store/notification-store.ts
import { create } from "zustand"
import type { Notification } from "../types"

interface NotificationStore {
  notifications: Notification[]
  addNotification: (notification: Notification) => void
  markAsRead: (id: string) => void
}

export const useNotificationStore = create<NotificationStore>((set) => ({
  notifications: [],
  addNotification: (notification) =>
    set((state) => ({
      notifications: [notification, ...state.notifications],
    })),
  markAsRead: (id) =>
    set((state) => ({
      notifications: state.notifications.map((n) =>
        n.id === id ? { ...n, read: true } : n
      ),
    })),
}))
```

#### Step 4: Create Components
```tsx
// features/notifications/components/notification-list.tsx
import { useNotificationStore } from "../store/notification-store"
import { NotificationItem } from "./notification-item"

export function NotificationList() {
  const notifications = useNotificationStore((s) => s.notifications)
  
  return (
    <div>
      {notifications.map((notification) => (
        <NotificationItem key={notification.id} notification={notification} />
      ))}
    </div>
  )
}
```

#### Step 5: Create Server Actions
```typescript
// features/notifications/actions/get-notifications.ts
"use server"

import { db } from "@/lib/db"
import type { Notification } from "../types"

export async function getNotifications(): Promise<Notification[]> {
  return await db.notification.findMany({
    orderBy: { createdAt: "desc" },
  })
}
```

#### Step 6: Use in Route
```tsx
// app/notifications/page.tsx
import { NotificationList } from "@/features/notifications/components/notification-list"
import { getNotifications } from "@/features/notifications/actions/get-notifications"

export default async function NotificationsPage() {
  const notifications = await getNotifications()
  
  return (
    <div>
      <h1>Notifications</h1>
      <NotificationList initialData={notifications} />
    </div>
  )
}
```

---

### When to Split a Feature

**Signs a feature should be split**:
- Feature folder has > 15 files
- Multiple unrelated responsibilities
- Unclear naming (e.g., `features/admin-stuff`)

**Example Split**:
```text
BEFORE:
features/admin/
├── components/
│   ├── user-management.tsx
│   ├── settings.tsx
│   └── analytics.tsx

AFTER:
features/admin-users/
├── components/user-table.tsx

features/admin-settings/
├── components/settings-form.tsx

features/admin-analytics/
├── components/analytics-dashboard.tsx
```

---

### When to Promote to Package

Use this checklist:

1. **Is it used by 2+ features?** → Consider packages
2. **Is it UI primitive?** → `packages/ui`
3. **Is it a pure function?** → `packages/utils`
4. **Is it a generic hook?** → `packages/hooks`
5. **Is it validation?** → `packages/schemas`

**Example Promotion**:
```tsx
// BEFORE: features/questions/components/avatar.tsx
export function Avatar({ src, alt }: Props) { /* */ }

// AFTER: packages/ui/avatar.tsx
export function Avatar({ src, alt }: Props) { /* */ }

// Usage in features
import { Avatar } from "@repo/ui/avatar"
```

---

## 🔄 Migration from Old Structure

### Removed Directories

| Old Path | New Path | Reason |
|----------|----------|--------|
| `apps/web/components/` | **REMOVED** | Mixed shared/feature code |
| `apps/web/features/global/` | **SPLIT** | Mixed app concerns |
| `apps/web/lib/` | `packages/utils` | Generic utilities |

### Migration Mapping

#### Components
```text
apps/web/components/style-guide/     → REMOVED (or apps/docs)
apps/web/components/ui/button.tsx    → packages/ui/button.tsx
```

#### Global Feature Split
```text
features/global/lib/api-client.ts        → packages/client/api-client.ts
features/global/store/theme-store.ts     → features/theme/store/theme-store.ts
features/global/store/sidebar-store.ts   → features/layout/store/sidebar-store.ts
features/global/store/modal-store.ts     → features/modals/store/modal-store.ts
features/global/providers/               → apps/web/providers/
```

### Import Updates

**Old imports**:
```tsx
import { Button } from "@/components/ui/button"
import { apiClient } from "@/features/global/lib/api-client"
import { useTheme } from "@/features/global/store/theme-store"
```

**New imports**:
```tsx
import { Button } from "@repo/ui/button"
import { apiClient } from "@repo/client"
import { useTheme } from "@/features/theme/store/theme-store"
```

---

## 🎯 Quick Decision Matrix

### "Where should I put this file?"

```text
┌─ Is it a Route?
│  └─ Yes → apps/web/app/[route]/page.tsx
│
├─ Is it Business Logic?
│  ├─ Feature-specific component → features/[name]/components/
│  ├─ Feature-specific hook → features/[name]/hooks/
│  ├─ Server Action → features/[name]/actions/
│  └─ Feature State → features/[name]/store/
│
├─ Is it Generic/Reusable?
│  ├─ UI Component → packages/ui/
│  ├─ Utility function → packages/utils/
│  ├─ React Hook → packages/hooks/
│  └─ Validation Schema → packages/schemas/
│
├─ Is it Infrastructure?
│  ├─ Environment config → apps/web/config/
│  └─ Provider → apps/web/providers/
│
└─ Is it Static?
   └─ Yes → apps/web/public/
```

---

## ✅ Validation Checklist

Use this checklist during code review:

### Architecture Compliance
- [ ] No `apps/web/components/` directory exists
- [ ] No `apps/web/lib/` directory exists
- [ ] No `apps/web/hooks/` directory exists
- [ ] No `features/global/` directory exists

### Import Compliance
- [ ] Routes (`app/`) only import from `features/` and `packages/`
- [ ] Features don't cross-import from sibling features
- [ ] Packages don't import from `apps/`

### Feature Structure
- [ ] Each feature has clear purpose
- [ ] Feature components are domain-specific
- [ ] Generic components live in `packages/ui`

### Code Quality
- [ ] No business logic in route files
- [ ] Server Actions use `"use server"` directive
- [ ] Types are properly defined

---

## 📚 Additional Resources

### Code Examples
- [Feature Example: Auth](file:///Users/lytuan/admin/dev-overflow-nextjs/apps/web/features/auth)
- [Package Example: UI](file:///Users/lytuan/admin/dev-overflow-nextjs/packages/ui)

### Related Documentation
- [TurboRepo Guide](file:///Users/lytuan/admin/dev-overflow-nextjs/MONOREPO_GUIDE.md)
- [Implementation Plan](file:///Users/lytuan/.gemini/antigravity/brain/2b6a1fe2-e2ec-4621-b711-aec78d510d59/implementation_plan.md)

---

## 🔧 Enforcement

### Automated Checks

```bash
# Check for forbidden directories
test ! -d apps/web/components && echo "✅ No components dir" || echo "❌ Found components"
test ! -d apps/web/lib && echo "✅ No lib dir" || echo "❌ Found lib"

# Check for forbidden imports
rg "from ['\"]@/components/" apps/web && echo "❌ Bad imports" || echo "✅ Clean imports"
```

### ESLint Rules (Future)
```javascript
// .eslintrc.js
module.exports = {
  rules: {
    "no-restricted-imports": [
      "error",
      {
        patterns: [
          "@/components/*",  // Forbidden
          "@/lib/*",         // Forbidden
        ],
      },
    ],
  },
}
```

---

## 🤝 Contributing

When adding new code:

1. **Start Feature-First**: Begin in `features/[name]`
2. **Promote When Needed**: Move to `packages/` only when reused
3. **Keep Routes Thin**: Minimal logic in `app/`
4. **Document Decisions**: Update this guide when patterns emerge

---

**Questions?** Reach out to the team or open an issue in the repository.
