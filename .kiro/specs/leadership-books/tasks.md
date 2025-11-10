# Implementation Plan

## PR Strategy

This implementation is designed to be delivered as a series of incremental PRs into a feature branch.

### Setup: Create Feature Branch

```bash
# Create and push the main feature branch
git checkout -b feat/leadership-books
git push -u origin feat/leadership-books
```

---

### PR1: Foundation Layer (Tasks 1 + 2)

**Branch from:** `feat/leadership-books`  
**Tasks:** 1, 2  
**Dependencies:** None

```bash
# Create branch
git checkout feat/leadership-books
git pull
git checkout -b feat/leadership-books-schemas-types

# After completing tasks 1 & 2, commit and push
git add .
git commit -m "feat: add book, chapter, and quote schemas with TypeScript types"
git push -u origin feat/leadership-books-schemas-types

# Create PR
gh pr create --base feat/leadership-books --head feat/leadership-books-schemas-types \
  --title "feat(books): add Sanity schemas and TypeScript types for books, chapters, and quotes" \
  --body "**PR1: Foundation Layer**

- ✅ Task 1: Sanity schemas (book, chapter, quote)
- ✅ Task 2: TypeScript types

**Testing:**
- [x] Schemas visible in Sanity Studio
- [x] Can create book, chapter, and quote documents
- [x] TypeScript types compile without errors"
```

---

### PR2: Data Layer (Task 3)

**Branch from:** `feat/leadership-books` (after PR1 merged)  
**Tasks:** 3  
**Dependencies:** PR1

```bash
# Create branch
git checkout feat/leadership-books
git pull
git checkout -b feat/leadership-books-queries

# After completing task 3, commit and push
git add .
git commit -m "feat: add GROQ queries for books, chapters, and quotes"
git push -u origin feat/leadership-books-queries

# Create PR
gh pr create --base feat/leadership-books --head feat/leadership-books-queries \
  --title "feat(books): add GROQ queries for books, chapters, quotes with sorting and pagination" \
  --body "**PR2: Data Layer**

- ✅ Task 3: GROQ queries

**Testing:**
- [x] Queries return expected data structure
- [x] Sorting parameters work correctly
- [x] Static generation queries return all slugs"
```

---

### PR3: Component Layer (Task 7)

**Branch from:** `feat/leadership-books` (can be parallel with PR2)  
**Tasks:** 7  
**Dependencies:** None

```bash
# Create branch
git checkout feat/leadership-books
git pull
git checkout -b feat/leadership-books-components

# After completing task 7, commit and push
git add .
git commit -m "feat: add book UI components (BookCard, RatingStars, QuoteCard)"
git push -u origin feat/leadership-books-components

# Create PR
gh pr create --base feat/leadership-books --head feat/leadership-books-components \
  --title "feat(books): add BookCard, RatingStars, and QuoteCard components" \
  --body "**PR3: Component Layer**

- ✅ Task 7: UI components

**Testing:**
- [ ] Components render with mock data
- [ ] Responsive design works on mobile/tablet/desktop
- [ ] ESLint passes"
```

---

### PR4: Book Listing (Task 4)

**Branch from:** `feat/leadership-books` (after PR2 & PR3 merged)  
**Tasks:** 4  
**Dependencies:** PR2, PR3

```bash
# Create branch
git checkout feat/leadership-books
git pull
git checkout -b feat/leadership-books-listing

# After completing task 4, commit and push
git add .
git commit -m "feat: add book listing page with sorting and pagination"
git push -u origin feat/leadership-books-listing

# Create PR
gh pr create --base feat/leadership-books --head feat/leadership-books-listing \
  --title "feat(books): add /books listing page with sorting and pagination" \
  --body "**PR4: Book Listing**

- ✅ Task 4: Book listing page

**Testing:**
- [ ] Pagination works correctly
- [ ] Sorting by rating, date read, and author works
- [ ] Sort persists in URL query parameters
- [ ] Static generation works"
```

