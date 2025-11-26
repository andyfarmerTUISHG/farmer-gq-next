# Implementation Plan

## PR Strategy

This implementation is designed to be delivered as a series of incremental PRs into a feature branch.

### Setup: Create Feature Branch

```bash
# Create and push the main feature branch
git checkout -b feat/articles-enhancement
git push -u origin feat/articles-enhancement
```

---

### PR1: Foundation Layer (Tasks 1 + 2)

**Branch from:** `feat/articles-enhancement`  
**Tasks:** 1, 2  
**Dependencies:** None

```bash
# Create branch
git checkout feat/articles-enhancement
git pull
git checkout -b feat/articles-types

# After completing tasks 1 & 2, commit and push
git add .
git commit -m "feat: add TypeScript types for articles and verify schemas"
git push -u origin feat/articles-types

# Create PR
gh pr create --base feat/articles-enhancement --head feat/articles-types \
  --title "feat(articles): add TypeScript types and verify existing schemas" \
  --body "**PR1: Foundation Layer**

- ✅ Task 1: Verify existing schemas
- ✅ Task 2: TypeScript types

**Testing:**
- [x] Schemas verified in Sanity Studio
- [x] TypeScript types compile without errors
- [x] Types match existing schema structure"
```

---

### PR2: Data Layer (Task 3)

**Branch from:** `feat/articles-enhancement` (after PR1 merged)  
**Tasks:** 3  
**Dependencies:** PR1

```bash
# Create branch
git checkout feat/articles-enhancement
git pull
git checkout -b feat/articles-queries

# After completing task 3, commit and push
git add .
git commit -m "feat: add GROQ queries for articles with filtering and sorting"
git push -u origin feat/articles-queries

# Create PR
gh pr create --base feat/articles-enhancement --head feat/articles-queries \
  --title "feat(articles): add GROQ queries for articles with tag filtering and sorting" \
  --body "**PR2: Data Layer**

- ✅ Task 3: GROQ queries

**Testing:**
- [x] Queries return expected data structure
- [x] Sorting parameters work correctly
- [x] Tag filtering works correctly
- [x] Static generation queries return all slugs"
```

---

### PR3: Component Layer (Task 4)

**Branch from:** `feat/articles-enhancement` (can be parallel with PR2)  
**Tasks:** 4  
**Dependencies:** PR1 (types)

```bash
# Create branch
git checkout feat/articles-enhancement
git pull
git checkout -b feat/articles-components

# After completing task 4, commit and push
git add .
git commit -m "feat: add article UI components (ArticleCard, AuthorDisplay, TagChip)"
git push -u origin feat/articles-components

# Create PR
gh pr create --base feat/articles-enhancement --head feat/articles-components \
  --title "feat(articles): add ArticleCard, AuthorDisplay, and TagChip components" \
  --body "**PR3: Component Layer**

- ✅ Task 4: UI components

**Testing:**
- [ ] Components render with mock data
- [ ] Responsive design works on mobile/tablet/desktop
- [ ] ESLint passes"
```

---

### PR4: Article Listing (Task 5)

**Branch from:** `feat/articles-enhancement` (after PR2 & PR3 merged)  
**Tasks:** 5  
**Dependencies:** PR2, PR3

```bash
# Create branch
git checkout feat/articles-enhancement
git pull
git checkout -b feat/articles-listing

# After completing task 5, commit and push
git add .
git commit -m "feat: add article listing page with sorting, filtering, and pagination"
git push -u origin feat/articles-listing

# Create PR
gh pr create --base feat/articles-enhancement --head feat/articles-listing \
  --title "feat(articles): add /articles listing page with sorting, filtering, and pagination" \
  --body "**PR4: Article Listing**

- ✅ Task 5: Article listing page

**Testing:**
- [ ] Pagination works correctly
- [ ] Sorting by date (asc/desc) and updated date works
- [ ] Tag filtering updates the article list
- [ ] Sort and filter persist in URL query parameters
- [ ] Static generation works"
```

---

### PR5: Article Detail (Task 6)

**Branch from:** `feat/articles-enhancement` (after PR2 & PR3 merged)  
**Tasks:** 6  
**Dependencies:** PR2, PR3

