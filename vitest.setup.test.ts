import { describe, expect, it } from "vitest";

describe("vitest Setup", () => {
  it("should run tests successfully", () => {
    expect(true).toBe(true);
  });

  it("should have access to vitest globals", () => {
    expect(describe).toBeDefined();
    expect(it).toBeDefined();
    expect(expect).toBeDefined();
  });
});
