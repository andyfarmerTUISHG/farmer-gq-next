# Next.js 16 Best Practices - Implementation Tasks

## 🔴 Critical Priority

### 1. Convert JS files to TypeScript

- [ ] Rename `app/(site)/page.js` → `app/(site)/page.tsx`
- [ ] Convert remaining `.js` files in components to `.tsx`
- [ ] Update imports to use proper TypeScript extensions

### 2. Enable TypeScript Strict Mode

- [ ] Update `tsconfig.json`: `"strict": true`
- [ ] Fix type errors that emerge from strict mode
- [ ] Add proper type annotations where needed

### 3. Fix Caching Strategy

- [ ] Remove `revalidate: 0` default in `sanity/loader/load-query.ts`
- [ ] Implement proper ISR: `revalidate = usingCdn ? 3600 : false`
- [ ] Add cache tags for better invalidation

### 4. Remove Development Artifacts

- [ ] Remove 3-second artificial delay in `loadProfile()`
- [ ] Clean up console.log statements
- [ ] Remove TODO comments or address them

## 🟡 High Priority

### 5. Add Error Boundaries & Loading States

- [ ] Create error boundaries for async components
- [ ] Add `loading.tsx` files for routes with data fetching
- [ ] Implement proper error handling in API routes

### 6. Enable React Compiler

- [ ] Add `reactCompiler: true` to `next.config.ts` experimental features
- [ ] Test components for React Compiler compatibility
- [ ] Remove manual memoization where React Compiler handles it

### 7. Modernize Metadata API

- [ ] Replace static metadata objects with `generateMetadata()` functions
- [ ] Add dynamic metadata for article pages
- [ ] Implement proper OpenGraph and Twitter cards

## 🟢 Medium Priority

### 8. Optimize Performance

- [ ] Add `generateStaticParams` for dynamic routes
- [ ] Implement proper image optimization settings
- [ ] Add bundle analyzer to identify optimization opportunities

### 9. Improve Code Quality

- [ ] Fix ESLint import sorting violations
- [ ] Ensure consistent file naming (kebab-case)
- [ ] Add proper TypeScript interfaces for all props

### 10. Security & Best Practices

- [ ] Review and update Content Security Policy
- [ ] Implement proper environment variable validation
- [ ] Add rate limiting to API routes

## 🔵 Low Priority

### 11. Developer Experience

- [ ] Add pre-commit hooks for type checking
- [ ] Set up proper VS Code workspace settings
- [ ] Add development documentation

### 12. Testing Setup

- [ ] Add Jest and React Testing Library
- [ ] Create component tests for critical components
- [ ] Add E2E tests for key user flows

### 13. Monitoring & Analytics

- [ ] Add performance monitoring
- [ ] Implement error tracking
- [ ] Set up analytics for user behavior

## 📋 Verification Checklist

After completing tasks, verify:

- [ ] `npm run build` succeeds without warnings
- [ ] `npm run type-check` passes
- [ ] `npm run lint` passes
- [ ] All pages load correctly in production build
- [ ] Lighthouse scores remain high
- [ ] No console errors in browser

---

fix(env): implement @t3-oss/env-nextjs validation and resolve build issues

Environment Configuration:

- app/(site)/env/client.ts: NEW - Client-side environment validation with NEXT*PUBLIC*\* variables
- app/(site)/env/server.ts: NEW - Server-side environment validation with all backend variables
- app/(site)/env/index.ts: NEW - Combined environment export merging client and server configs

Build & Configuration Fixes:

- sanity.cli.ts: Bypass env validation by using process.env directly to fix CLI build errors
- sanity/lib/api.ts: Update imports to use new centralized env configuration
- sanity/lib/token.ts: Update imports to use new centralized env configuration
- sanity/lib/sanity.client.ts: Update imports to use new centralized env configuration
- next.config.ts → next.config.mjs: Rename and update configuration format

Cleanup & Maintenance:

- sanity/lib/documentActions.js: DELETED - Unused file, replaced by update-timestamp.js actions
- sanity/components/TimestampInput.jsx: DELETED - Unused component

Development & Testing:

- app/(site)/zod-test/page.tsx: NEW - Test page for environment validation
- package.json & package-lock.json: Updated dependencies for @t3-oss/env-nextjs
- farmer-gq-next.code-workspace: Updated workspace configuration

Page Updates:

- app/(site)/about/page.js: Updated imports for new env structure
- app/(site)/articles/page.tsx: Updated imports for new env structure

Key Changes:

- Implemented type-safe environment variable validation using @t3-oss/env-nextjs
- Fixed build pipeline issues with Sanity CLI environment access
- Centralized environment configuration with proper client/server separation
- Added ESLint suppressions for necessary process.env usage
- Removed unused legacy files and components