---

### PR5: Book Detail (Task 5)

**Branch from:** `feat/leadership-books` (after PR2 & PR3 merged)  
**Tasks:** 5  
**Dependencies:** PR2, PR3

```bash
# Create branch
git checkout feat/leadership-books
git pull
git checkout -b feat/leadership-books-detail

# After completing task 5, commit and push
git add .
git commit -m "feat: add book detail page with related books and quotes"
git push -u origin feat/leadership-books-detail

# Create PR
gh pr create --base feat/leadership-books --head feat/leadership-books-detail \
  --title "feat(books): add /books/[slug] detail page with related books and quotes" \
  --body "**PR5: Book Detail**

- ✅ Task 5: Book detail page

**Testing:**
- [ ] All book metadata displays correctly
- [ ] Related books section renders
- [ ] Quotes section displays
- [ ] Personal notes only visible in draft mode
- [ ] Chapters list with navigation
- [ ] Static generation works
- [ ] SEO metadata generated"
```

---

### PR6: Chapter Detail (Task 6)

**Branch from:** `feat/leadership-books` (after PR2 & PR3 merged)  
**Tasks:** 6  
**Dependencies:** PR2, PR3

```bash
# Create branch
git checkout feat/leadership-books
git pull
git checkout -b feat/leadership-books-chapters

# After completing task 6, commit and push
git add .
git commit -m "feat: add chapter detail page with quotes"
git push -u origin feat/leadership-books-chapters

# Create PR
gh pr create --base feat/leadership-books --head feat/leadership-books-chapters \
  --title "feat(books): add /books/[slug]/chapters/[chapterSlug] page with quotes" \
  --body "**PR6: Chapter Detail**

- ✅ Task 6: Chapter detail page

**Testing:**
- [ ] Chapter content displays correctly
- [ ] Chapter-specific quotes render
- [ ] Breadcrumb navigation works
- [ ] Static generation works"
```

---

### PR7: Navigation & SEO (Tasks 8 + 9)

**Branch from:** `feat/leadership-books` (after PR4, PR5, PR6 merged)  
**Tasks:** 8, 9  
**Dependencies:** PR4, PR5, PR6

```bash
# Create branch
git checkout feat/leadership-books
git pull
git checkout -b feat/leadership-books-nav-seo

# After completing tasks 8 & 9, commit and push
git add .
git commit -m "feat: add navigation integration and SEO metadata"
git push -u origin feat/leadership-books-nav-seo

# Create PR
gh pr create --base feat/leadership-books --head feat/leadership-books-nav-seo \
  --title "feat(books): add Books navigation link and SEO metadata with fallbacks" \
  --body "**PR7: Navigation & SEO**

- ✅ Task 8: Navigation integration
- ✅ Task 9: SEO metadata

**Testing:**
- [ ] Books link appears in desktop navigation
- [ ] Books link appears in mobile navigation
- [ ] SEO metadata with fallbacks works
- [ ] Schema.org structured data present"
```

---

### PR8: Studio & Validation (Tasks 10 + 11 + 12)

**Branch from:** `feat/leadership-books` (after all previous PRs merged)  
**Tasks:** 10, 11, 12  
**Dependencies:** All previous PRs

```bash
# Create branch
git checkout feat/leadership-books
git pull
git checkout -b feat/leadership-books-final

# After completing tasks 10, 11, 12, commit and push
git add .
git commit -m "feat: add Presentation Studio support and final validation"
git push -u origin feat/leadership-books-final

# Create PR
gh pr create --base feat/leadership-books --head feat/leadership-books-final \
  --title "feat(books): add Presentation Studio support, draft mode, and validation" \
  --body "**PR8: Studio & Validation**

- ✅ Task 10: Presentation Studio configuration
- ✅ Task 11: Draft mode verification
- ✅ Task 12: Testing and validation

**Testing:**
- [ ] Presentation Studio editing works
- [ ] Draft mode authentication works
- [ ] All pages generate statically
- [ ] Responsive design verified
- [ ] Accessibility checks pass
- [ ] ESLint passes"
```

