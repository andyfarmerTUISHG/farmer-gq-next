"use client";

import { articleBySlugQuery } from "@/sanity/lib/queries";
import { useQuery } from "@/sanity/loader/use-query";

import ArticlePage from "./article-page";

export default function ArticlePreview(props) {
  const { params, initial } = props;
  const { data, encodeDataAttribute } = useQuery(articleBySlugQuery, params, {
    initial,
  });

  return <ArticlePage data={data} encodeDataAttribute={encodeDataAttribute} />;
}
