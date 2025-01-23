import dynamic from "next/dynamic";
import { draftMode } from "next/headers";
import { notFound } from "next/navigation";

import ArticlePage from "@/app/(site)/article/[article]/component/article-page";
import { loadArticle } from "@/sanity/loader/load-query";

const ArticlePreview = dynamic(
  () => import("@/app/(site)/article/[article]/component/article-preview")
);

export default async function ArticleSlugRoute({ params }) {
  const initial = await loadArticle(params.article);

  if (draftMode().isEnabled) {
    return <ArticlePreview params={params} initial={initial} />;
  }
  if (!initial.data) {
    notFound();
  }

  return <ArticlePage data={initial.data} />;
}
