# 📚 Hướng Dẫn Monorepo với Turborepo

> **Dành cho người mới bắt đầu**: Tài liệu hướng dẫn chi tiết từ A-Z về Frontend Monorepo và Turborepo. Bạn không cần kiến thức trước về Monorepo, tài liệu này sẽ giải thích mọi thứ từ đầu.

## 🏗️ **Architecture Overview**

```
┌─────────────────────────────────────────────────────────────┐
│                    FRONTEND MONOREPO                         │
│  ┌──────────────┐         ┌──────────────┐                 │
│  │  apps/web    │         │  apps/docs   │                 │
│  │  (Port 7777) │         │  (Port 3001) │                 │
│  └──────┬───────┘         └──────────────┘                 │
│         │                                                    │
│         │ uses                                              │
│         ▼                                                    │
│  ┌────────────────────────────────────────┐                │
│  │         Shared Packages                │                │
│  │  • @repo/schemas (Validation)         │                │
│  │  • @repo/tailwind-config (Styles)     │                │
│  └────────────────────────────────────────┘                │
│                                                             │
│  Note: UI components are app-specific                      │
│  (apps/web/components/ui/)                                 │
└─────────────────────────────────────────────────────────────┘
                         │
                         │ HTTP/REST API
                         │ (fetch/axios)
                         ▼
            ┌────────────────────────────┐
            │   BACKEND API (NestJS)     │
            │   - Separate Repository    │
            │   - Port 8000/4000         │
            │   - RESTful API            │
            │   - Database               │
            └────────────────────────────┘
```

**Quan trọng**: Đây là **Frontend-only Monorepo**. Backend API được xây dựng riêng với NestJS và không nằm trong monorepo này.

---

## 📖 Mục Lục

