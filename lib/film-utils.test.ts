import { describe, expect, it } from "vitest";
import { formatFilmTitle, generateFilmSlug, transformFilmDetailsForSanity } from "./film-utils";

describe("generateFilmSlug", () => {
  it("should generate slug from title and year", () => {
    expect(generateFilmSlug("The Dark Knight", 2008)).toBe("the-dark-knight-2008");
  });

  it("should generate slug without year", () => {
    expect(generateFilmSlug("Inception")).toBe("inception");
  });

  it("should remove special characters", () => {
    expect(generateFilmSlug("Spider-Man: No Way Home", 2021)).toBe("spider-man-no-way-home-2021");
  });
});

describe("formatFilmTitle", () => {
  it("should format title with year", () => {
    expect(formatFilmTitle("Inception", 2010)).toBe("Inception (2010)");
  });

  it("should format title without year", () => {
    expect(formatFilmTitle("Inception")).toBe("Inception");
  });
});

describe("transformFilmDetailsForSanity", () => {
  it("should transform film details", () => {
    const result = transformFilmDetailsForSanity({
      imdbId: "tt1375666",
      title: "Inception",
      year: 2010,
      poster: "https://example.com/poster.jpg",
      plot: "A thief...",
      runtime: "148 min",
    } as any);
    expect(result.title).toBe("Inception");
    expect(result.year).toBe(2010);
    expect(result.imdbId).toBe("tt1375666");
  });
});
