import { beforeEach, describe, expect, it, vi } from "vitest";
import { addFilmToWishlistAction, markFilmAsWatchedAction } from "./film-actions";

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
  },
}));

vi.mock("next/cache", () => ({
  revalidatePath: vi.fn(),
}));

import { isAuthorisedUser } from "@/lib/server-auth";
import { filmService } from "@/lib/film-api/film-service";

describe("addFilmToWishlistAction - auth gate", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should reject when not authenticated", async () => {
    vi.mocked(isAuthorisedUser).mockResolvedValueOnce(false);

    const result = await addFilmToWishlistAction("tt1234567", "Test Film", 2026);

    expect(result.success).toBe(false);
    expect(result.error).toContain("Unauthorised");
    expect(writeClient.create).not.toHaveBeenCalled();
  });

  it("should reject when email not whitelisted", async () => {
    vi.mocked(isAuthorisedUser).mockResolvedValueOnce(false);

    const result = await addFilmToWishlistAction("tt1234567", "Test Film", 2026);

    expect(result.success).toBe(false);
    expect(result.error).toContain("Unauthorised");
    expect(writeClient.create).not.toHaveBeenCalled();
  });
});

describe("markFilmAsWatchedAction - auth gate", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should reject when not authenticated", async () => {
    vi.mocked(isAuthorisedUser).mockResolvedValueOnce(false);

    const result = await markFilmAsWatchedAction(
      "film-id-123",
      "2026-03-15",
      "Cineworld Birmingham",
      5,
      "Great film",
      "2026-03-01",
    );

    expect(result.success).toBe(false);
    expect(result.error).toContain("Unauthorised");
    expect(writeClient.patch).not.toHaveBeenCalled();
  });

  it("should reject when email not whitelisted", async () => {
    vi.mocked(isAuthorisedUser).mockResolvedValueOnce(false);

    const result = await markFilmAsWatchedAction(
      "film-id-123",
      "2026-03-15",
      "Cineworld Birmingham",
      5,
      "Great film",
      "2026-03-01",
    );

    expect(result.success).toBe(false);
    expect(result.error).toContain("Unauthorised");
    expect(writeClient.patch).not.toHaveBeenCalled();
  });
});

// Regression test: FG-3 - generateFilmSlug was accidentally removed during auth refactor
describe("addFilmToWishlistAction - regression", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should call writeClient.create when authenticated and film details are found", async () => {
    vi.mocked(isAuthorisedUser).mockResolvedValueOnce(true);
    vi.mocked(filmService!.getFilmDetails).mockResolvedValueOnce({
      film: {
        imdbId: "tt1234567",
        title: "Test Film",
        year: 2026,
        poster: "N/A",
        plot: "A test film",
        runtime: "120 min",
      },
      error: null,
    } as any);
    vi.mocked(writeClient.create).mockResolvedValueOnce({ _id: "new-id" } as any);

    const result = await addFilmToWishlistAction("tt1234567", "Test Film", 2026);

    expect(writeClient.create).toHaveBeenCalled();
    expect(result.success).toBe(true);
  });
});


