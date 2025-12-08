# 🚀 dev-overflow-nextjs - Frontend Monorepo

> A production-ready **frontend monorepo** with Turborepo, Next.js, Tailwind CSS v4, shadcn/ui, and Zustand. Connects to a separate NestJS backend API.

---

## 📚 Full Documentation

**👉 [MONOREPO_GUIDE.md](./MONOREPO_GUIDE.md)** - Complete guide from A-Z

Covers everything:

- What is Monorepo & Turborepo (for beginners)
- Project structure explained
- How to work with packages
- Design system details
- Backend integration guide
- Best practices & troubleshooting

---

## 🏗️ Architecture

```
┌─────────────────────────────────┐
│   FRONTEND MONOREPO (This Repo) │
│   • Next.js Apps                │
│   • Shared Packages             │
│   • Design System               │
└───────────┬─────────────────────┘
            │ HTTP/REST API
┌───────────▼─────────────────────┐
│   BACKEND (Separate Repo)       │
│   • NestJS API                  │
│   • Database                    │
└─────────────────────────────────┘
```

---

## 🚀 Quick Start

### Prerequisites

- Node.js >= 18.0.0
- pnpm >= 9.0.0

### Setup

```bash
# Install pnpm
npm install -g pnpm

# Install dependencies
pnpm install

# Run dev mode
pnpm dev
```

### Access

- **Main app**: http://localhost:7777
- **Examples**: http://localhost:7777/examples
- **Docs**: http://localhost:3001

---

## 📋 Common Commands

```bash
# Development
pnpm dev                          # All apps
pnpm --filter web dev             # Only web

# Build
pnpm build                        # All
pnpm --filter web build           # Only web

# Code Quality
pnpm lint                         # Lint
pnpm check-types                  # TypeScript check
pnpm format                       # Prettier

# Add Dependencies
pnpm --filter web add <package>   # To apps/web
pnpm add -w <package>             # To workspace root

# Add shadcn Component
cd apps/web
pnpm dlx shadcn@latest add <component>
```

---

## 🛠 Tech Stack

### Core

- **Turborepo** - Build system with caching
- **pnpm** - Fast package manager
- **Next.js 16** - React framework
- **TypeScript 5.9** - Type safety

### UI

- **Tailwind CSS 4** - Styling (with @theme directive)
- **shadcn/ui** - Component library
- **CVA** - Component variants

### Forms & State

- **React Hook Form** - Form management
- **Zod 4** - Validation
- **Zustand 5** - State management

---

## 📂 Project Structure

```
├── apps/
│   ├── web/              # Main app (Port 7777)
│   │   ├── components/ui/  # shadcn/ui components
│   │   └── stores/         # Zustand stores
│   └── docs/             # Docs site (Port 3001)
│
├── packages/
│   ├── tailwind-config/  # Design system (theme.css)
│   ├── schemas/          # Zod schemas
│   ├── typescript-config/
│   └── eslint-config/
│
├── turbo.json
├── pnpm-workspace.yaml
└── MONOREPO_GUIDE.md     # 📚 Full guide
```

**Note**: UI components and stores are app-specific, not shared.

---

## 🎨 Design System

Quick reference (see [MONOREPO_GUIDE.md](./MONOREPO_GUIDE.md#-design-system) for details):

**Colors**: `bg-accent`, `bg-dark-100` to `dark-500`, `bg-light-400` to `light-900`

**Typography**: `text-h1-bold`, `text-h2-bold`, `text-paragraph-regular`, `text-body-medium`, `text-small-regular`, `text-subtle-medium`

**Gradients**: `bg-accent-gradient`, `hover-bg-accent-gradient`

**Font**: Inter (Google Fonts)

---

## 🔌 Backend Integration

```typescript
// apps/web/.env.local
NEXT_PUBLIC_API_URL=http://localhost:4000

// apps/web/lib/api-client.ts
import axios from "axios";

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

// Usage
const response = await apiClient.post("/api/auth/login", data);
```

**Full guide**: [Backend Integration](./MONOREPO_GUIDE.md#-tích-hợp-với-nestjs-backend)

---

## 🎯 Example Usage

```typescript
// UI Components (local)
import { Button } from "@/components/ui/button";

// Validation Schemas (shared)
import { loginSchema } from "@repo/schemas/auth";

// State (local)
import { useAuthStore } from "@/stores/auth-store";

// Usage
const form = useForm({ resolver: zodResolver(loginSchema) });
const { user, logout } = useAuthStore();
```

---

## 📖 Learn More

- **[MONOREPO_GUIDE.md](./MONOREPO_GUIDE.md)** - Complete documentation
- [Turborepo Docs](https://turbo.build/repo/docs)
- [Next.js Docs](https://nextjs.org/docs)
- [shadcn/ui](https://ui.shadcn.com/)

---

## 🙏 Built With

[Turborepo](https://turbo.build/) • [Next.js](https://nextjs.org/) • [shadcn/ui](https://ui.shadcn.com/) • [Tailwind CSS](https://tailwindcss.com/)

---

**Made with ❤️ by TuPV**
