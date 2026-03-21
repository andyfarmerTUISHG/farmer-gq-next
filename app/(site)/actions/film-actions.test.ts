import { beforeEach, describe, expect, it, vi } from "vitest";
import { addFilmToWishlistAction, markFilmAsWatchedAction } from "./film-actions";

// Sanity client is mocked globally in vitest.setup.ts
import { writeClient } from "@/sanity/lib/write-client";

vi.mock("@/sanity/lib/write-client", () => ({
  writeClient: {
    create: vi.fn(),
    patch: vi.fn(),
    getDocument: vi.fn(),
  },
}));

vi.mock("@/lib/auth", () => ({
  auth: vi.fn(),
}));

vi.mock("next/cache", () => ({
  revalidatePath: vi.fn(),
}));

import { auth } from "@/lib/auth";

describe("addFilmToWishlistAction - auth gate", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should reject when not authenticated", async () => {
    vi.mocked(auth).mockResolvedValueOnce(null as any);

    const result = await addFilmToWishlistAction("tt1234567", "Test Film", 2026);

    expect(result.success).toBe(false);
    expect(result.error).toContain("Unauthorised");
    expect(writeClient.create).not.toHaveBeenCalled();
  });

  it("should reject when email not whitelisted", async () => {
    vi.mocked(auth).mockResolvedValueOnce({
      session: { userId: "123" },
      user: { email: "stranger@example.com" },
    } as any);

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
    vi.mocked(auth).mockResolvedValueOnce(null as any);

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
    vi.mocked(auth).mockResolvedValueOnce({
      session: { userId: "123" },
      user: { email: "stranger@example.com" },
    } as any);

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
