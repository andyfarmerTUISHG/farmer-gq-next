import { notFound } from "next/navigation";

import { sanityFetch } from "@/sanity/lib/live";
import { allArticlesQuery } from "@/sanity/lib/queries";

import ArticleShowcaseLayout from "./article-showcase-layout";

export default async function ArticleShowcase() {
  const { data } = await sanityFetch({ query: allArticlesQuery });

  if (!data) {
    notFound();
  }
  return <ArticleShowcaseLayout data={data} />;
}
