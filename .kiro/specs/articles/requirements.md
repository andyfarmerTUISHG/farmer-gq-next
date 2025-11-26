# Requirements Document

## Introduction

This feature enables the site owner to create and manage blog articles with rich content including text, images, code blocks, and external links. The system will support multiple authors, categorization through tags, and comprehensive content formatting options. This allows the site owner to share technical insights, tutorials, and thought leadership content with visitors.

## Glossary

- **Article System**: The complete feature set for managing blog articles on the website
- **Article Entry**: A document representing a single blog post with metadata and rich content
- **Rich Text Content**: Formatted text supporting headings, lists, quotes, code blocks, images, and links
- **Author**: A person who writes articles, referenced from the Person content type
- **Tags**: Categorization labels shared with the book content system for organizing and filtering content
- **Slug**: A URL-friendly identifier automatically generated from the article title
- **Code Block**: A formatted section for displaying code snippets with syntax highlighting
- **Inline Image**: An image embedded within the article content with caption and alt text
- **External Link**: A hyperlink to external resources or references
- **Original Source Material**: A URL field for attributing content that was originally published elsewhere
- **Featured Image**: The main image associated with an article, displayed in listings and detail pages
- **Caption**: Descriptive text accompanying an image
- **Alt Text**: Alternative text for images used by screen readers for accessibility
- **Attribution**: Credit information for images or content from external sources
- **Portable Text**: Sanity's rich text format that stores structured content as JSON
- **Block Quote**: A formatted quotation section within the article content
- **Hotspot**: An image focal point that ensures important parts remain visible when cropped

## Requirements

### Requirement 1

**User Story:** As a site owner, I want to create article entries with comprehensive metadata, so that I can properly organize and present my blog content

#### Acceptance Criteria

1. THE Article System SHALL provide a field for the article title
2. THE Article System SHALL generate a URL-friendly slug from the article title
3. THE Article System SHALL provide a tags field that references the existing tags content type
4. THE Article System SHALL provide an author field that references one or more persons from the Person content type
5. THE Article System SHALL provide an optional field for the original source material URL
6. THE Article System SHALL provide a featured image field with hotspot support
7. THE Article System SHALL provide caption and attribution fields for the featured image

### Requirement 2

**User Story:** As a site owner, I want to write rich content for articles, so that I can create engaging and well-formatted blog posts

#### Acceptance Criteria

1. THE Article System SHALL provide a rich text content field supporting multiple content types
2. THE Article System SHALL support normal paragraph text in the content field
3. THE Article System SHALL support heading levels H2, H3, H4, and H5 in the content field
4. THE Article System SHALL support block quotes in the content field
5. THE Article System SHALL support code blocks with syntax highlighting in the content field
6. THE Article System SHALL support inline images with captions and alt text in the content field
7. THE Article System SHALL support hyperlinks to external URLs in the content field
8. WHEN adding an inline image, THE Article System SHALL provide hotspot functionality for focal point selection
9. WHEN adding an inline image, THE Article System SHALL require alt text for accessibility
10. WHEN adding a hyperlink, THE Article System SHALL validate that the URL is properly formatted

### Requirement 3

**User Story:** As a site visitor, I want to browse articles, so that I can discover and read blog content

#### Acceptance Criteria

1. THE Article System SHALL provide a listing page displaying all article entries
2. WHEN displaying articles in a list, THE Article System SHALL show the article title, featured image, author, and tags
3. WHEN displaying articles in a list, THE Article System SHALL show the creation date and last updated date
4. THE Article System SHALL provide individual detail pages for each article entry
5. WHEN viewing an article detail page, THE Article System SHALL display the article title
6. WHEN viewing an article detail page, THE Article System SHALL display the author information with links to author profiles
7. WHEN viewing an article detail page, THE Article System SHALL display all tags with links to tag-filtered views
8. WHEN viewing an article detail page, THE Article System SHALL display the featured image if provided
9. WHEN viewing an article detail page, THE Article System SHALL render the rich text content with proper formatting
10. THE Article System SHALL generate static pages for all articles at build time

### Requirement 4

**User Story:** As a site owner, I want to manage article entries through the CMS, so that I can easily create, edit, and organize my blog content

#### Acceptance Criteria