```bash
# Create branch
git checkout feat/articles-enhancement
git pull
git checkout -b feat/articles-detail

# After completing task 6, commit and push
git add .
git commit -m "feat: add article detail page with rich content rendering"
git push -u origin feat/articles-detail

# Create PR
gh pr create --base feat/articles-enhancement --head feat/articles-detail \
  --title "feat(articles): add /articles/[slug] detail page with rich content and metadata" \
  --body "**PR5: Article Detail**

- ✅ Task 6: Article detail page

**Testing:**
- [ ] All article metadata displays correctly
- [ ] Authors section renders with profile links
- [ ] Tags section displays with filter links
- [ ] Rich content renders properly (text, images, code, links)
- [ ] Original source attribution displays when present
- [ ] Static generation works
- [ ] SEO metadata generated"
```

---

### PR6: Navigation & SEO (Tasks 7 + 8)

**Branch from:** `feat/articles-enhancement` (after PR4, PR5 merged)  
**Tasks:** 7, 8  
**Dependencies:** PR4, PR5

```bash
# Create branch
git checkout feat/articles-enhancement
git pull
git checkout -b feat/articles-nav-seo

# After completing tasks 7 & 8, commit and push
git add .
git commit -m "feat: add navigation integration and SEO metadata"
git push -u origin feat/articles-nav-seo

# Create PR
gh pr create --base feat/articles-enhancement --head feat/articles-nav-seo \
  --title "feat(articles): add Articles navigation link and SEO metadata" \
  --body "**PR6: Navigation & SEO**

- ✅ Task 7: Navigation integration
- ✅ Task 8: SEO metadata

**Testing:**
- [ ] Articles link appears in desktop navigation
- [ ] Articles link appears in mobile navigation
- [ ] SEO metadata generated correctly
- [ ] Schema.org structured data present"
```

---

### PR7: Validation & Polish (Tasks 9 + 10)

**Branch from:** `feat/articles-enhancement` (after all previous PRs merged)  
**Tasks:** 9, 10  
**Dependencies:** All previous PRs

```bash
# Create branch
git checkout feat/articles-enhancement
git pull
git checkout -b feat/articles-final

# After completing tasks 9, 10, commit and push
git add .
git commit -m "feat: add Presentation Studio support and final validation"
git push -u origin feat/articles-final

# Create PR
gh pr create --base feat/articles-enhancement --head feat/articles-final \
  --title "feat(articles): add Presentation Studio support and validation" \
  --body "**PR7: Validation & Polish**

- ✅ Task 9: Presentation Studio configuration
- ✅ Task 10: Testing and validation

**Testing:**
- [ ] Presentation Studio editing works
- [ ] All pages generate statically
- [ ] Responsive design verified
- [ ] Accessibility checks pass
- [ ] ESLint passes"
```

---

### Optional PRs (Tasks 11-13)

**Branch from:** `feat/articles-enhancement` (after PR7 merged)  
**Tasks:** 11, 12, 13 (marked with *)  
**Dependencies:** PR7

```bash
# Create branch for tests
git checkout feat/articles-enhancement
git pull
git checkout -b feat/articles-tests

# After completing tasks 11 & 12, commit and push
git add .
git commit -m "test: add unit and property-based tests for articles feature"
git push -u origin feat/articles-tests

# Create PR
gh pr create --base feat/articles-enhancement --head feat/articles-tests \
  --title "test(articles): add unit and property-based tests for articles feature" \
  --body "**Optional: Tests**

- ✅ Task 11: Unit tests
- ✅ Task 12: Property-based tests

**Testing:**
- [ ] All tests pass
- [ ] Coverage meets requirements"

# Create branch for docs
git checkout feat/articles-enhancement
git pull
git checkout -b feat/articles-docs

# After completing task 13, commit and push
git add .
git commit -m "docs: add documentation for articles feature"
git push -u origin feat/articles-docs

# Create PR
gh pr create --base feat/articles-enhancement --head feat/articles-docs \
  --title "docs(articles): add documentation for schemas, usage, and features" \
  --body "**Optional: Documentation**

- ✅ Task 13: Documentation updates

**Testing:**
- [ ] Documentation is accurate and complete"
```

---

### Final: Merge to Main

After all PRs are merged into `feat/articles-enhancement` and QA is complete:

