# Implementation Plan: Google Analytics 4 Integration

## Overview
Implement GA4 tracking with environment variable control, following minimal implementation principles and project code style standards.

## Tasks

- [ ] 1. Create GoogleAnalytics component
  - Create `app/components/google-analytics.tsx` file
  - Implement client-side component with 'use client' directive
  - Check for `NEXT_PUBLIC_GA_MEASUREMENT_ID` environment variable
  - Return null if measurement ID is not provided
  - Use Next.js `<Script>` component with `afterInteractive` strategy
  - Load gtag.js script from Google CDN
  - Initialize gtag with measurement ID and config
  - Follow ESLint conventions: kebab-case filename, 2-space indent, double quotes, semicolons
  - Use TypeScript `type` instead of `interface` for type definitions
  - _Requirements: Functional 1, 2, 3; Technical 1, 2; Non-Functional 1, 2_

- [ ] 2. Integrate GoogleAnalytics into root layout
  - Modify `app/(site)/layout.tsx` to import GoogleAnalytics component
  - Add GoogleAnalytics component inside `<body>` tag (after existing content)
  - Ensure component is placed where it won't interfere with existing structure
  - _Requirements: Functional 2; Technical 1_

- [ ] 3. Document environment variable
  - Update `.env.local.example` to include `NEXT_PUBLIC_GA_MEASUREMENT_ID`
  - Add comment explaining the variable is optional and format (G-XXXXXXXXXX)
  - Use British English in documentation
  - _Requirements: Technical 1; Non-Functional 1_

- [ ] 4. Run ESLint auto-fix and verify code quality
  - Run `npx eslint app/components/google-analytics.tsx app/(site)/layout.tsx --fix`
  - Verify no ESLint errors or warnings remain
  - Verify no TypeScript errors with `npx tsc --noEmit`
  - _Requirements: Non-Functional 1_

- [ ] 5. Manual verification checkpoint
  - Test with `NEXT_PUBLIC_GA_MEASUREMENT_ID` not set (scripts should not load)
  - Test with `NEXT_PUBLIC_GA_MEASUREMENT_ID` set to valid measurement ID (scripts should load)
  - Verify scripts use `afterInteractive` strategy in browser DevTools
  - Check browser console for `typeof gtag === 'function'` when enabled
  - _Requirements: Functional 1, 2, 3; Acceptance Criteria all items_

## Notes

- Component location: `app/components/` (not `src/components/` as mentioned in design - project uses `app/` structure)
- No custom event tracking or abstractions needed for minimal implementation
- GA4 auto-tracks page views via gtag config
- Environment variable changes require dev server restart
- Manual GA4 dashboard verification is out of scope for automated testing
