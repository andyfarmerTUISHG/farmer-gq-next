# Tasks Document

## Implementation Phases

This document outlines the implementation phases for the Films feature, designed for incremental development with manual testing at each stage.

## Phase 1: Basic Sanity Schema

**Objective:** Create the foundational film content type in Sanity Studio

### Tasks

- [x] Create `schema/film.js` with basic fields:
  - [x] `title` (string, required)
  - [x] `slug` (slug, auto-generated from title)
  - [x] `status` (string, options: wishlist/watched)
  - [x] `isSecretScreening` (boolean, default false)
  - [x] `imdbId` (string, optional)
  - [x] `year` (number, optional)
  - [x] `dateAddedToWishlist` (date, optional)
  - [x] `dateWatched` (date, optional)
  - [x] `cinemaLocation` (string, optional)
  - [x] `personalRating` (number, 1-5, optional)
  - [x] `personalNotes` (text, optional)

- [x] Add film schema to main schema export
- [x] Configure preview display in Sanity Studio
- [x] Add filtering by status in Studio

### Testing Criteria

- [x] Can create film entries in Sanity Studio
- [x] Can edit all fields successfully
- [x] Status filtering works in Studio
- [x] Preview shows title and status correctly

### Test Data

Use these real films for testing and initial content:

**Watched Films (2025):**
- **28 Years Later: The Bone Temple** - Watched: 18 Jan 2025
- **Mercy** - Watched: 23 Jan 2025
- **Return to Silent Hill** - Watched: 27 Jan 2025

**Wishlist Films:**
- **Iron Lung**
- **Primate**
- **Shelter**

These can be published as actual content once the feature is complete.

---

## Phase 2: Static Film List Pages

**Objective:** Create basic films listing and wishlist pages with Sanity data integration

### Tasks

- [x] Create `app/(site)/films/page.tsx`
- [x] Create `app/(site)/films/wishlist/page.tsx`
- [x] Add basic page metadata (title, description, OG tags) for both pages
- [x] Create simple film card component
- [x] Add film queries to `sanity/lib/queries.ts`
- [x] Use `sanityFetch` for live content API integration
- [ ] Add test film entries in Sanity Studio (both wishlist and watched)
- [x] Display films in grid layout
- [x] Add basic responsive styling
- [x] Add navigation between films and wishlist pages

### Testing Criteria

- [x] `/films` page loads without errors
- [x] `/films/wishlist` page loads without errors
- [ ] Test films display correctly on both pages
- [x] Pages are responsive on mobile/desktop
- [x] SEO meta tags are present
- [x] Navigation between pages works
- [x] Live editing works in Presentation Studio

---

## Phase 3: API Setup & Abstraction

**Objective:** Set up OMDb API integration with swappable abstraction layer

### Tasks

- [x] Obtain OMDb API key from http://www.omdbapi.com/
- [x] Add `OMDB_API_KEY` to `.env.local.example`
- [ ] Add `OMDB_API_KEY` to Netlify environment variables
- [ ] Add `OMDB_API_KEY` to Sanity Studio environment (if needed for preview)
- [x] Create `lib/film-api/` directory structure:
  - [x] `types.ts` - Define film data interfaces
  - [x] `base-provider.ts` - Abstract provider interface
  - [x] `omdb-provider.ts` - OMDb implementation
  - [x] `film-service.ts` - Main service using current provider
- [x] Create test endpoint to verify API connection
- [x] Add error handling for API failures

### Testing Criteria

- [x] Can fetch film data from OMDb API
- [x] API abstraction layer works correctly
- [x] Error handling works when API is unavailable
- [x] Environment variables are properly configured in all environments

---

## Phase 4: OMDb Integration

**Objective:** Implement film search and metadata fetching

### Tasks

- [x] Implement search functionality in OMDb provider
- [x] Create server action for film search
- [x] Add film metadata fetching by title/year
- [x] Handle multiple search results
- [x] Add poster image URL handling
- [x] Create utility functions for data transformation
- [x] Create debug component for testing API integration

### Testing Criteria

- [x] Can search for films by title
- [x] Returns multiple results when available
- [x] Fetches complete film metadata
- [x] Poster images display correctly (with 404 fallback handling)
- [x] Handles films not found gracefully

---

## Phase 5: Add Film Form

**Objective:** Create authenticated form for adding films to wishlist

### Tasks

- [x] Create film search component with autocomplete
- [x] Add authentication check (Sanity session)
- [x] Create "Add Film" button/modal on films page
- [x] Implement film selection from search results
- [x] Add server action to create film entries
- [x] Show success/error feedback
- [x] Auto-populate metadata from OMDb

### Testing Criteria

- [x] Form only visible when authenticated
- [x] Can search and select films
- [x] Film metadata auto-populates correctly
- [x] Films are created with wishlist status
- [x] Success/error messages display properly

---

## Phase 6: Mark as Watched

**Objective:** Allow updating films from wishlist to watched status

### Tasks

- [x] Create "Mark as Watched" form component
- [x] Add fields for viewing details:
  - [x] Date watched (date picker)
  - [x] Cinema location (text input)
  - [x] Personal rating (star selector)
  - [x] Personal notes (textarea)
- [x] Create server action to update film status
- [x] Calculate wait time (dateWatched - dateAddedToWishlist)
- [x] Update film card to show watched status

### Testing Criteria

