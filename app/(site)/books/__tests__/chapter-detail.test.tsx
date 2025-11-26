import { describe, expect, it } from "vitest";

import type { ChapterDetail } from "@/types";

describe("chapter Detail Page", () => {
  const mockChapterDetail: ChapterDetail = {
    _id: "chapter-1",
    _type: "chapter",
    _createdAt: "2024-01-01T00:00:00Z",
    _updatedAt: "2024-01-15T00:00:00Z",
    _rev: "rev-123",
    chapterNumber: "1",
    title: "Model the Way",
    slug: { _type: "slug", current: "model-the-way" },
    summary: [
      {
        _type: "block",
        _key: "block-1",
        style: "normal",
        children: [
          {
            _type: "span",
            _key: "span-1",
            text: "Leaders must model the behavior they expect from others.",
            marks: [],
          },
        ],
        markDefs: [],
      },
    ],
    parentBook: {
      _ref: "book-1",
      _type: "reference",
      _id: "book-1",
      title: "The Leadership Challenge",
      slug: { _type: "slug", current: "leadership-challenge" },
      author: "James Kouzes",
    },
    quotes: [
      {
        _id: "quote-1",
        _type: "quote",
        quoteText: "Actions speak louder than words in leadership.",
        context: "From the chapter introduction",
      },
      {
        _id: "quote-2",
        _type: "quote",
        quoteText: "Be the change you want to see in your organization.",
      },
    ],
  };

  it("should have all required chapter fields", () => {
    expect(mockChapterDetail).toHaveProperty("_id");
    expect(mockChapterDetail).toHaveProperty("_type");
    expect(mockChapterDetail).toHaveProperty("chapterNumber");
    expect(mockChapterDetail).toHaveProperty("title");
    expect(mockChapterDetail).toHaveProperty("slug");
    expect(mockChapterDetail).toHaveProperty("summary");
  });

  it("should have valid parent book reference", () => {
    expect(mockChapterDetail.parentBook).toBeDefined();
    expect(mockChapterDetail.parentBook).toHaveProperty("_id");
    expect(mockChapterDetail.parentBook).toHaveProperty("title");
    expect(mockChapterDetail.parentBook).toHaveProperty("slug");
    expect(mockChapterDetail.parentBook).toHaveProperty("author");
  });

  it("should have valid parent book slug for navigation", () => {
    expect(mockChapterDetail.parentBook.slug).toBeDefined();
    expect(mockChapterDetail.parentBook.slug).toHaveProperty("current");
    expect(mockChapterDetail.parentBook.slug.current).toBeTruthy();
  });

  it("should have valid chapter number", () => {
    expect(mockChapterDetail.chapterNumber).toBeTruthy();
    expect(typeof mockChapterDetail.chapterNumber).toBe("string");
  });

  it("should have valid chapter title", () => {
    expect(mockChapterDetail.title).toBeTruthy();
    expect(typeof mockChapterDetail.title).toBe("string");
  });

  it("should have valid summary content", () => {
    expect(mockChapterDetail.summary).toBeDefined();
    expect(Array.isArray(mockChapterDetail.summary)).toBe(true);
    expect(mockChapterDetail.summary.length).toBeGreaterThan(0);

    const firstBlock = mockChapterDetail.summary[0];
    expect(firstBlock).toHaveProperty("_type", "block");
    expect(firstBlock).toHaveProperty("children");
    expect(Array.isArray(firstBlock.children)).toBe(true);
  });

  it("should have valid chapter-specific quotes", () => {
    expect(mockChapterDetail.quotes).toBeDefined();
    expect(Array.isArray(mockChapterDetail.quotes)).toBe(true);
    expect(mockChapterDetail.quotes?.length).toBeGreaterThan(0);

    mockChapterDetail.quotes?.forEach((quote) => {
      expect(quote).toHaveProperty("_id");
      expect(quote).toHaveProperty("quoteText");
      expect(quote.quoteText).toBeTruthy();
    });
  });

  it("should support breadcrumb navigation structure", () => {
    const breadcrumbPath = {
      books: "/books",
      book: `/books/${mockChapterDetail.parentBook.slug.current}`,
      chapter: `/books/${mockChapterDetail.parentBook.slug.current}/chapters/${mockChapterDetail.slug.current}`,
    };

    expect(breadcrumbPath.books).toBe("/books");
    expect(breadcrumbPath.book).toContain(mockChapterDetail.parentBook.slug.current);
    expect(breadcrumbPath.chapter).toContain(mockChapterDetail.slug.current);
  });

  it("should have valid parent book metadata for display", () => {
    expect(mockChapterDetail.parentBook.title).toBeTruthy();
    expect(mockChapterDetail.parentBook.author).toBeTruthy();
  });

  it("should support optional quote context", () => {
    const quoteWithContext = mockChapterDetail.quotes?.find(q => q.context);
    const quoteWithoutContext = mockChapterDetail.quotes?.find(q => !q.context);

    if (quoteWithContext) {
      expect(quoteWithContext.context).toBeTruthy();
    }

    if (quoteWithoutContext) {
      expect(quoteWithoutContext.context).toBeUndefined();
    }
  });
});