1. THE Article System SHALL integrate with the existing Sanity CMS schema
2. THE Article System SHALL provide a dedicated content type for article entries in the CMS
3. WHEN creating or editing content, THE Article System SHALL validate required fields
4. THE Article System SHALL display article entries with preview information in the CMS listing view
5. WHEN displaying article previews in the CMS, THE Article System SHALL show the article title, creation date, and last updated date
6. THE Article System SHALL format dates in British English format (DD MMM YYYY)

### Requirement 5

**User Story:** As a site owner, I want to attribute content from external sources, so that I can properly credit original publishers

#### Acceptance Criteria

1. THE Article System SHALL provide an optional original source material URL field
2. WHEN an original source URL is provided, THE Article System SHALL store it with the article metadata
3. WHEN viewing an article with an original source URL, THE Article System SHALL display attribution information
4. THE Article System SHALL validate that original source URLs are properly formatted

### Requirement 6

**User Story:** As a site owner, I want to associate multiple authors with articles, so that I can credit co-authors and guest contributors

#### Acceptance Criteria

1. THE Article System SHALL support multiple author references for a single article
2. WHEN multiple authors are assigned, THE Article System SHALL display all authors on the article detail page
3. THE Article System SHALL allow reordering of authors in the CMS
4. WHEN an author is referenced, THE Article System SHALL link to the author's profile page

### Requirement 7

**User Story:** As a site visitor, I want to filter articles by tags, so that I can find content on specific topics

#### Acceptance Criteria

1. THE Article System SHALL provide tag-based filtering on the article listing page
2. WHEN a tag is selected, THE Article System SHALL display only articles associated with that tag
3. WHEN viewing a filtered list, THE Article System SHALL indicate which tag filter is active
4. THE Article System SHALL persist the selected tag filter in the URL query parameters
5. THE Article System SHALL provide a way to clear tag filters and return to the full article list

### Requirement 8

**User Story:** As a site visitor, I want to access the articles section from the main navigation, so that I can easily discover blog content

#### Acceptance Criteria

1. THE Article System SHALL provide a navigation link to the articles listing page
2. THE Article System SHALL display the articles navigation link in both desktop and mobile navigation menus
3. THE Article System SHALL integrate with the existing navigation system without modifying other menu items

### Requirement 9

**User Story:** As a site owner, I want images in articles to be optimized and accessible, so that pages load quickly and are usable by all visitors

#### Acceptance Criteria

1. THE Article System SHALL serve images through Sanity's image CDN
2. THE Article System SHALL automatically convert images to modern formats like WebP
3. THE Article System SHALL generate responsive image sizes for different screen widths
4. WHEN an image lacks alt text, THE Article System SHALL fall back to the caption for accessibility
5. THE Article System SHALL preserve image hotspot settings when rendering images at different aspect ratios

### Requirement 10

**User Story:** As a site visitor, I want to see when articles were published and updated, so that I can assess content freshness

#### Acceptance Criteria

1. THE Article System SHALL automatically track the creation date for each article
2. THE Article System SHALL automatically track the last updated date for each article
3. WHEN viewing an article detail page, THE Article System SHALL display the publication date
4. WHEN an article has been updated, THE Article System SHALL display the last updated date
5. THE Article System SHALL format dates in a human-readable format (e.g., "26 Nov 2025")

### Requirement 11

**User Story:** As a site owner, I want code blocks in articles to be properly formatted, so that technical content is readable and professional

#### Acceptance Criteria

1. THE Article System SHALL support code blocks within the rich text content
2. WHEN a code block is added, THE Article System SHALL allow specifying the programming language
3. WHEN rendering code blocks, THE Article System SHALL apply syntax highlighting based on the specified language
4. THE Article System SHALL preserve code formatting including indentation and line breaks
5. THE Article System SHALL display code blocks with a distinct visual style from regular text

### Requirement 12

**User Story:** As a site visitor, I want to sort articles by date, so that I can find the most recent or oldest content

#### Acceptance Criteria

1. THE Article System SHALL provide sorting options for the articles listing page
2. THE Article System SHALL support sorting by creation date in descending order (newest first)
3. THE Article System SHALL support sorting by creation date in ascending order (oldest first)
4. THE Article System SHALL support sorting by last updated date in descending order
5. WHEN a sort option is selected, THE Article System SHALL update the article list accordingly
6. THE Article System SHALL persist the selected sort option in the URL query parameters
