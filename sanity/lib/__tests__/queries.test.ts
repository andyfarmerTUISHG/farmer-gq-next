import { describe, expect, it } from "vitest";

import {
  allBookSlugsQuery,
  allBooksQuery,
  allChapterSlugsQuery,
  bookBySlugQuery,
  chapterBySlugQuery,
  paginatedBooksQuery,
} from "../queries";

describe("gROQ Query Construction - Books", () => {
  describe("allBooksQuery", () => {
    it("should query all books with correct type filter", () => {
      expect(allBooksQuery).toContain("*[_type == \"book\"]");
    });

    it("should order by dateRead desc and _createdAt desc", () => {
      expect(allBooksQuery).toContain("order(dateRead desc, _createdAt desc)");
    });

    it("should include required fields", () => {
      expect(allBooksQuery).toContain("_id");
      expect(allBooksQuery).toContain("title");
      expect(allBooksQuery).toContain("author");
      expect(allBooksQuery).toContain("rating");
      expect(allBooksQuery).toContain("coverImage");
    });

    it("should project slug from slug.current", () => {
      expect(allBooksQuery).toContain("\"slug\": slug.current");
    });

    it("should dereference tags with _id and name", () => {
      expect(allBooksQuery).toContain("\"tags\": tags[]->");
      expect(allBooksQuery).toContain("_id, name");
    });
  });

  describe("paginatedBooksQuery", () => {
    it("should query all books with correct type filter", () => {
      expect(paginatedBooksQuery).toContain("*[_type == \"book\"]");
    });

    it("should use dynamic orderBy parameter", () => {
      expect(paginatedBooksQuery).toContain("order($orderBy)");
    });

    it("should use pagination parameters", () => {
      expect(paginatedBooksQuery).toContain("[$skip...$pageSize]");
    });

    it("should include required fields for listing", () => {
      expect(paginatedBooksQuery).toContain("_id");
      expect(paginatedBooksQuery).toContain("title");
      expect(paginatedBooksQuery).toContain("author");
      expect(paginatedBooksQuery).toContain("rating");
    });
  });

  describe("bookBySlugQuery", () => {
    it("should query book by slug parameter", () => {
      expect(bookBySlugQuery).toContain("*[_type == \"book\" && slug.current == $slug][0]");
    });

    it("should include all metadata fields", () => {
      expect(bookBySlugQuery).toContain("bookWebsite");
      expect(bookBySlugQuery).toContain("amazonLink");
      expect(bookBySlugQuery).toContain("amazonAffiliateLink");
      expect(bookBySlugQuery).toContain("dateRead");
    });

    it("should include content fields", () => {
      expect(bookBySlugQuery).toContain("summary");
      expect(bookBySlugQuery).toContain("keyTakeaways");
      expect(bookBySlugQuery).toContain("personalNotes");
      expect(bookBySlugQuery).toContain("isAiSummary");
    });

    it("should include SEO fields", () => {
      expect(bookBySlugQuery).toContain("metaDescription");
      expect(bookBySlugQuery).toContain("metaTitle");
      expect(bookBySlugQuery).toContain("ogImage");
      expect(bookBySlugQuery).toContain("focusKeyword");
    });

    it("should dereference related books with required fields", () => {
      expect(bookBySlugQuery).toContain("\"relatedBooks\": relatedBooks[]->");
      expect(bookBySlugQuery).toContain("coverImage");
    });

    it("should query chapters with references and ordering", () => {
      expect(bookBySlugQuery).toContain("*[_type == \"chapter\" && references(^._id)]");
      expect(bookBySlugQuery).toContain("order(chapterNumber)");
    });

    it("should query quotes without chapter reference", () => {
      expect(bookBySlugQuery).toContain("*[_type == \"quote\" && references(^._id) && !defined(parentChapter)]");
      expect(bookBySlugQuery).toContain("quoteText");
      expect(bookBySlugQuery).toContain("context");
    });
  });

  describe("chapterBySlugQuery", () => {
    it("should query chapter by slug parameter", () => {
      expect(chapterBySlugQuery).toContain("*[_type == \"chapter\" && slug.current == $slug][0]");
    });

    it("should include chapter fields", () => {
      expect(chapterBySlugQuery).toContain("chapterNumber");
      expect(chapterBySlugQuery).toContain("title");
      expect(chapterBySlugQuery).toContain("summary");
    });

    it("should dereference parent book", () => {
      expect(chapterBySlugQuery).toContain("\"parentBook\": parentBook->");
      expect(chapterBySlugQuery).toContain("author");
    });

    it("should query chapter-specific quotes", () => {
      expect(chapterBySlugQuery).toContain("*[_type == \"quote\" && references(^._id)]");
    });
  });

  describe("allBookSlugsQuery", () => {
    it("should query all book slugs", () => {
      expect(allBookSlugsQuery).toContain("*[_type == \"book\" && defined(slug.current)]");
    });

    it("should return only slug.current values", () => {
      expect(allBookSlugsQuery).toContain("[].slug.current");
    });
  });

  describe("allChapterSlugsQuery", () => {
    it("should query all chapter slugs", () => {
      expect(allChapterSlugsQuery).toContain("*[_type == \"chapter\" && defined(slug.current)]");
    });

    it("should project slug and bookSlug", () => {
      expect(allChapterSlugsQuery).toContain("\"slug\": slug.current");
      expect(allChapterSlugsQuery).toContain("\"bookSlug\": parentBook->slug.current");
    });
  });
});
