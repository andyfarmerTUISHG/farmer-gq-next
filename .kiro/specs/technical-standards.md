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

## Testing Requirements

### Coverage Standards

- **New Features**: Minimum 80% coverage (lines, functions, branches, statements)
- **Existing Feature Changes**: 
  - Create basic test suite for existing functionality (if none exists)
  - New changes must have 80% coverage
- **Test Execution**: Must be fast (<5s for unit tests, <30s for full suite)
- **Test Clarity**: Clear test names, descriptive assertions, obvious failure messages

### Test Organisation

- **Location**: Tests colocated with source files (`component.tsx` → `component.test.tsx`)
- **Naming**: `*.test.ts` or `*.test.tsx`
- **Structure**: Arrange-Act-Assert pattern
- **Isolation**: Each test independent, no shared state

### Test Types

1. **Unit Tests**: Individual functions, components (80% of tests)
2. **Integration Tests**: Feature workflows, API interactions (15% of tests)
3. **E2E Tests**: Critical user journeys (5% of tests, future)

### Running Tests

```bash
# Run all tests
npm test

# Run with UI
npm run test:ui

# Run with coverage
npm run test:coverage

# Run specific feature tests
npm run test:auth
npm run test:films
npm run test:books

# Watch mode during development
npm run test:watch
npm run test:watch:auth
```

### Test Requirements

- Tests MUST execute actual source code functions (no implementation mocking)
- Tests MUST have clear, descriptive names following pattern: `should [expected behaviour] when [condition]`
- Tests MUST use Arrange-Act-Assert structure
- Tests MUST fail with clear, actionable error messages
- Tests MUST run in isolation (no dependencies between tests)
- Tests MUST be deterministic (same input = same output)

### Watch Mode Workflow

During feature development:
1. Open two terminals
2. Terminal 1: Development server (`npm run dev`)
3. Terminal 2: Test watch mode (`npm run test:watch:auth`)
4. Write test (Red) → Implement feature (Green) → Refactor → Repeat
5. Tests auto-run on file changes

### Coverage Reporting

After each task:
```bash
npm run test:coverage
```

Verify coverage meets 80% threshold. Coverage report available at `coverage/index.html`.

## Sanity CMS Testing

### What to Test

**Test YOUR integration code, not Sanity itself:**

1. **GROQ Query Strings** (Unit Tests)
   - Verify queries include required fields
   - Verify filter conditions are correct
   - Verify sort orders are specified
   - Example:
     ```typescript
     describe('watchedFilmsQuery', () => {
       it('should include required fields', () => {
         expect(watchedFilmsQuery).toContain('_id')
         expect(watchedFilmsQuery).toContain('title')
         expect(watchedFilmsQuery).toContain('dateWatched')
       })
       
       it('should filter by watched status', () => {
         expect(watchedFilmsQuery).toContain('status == "watched"')
       })
     })
     ```

2. **Data Transformation Functions** (Unit Tests)
   - Test functions that transform Sanity data to app format
   - Test validation functions for Sanity data
   - Example:
     ```typescript
     describe('transformFilmData', () => {
       it('should transform Sanity film to app format', () => {
         const sanityFilm = { _id: '123', title: 'Test' }
         const result = transformFilmData(sanityFilm)
         expect(result.id).toBe('123')
       })
     })
     ```

3. **Server Actions with Sanity** (Integration Tests with Mocks)
   - Test authorisation happens BEFORE Sanity calls
   - Test correct data is passed to Sanity client
   - Test error handling when Sanity operations fail
   - Example:
     ```typescript
     describe('markFilmAsWatchedAction', () => {
       it('should verify auth before calling Sanity', async () => {
         vi.mocked(auth).mockResolvedValueOnce(null)
         
         await markFilmAsWatchedAction(...)
         
         expect(client.patch).not.toHaveBeenCalled()
       })
       
       it('should call Sanity with correct data when authorised', async () => {
         vi.mocked(auth).mockResolvedValueOnce({ 
           user: { email: 'andy@example.com' }
         })
         
         const mockPatch = vi.fn().mockReturnValue({
           set: vi.fn().mockReturnValue({
             commit: vi.fn().mockResolvedValue({ _id: '123' }),
           }),
         })
         vi.mocked(client.patch).mockImplementation(mockPatch)
         
         await markFilmAsWatchedAction('123', ...)
         
         expect(mockPatch).toHaveBeenCalledWith('123')
       })
     })
     ```