---

### Optional PRs (Tasks 13-15)

**Branch from:** `feat/leadership-books` (after PR8 merged)  
**Tasks:** 13, 14, 15 (marked with *)  
**Dependencies:** PR8

```bash
# Create branch for tests
git checkout feat/leadership-books
git pull
git checkout -b feat/leadership-books-tests

# After completing tasks 13 & 14, commit and push
git add .
git commit -m "test: add unit and integration tests for books feature"
git push -u origin feat/leadership-books-tests

# Create PR
gh pr create --base feat/leadership-books --head feat/leadership-books-tests \
  --title "test(books): add unit and integration tests for books feature" \
  --body "**Optional: Tests**

- ✅ Task 13: Unit tests
- ✅ Task 14: Integration tests

**Testing:**
- [ ] All tests pass
- [ ] Coverage meets requirements"

# Create branch for docs
git checkout feat/leadership-books
git pull
git checkout -b feat/leadership-books-docs

# After completing task 15, commit and push
git add .
git commit -m "docs: add documentation for books feature"
git push -u origin feat/leadership-books-docs

# Create PR
gh pr create --base feat/leadership-books --head feat/leadership-books-docs \
  --title "docs(books): add documentation for schemas, usage, and features" \
  --body "**Optional: Documentation**

- ✅ Task 15: Documentation updates

**Testing:**
- [ ] Documentation is accurate and complete"
```

---

### Final: Merge to Main

After all PRs are merged into `feat/leadership-books` and QA is complete:

```bash
# Create PR to merge feature branch to main
gh pr create --base main --head feat/leadership-books \
  --title "feat(books): add complete leadership books feature with summaries, chapters, and quotes" \
  --body "**Complete Leadership Books Feature**

This PR merges the complete leadership books feature including:
- Sanity schemas for books, chapters, and quotes
- Book listing page with sorting
- Book detail pages with related books and quotes
- Chapter detail pages
- Navigation integration
- SEO metadata
- Presentation Studio support

All PRs have been reviewed and merged into feat/leadership-books.
Full QA completed on feature branch."
```

---

# Implementation Plan

- [x] 1. Set up Sanity schemas for books, chapters, and quotes
  - Create book schema with all metadata, content, SEO, and relationship fields
  - Create chapter schema with parent book reference
  - Create quote schema with book and optional chapter references
  - Register all new schemas in schema.js
  - _Requirements: 1.1-1.9, 2.1-2.7, 3.1-3.5, 7.1-7.4, 9.1-9.4, 10.1-10.7_

- [x] 2. Create TypeScript types for book data models
  - Define Book type with all fields including related books and quotes
  - Define Chapter type with parent book reference
  - Define Quote type with parent references
  - Export types for use across the application
  - _Requirements: 1.1-1.9, 2.1-2.7, 3.1-3.5, 10.1-10.7_

- [x] 3. Add GROQ queries for data fetching
  - Create allBooksQuery for listing books
  - Create paginatedBooksQuery with sorting support
  - Create bookBySlugQuery with related books, chapters, and quotes
  - Create chapterBySlugQuery with chapter-specific quotes
  - Create allBookSlugsQuery for static generation
  - Create allChapterSlugsQuery for static generation
  - _Requirements: 4.1-4.10, 9.2-9.3, 10.6-10.7, 11.1-11.6_

- [x] 4. Implement book listing page with sorting
  - Create books/page.tsx with pagination
  - Implement sort parameter handling (rating, dateRead, author)
  - Add sorting UI controls (dropdown or buttons)
  - Display book cards in grid layout
  - Persist sort selection in URL query parameters
  - _Requirements: 4.1-4.2, 11.1-11.6_

- [x] 5. Implement book detail page
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

- [x] 6. Implement chapter detail page
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
