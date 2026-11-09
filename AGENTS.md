<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Hire Loop client

Single-package Next.js 16.4.5 (App Router, `src/` dir) app — landing page, auth pages in an `(auth)` route group, and three role dashboards. Not a monorepo. npm only (`package-lock.json` — don't use pnpm/yarn/bun). Package manager installs: `npm ci`.

## Commands

- Dev server: `npm run dev` (Turbopack)
- Lint: `npm run lint` (ESLint 9 flat config; no Prettier configured)
- Typecheck: `npx tsc --noEmit` — there is no `typecheck` script
- Build: `npm run build` (also runs TypeScript, so it catches type errors)

There is no test runner, no test files, and no CI. Before finishing: `npm run lint` → `npx tsc --noEmit` → `npm run build`.

If a dev server is already running, `npm run dev` prints the running PID and exits — don't kill the user's server; test/verify against the already-running port (usually 3000). For screenshots: headless Edge/Chrome `--window-size` clamps to a ~492px minimum width and then *crops* the PNG, so widths look broken that aren't — verify true mobile widths by loading a small host page that iframes the app at the target width.

## Auth (better-auth + MongoDB) — wired, with gotchas

- Server config is **`src/lib/atuh.ts`** — the filename is a typo, but `src/app/api/auth/[...all]/route.ts` imports it by that name. Don't rename without updating the import; don't create a duplicate `auth.ts`.
- Client: `src/lib/auth-client.ts` destructures the auth client — pages use `signIn`, `signUp`, `signOut`, `useSession` directly.
- Config: `mongodbAdapter` from `@better-auth/mongo-adapter` against db `Hire-Loop`, email+password enabled, custom `user.role` field (`'seeker' | 'recruiter' | 'admin'`, default `seeker`, `input: true`), GitHub social provider.
- Env vars, all in the gitignored `.env` (check names exist if starting fresh): `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`, `MONGODB_URI`, `GITHUB_CLIENT_ID`/`GITHUB_CLIENT_SECRET`. `GOOGLE_CLIENT_ID`/`GOOGLE_CLIENT_SECRET` exist but are unused — no Google provider in the auth config, and the Google/GitHub buttons on the auth pages are inert UI (only credentials sign-in/up is wired). Auth pages expect the `<Toaster>` mounted in root `layout.tsx`.
- No middleware and no route guards: `/dashboard/seeker`, `/dashboard/recruiter`, `/dashboard/admin` render for anyone. Don't assume dashboard routes are protected.

## Structure quirks

- Dashboard sidebar lives at `src/app/components/app-sidebar.tsx` — a components dir *inside* `app/`, not `src/components/`. Its `MenuItemByRole` role→menu map is static; session/role wiring is still pending.
- `src/components/JobDiscovery.tsx` is not mounted anywhere yet.
- Root `layout.tsx` wraps every route with `Navbar` + `Footer`, including the auth pages.

## Design conventions (follow these; don't invent a palette)

The site uses a hardcoded-hex dark design language repeated across Hero, NextRole, Pricing, and the auth pages: `bg-black` sections, cards `bg-[#111113]/90` with `border-[#333337]` (form inputs `#19191c` / `#303034`), purple accent `#6052ff` → hover `#756aff`, links `#7165ff` → hover `#948aff`, mono uppercase eyebrows flanked by `#3b5cf5` squares. Shared backgrounds reuse `public/assets/globe.png` inside a positioned wrapper + radial glow (pattern in `src/app/page.tsx`).

`next/image fill` stamps inline `left/top/width/height` styles — centering/offsets must come from the wrapper div (e.g. `left-1/2 -translate-x-1/2`), never from classes on the `<Image>` itself.

## Quirks worth knowing

- **AGENTS.md managed block**: `experimental.agentFeedback: true` in `next.config.ts` makes `next dev` write/restore the block between the markers above. Don't delete it; commit it with your changes.
- **Tailwind v4 is CSS-first**: there is no `tailwind.config`. Theme lives in `src/app/globals.css` via `@import "tailwindcss"`, `tw-animate-css`, and `@import "shadcn/tailwind.css"` (the theme comes from the `shadcn` npm package). `next.config.ts` wires `*.css` to the `@tailwindcss/turbopack` loader — don't add a config file or PostCSS config.
- **shadcn style is `base-nova`** (`components.json`): UI primitives come from `@base-ui/react`, not Radix. Most primitives are already generated under `src/components/ui/` plus `src/hooks/use-mobile.ts`; follow the existing `button.tsx` pattern when adding more.
- **`cn` is the npm package**: components do `import { cn } from "cn"`; `src/lib/utils.ts` just re-exports it for the `@/lib/utils` shadcn alias.
- **React Compiler is on** (`reactCompiler: true` + `babel-plugin-react-compiler`); write idiomatic React and don't hand-add `memo`/`useMemo` for performance.
- **Typed route props**: layouts/pages use the global `LayoutProps<"/">` / `PageProps` types from Next 16 generated types instead of manually typed `children`/`params`. `tsconfig` maps `@/*` → `./src/*`.
