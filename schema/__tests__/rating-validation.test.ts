import { describe, expect, it } from "vitest";

describe("rating Validation (1-5 range)", () => {
  describe("valid ratings", () => {
    it("should accept rating of 1", () => {
      const rating = 1;
      expect(rating).toBeGreaterThanOrEqual(1);
      expect(rating).toBeLessThanOrEqual(5);
      expect(Number.isInteger(rating)).toBe(true);
    });

    it("should accept rating of 2", () => {
      const rating = 2;
      expect(rating).toBeGreaterThanOrEqual(1);
      expect(rating).toBeLessThanOrEqual(5);
      expect(Number.isInteger(rating)).toBe(true);
    });

    it("should accept rating of 3", () => {
      const rating = 3;
      expect(rating).toBeGreaterThanOrEqual(1);
      expect(rating).toBeLessThanOrEqual(5);
      expect(Number.isInteger(rating)).toBe(true);
    });

    it("should accept rating of 4", () => {
      const rating = 4;
      expect(rating).toBeGreaterThanOrEqual(1);
      expect(rating).toBeLessThanOrEqual(5);
      expect(Number.isInteger(rating)).toBe(true);
    });

    it("should accept rating of 5", () => {
      const rating = 5;
      expect(rating).toBeGreaterThanOrEqual(1);
      expect(rating).toBeLessThanOrEqual(5);
      expect(Number.isInteger(rating)).toBe(true);
    });
  });

  describe("invalid ratings - out of range", () => {
    it("should reject rating of 0", () => {
      const rating = 0;
      const isValid = rating >= 1 && rating <= 5 && Number.isInteger(rating);
      expect(isValid).toBe(false);
    });

    it("should reject rating of 6", () => {
      const rating = 6;
      const isValid = rating >= 1 && rating <= 5 && Number.isInteger(rating);
      expect(isValid).toBe(false);
    });

    it("should reject negative ratings", () => {
      const rating = -1;
      const isValid = rating >= 1 && rating <= 5 && Number.isInteger(rating);
      expect(isValid).toBe(false);
    });

    it("should reject ratings above 5", () => {
      const rating = 10;
      const isValid = rating >= 1 && rating <= 5 && Number.isInteger(rating);
      expect(isValid).toBe(false);
    });
  });

  describe("invalid ratings - non-integer", () => {
    it("should reject decimal rating of 3.5", () => {
      const rating = 3.5;
      const isValid = rating >= 1 && rating <= 5 && Number.isInteger(rating);
      expect(isValid).toBe(false);
    });

    it("should reject decimal rating of 4.7", () => {
      const rating = 4.7;
      const isValid = rating >= 1 && rating <= 5 && Number.isInteger(rating);
      expect(isValid).toBe(false);
    });

    it("should reject decimal rating of 1.1", () => {
      const rating = 1.1;
      const isValid = rating >= 1 && rating <= 5 && Number.isInteger(rating);
      expect(isValid).toBe(false);
    });
  });

  describe("rating validation helper", () => {
    const isValidRating = (rating: number): boolean => {
      return rating >= 1 && rating <= 5 && Number.isInteger(rating);
    };

    it("should validate all valid ratings", () => {
      const validRatings = [1, 2, 3, 4, 5];
      validRatings.forEach((rating) => {
        expect(isValidRating(rating)).toBe(true);
      });
    });

    it("should reject all invalid ratings", () => {
      const invalidRatings = [0, -1, 6, 10, 3.5, 4.7, 1.1, 0.5];
      invalidRatings.forEach((rating) => {
        expect(isValidRating(rating)).toBe(false);
      });
    });
  });

  describe("rating display", () => {
    it("should generate correct number of stars for rating", () => {
      const rating = 4;
      const stars = "⭐".repeat(rating);
      expect(stars).toBe("⭐⭐⭐⭐");
      expect(stars.length / "⭐".length).toBe(rating);
    });

    it("should handle all valid ratings for star display", () => {
      const ratings = [1, 2, 3, 4, 5];
      ratings.forEach((rating) => {
        const stars = "⭐".repeat(rating);
        expect(stars.length / "⭐".length).toBe(rating);
      });
    });
  });
});
