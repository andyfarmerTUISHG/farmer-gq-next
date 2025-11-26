# Leadership Books Feature

This feature enables the site owner to create and manage summaries of leadership books, including detailed metadata, chapter-level summaries, quotes, and related books.

## Overview

The Leadership Books feature consists of three main content types:

- **Books**: Complete book entries with metadata, summaries, ratings, and relationships
- **Chapters**: Chapter-level summaries linked to parent books
- **Quotes**: Memorable passages and highlights from books or specific chapters

## Content Types

### Book Schema

Books are the primary content type for managing leadership book summaries.

#### Core Fields

| Field          | Type      | Required | Description                                         |
| -------------- | --------- | -------- | --------------------------------------------------- |
| `title`        | String    | Yes      | The book's title                                    |
| `slug`         | Slug      | Yes      | URL-friendly identifier (auto-generated from title) |
| `author`       | String    | Yes      | Author's name                                       |
| `coverImage`   | Image     | Yes      | Book cover image with hotspot support               |
| `rating`       | Number    | Yes      | Personal rating from 1-5                            |
| `summary`      | Rich Text | Yes      | Main book summary with formatted content            |
| `keyTakeaways` | Rich Text | Yes      | List of key insights and lessons                    |

#### Optional Metadata

| Field                 | Type    | Description                                |
| --------------------- | ------- | ------------------------------------------ |
| `bookWebsite`         | URL     | Official book website                      |
| `amazonLink`          | URL     | Standard Amazon product link               |
| `amazonAffiliateLink` | URL     | Amazon affiliate link with tracking        |
| `dateRead`            | Date    | When you finished reading the book         |
| `personalNotes`       | Text    | Private notes (only visible in draft mode) |
| `isAiSummary`         | Boolean | Flag indicating AI-generated content       |

#### Categorization

| Field  | Type            | Description                                  |
| ------ | --------------- | -------------------------------------------- |
| `tags` | Reference Array | Tags shared with articles for categorization |

#### SEO Fields

| Field             | Type   | Max Length | Description                       |
| ----------------- | ------ | ---------- | --------------------------------- |
| `metaDescription` | Text   | 160 chars  | Custom search result description  |
| `metaTitle`       | String | 60 chars   | Custom page title                 |
| `ogImage`         | Image  | -          | Custom social media preview image |
| `focusKeyword`    | String | -          | Primary SEO keyword               |

**SEO Fallback Behaviors:**

- If `metaDescription` is not provided, the first 160 characters of the summary are used
- If `metaTitle` is not provided, the book title is used
- If `ogImage` is not provided, the book cover image is used

#### Relationships

| Field          | Type            | Description                         |
| -------------- | --------------- | ----------------------------------- |
| `relatedBooks` | Reference Array | Links to other related book entries |
| `chapters`     | Reference Array | Links to chapter documents          |

### Chapter Schema

Chapters provide detailed summaries for individual book chapters.

| Field           | Type      | Required | Description                                    |
| --------------- | --------- | -------- | ---------------------------------------------- |
| `chapterNumber` | String    | Yes      | Chapter identifier (e.g., "1", "Introduction") |
| `title`         | String    | Yes      | Chapter title                                  |
| `slug`          | Slug      | Yes      | URL-friendly identifier                        |
| `summary`       | Rich Text | Yes      | Chapter summary content                        |
| `parentBook`    | Reference | Yes      | Reference to the parent book                   |

### Quote Schema

Quotes capture memorable passages and highlights from books.

| Field           | Type      | Required | Description                            |
| --------------- | --------- | -------- | -------------------------------------- |
| `quoteText`     | Text      | Yes      | The quote or highlight text            |
| `context`       | Text      | No       | Additional context or commentary       |
| `parentBook`    | Reference | Yes      | Reference to the parent book           |
| `parentChapter` | Reference | No       | Optional reference to specific chapter |

## Creating Content in Sanity Studio

### Creating a Book

