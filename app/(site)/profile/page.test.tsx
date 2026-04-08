import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import ProfilePage from "./page";

vi.mock("@/lib/auth-client", () => ({
  useSession: vi.fn(),
  signOut: vi.fn(),
}));

import { signOut, useSession } from "@/lib/auth-client";

describe("ProfilePage", () => {
  it("should show loading state while session is pending", () => {
    vi.mocked(useSession).mockReturnValue({ data: null, isPending: true } as any);
    render(<ProfilePage />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("should show sign in prompt when not authenticated", () => {
    vi.mocked(useSession).mockReturnValue({ data: null, isPending: false } as any);
    render(<ProfilePage />);
    expect(screen.getByText(/sign in/i)).toBeInTheDocument();
  });

  it("should show user info when authenticated", () => {
    vi.mocked(useSession).mockReturnValue({
      data: { user: { name: "Andy Farmer", email: "andy@example.com" } },
      isPending: false,
    } as any);
    render(<ProfilePage />);
    expect(screen.getByText("Andy Farmer")).toBeInTheDocument();
    expect(screen.getByText("andy@example.com")).toBeInTheDocument();
  });

  it("should call signOut when sign out button is clicked", async () => {
    vi.mocked(useSession).mockReturnValue({
      data: { user: { name: "Andy Farmer", email: "andy@example.com" } },
      isPending: false,
    } as any);
    render(<ProfilePage />);
    await userEvent.click(screen.getByRole("button", { name: /sign out/i }));
    expect(signOut).toHaveBeenCalled();
  });
});
