"use client";

import { articleShowcaseQuery } from "@/sanity/lib/queries";
import { useQuery } from "@/sanity/loader/use-query";

import ArticleShowcaseLayout from "./article-showcase-layout";

export default function ArticleShowcasePreview({ initial }) {
  const { data, encodeDataAttribute } = useQuery(
    articleShowcaseQuery,
    {},
    { initial }
  );
  return (
    <ArticleShowcaseLayout
      data={data}
      encodeDataAttribute={encodeDataAttribute}
    />
  );
}
