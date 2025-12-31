🧠 Architecture Overview

Mục tiêu: Tài liệu này dùng để KHÓA kiến trúc của repo.
Mọi thay đổi lớn về structure / tooling / naming PHẢI đối chiếu với tài liệu này.

1. Philosophy (Triết lý thiết kế)
1.1 Nguyên tắc cốt lõi

Convention > Configuration

One responsibility per package

Feature code ≠ Reusable package

Refactor theo chu kỳ, không theo cảm xúc

Repo này ưu tiên dễ đọc – dễ onboard – khó phá hơn là linh hoạt tuyệt đối.

2. Monorepo Structure
.
├── apps/
│   └── web/
│       └── src/
│           ├── app/
│           ├── features/
│           └── shared/
│
├── packages/
│   ├── ui/
│   ├── hooks/
│   ├── schemas/
│   ├── utils/
│   ├── constants/
│   ├── eslint-config/
│
└── scripts/
3. Packages Responsibility (KHÓA)
3.1 Foundation / Tooling Packages

❗ KHÔNG chứa business logic

Package	Trách nhiệm
eslint-config	Quy chuẩn code style & architecture

3.2 Runtime / Reusable Packages
Package	Được phép chứa	Không được chứa
ui	UI primitives (button, form…)	Feature-specific UI
hooks	Shared React hooks	Business logic
schemas	Zod schemas, DTO	API call
utils	Pure functions	State / side effects
constants	Static values	Logic
4. App Layer
4.1 Feature-first Architecture
apps/web/src/features/auth/
├── components/
├── hooks/
├── schemas/
├── services/
└── index.ts

Feature KHÔNG được import feature khác

Feature ĐƯỢC import từ packages/*

5. Naming Convention (KHÓA)
5.1 File & Folder
Case	Rule
1 chữ	lowercase
≥ 2 chữ	kebab-case
React component	kebab-case file + PascalCase export

Ví dụ hợp lệ:

use-toast.ts
radio-group.tsx
sign-in-form.tsx
5.2 Code
Thành phần	Convention
variable / function	camelCase
type / interface	PascalCase
constant	UPPER_SNAKE_CASE
6. ESLint & Tooling Rules
6.1 ESLint

ESLint v9 (Flat Config)

Mỗi package BẮT BUỘC có eslint.config.js

Import config từ @repo/eslint-config

6.2 Những gì ESLint KHÔNG làm

Không kiểm tra folder placement

Không hiểu domain semantics

➡️ Những việc này dùng script + CI.

7. Refactor Policy (QUAN TRỌNG)
7.1 Những thứ KHÔNG đổi thường xuyên

Monorepo structure

Package responsibilities

Naming convention

Tooling (ESLint, TS)

7.2 Những thứ ĐƯỢC đổi

Internal implementation

Feature logic

UI / UX

8. Change Rule

❗ Nếu một quyết định kiến trúc đã bị thay đổi ≥ 3 lần
→ quyết định đó PHẢI ĐƯỢC KHÓA.

9. Decision Log (tùy chọn)

Mọi thay đổi lớn sau này nên ghi vào đây:

YYYY-MM-DD
- What changed
- Why
- Trade-offs
10. Final Note


