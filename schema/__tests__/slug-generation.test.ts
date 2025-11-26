import { describe, expect, it } from "vitest";

describe("slug Generation", () => {
  // Helper function that mimics Sanity's slug generation behavior
  const generateSlug = (text: string): string => {
    return text
      .toLowerCase()
      .replace(/[^\w\s-]/g, "") // Remove special characters
      .replace(/\s+/g, "-") // Replace spaces with hyphens
      .replace(/-+/g, "-") // Replace multiple hyphens with single hyphen
      .replace(/^-+|-+$/g, ""); // Remove leading/trailing hyphens
  };

  describe("basic slug generation", () => {
    it("should convert simple title to slug", () => {
      const title = "Leadership Book";
      const slug = generateSlug(title);
      expect(slug).toBe("leadership-book");
    });

    it("should convert title with multiple words to slug", () => {
      const title = "The Five Dysfunctions of a Team";
      const slug = generateSlug(title);
      expect(slug).toBe("the-five-dysfunctions-of-a-team");
    });

    it("should handle uppercase letters", () => {
      const title = "EXTREME OWNERSHIP";
      const slug = generateSlug(title);
      expect(slug).toBe("extreme-ownership");
    });

    it("should handle mixed case", () => {
      const title = "Start With Why";
      const slug = generateSlug(title);
      expect(slug).toBe("start-with-why");
    });
  });

  describe("special character handling", () => {
    it("should remove special characters", () => {
      const title = "Leaders Eat Last: Why Some Teams Pull Together";
      const slug = generateSlug(title);
      expect(slug).toBe("leaders-eat-last-why-some-teams-pull-together");
    });

    it("should handle apostrophes", () => {
      const title = "It's Your Ship";
      const slug = generateSlug(title);
      expect(slug).toBe("its-your-ship");
    });

    it("should handle ampersands", () => {
      const title = "Good to Great & Built to Last";
      const slug = generateSlug(title);
      expect(slug).toBe("good-to-great-built-to-last");
    });

    it("should handle parentheses", () => {
      const title = "The Manager's Path (A Guide)";
      const slug = generateSlug(title);
      expect(slug).toBe("the-managers-path-a-guide");
    });

    it("should handle commas", () => {
      const title = "Drive, Motivation, and Success";
      const slug = generateSlug(title);
      expect(slug).toBe("drive-motivation-and-success");
    });
  });

  describe("whitespace handling", () => {
    it("should handle multiple spaces", () => {
      const title = "The    Lean    Startup";
      const slug = generateSlug(title);
      expect(slug).toBe("the-lean-startup");
    });

    it("should handle leading spaces", () => {
      const title = "   Leadership";
      const slug = generateSlug(title);
      expect(slug).toBe("leadership");
    });

    it("should handle trailing spaces", () => {
      const title = "Leadership   ";
      const slug = generateSlug(title);
      expect(slug).toBe("leadership");
    });

    it("should handle tabs and newlines", () => {
      const title = "The\tLean\nStartup";
      const slug = generateSlug(title);
      expect(slug).toBe("the-lean-startup");
    });
  });

  describe("hyphen handling", () => {
    it("should preserve single hyphens", () => {
      const title = "High-Output Management";
      const slug = generateSlug(title);
      expect(slug).toBe("high-output-management");
    });

    it("should collapse multiple hyphens", () => {
      const title = "The---Lean---Startup";
      const slug = generateSlug(title);
      expect(slug).toBe("the-lean-startup");
    });

    it("should remove leading hyphens", () => {
      const title = "---Leadership";
      const slug = generateSlug(title);
      expect(slug).toBe("leadership");
    });

    it("should remove trailing hyphens", () => {
      const title = "Leadership---";
      const slug = generateSlug(title);
      expect(slug).toBe("leadership");
    });
  });

  describe("number handling", () => {
    it("should preserve numbers in slug", () => {
      const title = "The 7 Habits of Highly Effective People";
      const slug = generateSlug(title);
      expect(slug).toBe("the-7-habits-of-highly-effective-people");
    });

    it("should handle titles starting with numbers", () => {
      const title = "21 Irrefutable Laws of Leadership";
      const slug = generateSlug(title);
      expect(slug).toBe("21-irrefutable-laws-of-leadership");
    });

    it("should handle mixed numbers and letters", () => {
      const title = "The 4-Hour Workweek";
      const slug = generateSlug(title);
      expect(slug).toBe("the-4-hour-workweek");
    });
  });

  describe("edge cases", () => {
    it("should handle single word", () => {
      const title = "Leadership";
      const slug = generateSlug(title);
      expect(slug).toBe("leadership");
    });

    it("should handle empty string", () => {
      const title = "";
      const slug = generateSlug(title);
      expect(slug).toBe("");
    });

    it("should handle string with only special characters", () => {
      const title = "!@#$%^&*()";
      const slug = generateSlug(title);
      expect(slug).toBe("");
    });

    it("should handle very long titles", () => {
      const title = "The Complete Guide to Leadership Development and Management Skills for Modern Organizations";
      const slug = generateSlug(title);
      expect(slug).toBe("the-complete-guide-to-leadership-development-and-management-skills-for-modern-organizations");
      expect(slug.length).toBeLessThanOrEqual(100); // Sanity default maxLength
    });
  });

  describe("real book title examples", () => {
    it("should generate slug for 'Extreme Ownership'", () => {
      const title = "Extreme Ownership";
      const slug = generateSlug(title);
      expect(slug).toBe("extreme-ownership");
    });

    it("should generate slug for 'The Five Dysfunctions of a Team'", () => {
      const title = "The Five Dysfunctions of a Team";
      const slug = generateSlug(title);
      expect(slug).toBe("the-five-dysfunctions-of-a-team");
    });

    it("should generate slug for 'Leaders Eat Last'", () => {
      const title = "Leaders Eat Last";
      const slug = generateSlug(title);
      expect(slug).toBe("leaders-eat-last");
    });

    it("should generate slug for 'Start with Why'", () => {
      const title = "Start with Why";
      const slug = generateSlug(title);
      expect(slug).toBe("start-with-why");
    });

    it("should generate slug for 'The Manager's Path'", () => {
      const title = "The Manager's Path";
      const slug = generateSlug(title);
      expect(slug).toBe("the-managers-path");
    });
  });

  describe("slug structure validation", () => {
    it("should only contain lowercase letters, numbers, and hyphens", () => {
      const title = "The Lean Startup: How Today's Entrepreneurs Use Continuous Innovation";
      const slug = generateSlug(title);
      expect(slug).toMatch(/^[a-z0-9-]+$/);
    });

    it("should not start or end with hyphen", () => {
      const title = "Leadership & Management";
      const slug = generateSlug(title);
      expect(slug).not.toMatch(/^-/);
      expect(slug).not.toMatch(/-$/);
    });

    it("should not contain consecutive hyphens", () => {
      const title = "The Lean Startup";
      const slug = generateSlug(title);
      expect(slug).not.toMatch(/--/);
    });
  });

  describe("chapter slug generation", () => {
    it("should generate slug for chapter with number", () => {
      const title = "Chapter 1: Introduction to Leadership";
      const slug = generateSlug(title);
      expect(slug).toBe("chapter-1-introduction-to-leadership");
    });

    it("should generate slug for chapter without number", () => {
      const title = "Introduction to Leadership";
      const slug = generateSlug(title);
      expect(slug).toBe("introduction-to-leadership");
    });

    it("should handle chapter with colon separator", () => {
      const title = "Building Trust: The Foundation of Leadership";
      const slug = generateSlug(title);
      expect(slug).toBe("building-trust-the-foundation-of-leadership");
    });
  });
});
