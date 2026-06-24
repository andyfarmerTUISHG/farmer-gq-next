import { defineQuery } from "next-sanity";

export const paginatedArticlesQuery = defineQuery(`
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
`);
export const allArticlesQuery = defineQuery(`
  *[_type == "article"] {
    _id,
    "slug": slug.current,
    name,
    bodycopy,
    _createdAt,
    _updatedAt,
    "authors": author[]->{ name, "slug": slug.current},
  }
`);

export const articleBySlugQuery = defineQuery(`
    *[_type == "article" && slug.current == $slug][0] {
        _id,
        _type,
        "authorName": author[0]->name,
        "slug": slug.current,
        name,
        bodycopy,
        _createdAt,
        _updatedAt,
        "authors": author[]->{ name, "slug": slug.current, image},
    }
`);

export const articlesWithNoAuthorsQuery = defineQuery(`
  *[_type == "article" && (!defined(author) || count(author) == 0)] {
    _id,
    "slug": slug.current,
    name,
    bodycopy,
    _createdAt,
    _updatedAt
  }
`);

export const settingsQuery = defineQuery(`
  *[_type == "settings"][0]{
    defaultCinema,
    menuItems[]->{
      _type,
      "slug": slug.current,
      name,
      url,
      title,
      _id
    },
  }
`);

export const articleShowcaseQuery = defineQuery(`
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
`);

export const profileQuery = defineQuery(`
  *[_type == "profile"]{
    _id,
    fullName,
    headline,
  }
`);

// Book queries
export const allBooksQuery = defineQuery(`
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
`);

export const paginatedBooksQuery = defineQuery(`
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
`);

export const bookBySlugQuery = defineQuery(`
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
`);

export const chapterBySlugQuery = defineQuery(`
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
`);

export const allBookSlugsQuery = defineQuery(`
  *[_type == "book" && defined(slug.current)][].slug.current
`);

export const allChapterSlugsQuery = defineQuery(`
  *[_type == "chapter" && defined(slug.current)] {
    "slug": slug.current,
    "bookSlug": parentBook->slug.current
  }
`);

// Film queries
export const allFilmsQuery = defineQuery(`
  *[_type == "film"] | order(dateWatched desc, dateAddedToWishlist desc, _createdAt desc) {
    _id,
    title,
    "slug": slug.current,
    status,
    isSecretScreening,
    posterUrl,
    year,
    runtime,
    dateAddedToWishlist,
    dateWatched,
    cinemaLocation,
    personalRating,
    _createdAt,
    _updatedAt
  }
`);

export const watchedFilmsQuery = defineQuery(`
  *[_type == "film" && status == "watched"] | order(dateWatched desc, _createdAt desc) {
    _id,
    title,
    "slug": slug.current,
    status,
    isSecretScreening,
    posterUrl,
    year,
    runtime,
    dateWatched,
    cinemaLocation,
    personalRating,
    _createdAt,
    _updatedAt
  }
`);

export const wishlistFilmsQuery = defineQuery(`
  *[_type == "film" && status == "wishlist"] | order(dateAddedToWishlist desc, _createdAt desc) {
    _id,
    title,
    "slug": slug.current,
    status,
    isSecretScreening,
    posterUrl,
    year,
    runtime,
    dateAddedToWishlist,
    _createdAt,
    _updatedAt
  }
`);

export const filmBySlugQuery = defineQuery(`
  *[_type == "film" && slug.current == $slug][0] {
    _id,
    _type,
    title,
    "slug": slug.current,
    status,
    isSecretScreening,
    imdbId,
    posterUrl,
    year,
    runtime,
    plot,
    dateAddedToWishlist,
    dateWatched,
    cinemaLocation,
    personalRating,
    personalNotes,
    _createdAt,
    _updatedAt
  }
`);

export const allFilmSlugsQuery = defineQuery(`
  *[_type == "film" && defined(slug.current)][].slug.current
`);

export const wrappedYearsQuery = defineQuery(`
  *[_type == "film" && status == "watched" && defined(dateWatched)] {
    "year": string::split(dateWatched, "-")[0]
  } | order(year desc)
`);

export const wrappedFilmsQuery = defineQuery(`
  *[_type == "film" && status == "watched" && string::split(dateWatched, "-")[0] == $year] | order(dateWatched desc) {
    _id,
    title,
    "slug": slug.current,
    status,
    isSecretScreening,
    year,
    dateWatched,
    cinemaLocation,
    personalRating,
    personalNotes,
    dateAddedToWishlist,
    _createdAt,
    _updatedAt,
    "waitTime": select(
      defined(dateAddedToWishlist) && defined(dateWatched) => 
        round((dateTime(dateWatched) - dateTime(dateAddedToWishlist)) / 86400),
      0
    )
  }
`);

export const lastFilmWatchedQuery = defineQuery(`
  *[_type == "film" && status == "watched" && defined(dateWatched)] | order(dateWatched desc) [0] {
    _id,
    title,
    "slug": slug.current,
    status,
    isSecretScreening,
    year,
    dateWatched,
    cinemaLocation,
    personalRating,
    posterUrl,
    plot,
    "watchedYear": string::split(dateWatched, "-")[0]
  }
`);
