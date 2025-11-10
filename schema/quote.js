import { GrBlockQuote as icon } from "react-icons/gr";
import { defineField, defineType } from "sanity";

export default defineType({
  name: "quote",
  title: "Book Quotes & Highlights",
  type: "document",
  icon,
  preview: {
    select: {
      quoteText: "quoteText",
      bookTitle: "parentBook.title",
      chapterTitle: "parentChapter.title",
    },
    prepare(selection) {
      const { quoteText, bookTitle, chapterTitle } = selection;
      const truncatedQuote
        = quoteText && quoteText.length > 60
          ? `${quoteText.substring(0, 60)}...`
          : quoteText || "No quote text";
      const location = chapterTitle
        ? `${bookTitle} - ${chapterTitle}`
        : bookTitle || "No book";
      return {
        title: truncatedQuote,
        subtitle: location,
      };
    },
  },
  fields: [
    defineField({
      name: "quoteText",
      title: "Quote Text",
      type: "text",
      description: "The memorable quote or highlight",
      validation: Rule => Rule.required(),
      rows: 4,
    }),
    defineField({
      name: "context",
      title: "Context / Commentary",
      type: "text",
      description: "Optional context or your thoughts about this quote",
      rows: 3,
    }),
    defineField({
      name: "parentBook",
      title: "Book",
      type: "reference",
      to: [{ type: "book" }],
      description: "The book this quote is from",
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: "parentChapter",
      title: "Chapter (Optional)",
      type: "reference",
      to: [{ type: "chapter" }],
      description: "The specific chapter this quote is from (if applicable)",
    }),
  ],
});