- [x] Can mark wishlist films as watched
- [x] All viewing details are captured
- [x] Wait time calculates correctly
- [x] Film status updates in listing
- [x] Can add films directly as watched

---

## Phase 7: Film Detail Pages

**Objective:** Create individual film pages with complete information

### Tasks

- [x] Create `app/(site)/films/[slug]/page.tsx`
- [x] Add dynamic metadata generation
- [x] Display all film metadata (poster, plot, cast, director)
- [x] Show viewing details for watched films
- [x] Add IMDB link if available
- [x] Include personal rating and notes
- [x] Add breadcrumb navigation

### Testing Criteria

- [x] Detail pages load for all films
- [x] All metadata displays correctly
- [x] Viewing details show for watched films
- [x] IMDB links work when present
- [x] Pages are SEO optimised

---

## Phase 8: Wrapped Foundation

**Objective:** Create basic wrapped pages structure

### Tasks

- [x] Create `app/(site)/films/wrapped/page.tsx` (index)
- [x] Create `app/(site)/films/wrapped/[year]/page.tsx`
- [x] Add year selection logic based on viewing data
- [x] Create basic wrapped page layout
- [x] Add navigation between years
- [x] Implement basic statistics queries

### Testing Criteria

- [x] `/films/wrapped` shows available years
- [x] Can navigate to specific year pages
- [x] Year pages load without errors
- [x] Only shows years with watched films

---

## Phase 9: Wrapped Statistics

**Objective:** Implement comprehensive annual statistics

### Tasks

- [ ] Calculate total films watched per year
- [ ] Calculate total watch time (runtime × films)
- [ ] Implement rating trend analysis
- [ ] Add cinema location statistics
- [ ] Create genre distribution charts
- [ ] Calculate patience awards (longest waits)
- [ ] Identify impulse watches (same-day)
- [ ] Count secret screenings attended
- [ ] Add visual charts/graphs
- [ ] Create shareable wrapped summaries

### Testing Criteria

- [x] All statistics calculate correctly
- [x] Charts display properly
- [x] Statistics update with new data
- [x] Wrapped pages are visually appealing
- [x] Performance is acceptable with large datasets

---

## Development Notes

### Environment Variables Required

Add to `.env.local.example`:
```bash
# OMDb API for film metadata
OMDB_API_KEY=your_omdb_api_key_here
```

Add to Netlify environment variables:
- `OMDB_API_KEY` = your actual API key

Add to Sanity Studio environment (if needed for preview functionality):
- Configure in `sanity.config.ts` if API calls are needed in Studio

### Testing Strategy

Each phase should be manually tested before proceeding to the next. Create test film entries in Sanity Studio to verify functionality at each stage.

### Commit Strategy

Make small, focused commits for each completed task. Each phase should result in a working, deployable state.

### British English Compliance

Ensure all user-facing text, comments, and documentation use British English spelling and terminology throughout implementation.

---

## Security Review Task

**TODO: Review and improve security of film creation functionality**

**Current implementation:**
- Uses Sanity write token in server actions for creating films
- Write token has full write permissions to Sanity dataset
- Form is gated behind draft mode authentication

**Security improvements to consider:**
- Implement more granular permissions (film-only write access)
- Consider webhook-based approach for content creation
- Add rate limiting to prevent abuse
- Implement content validation and sanitisation
- Consider removing direct API access in favour of Sanity Studio workflow

**Priority:** Medium - Review after core functionality is complete

---

## Authentication & Private Areas Review Task

**TODO: Review and improve authentication behaviour for private/logged-in areas**

**Current implementation:**
- Uses Sanity draft mode for authentication check
- Add Film form only visible when draft mode enabled
- Personal notes only visible when draft mode enabled
- Mark as Watched buttons only visible when draft mode enabled

**Areas to review and potentially change:**
- Consider alternative authentication methods (separate login system)
- Review user experience of draft mode activation (`/api/draft-mode/enable`)
- Evaluate if private areas should have different access patterns
- Consider session management and persistence
- Review security implications of current approach

**Potential improvements:**
- Implement proper user authentication system
- Add login/logout UI components
- Create admin dashboard separate from draft mode
- Add role-based access control
- Improve user experience for accessing private features

**Priority:** Medium - Review after core functionality is complete

---

## Phase 10: Last Film Watched Component

**Objective:** Create a prominent "last film watched" component for use across multiple pages

### Tasks

- [x] Create `LastFilmWatched` component with prominent styling
- [x] Implement smart query logic:
  - [x] First: Get most recent film watched in current year
  - [x] Fallback: Get most recent film watched from previous year
  - [x] Order by `dateWatched` descending
- [x] Design prominent card layout (larger than standard film card)
- [x] Include film poster, title, rating, viewing date, and cinema location
- [x] Add "Just watched" or "Last watched" contextual text
- [x] Create reusable component for multiple page placements
- [x] Add to home page in appropriate section
- [x] Add to about page as personal touch
- [x] Add to films listing page (hero section or sidebar)
- [x] Ensure component updates when films are marked as watched

### Testing Criteria

- [x] Component displays most recent film from current year
- [x] Falls back to previous year when no current year films exist
- [x] Displays prominently with all required information
- [x] Works correctly on home, about, and films pages
- [x] Updates automatically when new films are watched
- [x] Handles edge cases gracefully (no films at all)
- [x] Component is responsive across device sizes
