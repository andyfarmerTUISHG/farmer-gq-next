# Specification: Google Analytics 4 Integration

## Overview

Add Google Analytics 4 (GA4) tracking to the Next.js application with environment variable control.

## Requirements

### Functional Requirements

1. **Environment Variable Control**
   - Environment variable: `NEXT_PUBLIC_GA_MEASUREMENT_ID`
   - Default behaviour: GA4 disabled when variable is not set or empty
   - When set with valid measurement ID: GA4 enabled

2. **GA4 Implementation**
   - Use Next.js Script component for optimal loading
   - Load GA4 scripts on all pages
   - Initialise gtag with measurement ID
   - Track page views automatically

3. **Privacy & Performance**
   - Scripts should not block page rendering
   - Only load in production or when explicitly enabled
   - No tracking in development unless measurement ID is set

### Technical Requirements

1. **Files to Create/Modify**
   - Create: `src/components/GoogleAnalytics.tsx` - GA4 component
   - Modify: `src/app/layout.tsx` - Add GA4 component to root layout
   - Modify: `.env.local.example` - Document the environment variable

2. **Implementation Details**
   - Component should be client-side only (use 'use client')
   - Return null if measurement ID is not provided
   - Use Next.js `<Script>` component with `afterInteractive` strategy
   - Follow project's TypeScript and ESLint conventions

### Non-Functional Requirements

1. **Code Quality**
   - Minimal implementation (no unnecessary abstractions)
   - TypeScript strict mode compliant
   - ESLint compliant (auto-fix after generation)
   - British English in comments and documentation

2. **Security**
   - Use `NEXT_PUBLIC_` prefix for client-side environment variable
   - No sensitive data in tracking calls

## Acceptance Criteria

- [ ] When `NEXT_PUBLIC_GA_MEASUREMENT_ID` is not set, no GA4 scripts load
- [ ] When `NEXT_PUBLIC_GA_MEASUREMENT_ID` is set, GA4 scripts load correctly
- [ ] GA4 tracking appears in Google Analytics dashboard (manual verification)
- [ ] No ESLint errors or warnings
- [ ] No TypeScript errors
- [ ] Scripts load with `afterInteractive` strategy (non-blocking)
- [ ] Environment variable documented in `.env.local.example`

## Implementation Plan

1. Create `GoogleAnalytics` component
2. Add component to root layout
3. Update environment variable example file
4. Run ESLint auto-fix
5. Test with and without environment variable set

## References

- [Next.js Script Component](https://nextjs.org/docs/app/api-reference/components/script)
- [Google Analytics 4 Setup](https://developers.google.com/analytics/devguides/collection/ga4)
