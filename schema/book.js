import { GrBook as icon, GrImage as ImageIcon } from "react-icons/gr";
import { defineArrayMember, defineField, defineType } from "sanity";

export default defineType({
  name: "book",
  title: "Leadership Books",
  type: "document",
  icon,
  preview: {
    select: {
      title: "title",
      author: "author",
      rating: "rating",
      media: "coverImage",
    },
    prepare(selection) {
      const { title, author, rating, media } = selection;
      const stars = rating ? "⭐".repeat(rating) : "No rating";
      return {
        title,
        subtitle: `${author} | ${stars}`,
        media,
      };
    },
  },
  fields: [
    defineField({
      name: "title",
      title: "Book Title",
      type: "string",
      description: "The title of the book",
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 100,
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: "author",
      title: "Author",
      type: "string",
      description: "The author of the book",
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: "bookWebsite",
      title: "Book Website",
      type: "url",
      description: "Official website for the book (optional)",
    }),
    defineField({
      name: "amazonLink",
      title: "Amazon Link",
      type: "url",
      description: "Standard Amazon product link",
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: "amazonAffiliateLink",
      title: "Amazon Affiliate Link",
      type: "url",
      description: "Amazon link with affiliate tracking parameters",
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: "coverImage",
      title: "Book Cover Image",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: Rule => Rule.required(),
      fields: [
        defineField({
          name: "alt",
          type: "string",
          title: "Alt text",
          description: "Alternative text for screenreaders",
        }),
      ],
    }),
    defineField({
      name: "dateRead",
      title: "Date Read",
      type: "date",
      description: "When you finished reading this book (optional)",
    }),
    defineField({
      name: "rating",
      title: "Rating",
      type: "number",
      description: "Your personal rating (1-5)",
      validation: Rule => Rule.required().min(1).max(5).integer(),
    }),
    defineField({
      name: "summary",
      title: "Book Summary",
      type: "array",
      description: "Main summary content for the book",
      validation: Rule => Rule.required(),
      of: [
        defineArrayMember({
          type: "block",
          marks: {
            annotations: [
              {
                name: "link",
                type: "object",
                title: "Link",
                fields: [
                  {
                    name: "href",
                    type: "url",
                    title: "Url",
                  },
                ],
              },
            ],
          },
          styles: [
            { title: "Normal", value: "normal" },
            { title: "H2", value: "h2" },
            { title: "H3", value: "h3" },
            { title: "H4", value: "h4" },
            { title: "H5", value: "h5" },
            { title: "Quote", value: "blockquote" },
          ],
        }),
        {
          type: "code",
        },
        defineField({
          type: "image",
          icon: ImageIcon,
          name: "image",
          title: "Image",
          options: {
            hotspot: true,
          },
          preview: {
            select: {
              media: "asset",
              title: "caption",
            },
          },
          fields: [
            defineField({
              title: "Caption",
              name: "caption",
              type: "string",
              options: {
                isHighlighted: true,
              },
            }),
            defineField({
              name: "alt",
              type: "string",
              title: "Alt text",
              description:
                "Alternative text for screenreaders. Falls back on caption if not set",
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: "keyTakeaways",
      title: "Key Takeaways",
      type: "array",
      description: "Important lessons and insights from the book",
      validation: Rule => Rule.required(),
      of: [
        defineArrayMember({
          type: "block",
          styles: [{ title: "Normal", value: "normal" }],
        }),
      ],
    }),
    defineField({
      name: "personalNotes",
      title: "Personal Notes",
      type: "text",
      description: "Private notes (only visible when authenticated in Sanity Studio)",
      rows: 5,
    }),
    defineField({
      name: "isAiSummary",
      title: "AI-Generated Summary",
      type: "boolean",
      description: "Indicates whether this summary was generated using AI",
      initialValue: false,
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "tags" }],
        },
      ],
    }),
    defineField({
      name: "metaDescription",
      title: "Meta Description",
      type: "text",
      description: "Custom description for search results (max 160 characters)",
      validation: Rule => Rule.max(160),
      rows: 3,
    }),
    defineField({
      name: "metaTitle",
      title: "Meta Title",
      type: "string",
      description: "Custom page title for SEO (max 60 characters)",
      validation: Rule => Rule.max(60),
    }),
    defineField({
      name: "ogImage",
      title: "Open Graph Image",
      type: "image",
      description: "Custom image for social media sharing (optional)",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "focusKeyword",
      title: "Focus Keyword",
      type: "string",
      description: "Primary keyword for SEO optimization",
    }),
    defineField({
      name: "relatedBooks",
      title: "Related Books",
      type: "array",
      description: "Other books that cover similar topics",
      of: [
        {
          type: "reference",
          to: [{ type: "book" }],
        },
      ],
    }),
  ],
});