- [Giới Thiệu](#giới-thiệu)
  - [Monorepo là gì?](#monorepo-là-gì)
  - [Turborepo là gì?](#turborepo-là-gì)
  - [So sánh Monorepo vs Polyrepo](#so-sánh-monorepo-vs-polyrepo)
- [Cấu Trúc Dự Án](#cấu-trúc-dự-án)
  - [Tổng quan](#tổng-quan)
  - [Apps - Các ứng dụng](#apps---các-ứng-dụng)
  - [Packages - Shared code](#packages---shared-code)
  - [Root files - Cấu hình chung](#root-files---cấu-hình-chung)
- [Công Nghệ Sử Dụng](#công-nghệ-sử-dụng)
- [Cài Đặt và Chạy Dự Án](#cài-đặt-và-chạy-dự-án)
- [Hiểu về Workspaces](#hiểu-về-workspaces)
- [Hiểu về Turborepo Pipeline](#hiểu-về-turborepo-pipeline)
- [Làm Việc với Packages](#làm-việc-với-packages)
- [Design System](#design-system)
- [Best Practices](#best-practices)
- [Các Lệnh Thường Dùng](#các-lệnh-thường-dùng)
- [Troubleshooting](#troubleshooting)

---

## 🎯 Giới Thiệu

### Monorepo là gì?

**Monorepo** (mono repository) là cách tổ chức code khi nhiều dự án/packages được lưu trữ trong **cùng một repository**.

#### Ví dụ trực quan:

**Cách cũ (Polyrepo)** - Mỗi dự án một repo riêng:

```
my-company/
├── frontend-web/          (repo 1)
├── frontend-mobile/       (repo 2)
├── ui-components/         (repo 3)
├── shared-utils/          (repo 4)
└── auth-service/          (repo 5)
```

**Cách mới (Monorepo)** - Tất cả trong một repo:

```
my-company/               (1 repo duy nhất)
├── apps/
│   ├── web/             (frontend web)
│   └── mobile/          (frontend mobile)
└── packages/
    ├── ui/              (shared components)
    ├── utils/           (shared utilities)
    └── auth/            (auth logic)
```

#### Lợi ích cụ thể:

✅ **Chia sẻ code dễ dàng**

```typescript
// Trong apps/web - Sử dụng local UI components
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

// ✨ Components được quản lý trong từng app riêng biệt
```

✅ **Quản lý dependencies tập trung**

```bash
# Thay vì cài React ở 5 repos khác nhau
# Chỉ cần cài 1 lần, tất cả apps đều dùng chung version
pnpm install react@19.2.0
```

✅ **Atomic commits** - Thay đổi nhiều packages cùng lúc

```bash
# Một commit có thể update cả app và shared packages:
git commit -m "feat: add dark mode"
# - apps/web/components/ui/button.tsx  (update component)
# - apps/web/app/page.tsx              (use new component)
# - packages/schemas/user.ts            (update schema)
```

✅ **Refactoring an toàn**

```typescript
// Đổi tên function trong packages/utils/format.ts
export const formatDate = () => { ... }  // tên mới

// TypeScript sẽ báo lỗi NGAY ở tất cả nơi đang dùng tên cũ!
// Bạn fix tất cả trong cùng một PR
```

✅ **CI/CD thông minh** - Chỉ build những gì thay đổi

```bash
# Bạn chỉ sửa apps/web
# Turborepo chỉ build apps/web, không build apps/docs
# ⏱️ Tiết kiệm thời gian CI/CD
```

### Turborepo là gì?

**Turborepo** là build system giúp quản lý và tối ưu hóa monorepo.

#### Không có Turborepo:

```bash
# Phải chạy thủ công từng app
cd apps/web && npm run build
cd apps/docs && npm run build
cd packages/schemas && npm run build

# ⏱️ Mất nhiều thời gian, phải nhớ thứ tự
```

#### Có Turborepo:

```bash
# Một lệnh duy nhất
pnpm build

# ✨ Turborepo tự động:
# 1. Build packages/schemas trước (vì web và docs depend vào nó)
# 2. Build apps/web và apps/docs song song
# 3. Cache kết quả - lần sau không cần build lại
```

#### Tính năng chính:

⚡ **Caching thông minh**

```bash
# Lần 1: Build apps/web (mất 30s)
pnpm build --filter=web

# Không thay đổi gì
# Lần 2: Build apps/web (0.1s) - Lấy từ cache!
pnpm build --filter=web
```

🔄 **Parallel execution** - Chạy song song

```bash
# apps/web và apps/docs build cùng lúc (không chờ nhau)
# Nhanh gấp đôi!
```

📊 **Task dependencies** - Hiểu thứ tự

```json
// turbo.json
{
  "build": {
    "dependsOn": ["^build"] // Build dependencies trước
  }
}
```

### So sánh Monorepo vs Polyrepo

| Khía cạnh         | Polyrepo (Nhiều repos)   | Monorepo (Một repo)   |
| ----------------- | ------------------------ | --------------------- |
| **Share code**    | Phải publish npm package | Import trực tiếp      |
| **Version sync**  | Dễ bị lệch version       | Luôn đồng bộ          |
| **Refactoring**   | Phải update nhiều repos  | Update một chỗ        |
| **CI/CD**         | Mỗi repo một config      | Một config cho tất cả |
| **Dependencies**  | Duplicate nhiều nơi      | Centralized           |
| **Setup ban đầu** | Đơn giản                 | Phức tạp hơn          |
| **Team lớn**      | Dễ conflict              | Cần quy trình rõ ràng |

**Khi nào dùng Monorepo?**

- ✅ Nhiều apps/services chia sẻ code
- ✅ Cần đồng bộ version dependencies
- ✅ Team muốn refactor an toàn
- ✅ Có nhiều shared libraries

**Khi nào KHÔNG dùng Monorepo?**

- ❌ Chỉ có 1 app đơn giản
- ❌ Các projects hoàn toàn độc lập
- ❌ Team rất lớn với nhiều team độc lập

---

## 📁 Cấu Trúc Dự Án

### Tổng quan

```
dev-overflow-nextjs/                      # 📦 ROOT - Thư mục gốc của monorepo
│
├── apps/                          # 🚀 APPLICATIONS - Các ứng dụng độc lập
│   ├── web/                       # 🌐 App chính (Production app)
│   └── docs/                      # 📚 Documentation site (Internal docs)
│
├── packages/                      # 📦 SHARED PACKAGES - Code dùng chung
│   ├── tailwind-config/           # 🎨 Design system config
│   ├── schemas/                   # ✅ Validation schemas (Zod)
│   ├── typescript-config/         # ⚙️ TypeScript configs
│   └── eslint-config/             # 📏 Linting rules
│
Note: UI components are app-specific (apps/web/components/ui/)
Note: State management is app-specific (apps/web/stores/)
│
├── turbo.json                     # ⚡ Turborepo configuration
├── pnpm-workspace.yaml            # 📦 Workspace definition
├── package.json                   # 📄 Root package.json
└── pnpm-lock.yaml                 # 🔒 Dependency lock file
```

---

### Apps - Các ứng dụng

Thư mục `apps/` chứa các **ứng dụng độc lập** có thể deploy riêng biệt. Mỗi app là một Next.js application hoàn chỉnh.

#### 🌐 apps/web - Application Chính

**Mục đích**: Đây là ứng dụng chính của dự án (Production app) - trang web mà người dùng sẽ truy cập.

**Ví dụ trong dự án dev-overflow-nextjs**:

- Trang Q&A cho developers (giống Stack Overflow)
- **Frontend React/Next.js app** - Gọi API từ NestJS backend riêng biệt
- Features: đăng nhập, đăng câu hỏi, trả lời, voting, etc.

```
apps/web/
├── app/                           # 📱 Next.js App Router
│   ├── (auth)/                    # Auth pages (login, register)
│   ├── (root)/                    # Main pages (home, questions)
│   ├── examples/                  # 📚 Example pages (form demos)
│   │   └── page.tsx              # Demo login/register forms
│   ├── layout.tsx                 # Root layout
│   ├── globals.css                # 🎨 Global styles + CSS variables
│   └── page.tsx                   # Homepage
│
├── components/                    # 🧩 React Components
│   ├── ui/                        # shadcn/ui components (local)
│   │   ├── button.tsx            # Button component
│   │   ├── form.tsx              # Form components
│   │   ├── input.tsx             # Input field
│   │   ├── card.tsx              # Card component
│   │   └── ... (13 components)   # Dialog, Select, Tabs, etc.
│   │
│   └── examples/                  # 📚 Example components
│       ├── login-form.tsx        # Login form với validation
│       └── register-form.tsx     # Register form với validation
│
├── lib/                           # 🛠️ Utilities
│   └── utils.ts                   # cn() function - merge Tailwind classes
│
├── public/                        # 📂 Static files (images, icons)
│
├── components.json                # ⚙️ shadcn/ui configuration
├── tailwind.config.ts             # 🎨 Tailwind config (extends base)
├── next.config.js                 # ⚙️ Next.js configuration
├── tsconfig.json                  # ⚙️ TypeScript config
└── package.json                   # 📦 Dependencies
    {
      "name": "web",
      "dependencies": {
        "@repo/schemas": "workspace:*",      // Import schemas (đã có trong root)
        "@repo/tailwind-config": "workspace:*", // Extend design system
        "react-hook-form": "^7.66.0",        // Form management
        "zod": "^4.1.12",                    // Validation
        "zustand": "^5.0.8"                  // State
      }
    }
```

**Tại sao cần apps/web?**

- Đây là sản phẩm chính người dùng sử dụng
- Deploy lên production (vercel.com, netlify, etc.)
- Có full features của ứng dụng

#### 📚 apps/docs - Documentation Site

**Mục đích**: Website documentation **nội bộ** cho team developers.

**Ví dụ sử dụng**:

- Documentation về API
- Hướng dẫn sử dụng components
- Style guide
- Architecture diagrams
- Onboarding guides cho dev mới

```
apps/docs/
├── app/                           # Next.js App Router
│   ├── layout.tsx
│   └── page.tsx                   # Docs homepage
│
├── public/                        # Static files
│
├── next.config.js
├── tsconfig.json
└── package.json
    {
      "name": "docs",
      "scripts": {
        "dev": "next dev --port 3001"  // 🔥 Chạy ở port khác với web
      },
      "dependencies": {
        "@repo/schemas": "workspace:*"  // Import schemas nếu cần
      }
    }
```

**Tại sao cần apps/docs riêng?**

- ✅ Tách biệt docs với production app
- ✅ Team có thể xem docs mà không cần chạy production app
- ✅ Có thể showcase components, APIs
- ✅ Deploy riêng (internal only) hoặc public docs site

**Ví dụ thực tế:**

```typescript
// apps/docs có thể demo components từ local (nếu có)
import { Button } from "@/components/ui/button";

export default function ButtonDocs() {
  return (
    <div>
      <H1>Button Component Documentation</H1>
      <H2>Usage</H2>

      {/* Demo các variants */}
      <SharedButton variant="default">Default</SharedButton>
      <SharedButton variant="destructive">Destructive</SharedButton>
      <SharedButton variant="outline">Outline</SharedButton>

      {/* Code examples */}
      <pre>{`<SharedButton variant="default">Click me</SharedButton>`}</pre>
    </div>
  );
}
```

#### Sự khác biệt apps/web vs apps/docs

| Aspect           | apps/web                 | apps/docs                    |
| ---------------- | ------------------------ | ---------------------------- |
| **Mục đích**     | Production app cho users | Documentation cho developers |
| **Deploy**       | Production (public)      | Internal hoặc docs site      |
| **Port**         | 7777                     | 3001                         |
| **Features**     | Full app features        | Docs, examples, demos        |
| **Users**        | End users                | Internal team                |
| **Dependencies** | Full (schemas)           | Minimal (chỉ schemas)        |

---

### Packages - Shared code

Thư mục `packages/` chứa code **dùng chung** giữa các apps. Mỗi package là một npm package nội bộ.

#### 🎨 packages/tailwind-config - Design System

**Mục đích**: Centralized design system configuration.

```
packages/tailwind-config/
├── tailwind.config.ts             # 🎨 Base Tailwind config
│   {
│     theme: {
│       extend: {
│         colors: {
│           accent: { ... },      // Orange brand color
│           dark: { ... },        // Dark mode colors
│           light: { ... }        // Light mode colors
│         },
│         fontSize: {
│           "h1-bold": [...],     // Typography scale
│           "h2-bold": [...],
│           "paragraph-regular": [...]
│         }
│       }
│     }
│   }
│
├── postcss.config.js              # PostCSS configuration
└── package.json
    {
      "name": "@repo/tailwind-config",
      "exports": {
        "./base": "./tailwind.config.ts",
        "./postcss": "./postcss.config.js"
      }
    }
```

**Cách sử dụng:**

```typescript
// apps/web/tailwind.config.ts
import baseConfig from "@repo/tailwind-config/base";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  presets: [baseConfig], // ✨ Extend base config
};
```

**Lợi ích:**

- ✅ Consistent design system
- ✅ Apps tự động có màu sắc, typography giống nhau
- ✅ Update design ở 1 chỗ, apply mọi nơi

#### ✅ packages/schemas - Zod Validation Schemas

**Mục đích**: Centralized validation logic với Zod.

```
packages/schemas/
├── src/
│   ├── auth.ts                    # Authentication schemas
│   │   - loginSchema            (email, password)
│   │   - registerSchema         (email, username, password)
│   │   - forgotPasswordSchema
│   │   - resetPasswordSchema
│   │
│   ├── user.ts                    # User-related schemas
│   │   - updateUserSchema
│   │   - userProfileSchema
│   │
│   ├── question.ts                # Question schemas
│   │   - createQuestionSchema
│   │   - updateQuestionSchema
│   │
│   └── index.ts                   # Export tất cả
│       export * from "./auth";
│       export * from "./user";
│       export * from "./question";
│
└── package.json
    {
      "name": "@repo/schemas",
      "dependencies": {
        "zod": "^4.1.12"           // Latest Zod
      }
    }
```

**Ví dụ schema:**

```typescript
// packages/schemas/src/auth.ts
import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export type LoginInput = z.infer<typeof loginSchema>;
```

**Cách sử dụng:**

```typescript
// apps/web/components/examples/login-form.tsx
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginInput } from "@repo/schemas/auth";

const form = useForm<LoginInput>({
  resolver: zodResolver(loginSchema), // ✨ Validation tự động
});
```

**Lợi ích:**

- ✅ Validation logic ở 1 chỗ (frontend validation)
- ✅ Type-safe với TypeScript
- ✅ **Có thể share với NestJS backend** nếu backend cũng dùng Zod
- ✅ Đảm bảo validation consistent giữa frontend và backend

#### 🏪 App-level State Management (Zustand)

**⚠️ QUAN TRỌNG**: State management (Zustand stores) được đặt **TRONG MỖI APP**, không phải trong `packages/`.

**Lý do:**

- ✅ State thường có **app-specific logic**
- ✅ Mỗi app có thể có **state management khác nhau**
- ✅ Zustand state **không share tốt** giữa các apps
- ✅ Tránh coupling giữa apps

```
apps/web/
├── stores/                        # 🏪 Zustand stores (app-specific)
│   ├── auth-store.ts              # 🔐 Authentication state
│   │   - user, isAuthenticated
│   │   - login(), logout(), setUser()
│   │
│   ├── theme-store.ts             # 🌓 Theme state (light/dark)
│   │   - theme
│   │   - setTheme()
│   │
│   ├── modal-store.ts             # 🔔 Modal state
│   │   - isOpen, modalType
│   │   - openModal(), closeModal()
│   │
│   ├── sidebar-store.ts           # 📱 Sidebar state
│   │   - isOpen
│   │   - toggle(), open(), close()
│   │
│   └── index.ts                   # Export tất cả
│       export * from "./auth-store";
│       export * from "./theme-store";
```

**Ví dụ store:**

```typescript
// apps/web/stores/auth-store.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      login: (user) => set({ user, isAuthenticated: true }),
      logout: () => set({ user: null, isAuthenticated: false }),
    }),
    { name: "auth-storage" }, // Persist to localStorage
  ),
);
```

**Cách sử dụng:**

```typescript
// Trong bất kỳ component nào của apps/web
import { useAuthStore } from "@/stores/auth-store";

function UserProfile() {
  const { user, logout } = useAuthStore();

  return (
    <div>
      <p>Welcome {user?.username}</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
```

**Lợi ích:**

- ✅ Global state dùng chung
- ✅ Type-safe
- ✅ Persistent (saved to localStorage)

#### ⚙️ packages/typescript-config

**Mục đích**: Shared TypeScript configurations.

```
packages/typescript-config/
├── base.json                      # Base config cho tất cả
├── nextjs.json                    # Config cho Next.js apps
└── react-library.json             # Config cho React libraries
```

**Cách sử dụng:**

```json
// apps/web/tsconfig.json
{
  "extends": "@repo/typescript-config/nextjs.json",
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

#### 📏 packages/eslint-config

**Mục đích**: Shared ESLint rules.

```
packages/eslint-config/
├── base.js                        # Base linting rules
├── next.js                        # Next.js specific rules
└── react-internal.js              # React library rules
```

---

### Root files - Cấu hình chung

#### ⚡ turbo.json - Turborepo Configuration

**Mục đích**: Định nghĩa tasks và dependencies.

```json
{
  "$schema": "https://turborepo.com/schema.json",
  "ui": "tui",
  "tasks": {
    "build": {
      "dependsOn": ["^build"], // Build dependencies trước
      "inputs": ["$TURBO_DEFAULT$", ".env*"],
      "outputs": [".next/**", "!.next/cache/**"]
    },
    "dev": {
      "cache": false, // Dev không cache
      "persistent": true // Keep running
    },
    "lint": {
      "dependsOn": ["^lint"]
    }
  }
}
```

**Giải thích:**

- `"^build"`: Build packages dependencies trước khi build app
- `outputs`: Nơi lưu build results để cache
- `cache: false`: Dev mode không cần cache

#### 📦 pnpm-workspace.yaml

**Mục đích**: Định nghĩa workspace packages.

```yaml
packages:
  - "apps/*" # Tất cả folders trong apps/
  - "packages/*" # Tất cả folders trong packages/
```

Nhờ config này, pnpm biết tất cả apps và packages là **một workspace**, cho phép:

```typescript
import { Button } from "@/components/ui/button"; // ✨ Import từ local components
```

#### 📄 package.json (Root)

**Mục đích**: Scripts chung cho toàn bộ monorepo.

```json
{
  "name": "dev-overflow-nextjs",
  "private": true,
  "scripts": {
    "dev": "turbo run dev", // Chạy dev cho TẤT CẢ apps
    "build": "turbo run build", // Build TẤT CẢ
    "lint": "turbo run lint" // Lint TẤT CẢ
  },
  "devDependencies": {
    "turbo": "^2.6.1",
    "typescript": "5.9.2"
  },
  "packageManager": "pnpm@9.0.0"
}
```

---

## 🛠 Công Nghệ Sử Dụng

### Core Technologies

| Công nghệ        | Phiên bản | Mục đích                            |
| ---------------- | --------- | ----------------------------------- |
| **Turborepo**    | 2.6.1+    | Build system và task runner         |
| **pnpm**         | 9.0.0+    | Package manager (workspace support) |
| **Next.js**      | 16.0.1+   | React framework                     |
| **React**        | 19.2.0+   | UI library                          |
| **TypeScript**   | 5.9.2     | Type safety                         |
| **Tailwind CSS** | 4.1.17+   | Utility-first CSS framework         |

### UI & Forms

| Công nghệ           | Phiên bản | Mục đích                        |
| ------------------- | --------- | ------------------------------- |
| **shadcn/ui**       | Latest    | Pre-built accessible components |
| **Radix UI**        | Latest    | Headless UI primitives          |
| **React Hook Form** | 7.66.0+   | Form state management           |
| **Zod**             | 4.1.12+   | Schema validation               |

### State Management

| Công nghệ   | Phiên bản | Mục đích                     |
| ----------- | --------- | ---------------------------- |
| **Zustand** | 5.0.8+    | Lightweight state management |

### Styling Utilities

| Công nghệ                    | Phiên bản | Mục đích                        |
| ---------------------------- | --------- | ------------------------------- |
| **clsx**                     | 2.1.1+    | Conditional className utility   |
| **tailwind-merge**           | 3.4.0+    | Merge Tailwind classes          |
| **class-variance-authority** | 0.7.1+    | Variant-based component styling |

---

## 🚀 Cài Đặt và Chạy Dự Án

### Yêu Cầu Hệ Thống

- **Node.js**: >= 18.0.0
- **pnpm**: >= 9.0.0

### Cài Đặt pnpm (nếu chưa có)

```bash
npm install -g pnpm
# hoặc
curl -fsSL https://get.pnpm.io/install.sh | sh -
```

### Clone và Setup

```bash
# Clone repository
git clone <repository-url>
cd dev-overflow-nextjs

# Cài đặt dependencies cho tất cả packages
pnpm install

# Chạy dev mode cho tất cả apps
pnpm dev

# Hoặc chạy specific app
pnpm --filter web dev
pnpm --filter docs dev
```

### Port Mặc Định

- **web**: http://localhost:7777
- **docs**: http://localhost:3001
- **examples**: http://localhost:7777/examples (Login/Register forms demo)

---

## 🔗 Hiểu về Workspaces

### Workspaces là gì?

**Workspaces** là tính năng của pnpm (hoặc npm, yarn) cho phép nhiều packages trong cùng một repo **chia sẻ dependencies**.

#### Không có Workspaces:

```
project/
├── apps/web/
│   └── node_modules/        # 📦 React 19.2.0 (150MB)
│       └── react/
├── apps/docs/
│   └── node_modules/        # 📦 React 19.2.0 (150MB) - DUPLICATE!
│       └── react/
└── packages/schemas/
    └── node_modules/        # 📦 Shared dependencies

# ❌ Tổng: 450MB - Lãng phí dung lượng!
```

#### Có Workspaces:

```
project/
├── node_modules/            # 📦 React 19.2.0 (150MB) - SHARED!
│   └── react/
├── apps/web/                # ✨ Link tới shared node_modules
├── apps/docs/               # ✨ Link tới shared node_modules
└── packages/schemas/        # ✨ Link tới shared node_modules

# ✅ Tổng: 150MB - Tiết kiệm 66%!
```

### Cách hoạt động

1. **Khai báo workspace** trong `pnpm-workspace.yaml`:

```yaml
packages:
  - "apps/*" # Tất cả thư mục trong apps/
  - "packages/*" # Tất cả thư mục trong packages/
```

2. **Internal dependencies** với `workspace:*`:

```json
// apps/web/package.json
{
  "name": "web",
  "dependencies": {
    "@repo/schemas": "workspace:*", // ✨ Link to packages/schemas
    "react": "^19.2.0" // Normal npm package
  }
}
```

3. **Import như npm package**:

```typescript
// apps/web/page.tsx
import { Button } from "@/components/ui/button"; // ✨ Works!
import { loginSchema } from "@repo/schemas/auth"; // ✨ Works!
```

### Lợi ích Workspaces

✅ **Tiết kiệm dung lượng**: Shared dependencies, không duplicate  
✅ **Cài đặt nhanh hơn**: Chỉ cài 1 lần  
✅ **Version đồng bộ**: Tất cả dùng cùng version React, TypeScript, etc.  
✅ **Development dễ dàng**: Thay đổi trong packages/schemas → apps/web tự động reload

### Ví dụ thực tế

```bash
# Cài React cho toàn bộ workspace
cd dev-overflow-nextjs
pnpm add react@19.2.0

# ✨ apps/web, apps/docs, packages/schemas tất cả đều dùng React 19.2.0

# Cài package CHỈ cho apps/web
pnpm --filter web add react-query

# Cài package CHỈ cho packages/schemas
pnpm --filter @repo/schemas add zod
```

---

## ⚡ Hiểu về Turborepo Pipeline

### Pipeline là gì?

**Pipeline** là cách Turborepo hiểu và chạy các tasks theo **thứ tự đúng** và **parallel** khi có thể.

### Ví dụ trực quan

#### Scenario: Chạy `pnpm build`

**Dependency graph:**

```
apps/web  ──depends on──>  packages/schemas

apps/docs ──depends on──>  packages/schemas
```

**Không có Turborepo** - Phải chạy thủ công:

```bash
# Bước 1: Build packages trước (vì apps depend vào chúng)
cd packages/schemas && pnpm build

# Bước 2: Mới build apps
cd apps/web && pnpm build
cd apps/docs && pnpm build

# ❌ Mất thời gian, dễ quên thứ tự
```

**Có Turborepo** - Một lệnh duy nhất:

```bash
pnpm build

# ✨ Turborepo tự động:
# 1. Build packages/schemas trước
# 2. Sau đó build apps/web và apps/docs (PARALLEL)
```

### Visual Timeline

```
Timeline:
┌─────────────────────────────────────────────────────────┐
│ 0s    ui ████████████████                                │
│      schemas ████████████████                            │
│      store ████████████████                              │
│                                                           │
│ 2s         web ████████████████████████                  │
│            docs ████████████████████████                 │
│                                                           │
│ 4s                                      ✅ Done!         │
└─────────────────────────────────────────────────────────┘

Total: ~4 seconds

Mà không có parallel:
0s  ui ████████████████
2s  schemas ████████████████
4s  store ████████████████
6s  web ████████████████████████
8s  docs ████████████████████████
10s ✅ Done!

Total: ~10 seconds - Chậm hơn 2.5 lần!
```

### turbo.json Configuration

```json
{
  "$schema": "https://turborepo.com/schema.json",
  "tasks": {
    "build": {
      "dependsOn": ["^build"], // ⬆️ Build dependencies trước
      "inputs": [
        "$TURBO_DEFAULT$", // Theo dõi tất cả files
        ".env*" // Bao gồm env files
      ],
      "outputs": [
        ".next/**", // Cache output
        "!.next/cache/**" // Trừ cache folder
      ]
    },
    "dev": {
      "cache": false, // Không cache dev
      "persistent": true // Keep running
    },
    "lint": {
      "dependsOn": ["^lint"] // Lint dependencies trước
    },
    "check-types": {
      "dependsOn": ["^check-types"]
    }
  }
}
```

### Giải thích các keys

#### `dependsOn`

```json
"build": {
  "dependsOn": ["^build"]  // ^ = dependencies của package này
}
```

Nghĩa là:

- Khi build `apps/web`, Turborepo sẽ build `packages/schemas` **trước**
- Vì `apps/web` depend vào package này trong `package.json`:
  ```json
  "dependencies": {
    "@repo/schemas": "workspace:*"
  }
  ```

#### `inputs`

Turborepo theo dõi các files này để quyết định có cần build lại không:

```json
"inputs": [
  "$TURBO_DEFAULT$",  // All files (src/, package.json, tsconfig.json, etc.)
  ".env*"             // Environment files
]
```

**Ví dụ:**

```bash
# Lần 1: Build apps/web
pnpm build --filter=web
# ✅ Build mất 30s

# Không thay đổi gì
# Lần 2: Build apps/web
pnpm build --filter=web
# ⚡ Cache hit! Chỉ mất 0.1s

# Sửa apps/web/app/page.tsx
# Lần 3: Build apps/web
pnpm build --filter=web
# ✅ Rebuild vì file thay đổi (mất 30s)
```

#### `outputs`

Turborepo cache các thư mục này:

```json
"outputs": [
  ".next/**",          // Cache toàn bộ .next/
  "!.next/cache/**"    // Trừ .next/cache/
]
```

**Lợi ích:**

- Lần build thứ 2 không cần rebuild, copy từ cache
- CI/CD nhanh hơn nhiều

### Cache System

```bash
# Build lần đầu
pnpm build
✓ packages/schemas:build: cache miss, executing... (2s)
✓ apps/web:build: cache miss, executing... (30s)

# Build lần 2 (không thay đổi gì)
pnpm build
✓ packages/schemas:build: cache hit, replaying output... (0.1s)
✓ apps/web:build: cache hit, replaying output... (0.1s)

# ⚡ Nhanh hơn 100 lần!
```

### Khi nào cache bị invalidate?

Cache bị xóa khi:

- ✅ Source code thay đổi (any file trong `inputs`)
- ✅ Dependencies thay đổi (package.json)
- ✅ Environment variables thay đổi (.env)
- ✅ Dependencies của dependencies thay đổi (transitive)

### Filtered tasks

Chạy tasks cho specific packages:

```bash
# Chỉ build apps/web và dependencies của nó
pnpm build --filter=web
# → Builds: packages/schemas, apps/web

# Chỉ build apps/docs
pnpm build --filter=docs
# → Builds: packages/schemas, apps/docs

# Chỉ build packages/schemas (không build apps)
pnpm build --filter=@repo/schemas
# → Builds: packages/schemas only

# Build apps/web và tất cả dependents (packages dùng nó)
pnpm build --filter=...web
```

---

## 🔌 Tích Hợp với NestJS Backend

### Architecture

Dự án này là **Frontend Monorepo** kết nối với **Backend NestJS riêng biệt**.

```
Frontend (Monorepo này)          Backend (Repository riêng)
┌─────────────────────┐         ┌──────────────────────┐
│   apps/web          │         │   NestJS API         │
│   (Next.js)         │────────▶│   (TypeScript)       │
│   Port 7777         │  HTTP   │   Port 4000/8000     │
└─────────────────────┘         └──────────────────────┘
         │                                │
         │                                │
         ▼                                ▼
  @repo/schemas                     DTOs/Validators
  (Zod validation)                  (có thể share)
```

### Setup API Client

#### Axios (Recommended)

```bash
# Cài Axios
pnpm --filter web add axios
```

```typescript
// apps/web/lib/api-client.ts
import axios from "axios";

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000",
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor cho authentication
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor cho error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Redirect to login
      window.location.href = "/login";
    }
    return Promise.reject(error);
  },
);
```

### Example: Login with NestJS API

```typescript
// apps/web/components/examples/login-form.tsx
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginInput } from "@repo/schemas/auth";
import { useAuthStore } from "@repo/store/auth-store";
import { apiClient } from "@/lib/api-client";

export function LoginForm() {
  const { login } = useAuthStore();

  const form = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (data: LoginInput) => {
    try {
      // ✅ Call NestJS API
      const response = await apiClient.post("/api/auth/login", data);

      // Save token
      localStorage.setItem("token", response.data.access_token);

      // Save user to Zustand store
      login(response.data.user);

      // Redirect
      router.push("/dashboard");
    } catch (error) {
      console.error("Login error:", error);
      form.setError("root", { message: "Invalid credentials" });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        {/* Form fields */}
      </form>
    </Form>
  );
}
```

### Environment Variables

```bash
# apps/web/.env.local
NEXT_PUBLIC_API_URL=http://localhost:4000
# or
NEXT_PUBLIC_API_URL=https://api.dev-overflow-nextjs.com
```

### Sharing Schemas với Backend

Nếu NestJS backend cũng dùng TypeScript, bạn có thể:

**Option 1: Publish @repo/schemas as npm package**

```bash
# Trong packages/schemas
npm publish

# Trong NestJS backend
npm install @your-org/schemas
```

**Option 2: Git submodule hoặc monorepo lớn hơn**

```
your-project/
├── frontend/          # Frontend monorepo này
├── backend/           # NestJS backend
└── shared/
    └── schemas/       # Shared schemas package
```

**Option 3: Copy schemas sang backend**

```typescript
// Backend NestJS - DTOs
import { z } from "zod";

// Copy từ @repo/schemas/auth
export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

// Use in NestJS
import { ZodValidationPipe } from "nestjs-zod";

@Post("/login")
@UsePipes(new ZodValidationPipe(loginSchema))
async login(@Body() body: z.infer<typeof loginSchema>) {
  // ...
}
```

### API Service Pattern

```typescript
// apps/web/lib/services/auth.service.ts
import { apiClient } from "@/lib/api-client";
import type { LoginInput, RegisterInput } from "@repo/schemas/auth";

export const authService = {
  login: async (data: LoginInput) => {
    const response = await apiClient.post("/api/auth/login", data);
    return response.data;
  },

  register: async (data: RegisterInput) => {
    const response = await apiClient.post("/api/auth/register", data);
    return response.data;
  },

  logout: async () => {
    await apiClient.post("/api/auth/logout");
    localStorage.removeItem("token");
  },

  getCurrentUser: async () => {
    const response = await apiClient.get("/api/auth/me");
    return response.data;
  },
};

// Usage trong component
import { authService } from "@/lib/services/auth.service";

const handleLogin = async (data: LoginInput) => {
  const result = await authService.login(data);
  login(result.user);
};
```

### React Query Integration (Optional)

```bash
# Cài React Query cho data fetching
pnpm --filter web add @tanstack/react-query
```

```typescript
// apps/web/lib/query-client.ts
import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // 1 minute
      retry: 1,
    },
  },
});

// Usage
import { useQuery, useMutation } from "@tanstack/react-query";
import { authService } from "@/lib/services/auth.service";

export function useLogin() {
  return useMutation({
    mutationFn: authService.login,
    onSuccess: (data) => {
      queryClient.invalidateQueries(["user"]);
    },
  });
}

// In component
const loginMutation = useLogin();

const handleSubmit = (data: LoginInput) => {
  loginMutation.mutate(data);
};
```

---

## 📦 Làm Việc với Packages

### Import Shared Packages

Mỗi package có thể được import bằng tên trong `package.json`:

```typescript
// Import Zod schemas
import { loginSchema, type LoginInput } from "@repo/schemas/auth";

// Import Zustand stores (app-specific)
import { useAuthStore } from "@/stores/auth-store";

// Import local UI components
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

// Import Tailwind config
// Trong tailwind.config.ts
import baseConfig from "@repo/tailwind-config/base";
```

### Thêm shadcn/ui Component trong apps/web

**⚠️ QUAN TRỌNG**: UI components được quản lý trong từng app (không share), sử dụng shadcn CLI để thêm trực tiếp vào `apps/web/components/ui/`.

#### Thêm component mới

```bash
# Di chuyển vào apps/web
cd apps/web

# Add component bằng shadcn CLI
pnpm dlx shadcn@latest add <component-name>

# Ví dụ: Add Alert component
pnpm dlx shadcn@latest add alert

# Hoặc add nhiều components cùng lúc
pnpm dlx shadcn@latest add alert badge avatar
```

#### Sử dụng component

```typescript
// apps/web/app/page.tsx
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

export default function Page() {
  return (
    <Alert>
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Heads up!</AlertTitle>
      <AlertDescription>
        Component được lưu trong apps/web/components/ui/
      </AlertDescription>
    </Alert>
  );
}
```

**Lợi ích:**

- ✅ Component nằm trong app, dễ customize
- ✅ Dependencies tự động được add vào `apps/web/package.json`
- ✅ Không cần config thêm, sử dụng ngay với `@/components/ui/`

### Tạo Zod Schema Mới

```typescript
// packages/schemas/src/product.ts
import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  price: z.number().positive("Price must be positive"),
  description: z.string().optional(),
});

export type ProductInput = z.infer<typeof productSchema>;

// Export trong index.ts
// packages/schemas/src/index.ts
export * from "./product";
```

### Tạo Zustand Store Mới

```typescript
// apps/web/stores/cart-store.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CartItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

interface CartState {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],

      addItem: (item) =>
        set((state) => ({
          items: [...state.items, item],
        })),

      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        })),

      clearCart: () => set({ items: [] }),
    }),
    {
      name: "cart-storage",
    },
  ),
);

// Export trong index.ts
// apps/web/stores/index.ts
export * from "./cart-store";
```

### Thêm shadcn/ui Component

**⚠️ QUAN TRỌNG**: UI components là **app-specific** và được lưu trong `apps/web/components/ui/` (không share giữa các apps).

#### Workflow đơn giản (1 bước)

**Chỉ cần add component vào apps/web:**

```bash
# Chạy shadcn CLI trong apps/web
cd apps/web
pnpm dlx shadcn@latest add <component-name>

# Ví dụ: Add Alert component
pnpm dlx shadcn@latest add alert

# Hoặc add nhiều components cùng lúc
pnpm dlx shadcn@latest add alert badge avatar
```

**Output:**

```
✔ Checking registry.
✔ Installing dependencies.
✔ Updating files.
  - components/ui/alert.tsx
```

**Sử dụng ngay:**

```typescript
// apps/web/app/page.tsx
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

export default function Page() {
  return (
    <Alert>
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Heads up!</AlertTitle>
      <AlertDescription>
        This is an Alert component from apps/web/components/ui/
      </AlertDescription>
    </Alert>
  );
}
```

**Xong!** Component đã sẵn sàng sử dụng. Không cần move hay update imports gì thêm.

#### Checklist khi thêm component mới

- [ ] **Step 1**: Chạy `pnpm dlx shadcn@latest add <component>` trong `apps/web`
- [ ] **Step 2**: Import và sử dụng component từ `@/components/ui/<component>`
- [ ] **Step 3**: Test component trong app

#### Dependencies thường gặp

Khi add shadcn components, các dependencies này thường được tự động thêm vào `apps/web/package.json`:

| Component  | Dependencies                   |
| ---------- | ------------------------------ |
| `alert`    | `@radix-ui/react-alert-dialog` |
| `avatar`   | `@radix-ui/react-avatar`       |
| `badge`    | (không cần thêm)               |
| `calendar` | `react-day-picker`             |
| `command`  | `cmdk`                         |
| `popover`  | `@radix-ui/react-popover`      |
| `sheet`    | `@radix-ui/react-dialog`       |
| `skeleton` | (không cần thêm)               |
| `table`    | (không cần thêm)               |
| `tooltip`  | `@radix-ui/react-tooltip`      |

**Lưu ý**: shadcn CLI tự động thêm dependencies vào `apps/web/package.json`, không cần làm gì thêm.

#### Troubleshooting

**Lỗi: "Cannot find module '@/components/ui/alert'"**

```bash
# Đảm bảo component đã được add thành công
ls apps/web/components/ui/alert.tsx

# Restart dev server
pnpm dev

# Hoặc chạy specific app
pnpm --filter web dev
```

**Lỗi: "Module not found: @radix-ui/react-alert-dialog"**

```bash
# Dependencies sẽ tự động được thêm khi chạy shadcn CLI
# Nếu vẫn lỗi, chạy lại:
cd apps/web
pnpm install
```

**Component không hot reload**

```bash
# Restart dev server
pnpm dev

# Hoặc chạy specific app
pnpm --filter web dev
```

---

## 🎨 Design System

Design system được quản lý trong `packages/tailwind-config/theme.css` sử dụng Tailwind CSS v4 với `@theme` directive.

### Màu Sắc

#### Accent Colors (Primary Brand Color)

```css
/* Orange brand color */
--color-accent: #ff7f3e;
--color-accent-800: #fff1e6;

/* Usage */
<div className="bg-accent text-primary-foreground">Primary Button</div>
```

#### Dark Colors

```css
--color-dark-100: #000000; /* Pure black */
--color-dark-200: #0f1117; /* Very dark gray */
--color-dark-300: #151821; /* Dark gray */
--color-dark-400: #212734; /* Medium dark gray */
--color-dark-500: #3f4354; /* Gray */
```

#### Light Colors

```css
--color-light-400: #858ead; /* Muted blue-gray */
--color-light-500: #7b8ec8; /* Soft blue-gray */
--color-light-700: #dce3f1; /* Light blue-gray */
--color-light-800: #f4f6f8; /* Very light gray */
--color-light-850: #fdfdfd; /* Almost white */
--color-light-900: #ffffff; /* Pure white */
```

#### Semantic Colors (shadcn/ui)

```css
--color-background: #ffffff;
--color-foreground: #0f1117;
--color-primary: #ff7f3e;
--color-muted: #f4f6f8;
--color-border: #dce3f1;
```

#### Usage trong Components

```tsx
<div className="bg-dark-100 text-light-900">
  Dark background with white text
</div>

<div className="bg-light-800 text-dark-200">
  Light background with dark text
</div>

<button className="bg-accent-gradient hover-bg-accent-gradient">
  Gradient button with hover
</button>
```

### Typography

Typography được define bằng utility classes trong `@layer utilities` của `theme.css`.

#### Headings

```typescript
// H1 - 30px, bold, line-height 140%, letter-spacing -1px
<h1 className="text-h1-bold">Main Heading</h1>

// H2 - 24px, bold/semibold, line-height 130%
<h2 className="text-h2-bold">Section Heading</h2>
<h2 className="text-h2-semibold">Section Heading</h2>

// H3 - 20px, bold/semibold
<h3 className="text-h3-bold">Sub Heading</h3>
<h3 className="text-h3-semibold">Sub Heading</h3>
```

#### Body Text

```typescript
// Base - 18px (medium/semibold/bold)
<p className="text-base-medium">Base text medium</p>
<p className="text-base-semibold">Base text semibold</p>
<p className="text-base-bold">Base text bold</p>

// Paragraph - 16px (regular/medium/semibold)
<p className="text-paragraph-regular">Regular paragraph</p>
<p className="text-paragraph-medium">Medium paragraph</p>
<p className="text-paragraph-semibold">Semibold paragraph</p>

// Body - 14px (regular/medium/semibold)
<p className="text-body-regular">Body text</p>
<p className="text-body-medium">Body text medium</p>
<p className="text-body-semibold">Body text semibold</p>
```

#### Small Text

```typescript
// Small - 12px (regular/medium/semibold)
<span className="text-small-regular">Caption text</span>
<span className="text-small-medium">Caption medium</span>
<span className="text-small-semibold">Caption semibold</span>

// Subtle - 10px (regular/medium) + UPPERCASE
<span className="text-subtle-regular">Label</span>
<span className="text-subtle-medium">Label medium</span>
```

### Gradients

Custom gradient utilities cho buttons và backgrounds:

```typescript
// Background gradients
<div className="bg-accent-gradient">Accent gradient</div>
<div className="bg-dark-gradient">Dark gradient</div>

// Hover gradients
<button className="bg-accent-gradient hover-bg-accent-gradient">
  Button with hover gradient
</button>
<button className="hover-bg-accent-gradient-light">
  Light hover gradient
</button>
```

### Fonts

Dự án sử dụng **Inter** (Google Fonts) và **Geist Mono** (local):

```css
--font-family-sans: var(--font-inter), ui-sans-serif, system-ui, sans-serif;
--font-family-mono: var(--font-geist-mono), ui-monospace, monospace;
```

### Extending Design System

Để customize design system, update file `packages/tailwind-config/theme.css`:

```css
/* Add new colors */
@theme {
  --color-custom: #your-color;
}

/* Add new utilities */
@layer utilities {
  .text-custom-style {
    font-size: 14px;
    line-height: 1.5;
    font-weight: 500;
  }
}
```

---

## 💡 Best Practices

### 1. Component Organization

#### ✅ DO

```typescript
// Thêm shadcn components trực tiếp vào apps/web
cd apps/web
pnpm dlx shadcn@latest add button

// Import và sử dụng
import { Button } from "@/components/ui/button";

export default function Page() {
  return <Button variant="default">Click me</Button>;
}
```

#### ❌ DON'T

```typescript
// Không cố gắng share UI components giữa apps
// (Mỗi app nên có components riêng để dễ customize)
```

### 2. Schema Validation

#### ✅ DO

```typescript
// Định nghĩa schemas trong packages/schemas
// packages/schemas/src/user.ts
export const updateUserSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
});

