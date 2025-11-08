// types/index.ts
import type { PortableTextBlock } from "sanity";

export type MenuItem = {
  _type: string;
  slug?: string;
  title?: string;
};

export type ProfileType = {
  _id: string;
  fullName: string;
  headline: PortableTextBlock[];
};

export type ArticleType = {
  _id: string;
  name: string;
  slug: string;
  bodycopy: string;
  author: string;
  _createdAt: string;
  _updatedAt: string;
};

export type SettingsPayload = {
  menuItems?: MenuItem[];
  showcaseArticles?: ArticleType[];
};
