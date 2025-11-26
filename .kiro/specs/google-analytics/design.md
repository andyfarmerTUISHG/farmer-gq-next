# Design Document: Google Analytics 4 Integration

## Overview

This design implements Google Analytics 4 (GA4) tracking for the Next.js application with environment variable control. The implementation prioritises minimal code, performance, and privacy by default.

### Code Quality Standards

All generated code must adhere to the project's ESLint configuration:

- **Formatting**: 2-space indentation, semicolons required, double quotes
- **File naming**: kebab-case for all files (e.g., `google-analytics.tsx`)
- **TypeScript**: Use `type` instead of `interface` for type definitions
- **React/TypeScript**: Follow Antfu ESLint config standards
- **British English**: Comments and documentation

## Architecture

### Component Structure

```
GoogleAnalytics Component (Client-side)
├── Environment variable check
├── Early return if disabled
└── Script tags (gtag.js + config)
```

### Integration Point

```
Root Layout (app/layout.tsx)
├── Existing metadata and structure
└── GoogleAnalytics component (added to body)
```

## Design Decisions

### 1. Environment Variable Approach

**Decision**: Use `NEXT_PUBLIC_GA_MEASUREMENT_ID` with disabled-by-default behaviour

**Rationale**:
- `NEXT_PUBLIC_` prefix required for client-side access
- Empty/undefined = disabled ensures privacy by default
- Single variable keeps configuration simple
- No separate enable/disable flag needed

**Alternative considered**: Separate `NEXT_PUBLIC_GA_ENABLED` boolean
- Rejected: Adds unnecessary complexity; measurement ID presence is sufficient

### 2. Component Location

**Decision**: Create standalone `src/components/GoogleAnalytics.tsx`

**Rationale**:
- Reusable if needed elsewhere
- Clear separation of concerns
- Easy to locate and modify
- Follows existing component patterns

**Alternative considered**: Inline in layout.tsx
- Rejected: Reduces maintainability and testability

### 3. Script Loading Strategy

**Decision**: Use Next.js `<Script>` component with `afterInteractive` strategy

**Rationale**:
- Non-blocking: Scripts load after page becomes interactive
- Optimal performance: Doesn't delay First Contentful Paint
- Next.js optimised: Automatic deduplication and loading
- Standard practice for analytics

**Alternative considered**: `beforeInteractive` strategy
- Rejected: Blocks page rendering unnecessarily

### 4. Client vs Server Component

**Decision**: Client component with 'use client' directive

**Rationale**:
- GA4 requires browser APIs (window.dataLayer)
- Script execution needs client-side context
- Environment variable is public (NEXT_PUBLIC_)
- No server-side rendering benefit for analytics

### 5. Minimal Implementation

**Decision**: Single component, no wrapper functions or abstractions

**Rationale**:
- Requirement: "ABSOLUTE MINIMAL amount of code"
- GA4 auto-tracks page views via gtag config
- No custom event tracking required initially
- Can extend later if needed

**Not included**:
- Custom event tracking functions
- TypeScript declarations for gtag
- Analytics context providers
- Cookie consent integration (can be added separately)

## Implementation Details

### File Structure

```
src/
└── components/
    └── google-analytics.tsx    # New file

src/app/
└── layout.tsx                  # Modified

.env.local.example              # Modified
```

### Component Logic Flow

```
1. Check if NEXT_PUBLIC_GA_MEASUREMENT_ID exists
2. If not, return null (no render)
3. If yes, render two Script components:
   a. Load gtag.js from Google
   b. Initialise gtag with measurement ID
```

### Environment Variable

```bash
# .env.local.example
NEXT_PUBLIC_GA_MEASUREMENT_ID=  # Optional: G-XXXXXXXXXX
```

## Testing Approach

### Manual Testing

1. **Disabled state** (default):
   - Start app without environment variable
   - Verify no GA scripts in page source
   - Verify no network requests to google-analytics.com

2. **Enabled state**:
   - Set `NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX`
   - Restart dev server (required for NEXT_PUBLIC_ vars)
   - Verify scripts load in page source
   - Verify network requests to google-analytics.com
   - Check GA4 dashboard for real-time events

### Browser DevTools Verification

```javascript
// In browser console, check if gtag is loaded:
typeof gtag === 'function'  // Should be true when enabled
```

## Security Considerations

- Measurement ID is public (safe to expose client-side)
- No sensitive data in tracking calls
- No PII collected by default GA4 implementation
- Scripts loaded from official Google CDN

## Performance Impact

- **Disabled**: Zero impact (no scripts loaded)
- **Enabled**: ~17KB gzipped for gtag.js
- Loading strategy: Non-blocking (afterInteractive)
- No impact on Core Web Vitals when properly configured

## Future Enhancements (Out of Scope)

These are explicitly not included in the minimal implementation:

- Custom event tracking functions
- Cookie consent integration
- Enhanced measurement (scroll, outbound links)
- User ID tracking
- Custom dimensions/metrics
- Server-side tracking
- Analytics dashboard/reporting

## References

- [Next.js Script Optimization](https://nextjs.org/docs/app/building-your-application/optimizing/scripts)
- [GA4 Setup Guide](https://developers.google.com/analytics/devguides/collection/ga4)
- [gtag.js Reference](https://developers.google.com/tag-platform/gtagjs)
