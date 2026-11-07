<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Hire Loop client

Single-package Next.js 16.4.5 (App Router, `src/` dir) app. Not a monorepo. npm only (`package-lock.json` — don't use pnpm/yarn/bun). Package manager installs: `npm ci`.

## Commands

- Dev server: `npm run dev` (Turbopack)
- Lint: `npm run lint` (ESLint 9 flat config; no Prettier configured)
- Typecheck: `npx tsc --noEmit` — there is no `typecheck` script
- Build: `npm run build` (also runs TypeScript, so it catches type errors)

There is no test runner, no test files, and no CI. Before finishing: `npm run lint` → `npx tsc --noEmit` → `npm run build`.

## Quirks worth knowing

- **AGENTS.md managed block**: `experimental.agentFeedback: true` in `next.config.ts` makes `next dev` write/restore the block between the markers above (agentRules is on by default). Don't delete it; commit it with your changes.
- **Tailwind v4 is CSS-first**: there is no `tailwind.config`. Theme lives in `src/app/globals.css` via `@import "tailwindcss"`, `tw-animate-css`, and `@import "shadcn/tailwind.css"` (the theme comes from the `shadcn` npm package). `next.config.ts` wires `*.css` to the `@tailwindcss/turbopack` loader — don't add a config file or PostCSS config.
- **shadcn style is `base-nova`** (`components.json`): UI primitives come from `@base-ui/react`, not Radix. New `src/components/ui/` components should follow the existing `button.tsx` pattern.
- **`cn` is the npm package**: components do `import { cn } from "cn"`; `src/lib/utils.ts` just re-exports it for the `@/lib/utils` shadcn alias.
- **React Compiler is on** (`reactCompiler: true` + `babel-plugin-react-compiler`); write idiomatic React and don't hand-add `memo`/`useMemo` for performance.
- **Typed route props**: layouts/pages use the global `LayoutProps<"/">` / `PageProps` types from Next 16 generated types instead of manually typed `children`/`params`.
- **Installed but unwired**: `better-auth` and `mongodb` are in `dependencies` but no auth/DB code exists yet (no middleware, no API routes). `.env` exists but is empty and gitignored; no env vars are consumed yet.
