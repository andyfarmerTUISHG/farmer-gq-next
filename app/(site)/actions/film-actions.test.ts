import { beforeEach, describe, expect, it, vi } from "vitest";
import {
  addFilmAsWatchedAction,
  addFilmToWishlistAction,
  getFilmDetailsAction,
  getFilmDetailsByTitleAction,
  markFilmAsWatchedAction,
  searchFilmsAction,
} from "./film-actions";

import { writeClient } from "@/sanity/lib/write-client";

vi.mock("@/sanity/lib/write-client", () => ({
  writeClient: {
    create: vi.fn(),
    patch: vi.fn(),
    getDocument: vi.fn(),
  },
}));

vi.mock("@/lib/server-auth", () => ({
  isAuthorisedUser: vi.fn(),
}));

vi.mock("@/lib/film-api/film-service", () => ({
  filmService: {
    getFilmDetails: vi.fn(),
    getFilmDetailsByTitle: vi.fn(),
    searchFilms: vi.fn(),
  },
}));

vi.mock("next/cache", () => ({
  revalidatePath: vi.fn(),
}));

import { isAuthorisedUser } from "@/lib/server-auth";
import { filmService } from "@/lib/film-api/film-service";

const mockFilm = {
  imdbId: "tt1234567",
  title: "Test Film",
  year: 2026,
  poster: "https://example.com/poster.jpg",
  plot: "A test film plot",
  runtime: "120 min",
};

const mockPatch = { set: vi.fn() };
const mockCommit = vi.fn().mockResolvedValue({});

describe("searchFilmsAction", () => {
  beforeEach(() => vi.clearAllMocks());

  it("should search films by title", async () => {
    vi.mocked(filmService!.searchFilms).mockResolvedValueOnce({
      results: [{ imdbId: "tt1234567", title: "Test Film", year: 2026, type: "movie", poster: "N/A" }],
      totalResults: 1,
    } as any);
    const result = await searchFilmsAction("Test Film");
    expect(result.results).toHaveLength(1);
  });

  it("should look up by IMDB ID when query matches tt format", async () => {
    vi.mocked(filmService!.getFilmDetails).mockResolvedValueOnce({ film: mockFilm, error: null } as any);
    const result = await searchFilmsAction("tt1234567");
    expect(filmService!.getFilmDetails).toHaveBeenCalledWith("tt1234567");
    expect(result.results).toHaveLength(1);
  });

  it("should return error result when IMDB ID lookup finds nothing", async () => {
    vi.mocked(filmService!.getFilmDetails).mockResolvedValueOnce({ film: null, error: "Not found" } as any);
    const result = await searchFilmsAction("tt9999999");
    expect(result.results).toHaveLength(0);
    expect(result.error).toBe("Not found");
  });

  it("should search by title+year when year is in query", async () => {
    vi.mocked(filmService!.getFilmDetailsByTitle).mockResolvedValueOnce({ film: mockFilm, error: null } as any);
    const result = await searchFilmsAction("Test Film 2026");
    expect(filmService!.getFilmDetailsByTitle).toHaveBeenCalledWith("Test Film", 2026);
    expect(result.results).toHaveLength(1);
  });

  it("should fall back to searchFilms when title+year lookup returns nothing", async () => {
    vi.mocked(filmService!.getFilmDetailsByTitle).mockResolvedValueOnce({ film: null, error: null } as any);
    vi.mocked(filmService!.searchFilms).mockResolvedValueOnce({ results: [], totalResults: 0 } as any);
    await searchFilmsAction("Unknown Film 2026");
    expect(filmService!.searchFilms).toHaveBeenCalled();
  });

  it("should return error for empty query", async () => {
    const result = await searchFilmsAction("");
    expect(result.error).toBeDefined();
    expect(result.results).toHaveLength(0);
  });
});

describe("getFilmDetailsAction", () => {
  beforeEach(() => vi.clearAllMocks());

  it("should return film details for valid IMDB ID", async () => {
    vi.mocked(filmService!.getFilmDetails).mockResolvedValueOnce({ film: mockFilm, error: null } as any);
    const result = await getFilmDetailsAction("tt1234567");
    expect(result.film).toEqual(mockFilm);
  });

  it("should return error for empty IMDB ID", async () => {
    const result = await getFilmDetailsAction("  ");
    expect(result.film).toBeNull();
    expect(result.error).toBeDefined();
  });

  it("should handle filmService errors", async () => {
    vi.mocked(filmService!.getFilmDetails).mockRejectedValueOnce(new Error("API error"));
    const result = await getFilmDetailsAction("tt1234567");
    expect(result.film).toBeNull();
    expect(result.error).toBe("API error");
  });
});

