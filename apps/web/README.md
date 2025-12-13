# 🌐 Dev Overflow - Web Application

> The main Next.js 16 web application for Dev Overflow - a Stack Overflow clone.

---

## 🚀 Quick Start

```bash
# From monorepo root
pnpm install
pnpm --filter web dev

# Or from this directory
cd apps/web
pnpm dev
```

**Access**: http://localhost:7777

---

## 📂 Directory Structure

```
apps/web/
├── app/                        # Next.js App Router
│   ├── (auth)/                 # Auth route group
│   │   ├── sign-in/
│   │   ├── sign-up/
│   │   ├── forgot-password/
│   │   ├── reset-password/
│   │   └── verify-email/
│   │
│   ├── (root)/                 # Main app route group
│   │   ├── (home)/             # Homepage
│   │   │   ├── page.tsx        # Question list
│   │   │   ├── ask-question/   # Ask & view questions
│   │   │   ├── collections/    # Saved questions
│   │   │   └── find-jobs/      # Job listings
│   │   ├── blogs/
│   │   ├── profiles/[id]/
│   │   ├── tags/
│   │   └── users/
│   │
│   ├── dashboard/
│   ├── style-guide/            # Component showcase
│   └── layout.tsx              # Root layout
│
├── components/
│   ├── ui/                     # App-specific UI (Next.js dependent)
│   │   └── sidebar-item.tsx    # Uses next/link
│   │   # Note: Other UI primitives in packages/ui (@repo/ui)
│   │
│   ├── shared/                 # Reusable composites
│   │   ├── filter-dropdown.tsx
│   │   ├── global-search.tsx
│   │   ├── header.tsx
│   │   ├── job-card.tsx
│   │   ├── left-sidebar.tsx
│   │   ├── metric.tsx
│   │   ├── mobile-nav.tsx
│   │   ├── question-metrics.tsx
│   │   ├── render-tag.tsx
│   │   ├── right-sidebar.tsx
│   │   └── theme.tsx
│   │
│   ├── auth/                   # Auth components
│   │   ├── auth-card.tsx
│   │   ├── auth-input.tsx
│   │   ├── social-buttons.tsx
│   │   └── index.ts
│   │
│   ├── layout/
│   │   └── app-sidebar.tsx
│   │
│   └── [feature]/              # Feature-specific
│       ├── answer-card.tsx
│       ├── answers-section.tsx
│       ├── hot-network.tsx
│       ├── popular-tags.tsx
│       ├── profile-*.tsx
│       ├── question-*.tsx
│       ├── saved-question-card.tsx
│       ├── top-posts.tsx
│       ├── top-tags-sidebar.tsx
│       └── user-card.tsx
│
├── hooks/                      # Custom React hooks
│   └── useCommunityUsers.ts
│
├── lib/
│   ├── api-client.ts           # Axios instance
│   ├── mock-data.tsx           # Development data
│   ├── react-query/
│   │   ├── queryKeys.ts
│   │   └── QueryProvider.tsx
│   └── services/
│       └── mockApi.ts
│
├── stores/                     # Zustand state stores
│   ├── auth-store.ts
│   ├── modal-store.ts
│   ├── sidebar-store.ts
│   ├── theme-store.ts
│   └── index.ts
│
├── types/                      # TypeScript definitions
│   ├── index.d.ts              # Main types
│   ├── user.ts
│   └── community.ts
│
├── public/                     # Static assets
│   ├── assets/icons/
│   ├── social/
│   └── *.png
│
└── globals.css                 # Global styles
```

---

## 📋 Available Scripts

```bash
# Development
pnpm dev                    # Start dev server (port 7777)

# Build
pnpm build                  # Production build
pnpm start                  # Start production server

# Code Quality
pnpm lint                   # ESLint
pnpm check-types            # TypeScript check

# Add shadcn/ui components
pnpm dlx shadcn@latest add [component]
```

---

## 🧩 Component Usage

### UI Components (from @repo/ui)

```tsx
import { Button } from "@repo/ui/button";
import { Card, CardHeader, CardContent } from "@repo/ui/card";
import { Input } from "@repo/ui/input";
// Or import multiple from barrel
import { Button, Card, Input } from "@repo/ui";

export function MyComponent() {
  return (
    <Card>
      <CardHeader>Title</CardHeader>
      <CardContent>
        <Input placeholder="Enter text..." />
        <Button>Submit</Button>
      </CardContent>
    </Card>
  );
}
```

