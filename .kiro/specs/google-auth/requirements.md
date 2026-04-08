# Google Authentication for Film & Book Management

**Status**: Active (In Development)  
**Created**: 2026-03-09  
**Last Updated**: 2026-03-09

## Supersession Notice

This specification supersedes `.kiro/specs/films/requirements.md` for authentication aspects only.

**Superseded**: 
- Sanity draft mode authentication for film management
- Draft mode visibility for book personal notes

**Replaced With**: 
- Google OAuth authentication via Better Auth
- Email whitelist authorisation via environment variable

**Effective Date**: 2026-03-09

**Reason**: Improve mobile user experience by replacing multi-step Sanity Studio authentication with single Google sign-in.

**What Remains Valid in Films Specification**:
- ✅ OMDb API integration
- ✅ Film data structure (wishlist/watched status)
- ✅ Wrapped statistics and year filtering
- ✅ Secret screenings functionality
- ✅ Cinema location tracking

**What is Superseded in Films Specification**:
- ❌ All references to "Sanity draft mode" for authentication
- ❌ `isDraftMode` prop usage in components
- ❌ Draft mode toast for film features

For non-authentication film features, refer to [Films Specification](.kiro/specs/films/requirements.md).

---

## Introduction

This specification defines the replacement of Sanity draft mode authentication with Google OAuth for film management and book personal notes viewing. The system provides mobile-friendly authentication with email-based authorisation.

## Glossary

- **Google OAuth**: Authentication method using Google accounts
- **Better Auth**: Authentication library for Next.js applications
- **Email Whitelist**: List of authorised email addresses stored in environment variable
- **JWT Session**: JSON Web Token-based session management
- **Protected Features**: Film management and personal notes requiring authentication
- **Authorisation**: Permission check after authentication (email whitelist)
- **Authentication**: Identity verification (Google sign-in)

## Requirements

### Requirement 1: Google OAuth Authentication

**User Story:** As a site owner, I want to sign in with my Google account to access film management features.

#### Acceptance Criteria

1. THE System SHALL use Better Auth for authentication
2. THE System SHALL support Google OAuth provider
3. THE System SHALL use cookie-based session strategy (JWE encrypted cookie, no database required)
4. THE System SHALL maintain sessions for 30 days with automatic refresh
5. THE System SHALL provide sign-in at `/auth/signin`
6. THE System SHALL provide API routes at `/api/auth/*`
7. THE System SHALL handle authentication errors gracefully

### Requirement 2: Email-Based Authorisation

**User Story:** As a site owner, I want to control who can access protected features using an email whitelist.

#### Acceptance Criteria

1. THE System SHALL read authorised emails from `AUTHORIZED_EMAILS` environment variable
2. THE System SHALL support comma-separated email list format
3. THE System SHALL perform case-insensitive email matching
4. THE System SHALL trim whitespace from email addresses
5. THE System SHALL reject sign-in attempts from non-whitelisted emails
6. THE System SHALL provide clear error messages for unauthorised access

### Requirement 3: Authentication UI Components

**User Story:** As a site owner, I want multiple ways to sign in for convenience on different devices.

#### Acceptance Criteria

1. THE System SHALL display auth button in site header
2. THE System SHALL show Google profile avatar when signed in
3. THE System SHALL provide sign-out functionality from avatar menu
4. THE System SHALL provide dedicated sign-in page at `/auth/signin`
5. THE System SHALL show auth prompt near wishlist when not signed in
6. THE System SHALL hide protected UI elements when not authenticated
7. THE System SHALL show loading states during authentication

### Requirement 4: Film Management Authentication

**User Story:** As a site owner, I want all film management features to require Google authentication instead of Sanity draft mode.

#### Acceptance Criteria

1. THE System SHALL require authentication to add films to wishlist
2. THE System SHALL require authentication to mark films as watched
3. THE System SHALL verify session before Sanity mutations
4. THE System SHALL show auth prompt when accessing protected features while not signed in
5. THE System SHALL remove all draft mode dependencies from film components
6. THE System SHALL maintain existing film functionality after auth implementation

