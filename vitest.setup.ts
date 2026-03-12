import { vi } from "vitest";
import "@testing-library/jest-dom";

// Mock Sanity client globally
vi.mock("@/sanity/lib/client", () => ({
  client: {
    fetch: vi.fn(),
    patch: vi.fn(),
    create: vi.fn(),
    delete: vi.fn(),
  },
}));

// Mock Sanity Live Content API
vi.mock("@/sanity/lib/live", () => ({
  sanityFetch: vi.fn(),
}));

// Mock NextAuth
vi.mock("@/auth", () => ({
  auth: vi.fn(),
}));