// Sử dụng trong apps
import { updateUserSchema } from "@repo/schemas/user";

const form = useForm({
  resolver: zodResolver(updateUserSchema),
});
```

#### ❌ DON'T

```typescript
// Không define schema trực tiếp trong component
const MyComponent = () => {
  const schema = z.object({ ... }); // ❌
  // ...
};
```

### 3. State Management

#### ✅ DO

```typescript
// Tạo stores trong apps/web/stores cho app-specific state
// apps/web/stores/user-store.ts
export const useUserStore = create<UserState>()((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));

// Sử dụng trong apps/web
import { useUserStore } from "@/stores/user-store";

const MyComponent = () => {
  const { user, setUser } = useUserStore();
  // ...
};
```

#### ❌ DON'T

```typescript
// Không tạo global state trực tiếp trong apps cho shared data
// apps/web/stores/user.ts ❌ (nếu cần share với docs)
```

### 4. Styling

#### ✅ DO

```typescript
// Sử dụng cn() utility để merge classes
import { cn } from "@/lib/utils";

<div className={cn(
  "base-styles",
  variant === "primary" && "primary-styles",
  className
)} />
```

#### ❌ DON'T

```typescript
// Không concat strings trực tiếp
<div className={"base " + className} /> // ❌
<div className={`base ${className}`} /> // ❌
```

### 5. Forms

#### ✅ DO

```typescript
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@repo/schemas/auth";
import { Form, FormField, FormItem } from "@/components/ui/form";

