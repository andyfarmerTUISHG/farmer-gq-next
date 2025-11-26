import { GrChapterAdd as icon } from "react-icons/gr";
import { defineArrayMember, defineField, defineType } from "sanity";

export default defineType({
  name: "chapter",
  title: "Book Chapters",
  type: "document",
  icon,
  preview: {
    select: {
      chapterNumber: "chapterNumber",
      title: "title",
      bookTitle: "parentBook.title",
    },
    prepare(selection) {
      const { chapterNumber, title, bookTitle } = selection;
      return {
        title: `Ch ${chapterNumber}: ${title}`,
        subtitle: bookTitle || "No parent book",
      };
    },
  },
  fields: [
    defineField({
      name: "chapterNumber",
      title: "Chapter Number",
      type: "string",
      description: "Chapter identifier (e.g., '1', 'Introduction', 'Epilogue')",
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: "title",
      title: "Chapter Title",
      type: "string",
      description: "The title of this chapter",
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
      name: "summary",
      title: "Chapter Summary",
      type: "array",
      description: "Detailed summary content for this chapter",
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
          name: "image",
          title: "Image",
          options: {
            hotspot: true,
          },
          fields: [
            defineField({
              title: "Caption",
              name: "caption",
              type: "string",
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
      name: "parentBook",
      title: "Parent Book",
      type: "reference",
      to: [{ type: "book" }],
      description: "The book this chapter belongs to",
      validation: Rule => Rule.required(),
    }),
  ],
});