describe("getFilmDetailsByTitleAction", () => {
  beforeEach(() => vi.clearAllMocks());

  it("should return film details by title", async () => {
    vi.mocked(filmService!.getFilmDetailsByTitle).mockResolvedValueOnce({ film: mockFilm, error: null } as any);
    const result = await getFilmDetailsByTitleAction("Test Film", 2026);
    expect(result.film).toEqual(mockFilm);
  });

  it("should return error for empty title", async () => {
    const result = await getFilmDetailsByTitleAction("  ");
    expect(result.film).toBeNull();
    expect(result.error).toBeDefined();
  });

  it("should handle filmService errors", async () => {
    vi.mocked(filmService!.getFilmDetailsByTitle).mockRejectedValueOnce(new Error("API error"));
    const result = await getFilmDetailsByTitleAction("Test Film");
    expect(result.film).toBeNull();
    expect(result.error).toBe("API error");
  });
});

describe("addFilmToWishlistAction", () => {
  beforeEach(() => vi.clearAllMocks());

  it("should reject when not authenticated", async () => {
    vi.mocked(isAuthorisedUser).mockResolvedValueOnce(false);
    const result = await addFilmToWishlistAction("tt1234567", "Test Film", 2026);
    expect(result.success).toBe(false);
    expect(result.error).toContain("Unauthorised");
    expect(writeClient.create).not.toHaveBeenCalled();
  });

  it("should create film in Sanity when authorised", async () => {
    vi.mocked(isAuthorisedUser).mockResolvedValueOnce(true);
    vi.mocked(filmService!.getFilmDetails).mockResolvedValueOnce({ film: mockFilm, error: null } as any);
    vi.mocked(writeClient.create).mockResolvedValueOnce({ _id: "new-id" } as any);

    const result = await addFilmToWishlistAction("tt1234567", "Test Film", 2026);

    expect(writeClient.create).toHaveBeenCalledWith(expect.objectContaining({
      _type: "film",
      status: "wishlist",
      imdbId: "tt1234567",
    }));
    expect(result.success).toBe(true);
  });

  it("should return error when film details not found", async () => {
    vi.mocked(isAuthorisedUser).mockResolvedValueOnce(true);
    vi.mocked(filmService!.getFilmDetails).mockResolvedValueOnce({ film: null, error: "Not found" } as any);

    const result = await addFilmToWishlistAction("tt1234567", "Test Film", 2026);

    expect(result.success).toBe(false);
    expect(writeClient.create).not.toHaveBeenCalled();
  });

  it("should return error for invalid IMDB ID format", async () => {
    vi.mocked(isAuthorisedUser).mockResolvedValueOnce(true);
    const result = await addFilmToWishlistAction("invalid-id", "Test Film", 2026);
    expect(result.success).toBe(false);
    expect(result.error).toBe("Invalid film data");
  });

  it("should handle Sanity write errors gracefully", async () => {
    vi.mocked(isAuthorisedUser).mockResolvedValueOnce(true);
    vi.mocked(filmService!.getFilmDetails).mockResolvedValueOnce({ film: mockFilm, error: null } as any);
    vi.mocked(writeClient.create).mockRejectedValueOnce(new Error("Sanity error"));

    const result = await addFilmToWishlistAction("tt1234567", "Test Film", 2026);

    expect(result.success).toBe(false);
    expect(result.error).toBe("Sanity error");
  });

  it("should handle poster N/A as null", async () => {
    vi.mocked(isAuthorisedUser).mockResolvedValueOnce(true);
    vi.mocked(filmService!.getFilmDetails).mockResolvedValueOnce({
      film: { ...mockFilm, poster: "N/A" },
      error: null,
    } as any);
    vi.mocked(writeClient.create).mockResolvedValueOnce({ _id: "new-id" } as any);

    await addFilmToWishlistAction("tt1234567", "Test Film", 2026);

    expect(writeClient.create).toHaveBeenCalledWith(expect.objectContaining({ posterUrl: null }));
  });
});