1. Navigate to the Sanity Studio
2. Click "Leadership Books" in the content menu
3. Click "Create new" or the "+" button
4. Fill in the required fields:
   - **Title**: Enter the book title (slug auto-generates)
   - **Author**: Enter the author's name
   - **Cover Image**: Upload the book cover
   - **Rating**: Select a rating from 1-5
   - **Summary**: Write or paste the book summary using the rich text editor
   - **Key Takeaways**: List the main insights
5. Optionally add:
   - Amazon links (standard and affiliate)
   - Date read
   - Personal notes (private, only visible when authenticated)
   - Tags for categorization
   - SEO metadata (description, title, OG image, focus keyword)
6. Click "Publish"

### Creating a Chapter

1. Navigate to "Book Chapters" in the content menu
2. Click "Create new"
3. Fill in the fields:
   - **Chapter Number**: Enter the chapter identifier
   - **Title**: Enter the chapter title
   - **Slug**: Auto-generates from title
   - **Summary**: Write the chapter summary
   - **Parent Book**: Select the book this chapter belongs to
4. Click "Publish"

### Creating a Quote

1. Navigate to "Book Quotes & Highlights" in the content menu
2. Click "Create new"
3. Fill in the fields:
   - **Quote Text**: Enter the quote or highlight
   - **Context**: Optionally add commentary or context
   - **Parent Book**: Select the book (required)
   - **Parent Chapter**: Optionally select a specific chapter
4. Click "Publish"

### Linking Related Books

1. Open a book document in Sanity Studio
2. Scroll to the "Related Books" field
3. Click "Add item"
4. Search for and select related books
5. Reorder as needed by dragging
6. Click "Publish"

## URL Structure

The books feature uses the following URL patterns:

- **Book Listing**: `/books`
- **Book Detail**: `/books/[slug]`
- **Chapter Detail**: `/books/[slug]/chapters/[chapter-slug]`

### Examples

- `/books` - Lists all books
- `/books/extreme-ownership` - Book detail page
- `/books/extreme-ownership/chapters/chapter-1` - Chapter detail page

## Sorting and Filtering

### Available Sort Options

The book listing page supports three sorting options:

| Sort Option              | URL Parameter    | Description                        |
| ------------------------ | ---------------- | ---------------------------------- |
| Rating (High to Low)     | `?sort=rating`   | Sort by personal rating (5 to 1)   |
| Date Read (Recent First) | `?sort=dateRead` | Sort by when you read the book     |
| Author (A-Z)             | `?sort=author`   | Sort alphabetically by author name |

### Using Sort Parameters

Sort options are controlled via URL query parameters and persist across navigation:

```
/books?sort=rating        # Sort by rating
/books?sort=dateRead      # Sort by date read
/books?sort=author        # Sort by author
```

The selected sort option is maintained in the URL, allowing users to bookmark or share sorted views.

### Pagination

The book listing page includes pagination controls. Page numbers are also managed via URL parameters:

```
/books?page=2             # Second page
/books?sort=rating&page=2 # Second page, sorted by rating
```

## Draft Mode and Personal Notes

### Personal Notes Visibility

Personal notes are private observations that are only visible when authenticated in Sanity Studio:

- **Public View**: Personal notes are hidden from all visitors
- **Draft Mode**: Personal notes are visible when viewing the site through Sanity's Presentation Studio or when draft mode is enabled

### Enabling Draft Mode

Draft mode is automatically enabled when:

1. You're logged into Sanity Studio
2. You're using Presentation Studio to preview content
3. You access the site via the draft mode API route

This ensures your private notes remain private while allowing you to see them during content editing.

## Related Books Feature

### How It Works

The related books feature allows you to manually curate connections between books:

1. **Manual Selection**: Choose which books are related in Sanity Studio
2. **Display**: Related books appear at the bottom of book detail pages
3. **Information Shown**: Cover image, title, author, and rating
4. **Navigation**: Click any related book to navigate to its detail page

### Best Practices

- Link books with similar themes or topics
- Link books by the same author
- Link books that complement each other's insights
- Limit to 3-5 related books for better user experience