### What NOT to Test

**Do not test Sanity's functionality:**
- ❌ Don't test if Sanity stores data correctly
- ❌ Don't test if GROQ queries execute properly
- ❌ Don't test Sanity's API endpoints
- ❌ Don't test Sanity Studio functionality
- ❌ Don't make real API calls to Sanity in tests

**Why?** Sanity tests their own product. Trust their implementation.

### Mocking Sanity Client

**Global mock setup in `vitest.setup.ts`:**

```typescript
import { vi } from 'vitest'

// Mock Sanity client
vi.mock('@/sanity/lib/client', () => ({
  client: {
    fetch: vi.fn(),
    patch: vi.fn(),
    create: vi.fn(),
    delete: vi.fn(),
  },
}))

// Mock Sanity Live Content API
vi.mock('@/sanity/lib/live', () => ({
  sanityFetch: vi.fn(),
}))
```

**Per-test mock implementation:**

```typescript
import { vi, beforeEach } from 'vitest'
import { client } from '@/sanity/lib/client'

describe('Film Actions', () => {
  beforeEach(() => {
    vi.clearAllMocks() // Reset mocks between tests
  })
  
  it('should create film in Sanity', async () => {
    // Arrange: Mock Sanity response
    const mockCreate = vi.fn().mockResolvedValue({ 
      _id: '123',
      title: 'Test Film' 
    })
    vi.mocked(client.create).mockImplementation(mockCreate)
    
    // Act: Call your function
    const result = await addFilmToWishlistAction(filmData)
    
    // Assert: Verify Sanity was called correctly
    expect(mockCreate).toHaveBeenCalledWith({
      _type: 'film',
      status: 'wishlist',
      ...filmData,
    })
    expect(result.success).toBe(true)
  })
})
```

### Testing Patterns

**Pattern 1: Authorisation Gate**
```typescript
it('should reject unauthorised requests before touching Sanity', async () => {
  // Mock: No session
  vi.mocked(auth).mockResolvedValueOnce(null)
  
  const result = await serverAction(...)
  
  // Assert: Sanity never called
  expect(result.success).toBe(false)
  expect(result.error).toContain('Unauthorized')
  expect(client.patch).not.toHaveBeenCalled()
})
```

**Pattern 2: Successful Operation**
```typescript
it('should perform Sanity operation when authorised', async () => {
  // Mock: Valid session
  vi.mocked(auth).mockResolvedValueOnce({ 
    user: { email: 'andy@example.com' }
  })
  
  // Mock: Sanity success
  const mockOperation = vi.fn().mockResolvedValue({ _id: '123' })
  vi.mocked(client.create).mockImplementation(mockOperation)
  
  const result = await serverAction(...)
  
  // Assert: Success
  expect(result.success).toBe(true)
  expect(mockOperation).toHaveBeenCalledWith(expectedData)
})
```

**Pattern 3: Sanity Error Handling**
```typescript
it('should handle Sanity errors gracefully', async () => {
  // Mock: Valid session
  vi.mocked(auth).mockResolvedValueOnce({ 
    user: { email: 'andy@example.com' }
  })
  
  // Mock: Sanity failure
  vi.mocked(client.patch).mockRejectedValueOnce(
    new Error('Sanity API error')
  )
  
  const result = await serverAction(...)
  
  // Assert: Error handled
  expect(result.success).toBe(false)
  expect(result.error).toContain('Failed to update')
})
```

