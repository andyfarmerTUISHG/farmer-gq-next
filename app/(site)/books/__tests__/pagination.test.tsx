import { describe, expect, it } from "vitest";

describe("pagination Functionality", () => {
  const pageSize = 12;

  describe("pagination calculations", () => {
    it("should calculate total pages correctly", () => {
      const testCases = [
        { totalCount: 12, expected: 1 },
        { totalCount: 13, expected: 2 },
        { totalCount: 24, expected: 2 },
        { totalCount: 25, expected: 3 },
        { totalCount: 0, expected: 0 },
      ];

      testCases.forEach(({ totalCount, expected }) => {
        const totalPages = Math.ceil(totalCount / pageSize);
        expect(totalPages).toBe(expected);
      });
    });

    it("should calculate skip offset correctly", () => {
      const testCases = [
        { page: 1, expected: 0 },
        { page: 2, expected: 12 },
        { page: 3, expected: 24 },
        { page: 4, expected: 36 },
      ];

      testCases.forEach(({ page, expected }) => {
        const skip = (page - 1) * pageSize;
        expect(skip).toBe(expected);
      });
    });

    it("should calculate page range correctly", () => {
      const testCases = [
        { page: 1, expectedStart: 0, expectedEnd: 12 },
        { page: 2, expectedStart: 12, expectedEnd: 24 },
        { page: 3, expectedStart: 24, expectedEnd: 36 },
      ];

      testCases.forEach(({ page, expectedStart, expectedEnd }) => {
        const skip = (page - 1) * pageSize;
        const end = skip + pageSize;

        expect(skip).toBe(expectedStart);
        expect(end).toBe(expectedEnd);
      });
    });
  });

  describe("pagination navigation", () => {
    it("should determine if next page exists", () => {
      const testCases = [
        { currentPage: 1, totalPages: 3, expected: true },
        { currentPage: 2, totalPages: 3, expected: true },
        { currentPage: 3, totalPages: 3, expected: false },
        { currentPage: 1, totalPages: 1, expected: false },
      ];

      testCases.forEach(({ currentPage, totalPages, expected }) => {
        const nextPage = currentPage + 1;
        const hasNextPage = nextPage <= totalPages;
        expect(hasNextPage).toBe(expected);
      });
    });

    it("should determine if previous page exists", () => {
      const testCases = [
        { currentPage: 1, expected: false },
        { currentPage: 2, expected: true },
        { currentPage: 3, expected: true },
      ];

      testCases.forEach(({ currentPage, expected }) => {
        const prevPage = currentPage - 1;
        const hasPrevPage = prevPage >= 1;
        expect(hasPrevPage).toBe(expected);
      });
    });

    it("should calculate next page number correctly", () => {
      const testCases = [
        { currentPage: 1, expected: 2 },
        { currentPage: 2, expected: 3 },
        { currentPage: 5, expected: 6 },
      ];

      testCases.forEach(({ currentPage, expected }) => {
        const nextPage = currentPage + 1;
        expect(nextPage).toBe(expected);
      });
    });

    it("should calculate previous page number correctly", () => {
      const testCases = [
        { currentPage: 2, expected: 1 },
        { currentPage: 3, expected: 2 },
        { currentPage: 6, expected: 5 },
      ];

      testCases.forEach(({ currentPage, expected }) => {
        const prevPage = currentPage - 1;
        expect(prevPage).toBe(expected);
      });
    });
  });

  describe("pagination URL generation", () => {
    it("should generate correct pagination URLs with sort parameter", () => {
      const base = "/books";
      const sort = "rating";

      const testCases = [
        { page: 1, expected: "/books?sort=rating&page=1" },
        { page: 2, expected: "/books?sort=rating&page=2" },
        { page: 3, expected: "/books?sort=rating&page=3" },
      ];

      testCases.forEach(({ page, expected }) => {
        const url = `${base}?sort=${sort}&page=${page}`;
        expect(url).toBe(expected);
      });
    });

    it("should handle different sort options in URLs", () => {
      const base = "/books";
      const page = 2;

      const testCases = [
        { sort: "rating", expected: "/books?sort=rating&page=2" },
        { sort: "dateRead", expected: "/books?sort=dateRead&page=2" },
        { sort: "author", expected: "/books?sort=author&page=2" },
      ];

      testCases.forEach(({ sort, expected }) => {
        const url = `${base}?sort=${sort}&page=${page}`;
        expect(url).toBe(expected);
      });
    });

    it("should omit page parameter for first page", () => {
      const base = "/books";
      const sort = "rating";
      const page = 1;

      const url = page > 1 ? `${base}?sort=${sort}&page=${page}` : `${base}?sort=${sort}`;
      expect(url).toBe("/books?sort=rating");
    });
  });

  describe("pagination edge cases", () => {
    it("should handle empty book list", () => {
      const totalCount = 0;
      const totalPages = Math.ceil(totalCount / pageSize);

      expect(totalPages).toBe(0);
    });

    it("should handle single book", () => {
      const totalCount = 1;
      const totalPages = Math.ceil(totalCount / pageSize);

      expect(totalPages).toBe(1);
    });

    it("should handle exact page size multiples", () => {
      const totalCount = 24; // Exactly 2 pages
      const totalPages = Math.ceil(totalCount / pageSize);

      expect(totalPages).toBe(2);
    });

    it("should handle page size plus one", () => {
      const totalCount = 13; // 1 page + 1 book
      const totalPages = Math.ceil(totalCount / pageSize);

      expect(totalPages).toBe(2);
    });
  });

  describe("pagination display logic", () => {
    it("should show pagination when total count exceeds page size", () => {
      const testCases = [
        { totalCount: 13, pageSize: 12, expected: true },
        { totalCount: 24, pageSize: 12, expected: true },
        { totalCount: 12, pageSize: 12, expected: false },
        { totalCount: 11, pageSize: 12, expected: false },
      ];

      testCases.forEach(({ totalCount, pageSize, expected }) => {
        const shouldShowPagination = totalCount > pageSize;
        expect(shouldShowPagination).toBe(expected);
      });
    });

    it("should generate correct page number array", () => {
      const totalPages = 5;
      const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

      expect(pageNumbers).toEqual([1, 2, 3, 4, 5]);
      expect(pageNumbers.length).toBe(totalPages);
    });
  });
});
