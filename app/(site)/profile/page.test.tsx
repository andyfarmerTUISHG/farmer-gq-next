import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { useSession } from "@/lib/auth-client";

vi.mock("@/lib/auth-client", () => ({
  useSession: vi.fn(),
  signOut: vi.fn(),
}));

import ProfilePage from "./page";

describe("ProfilePage", () => {
  it("should show sign-in prompt when not authenticated", () => {
    vi.mocked(useSession).mockReturnValue({ data: null, isPending: false } as any);

    render(<ProfilePage />);

    expect(screen.getByText(/sign in/i)).toBeInTheDocument();
  });

  it("should show user email when authenticated", () => {
    vi.mocked(useSession).mockReturnValue({
      data: { user: { email: "andy@example.com", name: "Andy" } },
      isPending: false,
    } as any);

    render(<ProfilePage />);

    expect(screen.getByText("andy@example.com")).toBeInTheDocument();
  });

  it("should show sign out button when authenticated", () => {
    vi.mocked(useSession).mockReturnValue({
      data: { user: { email: "andy@example.com", name: "Andy" } },
      isPending: false,
    } as any);

    render(<ProfilePage />);

    expect(screen.getByRole("button", { name: /sign out/i })).toBeInTheDocument();
  });
});
