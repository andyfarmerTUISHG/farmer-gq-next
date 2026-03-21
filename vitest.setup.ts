import { vi } from "vitest";
import "@testing-library/jest-dom";

// Mock env validation so tests don't require real environment variables
vi.mock("@/app/(site)/env/client", () => ({
  env: {
    NEXT_PUBLIC_SANITY_PROJECT_ID: "test-project-id",
    NEXT_PUBLIC_SANITY_DATASET: "test",
    NEXT_PUBLIC_SANITY_API_VERSION: "2024-01-01",
    NEXT_PUBLIC_SANITY_PROJECT_TITLE: "Test",
  },
}));

vi.mock("@/app/(site)/env", () => ({
  env: {
    NEXT_PUBLIC_SANITY_PROJECT_ID: "test-project-id",
    NEXT_PUBLIC_SANITY_DATASET: "test",
    SANITY_API_PROJECT_ID: "test-project-id",
    SANITY_API_DATASET: "test",
  },
}));

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

// Mock Better Auth
vi.mock("@/lib/auth", () => ({
  auth: vi.fn(),
}));
