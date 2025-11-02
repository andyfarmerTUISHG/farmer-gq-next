import { BiUser } from "react-icons/bi";
import { defineField } from "sanity";

const profile = {
  name: "profile",
  title: "Profile",
  type: "document",
  icon: BiUser,
  fields: [
    defineField({
      name: "fullName",
      title: "Full Name",
      type: "string",
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: "headline",
      title: "Headline",
      type: "string",
      description: "A short description of what you do?",
      validation: Rule => Rule.required().min(40).max(100),
    }),
  ],
};

export default profile;
