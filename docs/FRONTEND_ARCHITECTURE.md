# Frontend Architecture Guide

This document is the **Single Source of Truth** for the frontend architecture of `dev-overflow-nextjs`. It defines where code belongs, how layers interact, and the strict boundaries that ensure scalability.

## 1. Mental Model

Think of the architecture as a **composition hierarchy**. Data flows down, events bubble up.

```ascii
[ APPS ] (The "Shell")
   │
   ├── Routing (Next.js)
   ├── Configuration (Providers)
   └── Composition of Features
         │
         ▼
[ FEATURES ] (The "Domain Brain")
   │
   ├── Business Logic (Hooks)
   ├── State Management (TanStack Query / Form)
   └── Specialized Components
         │
         ▼
[ PACKAGES ] (The "Building Blocks")
   │
   ├── Reusable UI (Dumb Components)
   ├── Core Logic (Utils, Services)
   └── Contracts (Zod Schemas, Types)
```

---

## 2. Layer Responsibilities

### A. Apps (`apps/`)
**Purpose**: The entry point. Handles **Routing**, **Environment**, and **Composition**.
**Strict Rule**: **NO** business logic. **NO** direct API calls.

*   **Responsibility**:
    *   Define routes (`page.tsx`, `layout.tsx`).
    *   Initialize providers (`ClerkProvider`, `QueryClientProvider`).
    *   Pass URL parameters to features.
    *   SEO metadata.

#### ✅ Example: `apps/web/app/(auth)/forgot-password/page.tsx`
```tsx
import { ForgotPasswordConfirmation } from "@/features/auth/components/forgot-password-confirmation";

// 1. Route-specific logic only (params, searchParams)
export default function Page({ searchParams }: { searchParams: { email: string } }) {
  // 2. Composes the feature
  return <ForgotPasswordConfirmation email={searchParams.email} />;
}
```

---

### B. Features (`apps/web/features/` or `libs/features`)
**Purpose**: The **Domain Logic**. Contains the precise rules for a specific vertical (e.g., Auth, Questions, Tagging).
**Strict Rule**: Features should **NOT** import other features directly (unless strictly hierarchical).

*   **Responsibility**:
    *   **Hooks**: `useResendOtp`, `useCreateQuestion`.
    *   **Components**: specialized UI that connects hooks to JSX.
    *   **Services**: API definitions for this domain.

#### ✅ Example: `apps/web/features/auth/hooks/use-resend-otp.ts`
```ts
import { useClerk } from "@clerk/nextjs"; 
// Feature layer CAN use framework-specific logic if needed, 
// but segregating it here keeps UI dumb.

export function useResendOtp({ email }) {
   const { client } = useClerk();
   // Business logic: check supported factors, prepare email...
   const resend = async () => { /* ... */ };
   
   return { resend, loading };
}
```

---

### C. Packages (`packages/`)
**Purpose**: **Universal Building Blocks**. Code that could theoretically work in a different app (e.g., Mobile, Admin Panel).
**Strict Rule**: **NO** dependencies on App Router, `next/navigation`, or complex context.

*   **Responsibility**:
    *   **`@repo/ui`**: Buttons, Inputs, Dialogs (Tailwind styled).
    *   **`@repo/schemas`**: Zod schemas shared with backend.
    *   **`@repo/utils`**: Date formatting, string manipulation.

#### ✅ Example: `packages/schemas/auth.ts`
```ts
import { z } from "zod";

export const resetPasswordSchema = z.object({
  email: z.string().email(),
  code: z.string().length(6),
});
```

---

### D. Package vs Feature Boundaries

| Aspect | `apps/*` | `features/*` | `packages/*` |
| :--- | :--- | :--- | :--- |
| **State** | URL / Route State | Form / Query State | Stateless / Props |
| **Logic** | Routing / Config | Business Rules | Generic Utilities |
| **Reuse** | None (Singleton) | Low (App Specific) | High (Cross App) |
| **Framework** | Next.js Specific | Next.js / React | Framework Agnostic (mostly) |

---

## 3. Dependency Flow & Rules

### ✅ The Flow
1.  **Apps** import **Features** and **Packages**.
2.  **Features** import **Packages**.
3.  **Packages** import **other Packages** (carefully).

### ❌ The Forbidden
1.  **Packages** MUST NOT import **Apps** (Circular dependency).
2.  **Packages** MUST NOT import **Features** (Architecture violation).
3.  **Features** SHOULD NOT import **Apps** (keeps features portable).

---

## 4. Decision Checklist

Use this checklist to decide where to put a new file:

1.  **Is it a Page Route?** (`/dashboard`, `/login`)
    *   👉 **`apps/web/app/...`**
2.  **Is it a generic UI element?** (Button, Card, Modal)
    *   👉 **`packages/ui`**
3.  **Is it a Helper function?** (Format Date, capitalization)
    *   👉 **`packages/utils`**
4.  **Is it a Validation Schema?** (Sign Up Form Schema)
    *   👉 **`packages/schemas`**
5.  **Is it a "Sign Up Form" widget?** (Logic + UI)
    *   👉 **`apps/web/features/auth`**
6.  **Is it a data fetch hook?** (`useGetQuestions`)
    *   👉 **`apps/web/features/questions`**

## 5. Coding Standards

### DO
*   **DO** use **React Hook Form** for all forms.
*   **DO** use **TanStack Query** for all async data.
*   **DO** keep Components **"Dumb"** (receive data via props or custom hooks).
*   **DO** enforce Zod schemas at the boundary (API responses, Form inputs).

### DON'T
*   **DON'T** put `useEffect` or `fetch` directly in UI components.
*   **DON'T** access `process.env` directly in `packages/` (pass config as arguments).
*   **DON'T** use `next/navigation` inside `packages/` hooks (return callbacks instead).