```bash
# Create PR to merge feature branch to main
gh pr create --base main --head feat/articles-enhancement \
  --title "feat(articles): enhance articles feature with improved UI, filtering, and rich content" \
  --body "**Complete Articles Feature Enhancement**

This PR merges the complete articles feature enhancement including:
- TypeScript types for articles, authors, and tags
- Article listing page with sorting and tag filtering
- Article detail pages with rich content rendering
- Reusable UI components (ArticleCard, AuthorDisplay, TagChip)
- Navigation integration
- SEO metadata
- Presentation Studio support

All PRs have been reviewed and merged into feat/articles-enhancement.
Full QA completed on feature branch."
```

---

# Implementation Plan

- [ ] 1. Verify existing Sanity schemas
  - Verify article schema exists with all required fields
  - Verify person schema exists for author references
  - Verify tags schema exists for categorization
  - Confirm rich text content supports blocks, images, code, and links
  - Confirm slug generation is configured
  - _Requirements: 1.1-1.7, 2.1-2.10_

- [ ] 2. Create TypeScript types for article data models
  - Define Article type with all fields including authors and tags
  - Define Person type for author information
  - Define Tag type for categorization
  - Export types for use across the application
  - _Requirements: 1.1-1.7, 2.1-2.10_

- [ ] 3. Add GROQ queries for data fetching
  - Create allArticlesQuery for listing articles
  - Create paginatedArticlesQuery with sorting support
  - Create articlesByTagQuery for tag filtering
  - Create articleBySlugQuery with authors and tags
  - Create articlesCountQuery for pagination
  - Create allArticleSlugsQuery for static generation
  - _Requirements: 3.1-3.10, 7.1-7.5, 12.1-12.6_

- [ ] 4. Create reusable UI components
  - Create ArticleCard component for article previews
  - Create AuthorDisplay component for showing authors with avatars
  - Create TagChip component for displaying tags
  - Style components with Tailwind CSS
  - Ensure components are responsive
  - _Requirements: 3.2-3.3, 6.2, 6.4, 7.2-7.3_

- [ ] 5. Implement article listing page with sorting and filtering
  - Create articles/page.tsx with pagination
  - Implement sort parameter handling (date-asc, date-desc, updated)
  - Implement tag filter parameter handling
  - Add sorting UI controls (dropdown or buttons)
  - Add tag filter chips with clear functionality
  - Display article cards in grid layout
  - Persist sort and filter selections in URL query parameters
  - _Requirements: 3.1-3.3, 7.1-7.5, 12.1-12.6_

- [ ] 5.1 Write property test for tag filtering
  - **Property 11: Tag filtering returns only matching articles**
  - **Validates: Requirements 7.2**
  - _Requirements: 7.2_

- [ ] 5.2 Write property test for filter URL state
  - **Property 12: Filter state persists in URL**
  - **Validates: Requirements 7.4**
  - _Requirements: 7.4_

- [ ] 5.3 Write property test for article sorting
  - **Property 17: Article sorting maintains order**
  - **Validates: Requirements 12.2, 12.3, 12.4**
  - _Requirements: 12.2-12.4_

- [ ] 5.4 Write property test for sort URL state
  - **Property 18: Sort state persists in URL**
  - **Validates: Requirements 12.6**
  - _Requirements: 12.6_

- [ ] 6. Implement article detail page
  - Create articles/[slug]/page.tsx with static generation
  - Display article title, featured image, authors, tags, and dates
  - Render rich content using CustomPortableText
  - Display original source attribution if provided
  - Link to author profile pages
  - Link to tag-filtered article lists
  - Add Sanity data attributes for Presentation Studio
  - Generate SEO metadata
  - _Requirements: 3.4-3.10, 5.2-5.4, 6.2, 6.4, 9.1-9.5, 10.3-10.5, 11.3-11.4_

- [ ] 6.1 Write property test for article detail rendering
  - **Property 5: Article detail rendering includes all content**
  - **Validates: Requirements 3.5, 3.6, 3.7, 3.8, 3.9**
  - _Requirements: 3.5-3.9_

- [ ] 6.2 Write property test for multiple authors display
  - **Property 10: Multiple authors display completely**
  - **Validates: Requirements 6.2, 6.4**
  - _Requirements: 6.2, 6.4_

- [ ] 6.3 Write property test for attribution display
  - **Property 9: Attribution display for sourced content**
  - **Validates: Requirements 5.3**
  - _Requirements: 5.3_

- [ ] 6.4 Write property test for date display
  - **Property 15: Article dates display on detail page**
  - **Validates: Requirements 10.3, 10.4**
  - _Requirements: 10.3-10.4_

