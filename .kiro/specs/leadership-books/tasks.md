# Implementation Plan

- [ ] 1. Set up Sanity schemas for books, chapters, and quotes
  - Create book schema with all metadata, content, SEO, and relationship fields
  - Create chapter schema with parent book reference
  - Create quote schema with book and optional chapter references
  - Register all new schemas in schema.js
  - _Requirements: 1.1-1.9, 2.1-2.7, 3.1-3.5, 7.1-7.4, 9.1-9.4, 10.1-10.7_

- [ ] 2. Create TypeScript types for book data models
  - Define Book type with all fields including related books and quotes
  - Define Chapter type with parent book reference
  - Define Quote type with parent references
  - Export types for use across the application
  - _Requirements: 1.1-1.9, 2.1-2.7, 3.1-3.5, 10.1-10.7_

- [ ] 3. Add GROQ queries for data fetching
  - Create allBooksQuery for listing books
  - Create paginatedBooksQuery with sorting support
  - Create bookBySlugQuery with related books, chapters, and quotes
  - Create chapterBySlugQuery with chapter-specific quotes
  - Create allBookSlugsQuery for static generation
  - Create allChapterSlugsQuery for static generation
  - _Requirements: 4.1-4.10, 9.2-9.3, 10.6-10.7, 11.1-11.6_

- [ ] 4. Implement book listing page with sorting
  - Create books/page.tsx with pagination
  - Implement sort parameter handling (rating, dateRead, author)
  - Add sorting UI controls (dropdown or buttons)
  - Display book cards in grid layout
  - Persist sort selection in URL query parameters
  - _Requirements: 4.1-4.2, 11.1-11.6_

- [ ] 5. Implement book detail page
  - Create books/[slug]/page.tsx with static generation
  - Display book metadata, cover, rating, and tags
  - Render summary content using CustomPortableText
  - Display key takeaways section
  - Show related books section with book cards
  - Display quotes/highlights section
  - Conditionally render personal notes based on draft mode
  - List chapters with navigation links
  - Add Sanity data attributes for Presentation Studio
  - Generate SEO metadata with fallbacks
  - _Requirements: 4.3-4.9, 7.5-7.7, 9.2-9.3, 10.6-10.7_

- [ ] 6. Implement chapter detail page
  - Create books/[slug]/chapters/[chapterSlug]/page.tsx with static generation
  - Display chapter number, title, and summary
  - Show chapter-specific quotes
  - Add breadcrumb navigation to parent book
  - Use CustomPortableText for content rendering
  - Add Sanity data attributes for Presentation Studio
  - Generate SEO metadata
  - _Requirements: 3.5, 10.7_

- [ ] 7. Create reusable UI components
  - Create BookCard component for book previews
  - Create RatingStars component for visual ratings
  - Create QuoteCard component for displaying quotes
  - Style components with Tailwind CSS
  - Ensure components are responsive
  - _Requirements: 4.2, 9.3, 10.6_

- [ ] 8. Integrate books into site navigation
  - Add Books link to desktop navigation menu
  - Add Books link to mobile navigation menu
  - Ensure navigation integration doesn't affect existing menu items
  - Test navigation on both desktop and mobile
  - _Requirements: 8.1-8.3_

- [ ] 9. Implement SEO and metadata generation
  - Create metadata export function for book pages
  - Implement fallback logic for meta description (use summary excerpt)
  - Implement fallback logic for meta title (use book title)
  - Implement fallback logic for OG image (use book cover)
  - Add Schema.org Book structured data
  - Include focus keyword in metadata when provided
  - _Requirements: 7.1-7.7_

- [ ] 10. Configure Presentation Studio support
  - Ensure all book fields have proper data attributes
  - Ensure all chapter fields have proper data attributes
  - Test visual editing in Presentation Studio
  - Verify live preview updates work correctly
  - _Requirements: 6.1-6.4_

- [ ] 11. Verify draft mode and authentication
  - Test personal notes visibility when not authenticated
  - Test personal notes visibility when authenticated in Sanity Studio
  - Ensure draft mode check handles errors gracefully
  - _Requirements: 4.8-4.9_

- [ ] 12. Test and validate implementation
  - Verify all book pages generate statically at build time
  - Test sorting functionality on books listing page
  - Test related books display and navigation
  - Test quotes display on book and chapter pages
  - Verify responsive design on mobile, tablet, and desktop
  - Test Presentation Studio editing workflow
  - Validate SEO metadata and structured data
  - Check accessibility (heading hierarchy, alt text, keyboard navigation)
  - Run ESLint to ensure code quality standards
  - _Requirements: All requirements_

- [ ]\* 13. Write unit tests for core functionality
  - [ ]\* 13.1 Write tests for GROQ query construction
  - [ ]\* 13.2 Write tests for TypeScript type validation
  - [ ]\* 13.3 Write tests for rating validation (1-5 range)
  - [ ]\* 13.4 Write tests for slug generation
  - _Requirements: All requirements_

- [ ]\* 14. Write integration tests
  - [ ]\* 14.1 Test book list page rendering with mock data
  - [ ]\* 14.2 Test book detail page displays all fields correctly
  - [ ]\* 14.3 Test chapter page shows parent book reference
  - [ ]\* 14.4 Test personal notes visibility based on draft mode
  - [ ]\* 14.5 Test pagination functionality
  - [ ]\* 14.6 Test CustomPortableText rendering
  - _Requirements: 4.8-4.9_

- [ ]\* 15. Update project documentation
  - [ ]\* 15.1 Document book schema fields and usage in README or docs
  - [ ]\* 15.2 Add examples of creating books, chapters, and quotes in Sanity Studio
  - [ ]\* 15.3 Document sorting options and URL parameters
  - [ ]\* 15.4 Add notes about SEO metadata fallback behavior
  - [ ]\* 15.5 Document related books and quotes features
  - _Requirements: All requirements_