const MyForm = () => {
  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        {/* Form fields */}
      </form>
    </Form>
  );
};
```

### 6. Imports

#### ✅ DO

```typescript
// Sử dụng path aliases
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { loginSchema } from "@repo/schemas/auth";
```

#### ❌ DON'T

```typescript
// Không sử dụng relative imports khi có alias
import { Button } from "../../../../components/ui/button"; // ❌
```

---

## 📝 Các Lệnh Thường Dùng

### Root Level Commands

```bash
# Cài đặt dependencies cho tất cả packages
pnpm install

# Chạy dev mode cho tất cả apps
pnpm dev

# Build tất cả apps và packages
pnpm build

# Lint tất cả code
pnpm lint

# Format code với Prettier
pnpm format

# Type checking
pnpm check-types
```

### Filtered Commands (chạy cho specific package)

```bash
# Chạy dev cho app web
pnpm --filter web dev

# Build app docs
pnpm --filter docs build

# Lint package schemas
pnpm --filter @repo/schemas lint

# Add dependency vào specific package
pnpm --filter web add react-query

# Add dev dependency
pnpm --filter @repo/schemas add -D @types/node
```

### Workspace Commands

```bash
# Thêm dependency cho tất cả packages
pnpm add -w <package-name>

# Thêm dev dependency cho tất cả
pnpm add -Dw <package-name>

