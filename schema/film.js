import { MdMovie as icon } from "react-icons/md";
import { defineField, defineType } from "sanity";

export default defineType({
  name: "film",
  title: "Films",
  type: "document",
  icon,
  preview: {
    select: {
      title: "title",
      status: "status",
    },
    prepare(selection) {
      const { title, status } = selection;
      const statusIcon = status === "wishlist" ? "📋" : "✅";
      return {
        title,
        subtitle: `${statusIcon} ${status}`,
      };
    },
  },
  fields: [
    defineField({
      name: "title",
      title: "Film Title",
      type: "string",
      description: "The title of the film",
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
      name: "status",
      title: "Status",
      type: "string",
      description: "Current status of the film",
      options: {
        list: [
          { title: "Wishlist", value: "wishlist" },
          { title: "Watched", value: "watched" },
        ],
        layout: "radio",
      },
      initialValue: "wishlist",
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: "isSecretScreening",
      title: "Secret Screening",
      type: "boolean",
      description: "Was this a secret screening where the film was unknown until viewing?",
      initialValue: false,
    }),
    defineField({
      name: "imdbId",
      title: "IMDB ID",
      type: "string",
      description: "IMDB identifier (e.g., tt1234567)",
    }),
    defineField({
      name: "posterUrl",
      title: "Poster URL",
      type: "url",
      description: "URL to the film poster image",
    }),
    defineField({
      name: "year",
      title: "Release Year",
      type: "number",
      description: "Year the film was released",
    }),
    defineField({
      name: "runtime",
      title: "Runtime (minutes)",
      type: "number",
      description: "Film runtime in minutes",
    }),
    defineField({
      name: "plot",
      title: "Plot Synopsis",
      type: "text",
      description: "Short plot synopsis from OMDb",
      rows: 4,
    }),
    defineField({
      name: "dateAddedToWishlist",
      title: "Date Added to Wishlist",
      type: "date",
      description: "When this film was added to the wishlist",
    }),
    defineField({
      name: "dateWatched",
      title: "Date Watched",
      type: "date",
      description: "When you watched this film",
    }),
    defineField({
      name: "cinemaLocation",
      title: "Cinema Location",
      type: "string",
      description: "Which Cineworld cinema you watched this at",
    }),
    defineField({
      name: "personalRating",
      title: "Personal Rating",
      type: "number",
      description: "Your personal rating (1-5)",
      validation: Rule => Rule.min(1).max(5).integer(),
    }),
    defineField({
      name: "personalNotes",
      title: "Personal Notes",
      type: "text",
      description: "Your thoughts and notes about the film",
      rows: 4,
    }),
  ],
});
