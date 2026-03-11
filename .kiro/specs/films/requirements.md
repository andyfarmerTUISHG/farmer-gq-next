# Films Feature Specification

**Status**: Partially Superseded (see below)  
**Last Updated**: 2026-03-09

## ⚠️ Supersession Notice

**Authentication requirements in this specification have been superseded by:**
- [Google Authentication Specification](../google-auth/requirements.md)

**Still Valid**: 
- ✅ OMDb API integration and film metadata
- ✅ Film data structure (wishlist/watched status)
- ✅ Wrapped statistics and year filtering
- ✅ Secret screenings functionality
- ✅ Cinema location tracking
- ✅ Film display and navigation

**Superseded**: 
- ❌ All authentication requirements (Requirement 3, 4 authentication aspects)
- ❌ References to "Sanity draft mode"
- ❌ "authenticated with Sanity" language
- ❌ Draft mode UI patterns

**Effective Date**: 2026-03-09

**For authentication implementation, refer to:**
- [Google Auth Requirements](../google-auth/requirements.md)
- [Google Auth Tasks](../google-auth/tasks.md)

**Migration Impact:**
- Film management now requires Google OAuth instead of Sanity Studio access
- `isDraftMode` props replaced with auth session checks
- Mobile experience significantly improved

---

# Requirements Document

## Introduction

This feature enables the site owner to track films watched using their Cineworld Unlimited pass. The system uses OMDb API integration for automated metadata capture, supports a wishlist-to-watched workflow, and provides annual "wrapped" statistics similar to Spotify Wrapped.

## Glossary

- **Film Tracking System**: The complete feature set for managing film wishlist and viewing history
- **Film Entry**: A single document representing a film with metadata and viewing status
- **Wishlist Status**: Films added but not yet watched
- **Watched Status**: Films that have been viewed at the cinema
- **OMDb API**: Open Movie Database API for fetching film metadata
- **Film API Abstraction**: Service layer allowing swappable film data providers
- **Fuzzy Search**: Approximate matching for film titles during search
- **Wrapped Page**: Annual statistics page showing viewing patterns and insights
- **Cineworld Unlimited**: Cinema subscription pass for unlimited film viewing
- **Viewing Details**: Personal data about when and where a film was watched
- **Secret Screening**: A special cinema event where the film is not revealed until attendance
- **Wait Time**: Days between adding to wishlist and watching the film

## Requirements

### Requirement 1: Core Data Structure

**User Story:** As a site owner, I want a unified film content type that handles both wishlist and watched films

#### Acceptance Criteria

1. THE Film System SHALL use a single content type with status field (wishlist/watched)
2. THE Film System SHALL store OMDb-fetched metadata (title, director, cast, poster, year, runtime, plot)
3. THE Film System SHALL store personal viewing data (date watched, cinema location, rating, notes)
4. THE Film System SHALL store wishlist metadata (date added to wishlist)
5. THE Film System SHALL support secret screenings with placeholder titles on wishlist
6. THE Film System SHALL allow updating secret screenings with actual film details after viewing
7. THE Film System SHALL generate URL-friendly slugs from film titles
8. THE Film System SHALL support filtering by status in Sanity Studio

### Requirement 2: API Integration & Abstraction

**User Story:** As a developer, I want a swappable API system so we can change film data providers if needed

#### Acceptance Criteria

1. THE Film System SHALL implement an abstraction layer for film data providers
2. THE Film System SHALL use OMDb API as the initial provider
3. THE Film System SHALL support fuzzy search by film title
4. THE Film System SHALL return search results with poster thumbnails
5. THE Film System SHALL handle API failures gracefully
6. THE Film System SHALL allow switching providers without changing application logic

### Requirement 3: Wishlist Management

**User Story:** As a site owner, I want to easily add films to my wishlist when I see trailers

#### Acceptance Criteria

1. THE Film System SHALL provide an "Add Film" form on the main films page
2. THE Film System SHALL show the form only when authenticated with Sanity
3. THE Film System SHALL search OMDb as user types film title
4. THE Film System SHALL display search results with poster thumbnails
5. THE Film System SHALL auto-populate all metadata when film is selected
6. THE Film System SHALL record the date added to wishlist
7. THE Film System SHALL create films with wishlist status by default

### Requirement 4: Watched Film Tracking

**User Story:** As a site owner, I want to mark films as watched and record my viewing experience

#### Acceptance Criteria

1. THE Film System SHALL allow updating film status from wishlist to watched
2. THE Film System SHALL capture viewing date, cinema location, and personal rating
3. THE Film System SHALL support optional personal notes
4. THE Film System SHALL support adding films directly as watched (bypassing wishlist)
5. THE Film System SHALL still fetch OMDb data for direct watched entries
6. THE Film System SHALL calculate wait time for wishlist films

