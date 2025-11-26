import { describe, expect, it } from "vitest";

import type { Book, Chapter } from "../../sanity.types";
import type { BookDetail, BookListItem, ChapterDetail, QuoteWithContext } from "../index";

describe("typeScript Type Validation - Books", () => {
  describe("bookListItem type", () => {
    it("should include required Book fields", () => {
      const bookListItem: BookListItem = {
        _id: "book-1",
        _type: "book",
        _createdAt: "2024-01-01T00:00:00Z",
        _updatedAt: "2024-01-01T00:00:00Z",
        _rev: "rev-1",
        title: "Leadership Book",
        slug: { _type: "slug", current: "leadership-book" },
        author: "John Doe",
        rating: 5,
        coverImage: {
          _type: "image",
          asset: {
            _ref: "image-ref",
            _type: "reference",
          },
        },
        dateRead: "2024-01-01",
      };

      expect(bookListItem._id).toBe("book-1");
      expect(bookListItem.title).toBe("Leadership Book");
      expect(bookListItem.author).toBe("John Doe");
      expect(bookListItem.rating).toBe(5);
    });

    it("should allow optional tags field", () => {
      const bookWithTags: BookListItem = {
        _id: "book-2",
        _type: "book",
        _createdAt: "2024-01-01T00:00:00Z",
        _updatedAt: "2024-01-01T00:00:00Z",
        _rev: "rev-1",
        title: "Book with Tags",
        slug: { _type: "slug", current: "book-with-tags" },
        author: "Jane Doe",
        rating: 4,
        coverImage: {
          _type: "image",
          asset: {
            _ref: "image-ref",
            _type: "reference",
          },
        },
        tags: [
          { _id: "tag-1", name: "Leadership" },
          { _id: "tag-2", name: "Management" },
        ],
      };

      expect(bookWithTags.tags).toHaveLength(2);
      expect(bookWithTags.tags?.[0].name).toBe("Leadership");
    });
  });

  describe("bookDetail type", () => {
    it("should extend Book with additional fields", () => {
      const bookDetail: BookDetail = {
        _id: "book-1",
        _type: "book",
        _createdAt: "2024-01-01T00:00:00Z",
        _updatedAt: "2024-01-01T00:00:00Z",
        _rev: "rev-1",
        title: "Detailed Book",
        slug: { _type: "slug", current: "detailed-book" },
        author: "Author Name",
        rating: 5,
        coverImage: {
          _type: "image",
          asset: {
            _ref: "image-ref",
            _type: "reference",
          },
        },
        summary: [
          {
            _type: "block",
            _key: "block-1",
            children: [
              {
                _type: "span",
                _key: "span-1",
                text: "Summary text",
                marks: [],
              },
            ],
            style: "normal",
          },
        ],
        keyTakeaways: [
          {
            _type: "block",
            _key: "block-2",
            children: [
              {
                _type: "span",
                _key: "span-2",
                text: "Key takeaway",
                marks: [],
              },
            ],
            style: "normal",
          },
        ],
        relatedBooks: [
          {
            _id: "book-2",
            _type: "book",
            _createdAt: "2024-01-01T00:00:00Z",
            _updatedAt: "2024-01-01T00:00:00Z",
            _rev: "rev-2",
            title: "Related Book",
            slug: { _type: "slug", current: "related-book" },
            author: "Another Author",
            rating: 4,
            coverImage: {
              _type: "image",
              asset: {
                _ref: "image-ref-2",
                _type: "reference",
              },
            },
          },
        ],
        chapters: [
          {
            _id: "chapter-1",
            chapterNumber: "1",
            title: "Chapter One",
            slug: { _type: "slug", current: "chapter-one" },
          },
        ],
        quotes: [
          {
            _id: "quote-1",
            quoteText: "Memorable quote",
            context: "Context for the quote",
          },
        ],
      };

      expect(bookDetail.relatedBooks).toHaveLength(1);
      expect(bookDetail.chapters).toHaveLength(1);
      expect(bookDetail.quotes).toHaveLength(1);
    });
  });

  describe("chapterDetail type", () => {
    it("should extend Chapter with parentBook and quotes", () => {
      const chapterDetail: ChapterDetail = {
        _id: "chapter-1",
        _type: "chapter",
        _createdAt: "2024-01-01T00:00:00Z",
        _updatedAt: "2024-01-01T00:00:00Z",
        _rev: "rev-1",
        chapterNumber: "1",
        title: "Chapter Title",
        slug: { _type: "slug", current: "chapter-title" },
        summary: [
          {
            _type: "block",
            _key: "block-1",
            children: [
              {
                _type: "span",
                _key: "span-1",
                text: "Chapter summary",
                marks: [],
              },
            ],
            style: "normal",
          },
        ],
        parentBook: {
          _id: "book-1",
          title: "Parent Book",
          slug: { _type: "slug", current: "parent-book" },
          author: "Book Author",
        },
        quotes: [
          {
            _id: "quote-1",
            quoteText: "Chapter quote",
            context: "Quote context",
          },
        ],
      };

      expect(chapterDetail.parentBook._id).toBe("book-1");
      expect(chapterDetail.parentBook.title).toBe("Parent Book");
      expect(chapterDetail.quotes).toHaveLength(1);
    });
  });

  describe("quoteWithContext type", () => {
    it("should extend Quote with parent references", () => {
      const quoteWithContext: QuoteWithContext = {
        _id: "quote-1",
        _type: "quote",
        _createdAt: "2024-01-01T00:00:00Z",
        _updatedAt: "2024-01-01T00:00:00Z",
        _rev: "rev-1",
        quoteText: "Inspirational quote",
        context: "Context about the quote",
        parentBook: {
          _id: "book-1",
          title: "Book Title",
        },
        parentChapter: {
          _id: "chapter-1",
          title: "Chapter Title",
        },
      };

      expect(quoteWithContext.parentBook._id).toBe("book-1");
      expect(quoteWithContext.parentChapter?._id).toBe("chapter-1");
    });

    it("should allow optional parentChapter", () => {
      const quoteWithoutChapter: QuoteWithContext = {
        _id: "quote-2",
        _type: "quote",
        _createdAt: "2024-01-01T00:00:00Z",
        _updatedAt: "2024-01-01T00:00:00Z",
        _rev: "rev-1",
        quoteText: "Another quote",
        parentBook: {
          _id: "book-1",
          title: "Book Title",
        },
      };

      expect(quoteWithoutChapter.parentChapter).toBeUndefined();
    });
  });

  describe("type compatibility", () => {
    it("should allow Book to be assigned to BookListItem subset", () => {
      const book: Book = {
        _id: "book-1",
        _type: "book",
        _createdAt: "2024-01-01T00:00:00Z",
        _updatedAt: "2024-01-01T00:00:00Z",
        _rev: "rev-1",
        title: "Test Book",
        slug: { _type: "slug", current: "test-book" },
        author: "Test Author",
        rating: 5,
        coverImage: {
          _type: "image",
          asset: {
            _ref: "image-ref",
            _type: "reference",
          },
        },
      };

      // This should compile without errors
      const listItem: BookListItem = {
        _id: book._id,
        _type: book._type,
        _createdAt: book._createdAt,
        _updatedAt: book._updatedAt,
        _rev: book._rev,
        title: book.title,
        slug: book.slug,
        author: book.author,
        rating: book.rating,
        coverImage: book.coverImage,
        dateRead: book.dateRead,
      };

      expect(listItem._id).toBe(book._id);
    });

    it("should allow Chapter to be used in ChapterDetail", () => {
      const chapter: Chapter = {
        _id: "chapter-1",
        _type: "chapter",
        _createdAt: "2024-01-01T00:00:00Z",
        _updatedAt: "2024-01-01T00:00:00Z",
        _rev: "rev-1",
        chapterNumber: "1",
        title: "Test Chapter",
        slug: { _type: "slug", current: "test-chapter" },
      };

      const chapterDetail: ChapterDetail = {
        ...chapter,
        parentBook: {
          _id: "book-1",
          title: "Parent Book",
          slug: { _type: "slug", current: "parent-book" },
          author: "Author",
        },
      };

      expect(chapterDetail._id).toBe(chapter._id);
      expect(chapterDetail.parentBook._id).toBe("book-1");
    });
  });

  describe("rating validation", () => {
    it("should accept valid rating values (1-5)", () => {
      const validRatings = [1, 2, 3, 4, 5];

      validRatings.forEach((rating) => {
        const book: BookListItem = {
          _id: "book-1",
          _type: "book",
          _createdAt: "2024-01-01T00:00:00Z",
          _updatedAt: "2024-01-01T00:00:00Z",
          _rev: "rev-1",
          title: "Test Book",
          slug: { _type: "slug", current: "test-book" },
          author: "Author",
          rating,
          coverImage: {
            _type: "image",
            asset: {
              _ref: "image-ref",
              _type: "reference",
            },
          },
        };

        expect(book.rating).toBeGreaterThanOrEqual(1);
        expect(book.rating).toBeLessThanOrEqual(5);
      });
    });
  });

  describe("slug structure validation", () => {
    it("should have correct slug structure", () => {
      const book: BookListItem = {
        _id: "book-1",
        _type: "book",
        _createdAt: "2024-01-01T00:00:00Z",
        _updatedAt: "2024-01-01T00:00:00Z",
        _rev: "rev-1",
        title: "Test Book",
        slug: {
          _type: "slug",
          current: "test-book",
        },
        author: "Author",
        rating: 5,
        coverImage: {
          _type: "image",
          asset: {
            _ref: "image-ref",
            _type: "reference",
          },
        },
      };

      expect(book.slug?._type).toBe("slug");
      expect(book.slug?.current).toBe("test-book");
      expect(typeof book.slug?.current).toBe("string");
    });
  });
});
