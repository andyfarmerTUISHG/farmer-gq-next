# Leadership Books Feature - Spec Discussion

## Initial Request

User wanted to add a section to the site for summarizing leadership books they've read, with the following features:

- Book summaries to recall key points
- Chapter sub-pages for detailed insights
- Author name and website fields
- Two Amazon links (one with affiliate, one without)
- Book cover image upload
- Boolean field for AI summary indicator

## Requirements Evolution

### Round 1: Core Features

- Added Presentation Studio support for visual editing
- Added "date read" field (optional)

### Round 2: Additional Metadata

- Added rating/score (1-5)
- Added key takeaways field
- Added personal notes field (visible only when logged into Sanity Studio)

### Round 3: Technical Requirements

- Confirmed need for static generation at build time using `generateStaticParams()`
- Added tags field (shared with existing article content type)
- Confirmed additive implementation (no destructive changes to existing code)
- Confirmed adherence to project ESLint rules (Antfu config)

### Round 4: SEO Features

- Added meta description field (optional, max 160 chars)
- Added meta title field (optional, max 60 chars)
- Added OG image field (optional, falls back to book cover)
- Added focus keyword field (optional)
- Implemented fallback logic for all SEO fields

### Round 5: Additional Features Discussion

User was asked about potential features:

1. ✅ Navigation integration - YES (desktop and mobile)
2. ❌ Search functionality - Separate spec/development
3. ✅ Related books - YES, include it
4. ❌ Reading progress - NO
5. ✅ Quotes/highlights - YES, with relationships to books and chapters
6. ❌ Book series - Not needed
7. ❌ External reviews - Not needed
8. ❌ Publication date - Not required
9. ❌ Page count - Not required
10. ✅ Sorting/filtering - YES (rating, date read, author)
11. ✅ Draft status - YES (handled by Sanity natively)
12. ❌ RSS feed - NO

## Final Feature Set

### Content Types

1. **Book** - Main content type with:
   - Metadata: title, slug, author, website, Amazon links, cover image, date read
   - Content: rating, summary, key takeaways, personal notes, AI summary flag
   - SEO: meta description, meta title, OG image, focus keyword
   - Relationships: tags, related books, chapters

2. **Chapter** - Child content type with:
   - Metadata: chapter number, title, slug
   - Content: summary
   - Relationships: parent book

3. **Quote** - Highlights/quotes with:
   - Content: quote text, context
   - Relationships: parent book (required), parent chapter (optional)

### Pages

- `/books` - List page with sorting (rating, date read, author) and pagination
- `/books/[slug]` - Book detail page with related books, quotes, chapters
- `/books/[slug]/chapters/[chapterSlug]` - Chapter detail page with chapter-specific quotes

### Features

- Static generation at build time for all pages
- Presentation Studio support for visual editing
- Personal notes visible only when authenticated in Sanity Studio
- Navigation integration (desktop and mobile)
- Related books recommendations
- Quotes/highlights system
- Sorting options on listing page
- SEO metadata with smart fallbacks
- Responsive design
- Accessibility compliant

## Technical Decisions

### Code Quality

- Follow Antfu ESLint config
- Use kebab-case for file names
- Use `type` instead of `interface`
- 2-space indentation, semicolons, double quotes
- Sorted imports
- No console.log statements

### Architecture

- Additive implementation (no modifications to existing article functionality)
- Shared tags system with articles
- Sanity CMS for content management
- Next.js App Router with route groups
- GROQ queries for data fetching
- Sanity Live Content API
- CustomPortableText for rich content rendering

### Files to Create

- `schema/book.js`
- `schema/chapter.js`
- `schema/quote.js`
- `app/(site)/books/page.tsx`
- `app/(site)/books/[slug]/page.tsx`
- `app/(site)/books/[slug]/chapters/[chapterSlug]/page.tsx`
- `app/(site)/components/book-card.tsx`
- `app/(site)/components/rating-stars.tsx`
- `app/(site)/components/quote-card.tsx`
- `types/book.ts`

### Files to Modify

- `schema/schema.js` - add new schema imports
- `sanity/lib/queries.ts` - append new queries
- Navigation component - add Books menu item
- Type export files (if needed)

## Implementation Plan

12 core tasks covering:

1. Sanity schemas setup
2. TypeScript types
3. GROQ queries
4. Book listing page with sorting
5. Book detail page with related books and quotes
6. Chapter detail page with quotes
7. Reusable UI components
8. Navigation integration
9. SEO and metadata generation
10. Presentation Studio configuration
11. Draft mode verification
12. Testing and validation

3 optional tasks (marked with \*): 13. Unit tests 14. Integration tests 15. Documentation updates

## Key Decisions Made

- Search functionality deferred to separate spec
- Reading progress tracking not included
- Book series support not included
- External reviews not included
- Publication date and page count not included
- RSS feed not included
- Draft status handled by Sanity's native functionality
- Optional testing and documentation tasks can be completed later
- All SEO fields have smart fallback logic
- Personal notes only visible when authenticated in Sanity Studio

## Status

Spec complete and ready for implementation. User can begin by opening `tasks.md` and clicking "Start task" on any task item.
