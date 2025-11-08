import { groq } from "next-sanity";

export const paginatedArticlesQuery = groq`
  *[_type == "article"] | order(_updatedAt desc, _createdAt desc) [$skip...$pageSize] {
    _id,
    "slug": slug.current,
    name,
    bodycopy,
    _createdAt,
    _updatedAt,
    "authors": author[]->{ name, "slug": slug.current},
    "articleCount": count(*[_type == "article"])
  }
`;
export const allArticlesQuery = groq`
  *[_type == "article"] {
    _id,
    "slug": slug.current,
    name,
    bodycopy,
    _createdAt,
    _updatedAt,
    "authors": author[]->{ name, "slug": slug.current},
  }
`;

export const articleBySlugQuery = groq`
    *[_type == "article" && slug.current == $slug][0] {
        _id,
        "authorName": author[0]->name,
        "slug": slug.current,
        name,
        bodycopy,
        _createdAt,
        _updatedAt,
        "authors": author[]->{ name, "slug": slug.current, image},
    }
`;

export const articlesWithNoAuthorsQuery = groq`
  *[_type == "article" && (!defined(author) || count(author) == 0)] {
    _id,
    "slug": slug.current,
    name,
    bodycopy,
    _createdAt,
    _updatedAt
  }
`;

export const settingsQuery = groq`
  *[_type == "settings"][0]{
    menuItems[]->{
      _type,
      "slug": slug.current,
      name,
      url,
      title,
      _id
    },
  }
`;

export const articleShowcaseQuery = groq`
  *[_type == "settings"][0]{
    showcaseArticles[]->{
      _id,
      _type,
      "slug": slug.current,
      name,
      url,
      title,
      asset
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
