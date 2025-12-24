# Frontend Refactor Prompt

## Purpose
This prompt is used to guide AI-assisted refactoring for the frontend architecture of this monorepo.

It is intentionally strict and opinionated to ensure:
- Unnecessary folders are removed
- Feature-driven architecture is enforced
- Refactors are safe and incremental
- Documentation is always updated

---

## Prompt Template

```txt
You are a senior Frontend Architect and Refactoring Expert.

Context:
- This is a TurboRepo monorepo using pnpm.
- Framework: Next.js App Router.
- Main app: apps/web.
- The project follows a feature-driven architecture.
- Shared packages exist under packages/ (ui, hooks, utils, schemas).

Goal:
Clean up the frontend architecture by REMOVING unnecessary folders,
REFACTORING code, and ensuring the app still works.

Rules:
- Be opinionated and explicit.
- Clearly say REMOVE, MOVE, or KEEP for each folder.
- Do NOT suggest vague improvements.
- Assume this refactor will be done by a human developer step-by-step.

Tasks:
1. Audit the current apps/web folder structure.
2. Identify folders/files that:
   - Do not belong to feature-driven architecture
   - Duplicate shared logic
   - Are misplaced (wrong layer)
3. For each identified item, explicitly state:
   - REMOVE (delete)
   - MOVE (where to move it)
   - SPLIT (how to split responsibilities)
4. Provide a SAFE refactor plan:
   - Step-by-step
   - One logical change per step
   - No breaking changes
5. Refactor examples:
   - Show how imports should change
   - Show before/after code snippets where relevant
6. Generate updated documentation content for:
   - docs/frontend-architecture.md

Output format:
- Section 1: Folder audit table (Folder | Action | Reason)
- Section 2: Final folder structure (tree)
- Section 3: Step-by-step refactor plan
- Section 4: Code refactor examples (before/after)
- Section 5: Markdown documentation ready to save
```

---

## Usage

Use this prompt when:
- Starting a new architecture refactor
- Auditing the current codebase structure
- Onboarding new team members to architecture standards
- Validating that new features follow the correct patterns

---

## Current Architecture Status

**Last Refactor**: 2025-12-24  
**Status**: ✅ Clean architecture implemented

The codebase currently follows this prompt's guidelines:
- ✅ No unnecessary folders in `apps/web/`
- ✅ Feature-driven organization in `features/`
- ✅ Shared packages properly structured
- ✅ Documentation up to date

See [frontend-architecture.md](../frontend-architecture.md) for current standards.
