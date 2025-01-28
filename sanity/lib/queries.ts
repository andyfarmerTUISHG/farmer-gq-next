import { groq } from "next-sanity";


export const paginatedArticlesQuery = groq`
  *[_type == "article"] | order(_id) [$skip...$pageSize] {
    _id,
    "slug": slug.current,
    name,
    createdDate,
    bodycopy,
    author,
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
    author,
  }
`;

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
    menuItems[]->{
      _type,
      "slug": slug.current,
      name
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