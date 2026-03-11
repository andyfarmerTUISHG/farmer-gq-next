# Google Authentication - Implementation Tasks

**Feature**: Google Authentication for Film & Book Management  
**Specification**: `requirements.md`  
**Approach**: Test-Driven Development (TDD) with 80% minimum coverage

## Task Overview

Each task follows this structure:
1. **TDD Workflow**: Red-Green-Refactor cycle with watch mode
2. **Implementation**: Minimal code to meet requirements
3. **Testing**: Comprehensive tests with Sanity mocking
4. **Coverage Verification**: 80%+ coverage before commit
5. **Conventional Commit**: Clear commit message with test metrics
6. **Demo**: Working functionality to demonstrate

## Task 0: Set up Testing Infrastructure

**Objective**: Establish Vitest testing framework with coverage enforcement and per-feature test running.

**TDD Workflow:**
1. Install Vitest and testing dependencies
2. Configure coverage thresholds (80% minimum)
3. Set up global mocks (Sanity, NextAuth)
4. Create test helper scripts
5. Write setup validation test
6. Document testing approach

**Implementation:**
- Install dependencies: `vitest`, `@vitest/ui`, `@testing-library/react`, `@testing-library/jest-dom`, `jsdom`, `@vitest/coverage-v8`
- Create `vitest.config.ts` with jsdom environment and coverage thresholds
- Create `vitest.setup.ts` with Sanity and NextAuth mocks
- Add test scripts to `package.json`:
  - `test`: Run all tests
  - `test:ui`: Run with UI
  - `test:coverage`: Run with coverage report
  - `test:auth`: Run auth tests only
  - `test:films`: Run film tests only
  - `test:books`: Run book tests only
  - `test:watch`: Watch mode
  - `test:watch:auth`: Watch auth tests
  - `test:watch:films`: Watch film tests
- Update `.kiro/specs/technical-standards.md` with testing section
- Update README.md with testing documentation

**Test Requirements:**
- 1 setup validation test
- Verify Vitest configuration works
- Verify mocks are loaded

**Coverage Target**: N/A (infrastructure setup)

**Commit Message Format:**
```
chore(test): set up testing infrastructure with Vitest

- Install Vitest and testing dependencies
- Configure coverage thresholds (80% minimum)
- Add test scripts to package.json for per-feature testing
- Create vitest.config.ts with jsdom environment
- Add Sanity and NextAuth global mocks to vitest.setup.ts
- Add testing standards to technical-standards.md
- Document testing workflow in README.md

Tests: 1 passing (setup validation)
Coverage: Infrastructure ready
Execution time: 0.2s

Refs: #test-infrastructure
```

**Demo**: Run `npm test`, `npm run test:ui`, `npm run test:coverage` - all work correctly

---

## Task 1: Email Authorisation Logic (TDD)

**Objective**: Create and test email authorisation helper functions with 100% coverage.