describe("addFilmAsWatchedAction", () => {
  beforeEach(() => vi.clearAllMocks());

  it("should create watched film in Sanity", async () => {
    vi.mocked(filmService!.getFilmDetails).mockResolvedValueOnce({ film: mockFilm, error: null } as any);
    vi.mocked(writeClient.create).mockResolvedValueOnce({ _id: "new-id" } as any);

    const result = await addFilmAsWatchedAction(
      "tt1234567", "Test Film", 2026, "2026-04-08", "Cineworld Birmingham", 5, "Great film",
    );

    expect(writeClient.create).toHaveBeenCalledWith(expect.objectContaining({
      _type: "film",
      status: "watched",
      personalRating: 5,
    }));
    expect(result.success).toBe(true);
  });

  it("should return error when film details not found", async () => {
    vi.mocked(filmService!.getFilmDetails).mockResolvedValueOnce({ film: null, error: "Not found" } as any);

    const result = await addFilmAsWatchedAction(
      "tt1234567", "Test Film", 2026, "2026-04-08", "Cineworld Birmingham", 5,
    );

    expect(result.success).toBe(false);
    expect(writeClient.create).not.toHaveBeenCalled();
  });

  it("should return error for invalid IMDB ID", async () => {
    const result = await addFilmAsWatchedAction(
      "bad-id", "Test Film", 2026, "2026-04-08", "Cineworld Birmingham", 5,
    );
    expect(result.success).toBe(false);
  });

  it("should return error for invalid rating", async () => {
    const result = await addFilmAsWatchedAction(
      "tt1234567", "Test Film", 2026, "2026-04-08", "Cineworld Birmingham", 10,
    );
    expect(result.success).toBe(false);
  });

  it("should handle Sanity write errors gracefully", async () => {
    vi.mocked(filmService!.getFilmDetails).mockResolvedValueOnce({ film: mockFilm, error: null } as any);
    vi.mocked(writeClient.create).mockRejectedValueOnce(new Error("Sanity error"));

    const result = await addFilmAsWatchedAction(
      "tt1234567", "Test Film", 2026, "2026-04-08", "Cineworld Birmingham", 4,
    );

    expect(result.success).toBe(false);
  });
});

describe("markFilmAsWatchedAction", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockPatch.set.mockReturnValue({ commit: mockCommit });
    vi.mocked(writeClient.patch).mockReturnValue(mockPatch as any);
  });

  it("should reject when not authenticated", async () => {
    vi.mocked(isAuthorisedUser).mockResolvedValueOnce(false);

    const result = await markFilmAsWatchedAction(
      "film-id-123", "2026-03-15", "Cineworld Birmingham", 5,
    );

    expect(result.success).toBe(false);
    expect(result.error).toContain("Unauthorised");
    expect(writeClient.patch).not.toHaveBeenCalled();
  });

  it("should update film in Sanity when authorised", async () => {
    vi.mocked(isAuthorisedUser).mockResolvedValueOnce(true);
    vi.mocked(writeClient.getDocument).mockResolvedValueOnce({ _id: "film-id-123", _type: "film" } as any);

    const result = await markFilmAsWatchedAction(
      "film-id-123", "2026-03-15", "Cineworld Birmingham", 5, "Great film", "2026-03-01",
    );

    expect(writeClient.patch).toHaveBeenCalledWith("film-id-123");
    expect(mockPatch.set).toHaveBeenCalledWith(expect.objectContaining({
      status: "watched",
      personalRating: 5,
    }));
    expect(result.success).toBe(true);
  });

  it("should reject when document is not a film type", async () => {
    vi.mocked(isAuthorisedUser).mockResolvedValueOnce(true);
    vi.mocked(writeClient.getDocument).mockResolvedValueOnce({ _id: "film-id-123", _type: "article" } as any);

    const result = await markFilmAsWatchedAction(
      "film-id-123", "2026-03-15", "Cineworld Birmingham", 5,
    );

    expect(result.success).toBe(false);
    expect(result.error).toContain("Unauthorized");
    expect(writeClient.patch).not.toHaveBeenCalled();
  });

  it("should reject when document does not exist", async () => {
    vi.mocked(isAuthorisedUser).mockResolvedValueOnce(true);
    vi.mocked(writeClient.getDocument).mockResolvedValueOnce(null as any);

    const result = await markFilmAsWatchedAction(
      "film-id-123", "2026-03-15", "Cineworld Birmingham", 5,
    );

    expect(result.success).toBe(false);
  });

  it("should return validation error for invalid rating", async () => {
    vi.mocked(isAuthorisedUser).mockResolvedValueOnce(true);

    const result = await markFilmAsWatchedAction(
      "film-id-123", "2026-03-15", "Cineworld Birmingham", 10,
    );

    expect(result.success).toBe(false);
    expect(result.error).toContain("Validation failed");
  });

  it("should handle Sanity patch errors gracefully", async () => {
    vi.mocked(isAuthorisedUser).mockResolvedValueOnce(true);
    vi.mocked(writeClient.getDocument).mockResolvedValueOnce({ _id: "film-id-123", _type: "film" } as any);
    mockCommit.mockRejectedValueOnce(new Error("Sanity error"));

    const result = await markFilmAsWatchedAction(
      "film-id-123", "2026-03-15", "Cineworld Birmingham", 5,
    );

    expect(result.success).toBe(false);
    expect(result.error).toBe("Sanity error");
  });

  it("should update without dateAddedToWishlist when not provided", async () => {
    vi.mocked(isAuthorisedUser).mockResolvedValueOnce(true);
    vi.mocked(writeClient.getDocument).mockResolvedValueOnce({ _id: "film-id-123", _type: "film" } as any);

    await markFilmAsWatchedAction("film-id-123", "2026-03-15", "Cineworld Birmingham", 3);

    expect(mockPatch.set).toHaveBeenCalledWith(expect.not.objectContaining({ dateAddedToWishlist: expect.anything() }));
  });
});


