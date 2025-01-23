import { groq } from "next-sanity";

export const articleBySlugQuery = groq`
    *[_type == "article" && slug.current == $slug][0] {
        _id,
        "slug": slug.current,
        name,
        createdDate,
        bodycopy,
		author,
    }
`;

export const settingsQuery = groq`
  *[_type == "settings"][0]{
    footer,
    menuItems[]->{
      _type,
      "slug": slug.current,
      title
    },
    ogImage,
  }
`;
