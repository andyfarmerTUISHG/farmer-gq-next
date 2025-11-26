# Technical Standards

This document defines the technical requirements and standards that apply to all features in this project.

## Code Quality Requirements

### ESLint Compliance

All generated code must adhere to the project's ESLint configuration:

- **Formatting**: 2-space indentation, semicolons required, double quotes
- **File naming**: kebab-case for all files (e.g., `article-card.tsx`, `google-analytics.tsx`)
- **TypeScript**: Use `type` instead of `interface` for type definitions
- **Imports**: Sorted using perfectionist/sort-imports rules
- **Environment variables**: Access via `env` module, not `process.env` directly (except `NEXT_PUBLIC_*` in client components)
- **Console statements**: Avoid console.log (warnings enabled)
- **React/TypeScript**: Follow Antfu ESLint config standards

### Validation Process

After generating any code files, always run ESLint with autofix:

```bash
npx eslint <files> --fix
```

## Language & Documentation

- **British English**: Use British spelling and terminology in all comments, documentation, and user-facing text
- **Code comments**: Clear, concise explanations where necessary
- **Minimal implementation**: Write only the code needed to meet requirements

## TypeScript Standards

- Strict mode compliant
- Explicit return types for exported functions
- No `any` types unless absolutely necessary
- Proper null/undefined handling

## Next.js Conventions

- App Router patterns (not Pages Router)
- Server Components by default
- Client Components only when necessary (use `'use client'` directive)
- Proper use of `async` components for data fetching
- Route groups in `app/(site)/` for public pages

## Sanity CMS Integration

- Schema definitions in `schema/` directory
- GROQ queries in `sanity/lib/queries.ts`
- Use Sanity Live Content API for data fetching
- Support Presentation Studio for visual editing

## Security Best Practices

- No hardcoded secrets or API keys
- Use environment variables for configuration
- Validate and sanitise user inputs
- Follow principle of least privilege

## Performance Considerations

- Optimise images using Next.js Image component
- Lazy load components where appropriate
- Minimise client-side JavaScript
- Use appropriate caching strategies

## Accessibility

- Semantic HTML elements
- Proper ARIA labels where needed
- Keyboard navigation support
- Sufficient colour contrast
