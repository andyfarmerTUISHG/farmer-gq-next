import { describe, expect, it } from "vitest";

import type { BookDetail } from "@/types";

describe("book Detail Page", () => {
  const mockBookDetail: BookDetail = {
    _id: "book-1",
    _type: "book",
    _createdAt: "2024-01-01T00:00:00Z",
    _updatedAt: "2024-01-15T00:00:00Z",
    _rev: "rev-123",
    title: "The Leadership Challenge",
    slug: { _type: "slug", current: "leadership-challenge" },
    author: "James Kouzes",
    amazonLink: "https://amazon.com/book",
    amazonAffiliateLink: "https://amazon.com/book?tag=affiliate",
    coverImage: {
      _type: "image",
      asset: {
        _ref: "image-123",
        _type: "reference",
      },
    },
    rating: 5,
    summary: [
      {
        _type: "block",
        _key: "block-1",
        style: "normal",
        children: [
          {
            _type: "span",
            _key: "span-1",
            text: "This is a comprehensive guide to leadership.",
            marks: [],
          },
        ],
        markDefs: [],
      },
    ],
    keyTakeaways: [
      {
        _type: "block",
        _key: "block-2",
        style: "normal",
        children: [
          {
            _type: "span",
            _key: "span-2",
            text: "Leadership is about inspiring others.",
            marks: [],
          },
        ],
        markDefs: [],
      },
    ],
    isAiSummary: false,
    dateRead: "2024-01-15",
    bookWebsite: "https://leadershipchallenge.com",
    personalNotes: "Great insights on team motivation.",
    metaDescription: "A comprehensive guide to leadership principles",
    metaTitle: "The Leadership Challenge - Book Summary",
    focusKeyword: "leadership",
    tags: [
      { _id: "tag-1", name: "Leadership" },
      { _id: "tag-2", name: "Management" },
    ],
    relatedBooks: [
      {
        _id: "book-2",
        _type: "book",
        title: "Good to Great",
        slug: { _type: "slug", current: "good-to-great" },
        author: "Jim Collins",
        rating: 4,
        coverImage: {
          _type: "image",
          asset: {
            _ref: "image-456",
            _type: "reference",
          },
        },
        dateRead: "2024-02-20",
        _createdAt: "2024-02-01T00:00:00Z",
        _updatedAt: "2024-02-20T00:00:00Z",
      },
    ],
    chapters: [
      {
        _id: "chapter-1",
        _type: "chapter",
        chapterNumber: "1",
        title: "Model the Way",
        slug: { _type: "slug", current: "model-the-way" },
      },
      {
        _id: "chapter-2",
        _type: "chapter",
        chapterNumber: "2",
        title: "Inspire a Shared Vision",
        slug: { _type: "slug", current: "inspire-shared-vision" },
      },
    ],
    quotes: [
      {
        _id: "quote-1",
        _type: "quote",
        quoteText: "Leadership is not about being in charge. It's about taking care of those in your charge.",
        context: "From the introduction",
      },
    ],
  };

  it("should have all required book metadata fields", () => {
    expect(mockBookDetail).toHaveProperty("_id");
    expect(mockBookDetail).toHaveProperty("_type");
    expect(mockBookDetail).toHaveProperty("title");
    expect(mockBookDetail).toHaveProperty("slug");
    expect(mockBookDetail).toHaveProperty("author");
    expect(mockBookDetail).toHaveProperty("rating");
    expect(mockBookDetail).toHaveProperty("coverImage");
  });

  it("should have valid rating", () => {
    expect(mockBookDetail.rating).toBeGreaterThanOrEqual(1);
    expect(mockBookDetail.rating).toBeLessThanOrEqual(5);
    expect(Number.isInteger(mockBookDetail.rating)).toBe(true);
  });

  it("should have valid summary content", () => {
    expect(mockBookDetail.summary).toBeDefined();
    expect(Array.isArray(mockBookDetail.summary)).toBe(true);
    expect(mockBookDetail.summary.length).toBeGreaterThan(0);

    const firstBlock = mockBookDetail.summary[0];
    expect(firstBlock).toHaveProperty("_type", "block");
    expect(firstBlock).toHaveProperty("children");
    expect(Array.isArray(firstBlock.children)).toBe(true);
  });

  it("should have valid key takeaways", () => {
    expect(mockBookDetail.keyTakeaways).toBeDefined();
    expect(Array.isArray(mockBookDetail.keyTakeaways)).toBe(true);
    expect(mockBookDetail.keyTakeaways.length).toBeGreaterThan(0);
  });

  it("should have valid Amazon links", () => {
    expect(mockBookDetail.amazonLink).toBeTruthy();
    expect(mockBookDetail.amazonLink).toMatch(/^https?:\/\//);
    expect(mockBookDetail.amazonAffiliateLink).toBeTruthy();
    expect(mockBookDetail.amazonAffiliateLink).toMatch(/^https?:\/\//);
  });

  it("should have valid cover image structure", () => {
    expect(mockBookDetail.coverImage).toBeDefined();
    expect(mockBookDetail.coverImage).toHaveProperty("asset");
    expect(mockBookDetail.coverImage.asset).toHaveProperty("_ref");
  });

  it("should have valid tags", () => {
    expect(mockBookDetail.tags).toBeDefined();
    expect(Array.isArray(mockBookDetail.tags)).toBe(true);
    expect(mockBookDetail.tags?.length).toBeGreaterThan(0);

    mockBookDetail.tags?.forEach((tag) => {
      expect(tag).toHaveProperty("_id");
      expect(tag).toHaveProperty("name");
    });
  });

  it("should have valid related books", () => {
    expect(mockBookDetail.relatedBooks).toBeDefined();
    expect(Array.isArray(mockBookDetail.relatedBooks)).toBe(true);
    expect(mockBookDetail.relatedBooks?.length).toBeGreaterThan(0);

    mockBookDetail.relatedBooks?.forEach((book) => {
      expect(book).toHaveProperty("_id");
      expect(book).toHaveProperty("title");
      expect(book).toHaveProperty("author");
      expect(book).toHaveProperty("rating");
      expect(book).toHaveProperty("slug");
    });
  });

  it("should have valid chapters", () => {
    expect(mockBookDetail.chapters).toBeDefined();
    expect(Array.isArray(mockBookDetail.chapters)).toBe(true);
    expect(mockBookDetail.chapters?.length).toBeGreaterThan(0);

    mockBookDetail.chapters?.forEach((chapter) => {
      expect(chapter).toHaveProperty("_id");
      expect(chapter).toHaveProperty("chapterNumber");
      expect(chapter).toHaveProperty("title");
      expect(chapter).toHaveProperty("slug");
    });
  });

  it("should have valid quotes", () => {
    expect(mockBookDetail.quotes).toBeDefined();
    expect(Array.isArray(mockBookDetail.quotes)).toBe(true);
    expect(mockBookDetail.quotes?.length).toBeGreaterThan(0);

    mockBookDetail.quotes?.forEach((quote) => {
      expect(quote).toHaveProperty("_id");
      expect(quote).toHaveProperty("quoteText");
      expect(quote.quoteText).toBeTruthy();
    });
  });

  it("should have valid SEO metadata", () => {
    expect(mockBookDetail.metaTitle).toBeTruthy();
    expect(mockBookDetail.metaDescription).toBeTruthy();
    expect(mockBookDetail.focusKeyword).toBeTruthy();
  });

  it("should have personal notes field", () => {
    expect(mockBookDetail).toHaveProperty("personalNotes");
    expect(mockBookDetail.personalNotes).toBeTruthy();
  });

  it("should have AI summary flag", () => {
    expect(mockBookDetail).toHaveProperty("isAiSummary");
    expect(typeof mockBookDetail.isAiSummary).toBe("boolean");
  });

  it("should have valid date read", () => {
    expect(mockBookDetail.dateRead).toBeTruthy();
    const date = new Date(mockBookDetail.dateRead!);
    expect(date).toBeInstanceOf(Date);
    expect(date.toString()).not.toBe("Invalid Date");
  });

  it("should have optional book website", () => {
    if (mockBookDetail.bookWebsite) {
      expect(mockBookDetail.bookWebsite).toMatch(/^https?:\/\//);
    }
  });
});
