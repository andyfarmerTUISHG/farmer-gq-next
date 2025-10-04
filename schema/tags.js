import { TiTags as icon } from "react-icons/ti";

export default {
  // Computer Name
  name: "tags",
  // Display name
  title: "Tags",
  type: "document",
  icon,
  fields: [
    {
      name: "name",
      title: "Tag  Name",
      type: "string",
      description: "Name of the Tag",
    },
  ],
};
