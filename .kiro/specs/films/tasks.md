# Tasks Document

## Implementation Phases

This document outlines the implementation phases for the Films feature, designed for incremental development with manual testing at each stage.

## Phase 1: Basic Sanity Schema

**Objective:** Create the foundational film content type in Sanity Studio

### Tasks

- [ ] Create `schema/film.js` with basic fields:
  - [ ] `title` (string, required)
  - [ ] `slug` (slug, auto-generated from title)
  - [ ] `status` (string, options: wishlist/watched)
  - [ ] `isSecretScreening` (boolean, default false)
  - [ ] `imdbId` (string, optional)
  - [ ] `year` (number, optional)
  - [ ] `dateAddedToWishlist` (date, optional)
  - [ ] `dateWatched` (date, optional)
  - [ ] `cinemaLocation` (string, optional)
  - [ ] `personalRating` (number, 1-5, optional)
  - [ ] `personalNotes` (text, optional)

- [ ] Add film schema to main schema export
- [ ] Configure preview display in Sanity Studio
- [ ] Add filtering by status in Studio

### Testing Criteria

- [ ] Can create film entries in Sanity Studio
- [ ] Can edit all fields successfully
- [ ] Status filtering works in Studio
- [ ] Preview shows title and status correctly

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

**Objective:** Create basic films listing and wishlist pages with hardcoded test data

### Tasks

- [ ] Create `app/(site)/films/page.tsx`
- [ ] Create `app/(site)/films/wishlist/page.tsx`
- [ ] Add basic page metadata (title, description, OG tags) for both pages
- [ ] Create simple film card component
- [ ] Add test film entries in Sanity Studio (both wishlist and watched)
- [ ] Display films in grid layout
- [ ] Add basic responsive styling
- [ ] Add navigation between films and wishlist pages

### Testing Criteria

- [ ] `/films` page loads without errors
- [ ] `/films/wishlist` page loads without errors
- [ ] Test films display correctly on both pages
- [ ] Pages are responsive on mobile/desktop
- [ ] SEO meta tags are present
- [ ] Navigation between pages works

---

## Phase 3: API Setup & Abstraction

**Objective:** Set up OMDb API integration with swappable abstraction layer

### Tasks

- [ ] Obtain OMDb API key from http://www.omdbapi.com/
- [ ] Add `OMDB_API_KEY` to `.env.local.example`
- [ ] Add `OMDB_API_KEY` to Netlify environment variables
- [ ] Add `OMDB_API_KEY` to Sanity Studio environment (if needed for preview)
- [ ] Create `lib/film-api/` directory structure:
  - [ ] `types.ts` - Define film data interfaces
  - [ ] `base-provider.ts` - Abstract provider interface
  - [ ] `omdb-provider.ts` - OMDb implementation
  - [ ] `film-service.ts` - Main service using current provider
- [ ] Create test endpoint to verify API connection
- [ ] Add error handling for API failures

### Testing Criteria

- [ ] Can fetch film data from OMDb API
- [ ] API abstraction layer works correctly
- [ ] Error handling works when API is unavailable
- [ ] Environment variables are properly configured in all environments

---

## Phase 4: OMDb Integration

**Objective:** Implement film search and metadata fetching

### Tasks

- [ ] Implement search functionality in OMDb provider
- [ ] Create server action for film search
- [ ] Add film metadata fetching by title/year
- [ ] Handle multiple search results
- [ ] Add poster image URL handling
- [ ] Create utility functions for data transformation

### Testing Criteria

- [ ] Can search for films by title
- [ ] Returns multiple results when available
- [ ] Fetches complete film metadata
- [ ] Poster images display correctly
- [ ] Handles films not found gracefully

---

## Phase 5: Add Film Form

**Objective:** Create authenticated form for adding films to wishlist

### Tasks

- [ ] Create film search component with autocomplete
- [ ] Add authentication check (Sanity session)
- [ ] Create "Add Film" button/modal on films page
- [ ] Implement film selection from search results
- [ ] Add server action to create film entries
- [ ] Show success/error feedback
- [ ] Auto-populate metadata from OMDb

### Testing Criteria

- [ ] Form only visible when authenticated
- [ ] Can search and select films
- [ ] Film metadata auto-populates correctly
- [ ] Films are created with wishlist status
- [ ] Success/error messages display properly

---

## Phase 6: Mark as Watched

**Objective:** Allow updating films from wishlist to watched status

### Tasks

- [ ] Create "Mark as Watched" form component
- [ ] Add fields for viewing details:
  - [ ] Date watched (date picker)
  - [ ] Cinema location (text input)
  - [ ] Personal rating (star selector)
  - [ ] Personal notes (textarea)
- [ ] Create server action to update film status
- [ ] Calculate wait time (dateWatched - dateAddedToWishlist)
- [ ] Update film card to show watched status

### Testing Criteria

- [ ] Can mark wishlist films as watched
- [ ] All viewing details are captured
- [ ] Wait time calculates correctly
- [ ] Film status updates in listing
- [ ] Can add films directly as watched

---

## Phase 7: Film Detail Pages

**Objective:** Create individual film pages with complete information

### Tasks

- [ ] Create `app/(site)/films/[slug]/page.tsx`
- [ ] Add dynamic metadata generation
- [ ] Display all film metadata (poster, plot, cast, director)
- [ ] Show viewing details for watched films
- [ ] Add IMDB link if available
- [ ] Include personal rating and notes
- [ ] Add breadcrumb navigation

### Testing Criteria

- [ ] Detail pages load for all films
- [ ] All metadata displays correctly
- [ ] Viewing details show for watched films
- [ ] IMDB links work when present
- [ ] Pages are SEO optimised

---

## Phase 8: Wrapped Foundation

**Objective:** Create basic wrapped pages structure

### Tasks

- [ ] Create `app/(site)/films/wrapped/page.tsx` (index)
- [ ] Create `app/(site)/films/wrapped/[year]/page.tsx`
- [ ] Add year selection logic based on viewing data
- [ ] Create basic wrapped page layout
- [ ] Add navigation between years
- [ ] Implement basic statistics queries

### Testing Criteria

- [ ] `/films/wrapped` shows available years
- [ ] Can navigate to specific year pages
- [ ] Year pages load without errors
- [ ] Only shows years with watched films

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

- [ ] All statistics calculate correctly
- [ ] Charts display properly
- [ ] Statistics update with new data
- [ ] Wrapped pages are visually appealing
- [ ] Performance is acceptable with large datasets

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

## Phase 10: Last Film Watched Component

**Objective:** Create a prominent "last film watched" component for use across multiple pages

### Tasks

- [ ] Create `LastFilmWatched` component with prominent styling
- [ ] Implement smart query logic:
  - [ ] First: Get most recent film watched in current year
  - [ ] Fallback: Get most recent film watched from previous year
  - [ ] Order by `dateWatched` descending
- [ ] Design prominent card layout (larger than standard film card)
- [ ] Include film poster, title, rating, viewing date, and cinema location
- [ ] Add "Just watched" or "Last watched" contextual text
- [ ] Create reusable component for multiple page placements
- [ ] Add to home page in appropriate section
- [ ] Add to about page as personal touch
- [ ] Add to films listing page (hero section or sidebar)
- [ ] Ensure component updates when films are marked as watched

### Testing Criteria

- [ ] Component displays most recent film from current year
- [ ] Falls back to previous year when no current year films exist
- [ ] Displays prominently with all required information
- [ ] Works correctly on home, about, and films pages
- [ ] Updates automatically when new films are watched
- [ ] Handles edge cases gracefully (no films at all)
- [ ] Component is responsive across device sizes
