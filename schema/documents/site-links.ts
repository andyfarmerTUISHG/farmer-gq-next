import { FaLink } from "react-icons/fa";
import { defineField, defineType } from "sanity";

export default defineType({
  name: "sitelinks",
  title: "Site Links",
  type: "document",
  icon: FaLink,
  fields: [
    defineField({
      type: "string",
      name: "title",
      title: "Title",
      validation: (Rule) => Rule.required(),
    }),
    defineField({ type: "string", name: "description", title: "Description" }),
    defineField({ name: "url", title: "URL", type: "string" }),
  ],
  preview: {
    select: { duration: "duration", image: "image", title: "title" },
    prepare({ duration, image, title }) {
      return {
        media: image,
        subtitle: [
          duration?.start && new Date(duration.start).getFullYear(),
          duration?.end && new Date(duration.end).getFullYear(),
        ]
          .filter(Boolean)
          .join(" - "),
        title,
      };
    },
  },
});
