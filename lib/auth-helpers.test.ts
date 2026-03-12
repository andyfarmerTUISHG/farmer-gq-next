import { describe, expect, it } from "vitest";
import { getAuthorizedEmails, isEmailAuthorized } from "./auth-helpers";

describe("isEmailAuthorized", () => {
  it("should return true when email is in whitelist", () => {
    const result = isEmailAuthorized("andy@example.com", ["andy@example.com"]);
    expect(result).toBe(true);
  });

  it("should return false when email is not in whitelist", () => {
    const result = isEmailAuthorized("stranger@example.com", ["andy@example.com"]);
    expect(result).toBe(false);
  });

  it("should be case-insensitive", () => {
    const result = isEmailAuthorized("ANDY@EXAMPLE.COM", ["andy@example.com"]);
    expect(result).toBe(true);
  });

  it("should trim whitespace from email", () => {
    const result = isEmailAuthorized("  andy@example.com  ", ["andy@example.com"]);
    expect(result).toBe(true);
  });

  it("should return false for empty email", () => {
    const result = isEmailAuthorized("", ["andy@example.com"]);
    expect(result).toBe(false);
  });

  it("should return false for empty whitelist", () => {
    const result = isEmailAuthorized("andy@example.com", []);
    expect(result).toBe(false);
  });
});

describe("getAuthorizedEmails", () => {
  it("should parse comma-separated email string", () => {
    const result = getAuthorizedEmails("andy@example.com,friend@example.com");
    expect(result).toEqual(["andy@example.com", "friend@example.com"]);
  });

  it("should trim whitespace from each email", () => {
    const result = getAuthorizedEmails("andy@example.com , friend@example.com");
    expect(result).toEqual(["andy@example.com", "friend@example.com"]);
  });

  it("should return empty array for empty string", () => {
    const result = getAuthorizedEmails("");
    expect(result).toEqual([]);
  });

  it("should filter out empty entries", () => {
    const result = getAuthorizedEmails("andy@example.com,,friend@example.com");
    expect(result).toEqual(["andy@example.com", "friend@example.com"]);
  });

  it("should convert to lowercase", () => {
    const result = getAuthorizedEmails("ANDY@EXAMPLE.COM");
    expect(result).toEqual(["andy@example.com"]);
  });
});
