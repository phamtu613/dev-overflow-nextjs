# 🚀 Dev Overflow - Frontend Monorepo

> A production-ready **Stack Overflow clone** built with Turborepo, Next.js 16, Tailwind CSS v4, and modern React patterns. Designed for scalability and developer experience.

---

## 📚 Table of Contents

- [Architecture](#-architecture)
- [Quick Start](#-quick-start)
- [Project Structure](#-project-structure)
- [Available Scripts](#-available-scripts)
- [Shared Packages](#-shared-packages)
- [Tech Stack](#-tech-stack)
- [Development Guide](#-development-guide)
- [Backend Integration](#-backend-integration)

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    FRONTEND MONOREPO                        │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  apps/web (Next.js 16)                              │   │
│  │  • Pages & Routing                                  │   │
│  │  • UI Components (shadcn/ui)                        │   │
│  │  • State Management (Zustand)                       │   │
│  │  • React Query for data fetching                    │   │
│  └─────────────────────────────────────────────────────┘   │
│                           │                                 │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  packages/ (Shared across apps)                     │   │
│  │  • @repo/ui - shadcn/ui components                  │   │
│  │  • @repo/constants - Filters, criteria              │   │
│  │  • @repo/schemas - Zod validation                   │   │
│  │  • @repo/hooks - Shared React hooks                 │   │
│  │  • @repo/utils - Utility functions                  │   │
│  │  • @repo/tailwind-config - Design tokens            │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                            │
                     HTTP/REST API
                            │
┌───────────────────────────▼─────────────────────────────────┐
│                  BACKEND (Separate Repo)                    │
│  • NestJS API                                               │
│  • PostgreSQL Database                                      │
│  • Authentication (JWT)                                     │
└─────────────────────────────────────────────────────────────┘
```

---

## 🚀 Quick Start

### Prerequisites

| Tool     | Version   | Installation                    |
|----------|-----------|--------------------------------|
| Node.js  | >= 18.0.0 | [nodejs.org](https://nodejs.org) |
| pnpm     | >= 9.0.0  | `npm install -g pnpm`          |

### Installation

```bash
# Clone repository
git clone https://github.com/your-username/dev-overflow-nextjs.git
cd dev-overflow-nextjs

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

### Access Points

| Application | URL                     | Description           |
|-------------|-------------------------|-----------------------|
| Web App     | http://localhost:7777   | Main application      |
| Style Guide | http://localhost:7777/style-guide | Component showcase |

---

## 📂 Project Structure

```
dev-overflow-nextjs/
├── apps/
│   └── web/                          # Next.js application
│       ├── app/                      # App Router pages
│       │   ├── (auth)/               # Authentication pages
│       │   │   ├── sign-in/
│       │   │   ├── sign-up/
│       │   │   ├── forgot-password/
│       │   │   └── reset-password/
│       │   ├── (root)/               # Main app pages
│       │   │   ├── (home)/           # Homepage & questions
│       │   │   ├── blogs/
│       │   │   ├── profiles/
│       │   │   ├── tags/
│       │   │   └── users/
│       │   └── layout.tsx            # Root layout
│       │
│       ├── components/
│       │   ├── ui/                   # shadcn/ui components
│       │   │   ├── button.tsx
│       │   │   ├── card.tsx
│       │   │   ├── input.tsx
│       │   │   └── ...
│       │   ├── shared/               # Reusable components
│       │   │   ├── header.tsx
│       │   │   ├── left-sidebar.tsx
│       │   │   ├── right-sidebar.tsx
│       │   │   ├── question-metrics.tsx
│       │   │   └── ...
│       │   ├── auth/                 # Auth-specific components
│       │   └── layout/               # Layout components
│       │
│       ├── hooks/                    # App-specific hooks
│       │   └── useCommunityUsers.ts
│       │
│       ├── lib/
│       │   ├── api-client.ts         # Axios configuration
│       │   ├── mock-data.tsx         # Development mock data
│       │   ├── react-query/          # React Query setup
│       │   └── services/             # API service functions
│       │
│       ├── stores/                   # Zustand stores
│       │   ├── auth-store.ts
│       │   ├── modal-store.ts
│       │   ├── sidebar-store.ts
│       │   └── theme-store.ts
│       │
│       └── types/                    # TypeScript types
│           ├── index.d.ts
│           ├── user.ts
│           └── community.ts
│
├── packages/
│   ├── ui/                           # 🆕 Shared UI components (21 components)
│   │   └── src/
│   │       ├── index.ts              # All exports
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       ├── input.tsx
│   │       └── ...                   # avatar, badge, checkbox, dialog, etc.
│   │
│   ├── constants/                    # Shared constants
│   │   └── src/index.ts              # Filters, criteria
│   │
│   ├── schemas/                      # Zod validation schemas
│   │   └── src/
│   │       ├── auth.ts
│   │       ├── question.ts
│   │       └── user.ts
│   │
│   ├── hooks/                        # Shared React hooks
│   │   └── src/use-toast.ts
│   │
│   ├── utils/                        # Utility functions
│   │   └── src/cn.ts                 # className merger
│   │
│   ├── tailwind-config/              # Design system
│   │   ├── theme.css                 # CSS variables
│   │   └── postcss.config.cjs
│   │
│   ├── typescript-config/            # Shared TS configs
│   └── eslint-config/                # Shared ESLint configs
│
├── turbo.json                        # Turborepo configuration
├── pnpm-workspace.yaml               # Workspace definition
└── package.json                      # Root package.json
```

---

## 📋 Available Scripts

### Root Level Commands

```bash
# Development
pnpm dev                    # Start all apps in dev mode
pnpm build                  # Build all apps
pnpm lint                   # Lint all packages
pnpm check-types            # TypeScript type checking
pnpm format                 # Format code with Prettier

# Clean
pnpm clean                  # Remove node_modules & build artifacts
```

### App-Specific Commands

```bash
# Run specific app
pnpm --filter web dev       # Start web app only
pnpm --filter web build     # Build web app only
pnpm --filter web lint      # Lint web app only

# Add dependencies
pnpm --filter web add axios                 # Add to web app
pnpm --filter @repo/utils add lodash        # Add to utils package
pnpm add -w prettier                        # Add to workspace root

# Add shadcn/ui components
cd apps/web
pnpm dlx shadcn@latest add button
pnpm dlx shadcn@latest add dialog
```

---

## 📦 Shared Packages

### @repo/ui
Shared shadcn/ui components for all apps.

```typescript
import { Button, Card, Input, Dialog } from "@repo/ui";
// Or import specific components
import { Button } from "@repo/ui/button";

// Usage
<Button variant="default">Click me</Button>
<Card>
  <CardHeader>Title</CardHeader>
  <CardContent>Content</CardContent>
</Card>
```

### @repo/constants
Shared filter constants and criteria.

```typescript
import { 
  BADGE_CRITERIA,
  HomePageFilters,
  QuestionFilters,
  TagFilters 
} from "@repo/constants";

// Usage
console.log(BADGE_CRITERIA.GOLD); // 15
```

### @repo/schemas
Zod validation schemas for forms.

```typescript
import { loginSchema, registerSchema } from "@repo/schemas/auth";
import { questionSchema } from "@repo/schemas/question";

// With React Hook Form
const form = useForm({
  resolver: zodResolver(loginSchema)
});
```

### @repo/hooks
Shared React hooks.

```typescript
import { useToast, toast } from "@repo/hooks/use-toast";

// Usage
const { toast } = useToast();
toast({ title: "Success!", description: "Operation completed." });
```

### @repo/utils
Utility functions.

```typescript
import { cn } from "@repo/utils/cn";

// Merge Tailwind classes
<div className={cn("p-4", isActive && "bg-primary")} />
```

---

## 🛠️ Tech Stack

### Core Framework
| Technology      | Version | Purpose                        |
|-----------------|---------|--------------------------------|
| Turborepo       | 2.6     | Monorepo build system          |
| Next.js         | 16      | React framework                |
| React           | 19      | UI library                     |
| TypeScript      | 5.9     | Type safety                    |
| pnpm            | 9.0     | Package manager                |

### Styling & UI
| Technology      | Version | Purpose                        |
|-----------------|---------|--------------------------------|
| Tailwind CSS    | 4.1     | Utility-first CSS              |
| shadcn/ui       | latest  | Component library              |
| Radix UI        | latest  | Headless components            |
| Lucide React    | 0.553   | Icons                          |
| CVA             | 0.7     | Component variants             |

### State & Data
| Technology      | Version | Purpose                        |
|-----------------|---------|--------------------------------|
| Zustand         | 5.0     | State management               |
| React Query     | 5.59    | Server state & caching         |
| Axios           | 1.13    | HTTP client                    |
| React Hook Form | 7.66    | Form management                |
| Zod             | 4.1     | Schema validation              |

### Authentication
| Technology      | Version | Purpose                        |
|-----------------|---------|--------------------------------|
| Clerk           | 6.35    | Authentication provider        |

---

## 🔧 Development Guide

### Component Architecture

```
components/
├── ui/           # Primitive UI components (shadcn/ui)
│                 # - button, input, card, dialog, etc.
│                 # - Styled with CVA variants
│
├── shared/       # Reusable composite components
│                 # - header, sidebar, metrics, etc.
│                 # - Compose UI primitives
│
├── auth/         # Feature-specific components
├── layout/       # Layout components
└── [feature]/    # Other feature components
```

### State Management Pattern

```typescript
// stores/auth-store.ts
import { create } from 'zustand';

interface AuthState {
  user: User | null;
  isLoading: boolean;
  login: (user: User) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: false,
  login: (user) => set({ user }),
  logout: () => set({ user: null }),
}));
```

### Data Fetching Pattern

```typescript
// hooks/useCommunityUsers.ts
import { useQuery } from "@tanstack/react-query";

export function useCommunityUsers(search: string, sortBy: SortOption) {
  return useQuery({
    queryKey: ["community-users", search, sortBy],
    queryFn: () => fetchCommunityUsers(search, sortBy),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}
```

### Adding New Pages

```typescript
// app/(root)/new-feature/page.tsx
import { SomeComponent } from "@/components/some-component";

export default function NewFeaturePage() {
  return (
    <main className="flex flex-col gap-6">
      <h1 className="text-h1-bold">New Feature</h1>
      <SomeComponent />
    </main>
  );
}
```

---

## 🔌 Backend Integration

### Environment Setup

```bash
# apps/web/.env.local
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=http://localhost:4000
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxx
CLERK_SECRET_KEY=sk_test_xxx
```

### API Client Configuration

```typescript
// lib/api-client.ts
import axios from "axios";

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
  headers: { "Content-Type": "application/json" },
});

// Request interceptor - add auth token
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor - handle errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/sign-in";
    }
    return Promise.reject(error);
  }
);
```

### Service Pattern

```typescript
// lib/services/question.service.ts
import { apiClient } from "../api-client";
import type { Question } from "@/types";

export const questionService = {
  getAll: async (filters?: QuestionFilters): Promise<Question[]> => {
    const response = await apiClient.get("/api/questions", { params: filters });
    return response.data;
  },
  
  getById: async (id: string): Promise<Question> => {
    const response = await apiClient.get(`/api/questions/${id}`);
    return response.data;
  },
  
  create: async (data: CreateQuestionInput): Promise<Question> => {
    const response = await apiClient.post("/api/questions", data);
    return response.data;
  },
};
```

---

## 📖 Additional Resources

- [MONOREPO_GUIDE.md](./MONOREPO_GUIDE.md) - Detailed monorepo guide
- [Turborepo Docs](https://turbo.build/repo/docs)
- [Next.js Docs](https://nextjs.org/docs)
- [shadcn/ui Components](https://ui.shadcn.com/)
- [Tailwind CSS v4](https://tailwindcss.com/docs)

---

## 🤝 Contributing

1. Create a feature branch: `git checkout -b feature/my-feature`
2. Make your changes
3. Run tests: `pnpm lint && pnpm check-types`
4. Commit with conventional commits: `feat: add new feature`
5. Push and create a PR

---

## 📄 License

MIT License - see [LICENSE](./LICENSE) for details.

---

**Made with ❤️ by TuPV**
