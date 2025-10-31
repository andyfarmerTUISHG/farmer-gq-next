import { CogIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

export default defineType({
  name: "settings",
  title: "Settings",
  type: "document",
  icon: CogIcon,
  // Uncomment below to have edits publish automatically as you type
  // liveEdit: true,
  // TODO - need more fields for settings
  fields: [
    defineField({
      name: "menuItems",
      title: "Menu Item list",
      description: "Links displayed on the header of your site.",
      type: "array",
      of: [
        {
          title: "Reference",
          type: "reference",
          to: [
            {
              type: "article",
            },
            { type: "sitelinks" },
          ],
        },
      ],
    }),
    defineField({
      name: "showcaseArticles",
      title: "Showcase Article",
      type: "array",
      description: "Articles to display on the showcase page.",
      of: [
        defineArrayMember({
          type: "reference",
          to: [{ type: "article" }],
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Menu Items",
      };
    },
  },
});