### Coverage Requirements

**Sanity integration tests count toward 80% coverage:**
- Server actions with Sanity calls: 100% coverage required
- GROQ query strings: Basic validation tests required
- Data transformation functions: 100% coverage required

**Typical test count per Sanity integration:**
- 3-4 tests per server action (auth gate, success, error handling)
- 2-3 tests per GROQ query (field validation)
- 3-5 tests per data transformer (happy path + edge cases)

### Test Execution Speed

**Sanity integration tests with mocks are fast:**
- No real API calls (mocked)
- No network latency
- Execution time: <100ms per test
- Full suite with Sanity tests: <5s

### Best Practices

1. **Always mock Sanity client** - Never make real API calls in tests
2. **Test authorisation first** - Verify auth gates before Sanity operations
3. **Clear mocks between tests** - Use `beforeEach(() => vi.clearAllMocks())`
4. **Test error handling** - Mock Sanity failures and verify graceful handling
5. **Validate before Sanity** - Test that validation happens before API calls
6. **Keep tests fast** - Mocked tests should run in <100ms each
7. **Use descriptive test names** - Clearly state what's being tested and expected outcome

## Specification Management

### Supersession Process

When a new specification replaces or modifies an existing specification:

**1. New Specification Must Include:**
- Clear statement of what it supersedes
- Explanation of what changed and why
- Links to superseded specifications
- Effective date

**Example:**
```markdown
## Supersession Notice

This specification supersedes `.kiro/specs/films/requirements.md` for authentication aspects only.

**Superseded**: Sanity draft mode authentication  
**Replaced With**: Google OAuth with email whitelist  
**Effective Date**: 2026-03-09  
**Reason**: Improve mobile user experience

**What Remains Valid**: All non-authentication features (OMDb integration, data structure, etc.)
```

**2. Superseded Specification Must Include:**
- Warning notice at the top
- Links to new specification
- Clear indication of what's still valid vs superseded
- Date of supersession

**Example:**
```markdown
# Films Feature Specification

**Status**: Partially Superseded (see below)  
**Last Updated**: 2026-03-09

## ⚠️ Supersession Notice

**Authentication requirements superseded by**: [Google Authentication](.kiro/specs/google-auth/requirements.md)

**Still Valid**: ✅ OMDb integration, data structure, wrapped statistics  
**Superseded**: ❌ Sanity draft mode authentication  
**Effective**: 2026-03-09

For authentication implementation, see [Google Auth Specification](.kiro/specs/google-auth/requirements.md).

---

[Original specification continues below...]
```

**3. README.md Must Include:**
- Supersession relationships in specifications table
- Clear status indicators
- Links to both old and new specifications

**4. When to Use Supersession vs Update:**

**Use Supersession When:**
- Fundamental approach changes (e.g., authentication method)
- New specification covers different scope
- Historical context is valuable
- Multiple features affected

**Use Direct Update When:**
- Bug fixes or clarifications
- Adding new requirements to same feature
- Refining existing requirements
- No architectural changes

### Specification Status Values

Use these standard status values in specifications:

- **Active**: Current specification, fully implemented or in development
- **Partially Superseded**: Some requirements replaced by newer specification
- **Fully Superseded**: Entire specification replaced (keep for historical reference)
- **Deprecated**: No longer used, scheduled for removal
- **Draft**: Under review, not yet approved for implementation
- **Complete**: Fully implemented and stable

### Specification Versioning

When making significant changes to a specification:

1. Add version number to filename: `requirements-v2.md`
2. Keep previous version: `requirements-v1.md`
3. Add version history section to new version
4. Update README to point to latest version

**Example Version History:**
```markdown
## Version History

- **v2.0** (2026-03-09): Changed authentication from draft mode to Google OAuth
- **v1.0** (2025-11-15): Initial specification
```
