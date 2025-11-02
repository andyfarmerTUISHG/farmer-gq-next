import { GrArticle as icon, GrImage as ImageIcon } from "react-icons/gr";
import { defineArrayMember, defineField, defineType } from "sanity";

export default defineType({
  // Computer Name
  name: "article",
  // Display name
  title: "Articles",
  type: "document",
  icon,
  preview: {
    select: {
      title: "name",
      createddate: "_createdAt",
      updateddate: "_updatedAt",
    },
    prepare(selection) {
      const { title, createddate, updateddate } = selection;
      const writtenDate = createddate
        ? new Date(createddate).toLocaleDateString("en-GB", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })
        : "No date";
      const formattedDate = updateddate
        ? new Date(updateddate).toLocaleDateString("en-GB", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })
        : "No date";

      return {
        title,
        subtitle: `📅: ${writtenDate}  ✏️: ${formattedDate}`,
      };
    },
  },

  fields: [
    {
      name: "name",
      title: "Article Title",
      type: "string",
      description: "Article Title",
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 100,
      },
    },
    {
      name: "tags",
      title: "Tags",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "tags" }],
        },
      ],
    },
    {
      name: "author",
      title: "Author",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "person" }],
        },
      ],
    },
    defineField({
      title: "Content",
      name: "bodycopy",
      type: "array",
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
                isHighlighted: true, // <-- make this field easily accessible
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
    {
      title: "Original Source Material",
      name: "origurl",
      type: "string",
    },
    {
      title: "Date Added",
      name: "createddate",
      type: "datetime",
    },
    {
      title: "Last Updated",
      name: "updateddate",
      type: "datetime",
    },
    {
      title: "Asset",
      name: "asset",
      type: "image",
      fields: [
        {
          name: "caption",
          type: "string",
          title: "Caption",
        },
        {
          // Editing this field will be hidden behind an "Edit"-button
          name: "attribution",
          type: "string",
          title: "Attribution",
        },
      ],
    },
  ],
});
