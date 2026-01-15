// types/index.ts
import type { Article, Book, Chapter, Profile, Quote, Settings, Sitelinks, Tags } from "../sanity.types";

// Book-related types for frontend use
export type BookListItem = Pick<Book, "_id" | "title" | "slug" | "author" | "rating" | "coverImage" | "dateRead" | "_createdAt" | "_updatedAt"> & {
  tags?: Array<{ _id: string; name: string }>;
};

export type BookDetail = Book & {
  relatedBooks?: BookListItem[];
  chapters?: Array<Pick<Chapter, "_id" | "chapterNumber" | "title" | "slug">>;
  quotes?: Array<Pick<Quote, "_id" | "quoteText" | "context">>;
  tags?: Array<{ _id: string; name: string }>;
};

export type ChapterDetail = Chapter & {
  parentBook: Pick<Book, "_id" | "title" | "slug" | "author">;
  quotes?: Array<Pick<Quote, "_id" | "quoteText" | "context">>;
};

export type QuoteWithContext = Quote & {
  parentBook: Pick<Book, "_id" | "title">;
  parentChapter?: Pick<Chapter, "_id" | "title">;
};

// Re-export Sanity types for convenience
export type { Article, Book, Chapter, Profile, Quote, Settings, Sitelinks, Tags };