# List tất cả packages
pnpm list --depth 0

# Clean node_modules
pnpm -r exec rm -rf node_modules
pnpm install
```

### Turborepo Commands

```bash
# Xem dependency graph
pnpm turbo run build --graph

# Force build (bỏ qua cache)
pnpm turbo run build --force

# Clear cache
pnpm turbo prune

# Chạy task với logging
pnpm turbo run dev --concurrency 10 --log-order stream
```

### shadcn/ui Commands

**⚠️ LƯU Ý**: Sau khi reorganize, workflow thêm component đã thay đổi. Xem chi tiết ở phần [Thêm shadcn/ui Component](#thêm-shadcnui-component).

```bash
# Step 1: Add component tạm thời vào apps/web
cd apps/web
pnpm dlx shadcn@latest add <component-name>

# Ví dụ
pnpm dlx shadcn@latest add alert
pnpm dlx shadcn@latest add badge avatar

# Step 2: Component đã được add vào apps/web/components/ui/, không cần move

# Step 3: Update imports và dependencies
# (Xem chi tiết ở section "Thêm shadcn/ui Component")

# List available components
pnpm dlx shadcn@latest add
```

**Quick Reference:**

| Command                             | Description                   |
| ----------------------------------- | ----------------------------- |
| `pnpm dlx shadcn@latest add alert`  | Add Alert component           |
| `pnpm dlx shadcn@latest add badge`  | Add Badge component           |
| `pnpm dlx shadcn@latest add avatar` | Add Avatar component          |
| `pnpm dlx shadcn@latest add`        | List all available components |

**Sau khi add, nhớ:**

1. ✅ Component đã được add vào `apps/web/components/ui/`
2. ✅ Dependencies tự động được thêm vào `apps/web/package.json`
3. ✅ Import và sử dụng từ `@/components/ui/<component>`
4. ✅ Run `pnpm install`

---

## 🔧 Troubleshooting

### 1. Lỗi "Cannot find module '@repo/...'"

**Nguyên nhân**: Package chưa được build hoặc export không đúng

**Giải pháp**:

```bash
# Check component đã được add
ls apps/web/components/ui/

