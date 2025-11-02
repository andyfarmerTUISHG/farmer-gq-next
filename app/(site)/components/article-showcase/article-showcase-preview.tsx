"use client";

import type { SettingsPayload } from "@/types";

import { articleShowcaseQuery } from "@/sanity/lib/queries";
import { useQuery } from "@/sanity/loader/use-query";

import ArticleShowcaseLayout from "./article-showcase-layout";

export default function ArticleShowcasePreview({ initial }) {
  const { data } = useQuery(articleShowcaseQuery, {}, { initial });
  return <ArticleShowcaseLayout data={data as SettingsPayload} />;
}