## Quotes and Highlights Feature

### Quote Types

Quotes can be associated with:

- **Book-level quotes**: General insights from the entire book
- **Chapter-level quotes**: Specific to a particular chapter

### Display Locations

- **Book Detail Page**: Shows all book-level quotes (not associated with a specific chapter)
- **Chapter Detail Page**: Shows chapter-specific quotes

### Adding Context

Use the optional `context` field to:

- Explain why the quote is significant
- Add your personal interpretation
- Provide additional background information
- Connect the quote to other concepts

## SEO and Metadata

### Automatic Fallbacks

The system automatically generates SEO metadata when custom values aren't provided:

| Metadata         | Custom Field      | Fallback                        |
| ---------------- | ----------------- | ------------------------------- |
| Page Title       | `metaTitle`       | Book title                      |
| Meta Description | `metaDescription` | First 160 characters of summary |
| OG Image         | `ogImage`         | Book cover image                |

### Best Practices

- **Meta Title**: Keep under 60 characters, include the book title
- **Meta Description**: Keep under 160 characters, summarize the key value
- **Focus Keyword**: Use the main topic or theme of the book
- **OG Image**: Use high-quality images (1200x630px recommended)

### Structured Data

The system automatically generates Schema.org Book markup including:

- Book title and author
- Rating information
- Publication details
- Cover image

This helps search engines understand and display your book content in rich results.

## Technical Details

### Static Generation

All book and chapter pages are statically generated at build time for optimal performance:

- Pages are pre-rendered during `npm run build`
- No server-side rendering required
- Fast page loads for visitors
- SEO-friendly

### Image Optimization

Book cover images are automatically optimized:

- Served via Sanity's image CDN
- Automatic format conversion (WebP)
- Responsive image sizes
- Hotspot support for cropping

### Rich Text Rendering

Book summaries and chapter content use Sanity's Portable Text format:

- Supports headings, lists, and formatting
- Can include images and code blocks
- Rendered with the `CustomPortableText` component
- Maintains consistent styling across the site

## Presentation Studio

### Visual Editing

Presentation Studio allows you to edit content while seeing a live preview:

1. Open Sanity Studio
2. Navigate to a book or chapter
3. Click "Open in Presentation"
4. Edit fields and see changes in real-time
5. Publish when satisfied

### Supported Fields

All book and chapter fields are editable in Presentation Studio, including:

- Text content (title, author, summary)
- Images (cover, OG image)
- Metadata (rating, dates, tags)
- Relationships (related books, chapters)

## Validation Rules

### Rating Validation

- Must be a number between 1 and 5
- Required field
- Displayed as star rating on the frontend

### Slug Validation

- Auto-generated from title
- Must be unique across all books/chapters
- URL-friendly format (lowercase, hyphens)

### Reference Integrity

- Chapters must reference a valid parent book
- Quotes must reference a valid parent book
- Related books must reference existing book documents

## Troubleshooting

### Book Not Appearing

- Ensure the book is published (not in draft state)
- Check that required fields are filled
- Verify the slug is unique
- Rebuild the site to regenerate static pages

### Personal Notes Visible to Public

- Verify draft mode is disabled for public visitors
- Check that the draft mode API route is properly configured
- Ensure authentication is working correctly

### Images Not Loading

- Verify images are uploaded to Sanity
- Check image URLs in the browser console
- Ensure Sanity CDN is accessible
- Verify image hotspot is set if using cropping

### Sort Not Working

- Check URL parameters are correctly formatted
- Verify the sort parameter matches available options
- Clear browser cache if sort appears stuck
- Check console for JavaScript errors

## Future Enhancements

Potential improvements for the books feature:

- **Search**: Full-text search across books, chapters, and quotes
- **Filtering**: Filter by tags, rating, or date range
- **Reading Progress**: Track reading progress for books
- **Notes Export**: Export personal notes to PDF or Markdown
- **Book Collections**: Group books into curated collections
- **Reading Stats**: Visualize reading habits and statistics