# Đảm bảo exports đúng format
{
  "exports": {
    "./*": "./src/*.tsx"
  }
}

# Restart dev server
pnpm dev
```

### 2. Tailwind styles không apply

**Nguyên nhân**: Content paths trong `tailwind.config.ts` không đúng

**Giải pháp**:

```typescript
// apps/web/tailwind.config.ts
const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  presets: [baseConfig],
};
```

### 3. pnpm install fails

**Giải pháp**:

```bash
# Clear cache
pnpm store prune

# Delete lock file và node_modules
rm -rf node_modules pnpm-lock.yaml
rm -rf apps/*/node_modules packages/*/node_modules

# Reinstall
pnpm install
```

### 4. Turborepo cache issues

**Giải pháp**:

```bash
# Clear Turborepo cache
rm -rf .turbo
rm -rf apps/*/.turbo packages/*/.turbo

# Force rebuild
pnpm build --force
```

### 5. TypeScript errors với workspace packages

**Giải pháp**:

```bash
# Ensure TypeScript can find workspace packages
pnpm install

# Check tsconfig.json paths
# apps/web/tsconfig.json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./*"],
      "@repo/*": ["../../packages/*"]
    }
  }
}
```

### 6. Hot reload không hoạt động

**Giải pháp**:

```bash
# Restart dev server với turbo
pnpm dev

