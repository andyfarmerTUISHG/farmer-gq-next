import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import AuthButton from "./auth-button";

vi.mock("@/lib/auth-client", () => ({
  useSession: vi.fn(),
  signIn: { social: vi.fn() },
  signOut: vi.fn(),
}));

import { signIn, signOut, useSession } from "@/lib/auth-client";

describe("AuthButton", () => {
  it("should show sign in button when not authenticated", () => {
    vi.mocked(useSession).mockReturnValue({ data: null, isPending: false } as any);
    render(<AuthButton />);
    expect(screen.getByText("Sign In")).toBeInTheDocument();
  });

  it("should call signIn when sign in button is clicked", async () => {
    vi.mocked(useSession).mockReturnValue({ data: null, isPending: false } as any);
    render(<AuthButton />);
    await userEvent.click(screen.getByText("Sign In"));
    expect(signIn.social).toHaveBeenCalledWith({ provider: "google" });
  });

  it("should show avatar when authenticated with image", () => {
    vi.mocked(useSession).mockReturnValue({
      data: { user: { email: "andy@example.com", image: "https://example.com/avatar.jpg", name: "Andy" } },
      isPending: false,
    } as any);
    render(<AuthButton />);
    expect(screen.getByAltText("Andy")).toBeInTheDocument();
  });

  it("should show initial when authenticated without image", () => {
    vi.mocked(useSession).mockReturnValue({
      data: { user: { email: "andy@example.com", image: null, name: "Andy" } },
      isPending: false,
    } as any);
    render(<AuthButton />);
    expect(screen.getByText("A")).toBeInTheDocument();
  });

  it("should call signOut when avatar button is clicked", async () => {
    vi.mocked(useSession).mockReturnValue({
      data: { user: { email: "andy@example.com", image: null, name: "Andy" } },
      isPending: false,
    } as any);
    render(<AuthButton />);
    await userEvent.click(screen.getByRole("button", { name: "Sign out" }));
    expect(signOut).toHaveBeenCalled();
  });

  it("should show loading state while session is pending", () => {
    vi.mocked(useSession).mockReturnValue({ data: null, isPending: true } as any);
    render(<AuthButton />);
    expect(screen.getByTestId("auth-loading")).toBeInTheDocument();
  });
});