**TDD Workflow:**
1. Terminal 1: `npm run dev`
2. Terminal 2: `npm run test:watch:auth`
3. Red: Create `lib/auth-helpers.test.ts` with 11 tests
4. Watch tests fail (functions don't exist)
5. Green: Create `lib/auth-helpers.ts` with minimal implementation
6. Watch tests pass
7. Refactor: Add JSDoc comments, edge case handling
8. Verify: `npm run test:coverage`

**Implementation:**
- Install `next-auth@beta`
- Create `lib/auth-helpers.ts`:
  - `isEmailAuthorized(email, whitelist)`: Check if email is in whitelist
  - `getAuthorizedEmails(emailString)`: Parse comma-separated emails
- Create `lib/auth-helpers.test.ts` with 11 tests:
  - 6 tests for `isEmailAuthorized` (whitelist match, non-match, case-insensitive, whitespace, empty email, empty whitelist)
  - 5 tests for `getAuthorizedEmails` (parse, trim, empty string, filter empty, lowercase)
- Create `auth.ts` configuration scaffold
- Update `.env.local.example` with auth variables

**Test Requirements:**
- 11 tests total
- 100% coverage for auth-helpers.ts
- Execution time: <1s

**Coverage Target**: 100% for `lib/auth-helpers.ts`

**Commit Message Format:**
```
feat(auth): add email authorisation logic with TDD

- Implement isEmailAuthorized() with 6 comprehensive tests
- Add getAuthorizedEmails() to parse env variable with 5 tests
- Install next-auth@beta dependencies
- Create auth configuration scaffold
- Update .env.local.example with auth variables

Tests: 11 passing (12 total)
Coverage: 100% for auth-helpers.ts (exceeds 80% requirement)
Execution time: 0.8s

BREAKING CHANGE: None (new feature)

Refs: #auth-logic
```

**Demo**: Run `npm run test:auth` (all pass), call functions in Node REPL

---

## Task 2: NextAuth.js Configuration (TDD)

**Objective**: Configure NextAuth.js with Google OAuth provider and authorisation callback.

**TDD Workflow:**
1. Terminal 2: Keep `npm run test:watch:auth` running
2. Red: Create `auth.test.ts` with configuration tests
3. Green: Complete `auth.ts` with Google provider
4. Refactor: Use `isEmailAuthorized()` in callback
5. Red: Create API route tests
6. Green: Create `app/api/auth/[...nextauth]/route.ts`
7. Verify: `npm run test:coverage`

**Implementation:**
- Complete `auth.ts`:
  - Add Google provider with client ID/secret from env
  - Implement `signIn` callback using `isEmailAuthorized()`
  - Configure JWT session with 30-day expiry
- Create `app/api/auth/[...nextauth]/route.ts` with handlers
- Add TypeScript types in `types/next-auth.d.ts`

**Test Requirements:**
- 8 tests total (configuration + integration)
- 85%+ coverage for auth.ts
- Execution time: <1.5s

**Coverage Target**: 85% for `auth.ts`

**Commit Message Format:**
```
feat(auth): configure NextAuth.js with Google OAuth

- Add Google OAuth provider configuration
- Implement authorisation callback with email whitelist
- Create API route handlers for auth endpoints
- Configure JWT sessions with 30-day expiry
- Add TypeScript types for session and user

Tests: 8 passing (20 total)
Coverage: 85% for auth.ts (meets 80% requirement)
Execution time: 1.2s
Integration: Google OAuth flow functional

Refs: #auth-setup
```

**Demo**: Navigate to `/api/auth/signin`, see Google sign-in option

---

## Task 3: Authentication UI Components (TDD)

**Objective**: Create auth button, avatar, and sign-in page with comprehensive tests.

**TDD Workflow:**
1. Terminal 2: `npm run test:watch:auth`
2. Red: Write tests for `useAuth()` hook
3. Green: Implement hook
4. Red: Write tests for `AuthButton` component
5. Green: Implement `AuthButton`
6. Refactor: Extract `UserAvatar` component
7. Red: Write tests for sign-in page
8. Green: Implement sign-in page
9. Verify: `npm run test:coverage`

**Implementation:**
- Create `hooks/use-auth.ts`: Wrapper for `useSession()`
- Create `components/auth/auth-button.tsx`: Sign-in button or avatar
- Create `components/auth/user-avatar.tsx`: Display Google profile picture
- Create `app/(site)/auth/signin/page.tsx`: Dedicated sign-in page
- Add `AuthButton` to header in `app/(site)/layout.tsx`

**Test Requirements:**
- 15 tests total (hook + components + page)
- 90%+ coverage for auth components
- Execution time: <2s

**Coverage Target**: 90% for auth components

**Commit Message Format:**
```
feat(auth): add authentication UI components

- Create useAuth() hook with comprehensive tests
- Implement AuthButton component with avatar display
- Add UserAvatar presentational component
- Create sign-in page at /auth/signin
- Integrate auth button into header layout

Tests: 15 passing (35 total)
Coverage: 93% for auth components (exceeds 80% requirement)
Execution time: 1.5s
Components: Fully tested with React Testing Library

Refs: #auth-ui
```

**Demo**: View header (sign-in button), authenticate, see avatar with sign-out

---

## Task 4: Film Wishlist Authentication (TDD + Sanity Integration)

**Objective**: Require authentication for adding films to wishlist with Sanity integration tests.

**TDD Workflow:**
1. Terminal 2: `npm run test:watch:films`
2. Red: Write tests for `add-film-form.tsx` auth checks
3. Green: Add auth check to component
4. Refactor: Extract reusable `AuthPrompt` component
5. Red: Write tests for server action with Sanity mocking
6. Green: Add session verification to `addFilmToWishlistAction()`
7. Refactor: Extract `verifySession()` helper
8. Verify: `npm run test:coverage`

**Implementation:**
- Update `add-film-form.tsx`: Check auth, show prompt if not signed in
- Create `components/auth/auth-prompt.tsx`: Reusable auth prompt
- Create `lib/verify-session.ts`: Session verification helper
- Update `addFilmToWishlistAction()`: Verify session before Sanity call
- Update `wishlist-content.tsx`: Add auth button near wishlist
- Remove `isDraftMode` props from film components

**Test Requirements:**
- 18 tests total (component + server action + Sanity integration)
- Include 3 Sanity integration tests:
  - Reject when not authenticated (Sanity not called)
  - Reject when email not whitelisted (Sanity not called)
  - Create film when authorised (Sanity called correctly)
- 95%+ coverage for film actions
- Execution time: <2s

**Sanity Integration Test Pattern:**
```typescript
describe('addFilmToWishlistAction - Sanity Integration', () => {
  it('should reject when not authenticated', async () => {
    vi.mocked(auth).mockResolvedValueOnce(null)
    await addFilmToWishlistAction(filmData)
    expect(client.create).not.toHaveBeenCalled()
  })
  
  it('should create film when authorised', async () => {
    vi.mocked(auth).mockResolvedValueOnce({ 
      user: { email: 'andy@example.com' }
    })
    const mockCreate = vi.fn().mockResolvedValue({ _id: '123' })
    vi.mocked(client.create).mockImplementation(mockCreate)
    
    await addFilmToWishlistAction(filmData)
    
    expect(mockCreate).toHaveBeenCalledWith({
      _type: 'film',
      status: 'wishlist',
      ...filmData,
    })
  })
  
  it('should handle Sanity errors gracefully', async () => {
    vi.mocked(auth).mockResolvedValueOnce({ 
      user: { email: 'andy@example.com' }
    })
    vi.mocked(client.create).mockRejectedValueOnce(new Error('API error'))
    
    const result = await addFilmToWishlistAction(filmData)
    
    expect(result.success).toBe(false)
  })
})
```

**Coverage Target**: 95% for film actions

**Commit Message Format:**
```
feat(films): add authentication to wishlist management

- Require authentication for adding films to wishlist
- Create reusable AuthPrompt component
- Add session verification to film server actions
- Implement verifySession() helper with tests
- Add Sanity integration tests (auth gate + success + error)
- Add auth button to wishlist page
- Remove draft mode dependencies from film components

Tests: 18 passing (53 total)
Coverage: 95% for film actions (exceeds 80% requirement)
Execution time: 1.8s

BREAKING CHANGE: Film management now requires Google Auth instead of Sanity draft mode

Refs: #films-auth
```

**Demo**: Sign out, try to add film (auth prompt), sign in, add film successfully

---

## Task 5: Mark-as-Watched Authentication (TDD + Sanity Integration)

**Objective**: Require authentication for marking films as watched with Sanity integration tests.

**TDD Workflow:**
1. Terminal 2: `npm run test:watch:films`
2. Red: Write tests for `mark-as-watched-form.tsx` auth checks
3. Green: Add auth check to component
4. Refactor: Reuse `AuthPrompt` from Task 4
5. Red: Write tests for `markFilmAsWatchedAction()` with Sanity mocking
6. Green: Add session verification using `verifySession()`
7. Verify: `npm run test:coverage`

**Implementation:**
- Update `mark-as-watched-form.tsx`: Check auth, show prompt if not signed in
- Add session verification to `markFilmAsWatchedAction()`
- Update `wishlist-content.tsx`: Show mark-as-watched only when authenticated
- Remove remaining `isDraftMode` checks from film components

**Test Requirements:**
- 12 tests total (component + server action + Sanity integration)
- Include 3 Sanity integration tests:
  - Reject when not authenticated (Sanity not called)
  - Update film when authorised (Sanity called correctly)
  - Handle Sanity errors gracefully
- 96%+ coverage for film actions
- Execution time: <2s

**Coverage Target**: 96% for film actions

**Commit Message Format:**
```
feat(films): add authentication to mark-as-watched

- Require authentication for marking films as watched
- Add session verification to markFilmAsWatchedAction
- Reuse AuthPrompt component for consistency
- Add Sanity integration tests (auth gate + success + error)
- Remove remaining draft mode checks from film features

Tests: 12 passing (65 total)
Coverage: 96% for film actions (exceeds 80% requirement)
Execution time: 1.8s

Refs: #films-auth
```

**Demo**: Sign in, mark film as watched with all details, verify it appears in watched list

---

## Task 6: Book Personal Notes Authentication (TDD)

**Objective**: Show personal notes only to authenticated users, replacing draft mode.

**TDD Workflow:**
1. Terminal 2: `npm run test:watch:books`
2. Red: Write tests for book detail page - notes should show only when authenticated
3. Green: Replace `isDraftMode` check with auth check
4. Refactor: Extract auth check to server helper
5. Red: Write tests for chapter pages with personal notes
6. Green: Update chapter pages with auth checks
7. Verify: `npm run test:coverage`

**Implementation:**
- Update `app/(site)/books/[slug]/page.tsx`: Check auth instead of draft mode
- Update `app/(site)/books/[slug]/chapters/[chapterSlug]/page.tsx`: Check auth
- Replace draft mode styling with auth-based styling
- Add visual indicator that notes are private
- Update book tests to use auth mocks instead of draft mode mocks

**Test Requirements:**
- 10 tests total (book page + chapter page + auth checks)
- 94%+ coverage for book pages
- Execution time: <1.5s

**Coverage Target**: 94% for book pages

**Commit Message Format:**
```
feat(books): add authentication to personal notes

- Replace draft mode with Google Auth for personal notes
- Update book detail and chapter pages with auth checks
- Add "Private notes" visual indicator
- Update tests to use auth mocks instead of draft mode
- Maintain existing note display functionality

Tests: 10 passing (75 total)
Coverage: 94% for book pages (exceeds 80% requirement)
Execution time: 1.3s

BREAKING CHANGE: Book personal notes now require Google Auth instead of Sanity draft mode

Refs: #books-auth
```

**Demo**: View book signed out (no notes), sign in (notes appear with "Private" indicator)

---

## Task 7: Profile/Settings Page (TDD)

**Objective**: Create protected profile page with user information and settings structure.

**TDD Workflow:**
1. Terminal 2: `npm run test:watch:auth`
2. Red: Write tests for profile page - should require authentication
3. Green: Create protected route with auth check
4. Refactor: Extract auth protection pattern
5. Red: Write tests for profile display - should show user info
6. Green: Implement profile page with user data
7. Verify: `npm run test:coverage`

**Implementation:**
- Create `app/(site)/profile/page.tsx` with auth protection
- Display user email and Google profile picture
- Add placeholder sections for future settings:
  - Default cinema location
  - Notification preferences
  - Display preferences
- Add profile link to avatar dropdown menu
- Create `components/profile/` directory structure

**Test Requirements:**
- 8 tests total (auth protection + display + navigation)
- 100% coverage for profile page
- Execution time: <1s

**Coverage Target**: 100% for profile page

**Commit Message Format:**
```
feat(profile): add user profile and settings page

- Create protected profile page at /profile
- Display user email and Google profile picture
- Add settings page structure for future expansion
- Add profile link to avatar dropdown menu
- Implement route protection with auth check

Tests: 8 passing (83 total)
Coverage: 100% for profile page (exceeds 80% requirement)
Execution time: 0.9s

Refs: #profile-settings
```

**Demo**: Click avatar, select "Profile", view user information and settings placeholders

---

## Task 8: Documentation and Environment Configuration

**Objective**: Complete documentation for local and Netlify setup with clear instructions.

**Implementation:**
- Update `.env.local.example` with all auth variables and detailed comments
- Update README.md with "Authentication Setup" section:
  - Google OAuth credentials setup
  - Local environment configuration
  - Netlify deployment instructions
  - Testing authentication steps
  - Troubleshooting guide
- Add "Testing" section to README (from Task 0)
- Create `.kiro/specs/google-auth/requirements.md` (this file)
- Create `.kiro/specs/google-auth/tasks.md` (this file)
- Add supersession notice to `.kiro/specs/films/requirements.md`
- Update README specifications table
- Update `.kiro/specs/technical-standards.md` with testing and supersession sections

**Test Requirements:**
- No automated tests (documentation task)
- Manual validation: Follow documentation to set up auth from scratch

**Validation Checklist:**
- ✅ Can create Google OAuth credentials
- ✅ Can configure local environment
- ✅ Can test authentication flow
- ✅ Can deploy to Netlify with env vars
- ✅ All links and references work
- ✅ Troubleshooting guide is helpful

**Commit Message Format:**
```
docs(auth): add comprehensive authentication setup guide

- Update .env.local.example with auth variables and detailed comments
- Add "Authentication Setup" section to README.md
- Document Google OAuth credential creation process
- Add Netlify environment variable configuration steps
- Create google-auth specification in .kiro/specs/
- Add supersession notice to films specification
- Update README specifications table with supersession relationships
- Add testing documentation to README
- Update technical-standards.md with testing and supersession sections

Validation: Manual setup tested successfully

Refs: #auth-docs
```

**Demo**: Follow documentation to set up auth on fresh clone, verify all steps work

---

## Task 9: Clean Up Draft Mode Dependencies and Finalise (TDD)

**Objective**: Remove all draft mode dependencies from films and books, run full test suite, ensure ESLint compliance.

**TDD Workflow:**
1. Terminal 2: `npm run test:watch`
2. Red: Write integration tests for complete auth flow
3. Green: Verify all features work end-to-end
4. Refactor: Remove unused code, update remaining tests
5. Verify: `npm run test:coverage` (full suite)
6. Run: `npx eslint . --fix`

**Implementation:**
- Remove `isDraftMode` props from all film and book components
- Update or remove draft mode tests for films and books
- Clean up unused imports (`draftMode` from `next/headers`)
- Verify Sanity Studio draft mode still works for other features (articles)
- Run full test suite and verify all pass
- Run ESLint with autofix across all modified files
- Verify British English spelling throughout

**Test Requirements:**
- 10 integration tests (complete workflows)
- Full test suite: 95+ tests passing
- Coverage: 94%+ overall
- Execution time: <5s for full suite
- ESLint: 0 errors, 0 warnings

**Integration Tests:**
```typescript
// __tests__/integration/auth-flow.test.ts
describe('Complete Auth Flow', () => {
  it('should complete film workflow: sign in → add film → mark watched', async () => {
    // Test complete user journey
  })
  
  it('should show book notes only when authenticated', async () => {
    // Test book auth flow
  })
  
  it('should reject unauthorised users at all entry points', async () => {
    // Test authorisation enforcement
  })
})
```

**Coverage Target**: 94% overall

**Commit Message Format:**
```
refactor(auth): remove draft mode dependencies and finalise

- Remove isDraftMode props from film and book components
- Update tests to use auth mocks consistently
- Clean up unused draft mode imports
- Add integration tests for complete auth flow
- Verify Sanity Studio draft mode works for other features
- Run ESLint autofix across all modified files
- Verify British English spelling throughout

Tests: 95 passing (95 total)
Coverage: 94% overall (exceeds 80% requirement)
Execution time: 4.8s
ESLint: 0 errors, 0 warnings

BREAKING CHANGE: Draft mode no longer used for films and books

Refs: #auth-cleanup
Closes: #google-auth-implementation
```

**Demo**: Complete end-to-end workflow: sign in → add film → mark as watched → view book notes → sign out

---

## Testing Standards Summary

**Every Task Must:**
- ✅ Use watch mode during development (`npm run test:watch:*`)
- ✅ Achieve 80%+ coverage before commit
- ✅ Execute tests in <2s per task
- ✅ Include Sanity integration tests where applicable
- ✅ Mock Sanity client (no real API calls)
- ✅ Follow Arrange-Act-Assert pattern
- ✅ Have clear, descriptive test names
- ✅ Include coverage metrics in commit message

**Sanity Integration Test Pattern:**
```typescript
describe('serverAction - Sanity Integration', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })
  
  it('should reject when not authenticated', async () => {
    vi.mocked(auth).mockResolvedValueOnce(null)
    await serverAction(...)
    expect(client.operation).not.toHaveBeenCalled()
  })
  
  it('should call Sanity when authorised', async () => {
    vi.mocked(auth).mockResolvedValueOnce({ 
      user: { email: 'andy@example.com' }
    })
    const mockOperation = vi.fn().mockResolvedValue({ _id: '123' })
    vi.mocked(client.operation).mockImplementation(mockOperation)
    
    await serverAction(...)
    
    expect(mockOperation).toHaveBeenCalledWith(expectedData)
  })
  
  it('should handle Sanity errors gracefully', async () => {
    vi.mocked(auth).mockResolvedValueOnce({ 
      user: { email: 'andy@example.com' }
    })
    vi.mocked(client.operation).mockRejectedValueOnce(new Error('API error'))
    
    const result = await serverAction(...)
    
    expect(result.success).toBe(false)
  })
})
```

## Summary

**Total Estimated Time**: 13-14 hours

**Test Coverage**: 95 tests, 94% coverage, <5s execution

**Files to Create/Update**: ~25 files

**Key Deliverables**:
- Complete authentication system with Google OAuth
- Comprehensive test suite with Sanity integration tests
- Full documentation for setup and deployment
- Clean removal of draft mode dependencies