### Requirement 5: Secret Screenings

**User Story:** As a site owner, I want to track secret screenings where the film is unknown until attendance

#### Acceptance Criteria

1. THE Film System SHALL support adding secret screenings to wishlist with placeholder titles
2. THE Film System SHALL mark entries as secret screenings with boolean flag
3. THE Film System SHALL allow updating secret screenings with actual film details after viewing
4. THE Film System SHALL fetch OMDb data when actual film title is revealed
5. THE Film System SHALL maintain secret screening flag for statistical purposes
6. THE Film System SHALL display secret screenings appropriately in wishlist and watched views

### Requirement 6: Film Display & Navigation

**User Story:** As a site visitor, I want to browse films and view detailed information

#### Acceptance Criteria

1. THE Film System SHALL provide a main films listing page at /films
2. THE Film System SHALL display films with poster, title, rating, and status
3. THE Film System SHALL provide individual film detail pages at /films/[slug]
4. THE Film System SHALL show all film metadata and viewing details on detail pages
5. THE Film System SHALL include IMDB links where available
6. THE Film System SHALL support filtering by status (wishlist/watched)
7. THE Film System SHALL provide a public wishlist page at /films/wishlist
8. THE Film System SHALL display upcoming films with poster, title, and date added
9. THE Film System SHALL allow visitors to see what films are planned for viewing

### Requirement 7: Last Film Watched Component

**User Story:** As a site visitor, I want to see what film was most recently watched, so I can get a sense of current viewing activity

#### Acceptance Criteria

1. THE Film System SHALL provide a "Last Film Watched" component for use across multiple pages
2. THE Film System SHALL display the most recent film watched in the current year
3. THE Film System SHALL fallback to the most recent film from the previous year if no current year films exist
4. THE Film System SHALL display the component prominently with larger styling than standard film cards
5. THE Film System SHALL include film poster, title, personal rating, viewing date, and cinema location
6. THE Film System SHALL include contextual text ("Just watched" or "Last watched")
7. THE Film System SHALL be usable on home page, about page, and films listing page
8. THE Film System SHALL update automatically when films are marked as watched
9. THE Film System SHALL handle edge cases gracefully when no films exist

### Requirement 8: Annual Wrapped Statistics

**User Story:** As a site owner, I want annual cinema statistics similar to Spotify Wrapped

#### Acceptance Criteria

1. THE Film System SHALL provide a wrapped index page at /films/wrapped
2. THE Film System SHALL dynamically list available years based on viewing data
3. THE Film System SHALL provide annual wrapped pages at /films/wrapped/[year]
4. THE Film System SHALL calculate total films watched per year
5. THE Film System SHALL calculate total watch time in minutes/hours
6. THE Film System SHALL show rating trends and averages
7. THE Film System SHALL display cinema location loyalty statistics
8. THE Film System SHALL show genre distribution
9. THE Film System SHALL calculate "patience awards" (longest wait times)
10. THE Film System SHALL identify "impulse watches" (same-day additions)
11. THE Film System SHALL count and display secret screenings attended per year

## Technical Requirements

All implementation must follow the standards defined in `.kiro/specs/technical-standards.md`, including:

- ESLint compliance with project configuration
- British English spelling and terminology
- TypeScript strict mode compliance
- Next.js App Router patterns
- Sanity CMS integration patterns
- Environment variable management
- Error handling and graceful degradation

### Requirement 11: Year-Based Filtering for Watched Films

**User Story:** As a site owner, I want to filter watched films by year to easily browse my viewing history by time period

#### Acceptance Criteria

1. THE Watched Films Page SHALL display year filter tabs based on watched dates
2. THE Watched Films Page SHALL show film counts for each year in tab labels
3. THE Watched Films Page SHALL include an "All Years" tab showing total count
4. THE Watched Films Page SHALL filter films client-side by selected year
5. THE Watched Films Page SHALL default to the most recent year with watched films
6. THE Watched Films Page SHALL only show year tabs when multiple years exist
7. THE Watched Films Page SHALL update the empty state message based on selected filter
8. THE Watched Films Page SHALL maintain responsive design with year tabs

## Success Criteria

The feature will be considered successful when:

1. Films can be added to wishlist via authenticated form
2. OMDb integration provides accurate film metadata
3. Films can be marked as watched with personal details
4. Film listing and detail pages are functional
5. Wrapped pages provide meaningful annual statistics
6. API abstraction allows for provider switching
7. All code follows project standards and passes ESLint
8. Feature integrates seamlessly with existing site navigation
