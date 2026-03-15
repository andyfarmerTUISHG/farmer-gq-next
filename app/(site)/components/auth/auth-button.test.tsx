import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import AuthButton from "./auth-button";

vi.mock("@/lib/auth-client", () => ({
  useSession: vi.fn(),
  signIn: vi.fn(),
  signOut: vi.fn(),
}));

import { useSession } from "@/lib/auth-client";

describe("AuthButton", () => {
  it("should show sign in button when not authenticated", () => {
    vi.mocked(useSession).mockReturnValue({
      data: null,
      isPending: false,
    } as any);

    render(<AuthButton />);

    expect(screen.getByText("Sign In")).toBeInTheDocument();
  });

  it("should show avatar when authenticated", () => {
    vi.mocked(useSession).mockReturnValue({
      data: {
        user: {
          email: "andy@example.com",
          image: "https://example.com/avatar.jpg",
          name: "Andy",
        },
      },
      isPending: false,
    } as any);

    render(<AuthButton />);

    expect(screen.getByAltText("Andy")).toBeInTheDocument();
  });

  it("should show loading state while session is pending", () => {
    vi.mocked(useSession).mockReturnValue({
      data: null,
      isPending: true,
    } as any);

    render(<AuthButton />);

    expect(screen.getByTestId("auth-loading")).toBeInTheDocument();
  });
});