### Shared Components

```tsx
import { QuestionMetrics } from "@/components/shared/question-metrics";
import { FilterDropdown } from "@/components/shared/filter-dropdown";

export function QuestionList() {
  return (
    <div>
      <FilterDropdown options={filters} />
      <QuestionMetrics votes={100} answers={25} views={500} />
    </div>
  );
}
```

### Using Shared Packages

```tsx
// Constants
import { HomePageFilters, BADGE_CRITERIA } from "@repo/constants";

// Validation
import { loginSchema } from "@repo/schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";

// Utilities
import { cn } from "@repo/utils/cn";

// Hooks
import { useToast, toast } from "@repo/hooks/use-toast";
```

---

## 🗃️ State Management

### Zustand Stores

```tsx
// Using auth store
import { useAuthStore } from "@/stores/auth-store";

export function UserProfile() {
  const { user, logout } = useAuthStore();
  
  return (
    <div>
      <p>Welcome, {user?.name}</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
```

### React Query

```tsx
import { useCommunityUsers } from "@/hooks/useCommunityUsers";

export function UserList() {
  const { data, isLoading, error } = useCommunityUsers(
    searchTerm,
    sortOption
  );
  
  if (isLoading) return <Skeleton />;
  if (error) return <Error />;
  
  return (
    <ul>
      {data.users.map(user => (
        <UserCard key={user.id} user={user} />
      ))}
    </ul>
  );
}
```

---

## 🎨 Styling

### Tailwind CSS Classes

```tsx
// Design system colors
<div className="bg-primary text-primary-foreground" />
<div className="bg-light-900 dark:bg-dark-200" />

// Typography
<h1 className="text-h1-bold">Heading</h1>
<p className="text-paragraph-regular">Body text</p>

// Responsive
<div className="flex flex-col md:flex-row lg:grid-cols-3" />
```

### Using cn() utility

```tsx
import { cn } from "@repo/utils/cn";

<div className={cn(
  "p-4 rounded-lg",
  isActive && "bg-primary",
  disabled && "opacity-50 cursor-not-allowed"
)} />
```

---

## 📡 API Integration

### Making API Calls

```tsx
import { apiClient } from "@/lib/api-client";

// GET request
const questions = await apiClient.get("/api/questions");

// POST request
const newQuestion = await apiClient.post("/api/questions", {
  title: "How to...",
  body: "Description...",
});
```

### Environment Variables

```bash
# .env.local
NEXT_PUBLIC_API_URL=http://localhost:4000
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxx
CLERK_SECRET_KEY=sk_test_xxx
```

---

## 🔐 Authentication

Uses **Clerk** for authentication. Configured in `app/layout.tsx`:

```tsx
import { ClerkProvider } from "@clerk/nextjs";

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>{children}</body>
      </html>
    </ClerkProvider>
  );
}
```

Protected routes use middleware at `middleware.ts`.

---

## 📁 Key Files

| File | Purpose |
|------|---------|
| `app/layout.tsx` | Root layout with providers |
| `app/globals.css` | Global CSS imports |
| `lib/api-client.ts` | Axios configuration |
| `lib/react-query/QueryProvider.tsx` | React Query setup |
| `components.json` | shadcn/ui configuration |
| `tsconfig.json` | TypeScript configuration |
| `next.config.js` | Next.js configuration |

---

## 🐛 Troubleshooting

### Common Issues

**Port already in use:**
```bash
# Kill process on port 7777
lsof -ti:7777 | xargs kill -9
```

**Type errors after changes:**
```bash
pnpm check-types
```

**Clear cache:**
```bash
rm -rf .next node_modules/.cache
pnpm dev
```

---

## 📖 Related Documentation

- [Root README](../../README.md) - Monorepo overview
- [MONOREPO_GUIDE.md](../../MONOREPO_GUIDE.md) - Detailed guide
- [shadcn/ui](https://ui.shadcn.com/) - Component docs
- [Next.js App Router](https://nextjs.org/docs/app) - Routing docs
