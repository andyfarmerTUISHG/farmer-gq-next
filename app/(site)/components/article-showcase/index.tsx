import dynamic from "next/dynamic";
import { draftMode } from "next/headers";
import { notFound } from "next/navigation";

import { loadArticleShowcase } from "@/sanity/loader/load-query";

import ArticleShowcaseLayout from "./article-showcase-layout";
const ArticleShowcasePreview = dynamic(
  () =>
    import("@/app/(site)/components/article-showcase/article-showcase-preview")
);
export default async function ArticleShowcase() {
  const initial = await loadArticleShowcase();
  // console.log(JSON.stringify(initial, null, 2));
  if ((await draftMode()).isEnabled) {
    return <ArticleShowcasePreview initial={initial} />;
  }
  if (!initial.data) {
    notFound();
  }
  return <ArticleShowcaseLayout data={initial.data} />;
}
