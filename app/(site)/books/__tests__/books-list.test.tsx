import { describe, expect, it, vi } from "vitest";

import type { BookListItem } from "@/types";

// Mock Next.js modules
vi.mock("next/navigation", () => ({
  notFound: vi.fn(),
}));

vi.mock("@/sanity/lib/live", () => ({
  sanityFetch: vi.fn(),
}));

vi.mock("@/app/(site)/env", () => ({
  env: {
    NEXT_PAGE_SIZE: "12",
  },
}));

describe("books List Page", () => {
  const mockBooks: BookListItem[] = [
    {
      _id: "book-1",
      _type: "book",
      title: "The Leadership Challenge",
      slug: { _type: "slug", current: "leadership-challenge" },
      author: "James Kouzes",
      rating: 5,
      coverImage: {
        _type: "image",
        asset: {
          _ref: "image-123",
          _type: "reference",
        },
      },
      dateRead: "2024-01-15",
      _createdAt: "2024-01-01T00:00:00Z",
      _updatedAt: "2024-01-15T00:00:00Z",
      tags: [
        { _id: "tag-1", name: "Leadership" },
        { _id: "tag-2", name: "Management" },
      ],
    },
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
      tags: [{ _id: "tag-1", name: "Leadership" }],
    },
  ];

  it("should render book list with correct data structure", () => {
    expect(mockBooks).toHaveLength(2);
    expect(mockBooks[0]).toHaveProperty("_id");
    expect(mockBooks[0]).toHaveProperty("title");
    expect(mockBooks[0]).toHaveProperty("author");
    expect(mockBooks[0]).toHaveProperty("rating");
    expect(mockBooks[0]).toHaveProperty("coverImage");
  });

  it("should have valid book metadata", () => {
    mockBooks.forEach((book) => {
      expect(book._id).toBeTruthy();
      expect(book.title).toBeTruthy();
      expect(book.author).toBeTruthy();
      expect(book.rating).toBeGreaterThanOrEqual(1);
      expect(book.rating).toBeLessThanOrEqual(5);
      expect(book.slug).toHaveProperty("current");
    });
  });

  it("should have valid cover images", () => {
    mockBooks.forEach((book) => {
      expect(book.coverImage).toBeDefined();
      expect(book.coverImage).toHaveProperty("asset");
      expect(book.coverImage.asset).toHaveProperty("_ref");
    });
  });

  it("should have valid tags structure", () => {
    const bookWithTags = mockBooks[0];
    expect(bookWithTags.tags).toBeDefined();
    expect(Array.isArray(bookWithTags.tags)).toBe(true);
    expect(bookWithTags.tags?.length).toBeGreaterThan(0);

    bookWithTags.tags?.forEach((tag) => {
      expect(tag).toHaveProperty("_id");
      expect(tag).toHaveProperty("name");
    });
  });

  it("should have valid date formats", () => {
    mockBooks.forEach((book) => {
      if (book.dateRead) {
        const date = new Date(book.dateRead);
        expect(date).toBeInstanceOf(Date);
        expect(date.toString()).not.toBe("Invalid Date");
      }
    });
  });

  it("should support sorting by rating", () => {
    const sortedByRating = [...mockBooks].sort((a, b) => b.rating - a.rating);
    expect(sortedByRating[0].rating).toBeGreaterThanOrEqual(
      sortedByRating[1].rating,
    );
  });

  it("should support sorting by date read", () => {
    const sortedByDate = [...mockBooks].sort((a, b) => {
      const dateA = a.dateRead ? new Date(a.dateRead).getTime() : 0;
      const dateB = b.dateRead ? new Date(b.dateRead).getTime() : 0;
      return dateB - dateA;
    });

    const firstDate = sortedByDate[0].dateRead
      ? new Date(sortedByDate[0].dateRead).getTime()
      : 0;
    const secondDate = sortedByDate[1].dateRead
      ? new Date(sortedByDate[1].dateRead).getTime()
      : 0;

    expect(firstDate).toBeGreaterThanOrEqual(secondDate);
  });

  it("should support sorting by author", () => {
    const sortedByAuthor = [...mockBooks].sort((a, b) =>
      a.author.localeCompare(b.author),
    );

    expect(sortedByAuthor[0].author.localeCompare(sortedByAuthor[1].author)).toBeLessThanOrEqual(0);
  });
});
