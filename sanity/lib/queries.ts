import { groq } from "next-sanity";

export const paginatedArticlesQuery = groq`
  *[_type == "article"] | order(_id) [$skip...$pageSize] {
    _id,
    "slug": slug.current,
    name,
    createdDate,
    bodycopy,
    "authors": author[]->{ name, "slug": slug.current},
    "articleCount": count(*[_type == "article"])
  }
`;
export const allArticlesQuery = groq`
  *[_type == "article"] {
    _id,
    "slug": slug.current,
    name,
    createdDate,
    bodycopy,
    "authors": author[]->{ name, "slug": slug.current},
  }
`;

export const articleBySlugQuery = groq`
    *[_type == "article" && slug.current == $slug][0] {
        _id,
        "slug": slug.current,
        name,
        createdDate,
        bodycopy,
        "authors": author[]->{ name, "slug": slug.current, image},
    }
`;

export const articlesWithNoAuthorsQuery = groq`
  *[_type == "article" && (!defined(author) || count(author) == 0)] {
    _id,
    "slug": slug.current,
    name,
    createdDate,
    bodycopy
  }
`;

export const settingsQuery = groq`
  *[_type == "settings"][0]{
    menuItems[]->{
      _type,
      "slug": slug.current,
      name,
      url,
      title
    },
  }
`;

export const profileQuery = groq`
  *[_type == "profile"]{
    _id,
    fullName,
    headline,
  }
`;
