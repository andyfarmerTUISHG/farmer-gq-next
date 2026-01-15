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

// Book queries
export const allBooksQuery = groq`
  *[_type == "book"] | order(dateRead desc, _createdAt desc) {
    _id,
    title,
    "slug": slug.current,
    author,
    rating,
    coverImage,
    dateRead,
    "tags": tags[]->{ _id, name },
    _createdAt,
    _updatedAt
  }
`;

export const paginatedBooksQuery = groq`
  *[_type == "book"] | order($orderBy) [$skip...$pageSize] {
    _id,
    title,
    "slug": slug.current,
    author,
    rating,
    coverImage,
    dateRead,
    "tags": tags[]->{ _id, name },
    _createdAt,
    _updatedAt
  }
`;

export const bookBySlugQuery = groq`
  *[_type == "book" && slug.current == $slug][0] {
    _id,
    _type,
    title,
    "slug": slug.current,
    author,
    bookWebsite,
    amazonLink,
    amazonAffiliateLink,
    coverImage,
    dateRead,
    rating,
    summary,
    keyTakeaways,
    personalNotes,
    isAiSummary,
    "tags": tags[]->{ _id, name },
    metaDescription,
    metaTitle,
    ogImage,
    focusKeyword,
    "relatedBooks": relatedBooks[]->{
      _id,
      title,
      "slug": slug.current,
      author,
      rating,
      coverImage
    },
    _createdAt,
    _updatedAt,
    "chapters": *[_type == "chapter" && references(^._id)] | order(chapterNumber) {
      _id,
      chapterNumber,
      title,
      "slug": slug.current
    },
    "quotes": *[_type == "quote" && references(^._id) && !defined(parentChapter)] {
      _id,
      quoteText,
      context
    }
  }
`;

export const chapterBySlugQuery = groq`
  *[_type == "chapter" && slug.current == $slug][0] {
    _id,
    _type,
    chapterNumber,
    title,
    "slug": slug.current,
    summary,
    "parentBook": parentBook->{
      _id,
      title,
      "slug": slug.current,
      author
    },
    "quotes": *[_type == "quote" && references(^._id)] {
      _id,
      quoteText,
      context
    }
  }
`;

export const allBookSlugsQuery = groq`
  *[_type == "book" && defined(slug.current)][].slug.current
`;

export const allChapterSlugsQuery = groq`
  *[_type == "chapter" && defined(slug.current)] {
    "slug": slug.current,
    "bookSlug": parentBook->slug.current
  }
`;
