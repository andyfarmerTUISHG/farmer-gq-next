// types/index.ts
import type { PortableTextBlock } from "sanity";

export interface MenuItem {
  _type: string;
  slug?: string;
  title?: string;
}

export type ProfileType = {
  _id: string;
  fullName: string;
  headline: PortableTextBlock[];
};

export type ArticleType = {
  _id: string;
  name: string;
  slug: string;
  createddate: string;
  bodycopy: string;
  author: string;
};

export interface SettingsPayload {
  menuItems?: MenuItem[];
  showcaseArticles?: ArticleType[];
}