### Requirement 5: Book Personal Notes Authentication

**User Story:** As a site owner, I want personal notes on books to be visible only when I'm signed in with Google.

#### Acceptance Criteria

1. THE System SHALL show personal notes only to authenticated users
2. THE System SHALL hide personal notes section when not authenticated
3. THE System SHALL replace draft mode checks with auth checks in book pages
4. THE System SHALL display visual indicator that notes are private
5. THE System SHALL apply same pattern to book chapter pages

### Requirement 6: Profile and Settings Page

**User Story:** As a site owner, I want a profile page where I can view my account information and manage settings in the future.

#### Acceptance Criteria

1. THE System SHALL provide profile page at `/profile`
2. THE System SHALL require authentication to access profile page
3. THE System SHALL display user's Google email and profile picture
4. THE System SHALL include placeholder sections for future settings
5. THE System SHALL provide link to profile from avatar dropdown menu

### Requirement 7: Documentation and Configuration

**User Story:** As a developer, I want clear documentation for setting up authentication locally and on Netlify.

#### Acceptance Criteria

1. THE System SHALL update `.env.local.example` with all auth variables
2. THE System SHALL include detailed comments for each environment variable
3. THE System SHALL document Google OAuth credential setup in README.md
4. THE System SHALL document Netlify environment variable configuration
5. THE System SHALL provide local testing instructions
6. THE System SHALL include troubleshooting guide

### Requirement 8: Testing Infrastructure

**User Story:** As a developer, I want comprehensive testing with clear standards and fast execution.

#### Acceptance Criteria

1. THE System SHALL use Vitest as test runner
2. THE System SHALL enforce 80% minimum test coverage for new code
3. THE System SHALL provide per-feature test running scripts
4. THE System SHALL support watch mode for active development
5. THE System SHALL execute full test suite in under 5 seconds
6. THE System SHALL mock Sanity client in tests (no real API calls)
7. THE System SHALL mock Better Auth in tests
8. THE System SHALL provide test coverage reporting

## Technical Requirements

All implementation must follow the standards defined in `.kiro/specs/technical-standards.md`, including:

- ESLint compliance with project configuration
- British English spelling and terminology
- TypeScript strict mode compliance
- Next.js App Router patterns
- Sanity CMS integration patterns (with mocked tests)
- Environment variable management
- Error handling and graceful degradation
- Testing standards (80% coverage, TDD approach)

## Environment Variables

```bash
# Google OAuth Configuration
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# Better Auth Configuration
# Generate secret: openssl rand -base64 32
BETTER_AUTH_SECRET="generate-with-openssl-rand-base64-32"
# Local: http://localhost:3000, Production: https://farmer-gq.netlify.app
# IMPORTANT: Do not wrap value in quotes in Netlify environment variables
BETTER_AUTH_URL=http://localhost:3000
NEXT_PUBLIC_BETTER_AUTH_URL=http://localhost:3000

# Authorisation - Comma-separated list of authorised email addresses
AUTHORIZED_EMAILS="andy@example.com,friend@example.com"
```

## Success Criteria

The feature will be considered successful when:

1. Users can sign in with Google OAuth from multiple entry points
2. Only whitelisted email addresses can access protected features
3. Film management requires authentication (add to wishlist, mark as watched)
4. Book personal notes visible only to authenticated users
5. Sessions persist across browser sessions with 30-day refresh
6. Avatar displays in header when signed in
7. Profile/settings page structure exists
8. Documentation is complete for local and Netlify setup
9. All code follows technical standards (ESLint, British English, TypeScript)
10. Draft mode removed from film and book features
11. Test coverage meets 80% minimum for all new code
12. Full test suite executes in under 5 seconds

## Related Specifications

- `.kiro/specs/technical-standards.md` - Technical requirements and testing standards
- `.kiro/specs/films/requirements.md` - Film feature requirements (non-auth aspects)
- `.kiro/specs/leadership-books/` - Book feature requirements