- [ ] 6.5 Write property test for code block rendering
  - **Property 16: Code block rendering preserves formatting**
  - **Validates: Requirements 11.3, 11.4**
  - _Requirements: 11.3-11.4_

- [ ] 7. Integrate articles into site navigation
  - Add Articles link to desktop navigation menu
  - Add Articles link to mobile navigation menu
  - Ensure navigation integration doesn't affect existing menu items
  - Test navigation on both desktop and mobile
  - _Requirements: 8.1-8.3_

- [ ] 8. Implement SEO and metadata generation
  - Create metadata export function for article pages
  - Generate meta description from content excerpt (first 160 chars)
  - Use article title as meta title
  - Use featured image as OG image (fallback to site default)
  - Add Schema.org Article structured data
  - Include author and publication date in metadata
  - _Requirements: 3.9, 10.3-10.5_

- [ ] 9. Configure Presentation Studio support
  - Ensure all article fields have proper data attributes
  - Test visual editing in Presentation Studio
  - Verify live preview updates work correctly
  - _Requirements: 4.1-4.2_

- [ ] 10. Test and validate implementation
  - Verify all article pages generate statically at build time
  - Test sorting functionality on articles listing page
  - Test tag filtering functionality
  - Test rich content rendering (text, images, code, links)
  - Verify responsive design on mobile, tablet, and desktop
  - Test Presentation Studio editing workflow
  - Validate SEO metadata and structured data
  - Check accessibility (heading hierarchy, alt text, keyboard navigation)
  - Run ESLint to ensure code quality standards
  - _Requirements: All requirements_

- [ ]* 11. Write unit tests for core functionality
  - [ ]* 11.1 Write tests for GROQ query construction
  - [ ]* 11.2 Write tests for TypeScript type validation
  - [ ]* 11.3 Write tests for slug generation from various title formats
  - [ ]* 11.4 Write tests for date formatting
  - [ ]* 11.5 Write tests for URL validation
  - [ ]* 11.6 Write tests for image alt text fallback logic
  - _Requirements: 1.2, 2.9, 2.10, 4.6, 5.4, 9.4, 10.5_

- [ ]* 12. Write property-based tests for correctness properties
  - [ ]* 12.1 Write property test for slug generation
    - **Property 1: Slug generation produces URL-safe strings**
    - **Validates: Requirements 1.2**
  - [ ]* 12.2 Write property test for image alt text validation
    - **Property 2: Images without alt text are rejected**
    - **Validates: Requirements 2.9**
  - [ ]* 12.3 Write property test for URL validation
    - **Property 3: URL validation accepts valid URLs and rejects invalid ones**
    - **Validates: Requirements 2.10, 5.4**
  - [ ]* 12.4 Write property test for article list rendering
    - **Property 4: Article list rendering includes all required fields**
    - **Validates: Requirements 3.2, 3.3**
  - [ ]* 12.5 Write property test for required field validation
    - **Property 6: Required field validation rejects incomplete articles**
    - **Validates: Requirements 4.3**
  - [ ]* 12.6 Write property test for date formatting
    - **Property 7: Date formatting produces British English format**
    - **Validates: Requirements 4.6, 10.5**
  - [ ]* 12.7 Write property test for data persistence
    - **Property 8: Article data persistence round-trip**
    - **Validates: Requirements 5.2**
  - [ ]* 12.8 Write property test for image alt text fallback
    - **Property 13: Image alt text fallback to caption**
    - **Validates: Requirements 9.4**
  - [ ]* 12.9 Write property test for image CDN URL generation
    - **Property 14: Sanity image CDN URL generation**
    - **Validates: Requirements 9.2, 9.3, 9.5**
  - _Requirements: 1.2, 2.9, 2.10, 3.2-3.3, 4.3, 4.6, 5.2, 9.2-9.5, 10.5_

- [ ]* 13. Update project documentation
  - [ ]* 13.1 Document article schema fields and usage in README or docs
  - [ ]* 13.2 Add examples of creating articles in Sanity Studio
  - [ ]* 13.3 Document sorting and filtering options with URL parameters
  - [ ]* 13.4 Add notes about rich content capabilities (code blocks, images, links)
  - [ ]* 13.5 Document author and tag integration
  - _Requirements: All requirements_
