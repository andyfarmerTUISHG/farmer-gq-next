import { MdPerson as icon } from "react-icons/md";

export default {
  // Computer Name
  name: "person",
  // Display name
  title: "Person",
  type: "document",
  icon,
  fields: [
    {
      name: "name",
      title: "Person Name",
      type: "string",
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
      name: "description",
      title: "Short Bio",
      type: "text",
      description: "Tell us a little about the person",
    },
    {
      name: "image",
      title: "Person Image",
      type: "image",
      options: {
        hotspot: true,
      },
    },
  ],
};
