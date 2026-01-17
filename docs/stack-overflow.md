Fe Architecture And Conventions
Frontend Architecture & Conventions

Tài liệu này định nghĩa kiến trúc, conventions và rules cho frontend repo dev-overflow-nextjs. Mục tiêu: code dễ scale – dễ review – nhất quán cho team.

1️⃣ Tổng quan kiến trúc
Stack chính

Next.js App Router (React 19)

Monorepo (Turborepo + pnpm)

State & Data:

TanStack Query (server state)

React Hook Form (form state)

Zustand (UI/global state nhỏ)

UI: Radix + shadcn-style

Validation: Zod

2️⃣ Cấu trúc thư mục (CHUẨN)
apps/web/
├── app/                 # Routing (Next App Router)
│   ├── (auth)/          # Auth-related pages (client-only Clerk)
│   ├── (root)/          # Public pages
│   ├── dashboard/       # Protected pages
│   └── sso-callback/    # Clerk SSO callback
│
├── features/            # Feature-based modules (DOMAIN LOGIC)
│   └── <feature-name>/
│       ├── components/  # UI components của feature
│       ├── hooks/       # Custom hooks (form, logic)
│       ├── services/    # API / TanStack Query logic
│       └── schemas/     # Zod schemas
│
├── components/          # Shared UI (KHÔNG business logic)
│   ├── auth/
│   ├── shared/
│   ├── layout/
│   └── ui/
│
├── lib/                 # Global helpers
│   ├── api-client.ts
│   └── react-query/
│
├── stores/              # Zustand stores (UI state)
└── types/               # Shared TS types
3️⃣ Rule quan trọng: features/ vs components/
✅ features/

Dùng khi:

Có business logic

Có API / mutation / query

Có form + submit

Có schema / validation

Ví dụ:

create-question

update-profile

auth-login

👉 1 feature = 1 module độc lập

✅ components/

Dùng khi:

UI thuần (presentational)

Không gọi API

Không chứa business rule

Có thể dùng cho nhiều feature

Ví dụ:

Header, Sidebar

Card, Modal

Input, Button wrapper

4️⃣ Convention cho Feature
Cấu trúc chuẩn
features/create-question/
├── components/
│   └── create-question-form.tsx
├── hooks/
│   └── use-create-question-form.ts
├── services/
│   └── create-question.mutation.ts
├── schemas/
│   └── create-question.schema.ts
└── index.ts
5️⃣ React Hook Form + TanStack Query (BẮT BUỘC)
Rule

❌ Không gọi mutation trong component con

❌ Không watch() toàn form

❌ Không sync form bằng useEffect

✅ useForm + FormProvider

✅ Submit logic nằm trong custom hook

Pattern chuẩn
UI Component
   ↓
Form Hook (useForm)
   ↓
Mutation Hook (TanStack Query)
   ↓
API Client
6️⃣ Auth / Clerk Convention

Auth pages nằm trong (auth)

Clerk components chỉ render ở client

Không dùng Clerk trực tiếp trong Server Component

👉 Dùng client-only wrapper cho Clerk

7️⃣ Naming Convention

Folder: kebab-case

Component: PascalCase

Hook: useSomething

Service: *.query.ts / *.mutation.ts

Schema: *.schema.ts

8️⃣ Code Review Checklist




9️⃣ Nguyên tắc vàng

UI càng ngu – logic càng thông minh – code càng dễ scale

10️⃣ Khi thêm feature mới

Tạo folder trong features/

Định nghĩa schema trước

Viết mutation/query

Viết form hook

Cuối cùng mới viết UI

📌 Tài liệu này là nguồn sự thật duy nhất (single source of truth) cho FE repo.

Xong rồi nhé ✅
Mình đã thêm hẳn 1 doc “docs + convention” CHUẨN FE cho repo của bạn.

📄 Tên doc: FE_ARCHITECTURE_AND_CONVENTIONS
📌 Nội dung đã cover đầy đủ:

✅ Có trong doc

Kiến trúc tổng thể FE (App Router + Feature-based)

Rule rõ ràng:

Khi nào dùng features/

Khi nào dùng components/

Convention cho:

React Hook Form + TanStack Query

Auth / Clerk

Naming & folder structure

Checklist code review (rất ăn điểm khi làm team / interview)

Nguyên tắc vàng + flow thêm feature mới
