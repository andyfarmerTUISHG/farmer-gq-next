import { describe, expect, it } from "vitest";
import { getAuthorizedEmails, isEmailAuthorized } from "./auth-helpers";

describe("auth configuration", () => {
  it("should export auth instance", async () => {
    const { auth } = await import("./auth");
    expect(auth).toBeDefined();
  });

  it("should export authClient", async () => {
    const { authClient } = await import("./auth-client");
    expect(authClient).toBeDefined();
  });
});

describe("authorisation callback integration", () => {
  it("should authorise whitelisted email", () => {
    const emails = getAuthorizedEmails("andy@example.com");
    expect(isEmailAuthorized("andy@example.com", emails)).toBe(true);
  });

  it("should reject non-whitelisted email", () => {
    const emails = getAuthorizedEmails("andy@example.com");
    expect(isEmailAuthorized("stranger@example.com", emails)).toBe(false);
  });

  it("should handle multiple authorised emails", () => {
    const emails = getAuthorizedEmails("andy@example.com,friend@example.com");
    expect(isEmailAuthorized("friend@example.com", emails)).toBe(true);
  });
});
