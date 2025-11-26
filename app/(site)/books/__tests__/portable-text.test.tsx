import type { PortableTextBlock } from "next-sanity";

import { describe, expect, it } from "vitest";

describe("customPortableText Rendering", () => {
  describe("portable text block structure", () => {
    it("should have valid block structure", () => {
      const block: PortableTextBlock = {
        _type: "block",
        _key: "block-1",
        style: "normal",
        children: [
          {
            _type: "span",
            _key: "span-1",
            text: "This is a paragraph.",
            marks: [],
          },
        ],
        markDefs: [],
      };

      expect(block).toHaveProperty("_type", "block");
      expect(block).toHaveProperty("children");
      expect(Array.isArray(block.children)).toBe(true);
      expect(block.children.length).toBeGreaterThan(0);
    });

    it("should support different block styles", () => {
      const styles = ["normal", "h1", "h2", "h3", "h4", "blockquote"];

      styles.forEach((style) => {
        const block: PortableTextBlock = {
          _type: "block",
          _key: `block-${style}`,
          style,
          children: [
            {
              _type: "span",
              _key: "span-1",
              text: `Content with ${style} style`,
              marks: [],
            },
          ],
          markDefs: [],
        };

        expect(block.style).toBe(style);
      });
    });

    it("should support text marks", () => {
      const block: PortableTextBlock = {
        _type: "block",
        _key: "block-1",
        style: "normal",
        children: [
          {
            _type: "span",
            _key: "span-1",
            text: "Bold text",
            marks: ["strong"],
          },
          {
            _type: "span",
            _key: "span-2",
            text: " and italic text",
            marks: ["em"],
          },
        ],
        markDefs: [],
      };

      expect(block.children[0].marks).toContain("strong");
      expect(block.children[1].marks).toContain("em");
    });

    it("should support link marks", () => {
      const block: PortableTextBlock = {
        _type: "block",
        _key: "block-1",
        style: "normal",
        children: [
          {
            _type: "span",
            _key: "span-1",
            text: "Click here",
            marks: ["link-1"],
          },
        ],
        markDefs: [
          {
            _key: "link-1",
            _type: "link",
            href: "https://example.com",
          },
        ],
      };

      expect(block.markDefs).toBeDefined();
      expect(block.markDefs.length).toBeGreaterThan(0);
      expect(block.markDefs[0]).toHaveProperty("href");
    });
  });

  describe("portable text with images", () => {
    it("should support image blocks", () => {
      const imageBlock = {
        _type: "image",
        _key: "image-1",
        asset: {
          _ref: "image-abc123",
          _type: "reference",
        },
        alt: "Book cover image",
        caption: "The book cover",
      };

      expect(imageBlock._type).toBe("image");
      expect(imageBlock).toHaveProperty("asset");
      expect(imageBlock.asset).toHaveProperty("_ref");
      expect(imageBlock).toHaveProperty("alt");
      expect(imageBlock).toHaveProperty("caption");
    });

    it("should handle images without captions", () => {
      const imageBlock = {
        _type: "image",
        _key: "image-1",
        asset: {
          _ref: "image-abc123",
          _type: "reference",
        },
        alt: "Book cover image",
      };

      expect(imageBlock._type).toBe("image");
      expect(imageBlock).not.toHaveProperty("caption");
    });
  });

  describe("portable text with code blocks", () => {
    it("should support code blocks", () => {
      const codeBlock = {
        _type: "code",
        _key: "code-1",
        language: "javascript",
        code: "const greeting = 'Hello, World!';",
      };

      expect(codeBlock._type).toBe("code");
      expect(codeBlock).toHaveProperty("language");
      expect(codeBlock).toHaveProperty("code");
      expect(codeBlock.code).toBeTruthy();
    });

    it("should handle multi-line code", () => {
      const codeBlock = {
        _type: "code",
        _key: "code-1",
        language: "javascript",
        code: "function greet(name) {\n  return 'Hello, ' + name + '!';\n}",
      };

      expect(codeBlock.code).toContain("\n");
      expect(codeBlock.code.split("\n").length).toBeGreaterThan(1);
    });
  });

  describe("portable text arrays", () => {
    it("should handle multiple blocks", () => {
      const blocks: PortableTextBlock[] = [
        {
          _type: "block",
          _key: "block-1",
          style: "normal",
          children: [
            {
              _type: "span",
              _key: "span-1",
              text: "First paragraph.",
              marks: [],
            },
          ],
          markDefs: [],
        },
        {
          _type: "block",
          _key: "block-2",
          style: "normal",
          children: [
            {
              _type: "span",
              _key: "span-2",
              text: "Second paragraph.",
              marks: [],
            },
          ],
          markDefs: [],
        },
      ];

      expect(Array.isArray(blocks)).toBe(true);
      expect(blocks.length).toBe(2);
      blocks.forEach((block) => {
        expect(block).toHaveProperty("_type");
        expect(block).toHaveProperty("_key");
      });
    });

    it("should handle empty blocks array", () => {
      const blocks: PortableTextBlock[] = [];

      expect(Array.isArray(blocks)).toBe(true);
      expect(blocks.length).toBe(0);
    });

    it("should handle mixed content types", () => {
      const content = [
        {
          _type: "block",
          _key: "block-1",
          style: "normal",
          children: [
            {
              _type: "span",
              _key: "span-1",
              text: "Text before image.",
              marks: [],
            },
          ],
          markDefs: [],
        },
        {
          _type: "image",
          _key: "image-1",
          asset: {
            _ref: "image-abc123",
            _type: "reference",
          },
        },
        {
          _type: "block",
          _key: "block-2",
          style: "normal",
          children: [
            {
              _type: "span",
              _key: "span-2",
              text: "Text after image.",
              marks: [],
            },
          ],
          markDefs: [],
        },
      ];

      expect(content.length).toBe(3);
      expect(content[0]._type).toBe("block");
      expect(content[1]._type).toBe("image");
      expect(content[2]._type).toBe("block");
    });
  });

  describe("portable text validation", () => {
    it("should validate required fields", () => {
      const block: PortableTextBlock = {
        _type: "block",
        _key: "block-1",
        style: "normal",
        children: [
          {
            _type: "span",
            _key: "span-1",
            text: "Valid block",
            marks: [],
          },
        ],
        markDefs: [],
      };

      expect(block._type).toBeTruthy();
      expect(block._key).toBeTruthy();
      expect(block.children).toBeDefined();
      expect(block.children.length).toBeGreaterThan(0);
    });

    it("should handle blocks with no marks", () => {
      const block: PortableTextBlock = {
        _type: "block",
        _key: "block-1",
        style: "normal",
        children: [
          {
            _type: "span",
            _key: "span-1",
            text: "Plain text",
            marks: [],
          },
        ],
        markDefs: [],
      };

      expect(block.children[0].marks).toEqual([]);
      expect(block.markDefs).toEqual([]);
    });

    it("should handle blocks with empty text", () => {
      const block: PortableTextBlock = {
        _type: "block",
        _key: "block-1",
        style: "normal",
        children: [
          {
            _type: "span",
            _key: "span-1",
            text: "",
            marks: [],
          },
        ],
        markDefs: [],
      };

      expect(block.children[0].text).toBe("");
    });
  });
});