# Hoặc chạy specific app
pnpm --filter web dev

# Check Next.js config
# next.config.js
const nextConfig = {
  // UI components are local, no need to transpile
};
```

---

## 📚 Resources

### Documentation

- [Turborepo Docs](https://turbo.build/repo/docs)
- [pnpm Workspaces](https://pnpm.io/workspaces)
- [Next.js Docs](https://nextjs.org/docs)
- [shadcn/ui](https://ui.shadcn.com/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [React Hook Form](https://react-hook-form.com/)
- [Zod](https://zod.dev/)
- [Zustand](https://zustand-demo.pmnd.rs/)

### Example Pages

- Login/Register Forms: http://localhost:7777/examples
- Component Showcase: (Tạo thêm nếu cần)

---

## ✅ Tổng Kết Setup Hiện Tại

### Những gì đã có trong dự án:

#### 🚀 Apps (2)

- ✅ **apps/web** - Production app (port 7777)
  - Setup shadcn/ui với 13 components (Button, Form, Input, Card, etc.)
  - Example forms: Login & Register với validation
  - Integrated với @repo/schemas, local stores, local UI components
- ✅ **apps/docs** - Documentation site (port 3001)
  - Basic Next.js setup
  - Có thể dùng để showcase components

#### 📦 Packages (6)

- ✅ **apps/web/components/ui/** - App-specific UI components
  - Button, Card, Form, Input, etc. (shadcn/ui primitives)
  - Typography components (H1, H2, H3, Paragraph)
  - cn() utility function
- ✅ **@repo/tailwind-config** - Design system
  - Colors: Accent (Orange), Dark palette, Light palette
  - Typography scale: h1-bold, h2-bold, paragraph-regular, body-medium, etc.
  - Fonts: Geist Sans & Geist Mono
- ✅ **@repo/schemas** - Zod validation
  - Auth schemas: loginSchema, registerSchema, forgotPasswordSchema, resetPasswordSchema
  - User schemas (placeholder)
  - Question schemas (placeholder)
  - Latest Zod v4.1.12
- ✅ **@repo/store** - Zustand state
  - auth-store: User authentication với persist
  - theme-store, modal-store, sidebar-store (placeholders)
  - Latest Zustand v5.0.8
- ✅ **@repo/typescript-config** - Shared TypeScript configs
- ✅ **@repo/eslint-config** - Shared ESLint rules

#### ⚙️ Configuration

- ✅ Turborepo setup với caching
- ✅ pnpm workspaces
- ✅ All dependencies synced và updated

### Demo Pages

Truy cập các URLs sau khi chạy `pnpm dev`:

| URL                            | Description                        |
| ------------------------------ | ---------------------------------- |
| http://localhost:7777          | Homepage của apps/web              |
| http://localhost:7777/examples | 📚 **Login & Register Forms Demo** |
| http://localhost:3001          | Apps/docs homepage                 |

### Example Usage

#### Sử dụng trong apps/web:

```typescript
// Import local components
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

