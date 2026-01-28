# Films Feature Design Document

## Overview

The Films feature provides a comprehensive system for tracking cinema visits using a Cineworld Unlimited pass, with automated metadata fetching, wishlist management, and annual statistics.

## User Interface Design

### Film Card Component

**Standard Film Card (List Views)**
- Film poster (aspect ratio 2:3)
- Film title
- Release year
- Personal rating (star display)
- Status indicator (wishlist/watched)
- Viewing date (for watched films)

**Last Film Watched Component (Prominent)**
- Larger poster display
- Film title and year
- Personal rating with stars
- Viewing date and cinema location
- "Just watched" or "Last watched" contextual text
- More prominent styling than standard cards

### Page Layouts

**Films Listing Page (`/films`)**
- Grid layout of film cards
- Filter/sort controls (rating, date, status)
- "Add Film" button (authenticated users only)
- Last Film Watched component (hero section)
- Pagination for large collections

**Wishlist Page (`/films/wishlist`)**
- Grid layout of wishlist films
- Shows upcoming films with posters
- Date added to wishlist
- Secret screenings with placeholder styling
- Public visibility for visitor engagement

**Film Detail Page (`/films/[slug]`)**
- Large poster image
- Complete film metadata (director, cast, runtime, certificate)
- Personal viewing details (date, cinema, rating, notes)
- IMDB link if available
- Related films suggestions
- Breadcrumb navigation

**Wrapped Pages (`/films/wrapped/[year]`)**
- Annual statistics dashboard
- Visual charts and graphs
- Key statistics prominently displayed
- Shareable summary cards
- Navigation between years

### Interactive Elements

**Add Film Form**
- Search input with autocomplete
- OMDb results dropdown with poster thumbnails
- Film selection and auto-population
- Success/error feedback
- Modal or inline form design

**Mark as Watched Form**
- Date picker for viewing date
- Text input for cinema location
- Star rating selector
- Textarea for personal notes
- Update confirmation

**Secret Screening Handling**
- Placeholder entries on wishlist
- Special styling to indicate mystery
- Update flow after viewing
- Reveal animation when film is identified

## Visual Design Principles

### Consistency with Existing Site
- Follow established design system
- Reuse existing components where possible
- Maintain typography and colour schemes
- Consistent spacing and layout patterns

### Film-Specific Elements
- Poster-centric design (films are visual)
- Star rating system for personal scores
- Cinema location prominence
- Date-based organisation and filtering

### Responsive Design
- Mobile-first approach
- Grid layouts that adapt to screen size
- Touch-friendly interactive elements
- Optimised poster display across devices

## Component Architecture

### Reusable Components
- `FilmCard` - Standard film display
- `LastFilmWatched` - Prominent recent film
- `FilmPoster` - Consistent poster display
- `RatingStars` - Star rating display/input
- `AddFilmForm` - Film search and addition
- `MarkAsWatchedForm` - Viewing details capture

### Page Components
- `FilmsListPage` - Main films listing
- `WishlistPage` - Public wishlist display
- `FilmDetailPage` - Individual film pages
- `WrappedIndexPage` - Year selection
- `WrappedYearPage` - Annual statistics

### Utility Components
- `FilmSearch` - OMDb search interface
- `FilmMetadata` - Structured film information
- `ViewingDetails` - Personal viewing data
- `StatisticsChart` - Wrapped page visualisations

## Data Display Patterns

### Film Metadata Hierarchy
1. **Primary**: Title, poster, personal rating
2. **Secondary**: Director, year, runtime, certificate
3. **Tertiary**: Cast, plot, IMDB link
4. **Personal**: Viewing date, cinema, notes

### Status Indicators
- **Wishlist**: Subtle indicator, date added
- **Watched**: Prominent rating, viewing date
- **Secret Screening**: Special styling, mystery indicator

### Temporal Organisation
- Recent films prominently displayed
- Chronological sorting options
- Year-based navigation and filtering
- "Last watched" prominence across site

## Accessibility Considerations

### Screen Reader Support
- Proper heading hierarchy
- Alt text for all poster images
- ARIA labels for interactive elements
- Semantic HTML structure

### Keyboard Navigation
- Tab order through interactive elements
- Keyboard shortcuts for common actions
- Focus indicators on all controls
- Skip links for main content

### Visual Accessibility
- Sufficient colour contrast ratios
- Text alternatives for visual information
- Scalable text and interface elements
- Clear visual hierarchy

## Performance Considerations

### Image Optimisation
- Next.js Image component for posters
- Appropriate sizing and formats
- Lazy loading for large collections
- CDN delivery for OMDb images

### Data Loading
- Efficient Sanity queries
- Pagination for large datasets
- Caching strategies for static content
- Progressive enhancement patterns

### API Integration
- OMDb API rate limiting consideration
- Error handling and fallbacks
- Caching of fetched metadata
- Graceful degradation when API unavailable

## Integration Points

### Existing Site Components
- Navigation menu integration
- Footer consistency
- Global styling and theming
- SEO meta tag patterns

### Sanity CMS Integration
- Draft mode support
- Presentation Studio compatibility
- Content preview functionality
- Publishing workflow integration

### External Services
- OMDb API for film metadata
- Potential future integrations (Letterboxd, etc.)
- Social sharing capabilities
- Analytics tracking for engagement

## Future Enhancements

### Potential Features
- Film recommendations based on ratings
- Social features (sharing, comments)
- Advanced filtering and search
- Export capabilities for data
- Integration with other film services

### Scalability Considerations
- Support for large film collections
- Performance optimisation strategies
- Advanced caching mechanisms
- Database query optimisation
