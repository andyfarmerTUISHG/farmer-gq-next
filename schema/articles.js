import { GrArticle as icon } from "react-icons/gr";

const article = {
  // Computer Name
  name: "article",
  // Display name
  title: "Articles",
  type: "document",
  icon,
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
    {
      title: "Content",
      name: "bodycopy",
      type: "array",
      of: [{ type: "block" }, { type: "code" }],
    },
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
          options: {
            isHighlighted: true, // <-- make this field easily accessible
          },
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
};

export default article;
