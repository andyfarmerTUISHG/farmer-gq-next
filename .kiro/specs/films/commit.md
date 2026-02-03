feat(films): add comprehensive input validation and security hardening

- feat(validation): implement Zod schemas for all film-related inputs
  * Add markAsWatchedSchema with field validation and sanitization
  * Add searchFilmsSchema with query length and format validation  
  * Add addFilmSchema with IMDB ID format validation
  * Include sanitizeText helper for XSS prevention

- security(actions): restrict write token to film documents only
  * Add document type validation in markFilmAsWatchedAction
  * Add document type validation in addFilmToWishlistAction
  * Prevent unauthorized access to non-film document types

- feat(films): add poster URL capture and display
  * Update film schema with posterUrl field
  * Capture poster URLs from OMDb API automatically
  * Display posters in film cards with responsive layout
  * Update all film queries to include posterUrl

- feat(films): add runtime field and year-based filtering
  * Add runtime field to film schema and capture from OMDb
  * Implement year-based filtering tabs on watched films
  * Add client-side filtering with film counts per year
  * Display runtime information in film cards

- feat(films): consolidate navigation under main films route
  * Refactor films page with tabbed interface (All Watched, Wishlist)
  * Remove separate /films/watched route
  * Add consistent navigation across all films pages
  * Implement client/server component split for interactivity

- feat(films): enhance wishlist date management
  * Add editable wishlist date field in mark as watched form
  * Allow correction of wishlist dates during status updates
  * Validate wishlist date cannot be after watched date

- feat(films): support IMDB ID lookup in wishlist search
  * Detect IMDB ID format (tt followed by digits) in search
  * Direct lookup for IMDB IDs bypassing search results
  * Maintain existing title and year extraction functionality

- feat(sanity): add OMDb lookup action in studio
  * Create fetch-omdb-action for Sanity Studio integration
  * Support both title search and IMDB ID lookup
  * Auto-populate title, year, IMDB ID, poster URL, and plot
  * Add film selection prompt for multiple search results

- refactor(films): remove edit functionality and unused files
  * Remove temporary edit buttons from watched films
  * Clean up unused FilmLookupInput component
  * Remove empty sanity/components directory

- feat(settings): add default cinema configuration
  * Add defaultCinema field to settings schema
  * Auto-populate cinema location in mark as watched form
  * Maintain editability for different cinema visits

- chore(validation): add request size limits and enhanced sanitization
  * Add maximum length validation to prevent large payloads
  * Enhance text sanitization with HTML/JavaScript removal
  * Add comprehensive error handling for validation failures

BREAKING CHANGE: Removed /films/watched route - functionality moved to main /films page tabs

Co-authored-by: OMDb API integration
Co-authored-by: Sanity CMS schema updates