// Import validation schemas
import { loginSchema, type LoginInput } from "@repo/schemas/auth";

// Import global state
import { useAuthStore } from "@repo/store/auth-store";

// Import utilities
import { cn } from "@/lib/utils";

// Sử dụng
export default function Page() {
  const { user, login, logout } = useAuthStore();

  return (
    <div>
      <H1>Welcome {user?.username || "Guest"}</H1>
      <SharedButton variant="default" onClick={() => {}}>
        Get Started
      </SharedButton>
    </div>
  );
}
```

### Quick Commands

```bash
# Development
pnpm dev                    # Chạy tất cả apps
pnpm --filter web dev       # Chỉ chạy apps/web

# Build
pnpm build                  # Build tất cả
pnpm --filter web build     # Chỉ build apps/web

# Lint & Type check
pnpm lint                   # Lint tất cả
pnpm check-types            # Type check tất cả

# Add dependencies
pnpm --filter web add <package>              # Cho apps/web
pnpm --filter @repo/schemas add <package>    # Cho packages/schemas

# Add shadcn component
cd apps/web
pnpm dlx shadcn@latest add <component>
```

### Next Steps (Bước tiếp theo)

Sau khi đọc tài liệu này, bạn có thể:

1. **Tạo components mới** trong `apps/web/components/ui/` (hoặc dùng shadcn CLI)
2. **Thêm schemas mới** trong `packages/schemas/src/`
3. **Tạo stores mới** trong `apps/web/stores/` (app-specific)
4. **Build features** trong `apps/web/`
5. **Thêm docs** trong `apps/docs/`

### Học thêm

- Đọc kỹ phần [Best Practices](#best-practices)
- Xem [Example Forms](http://localhost:7777/examples) để hiểu cách kết hợp React Hook Form + Zod + Zustand
- Thử tạo component mới theo hướng dẫn trong phần [Làm Việc với Packages](#làm-việc-với-packages)

---

**Happy Coding! 🚀**

_Last updated: November 2025_

Document maintained by: TuPV
