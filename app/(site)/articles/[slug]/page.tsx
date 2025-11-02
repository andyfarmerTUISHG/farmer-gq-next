// import { notFound } from "next/navigation";
import type { EncodeDataAttributeCallback } from "@sanity/react-loader";

import { createDataAttribute } from "next-sanity";
import { draftMode } from "next/headers";
import { notFound } from "next/navigation";

import type { ArticleType } from "@/types";

import { studioUrl } from "@/sanity/lib/api";
import { sanityFetch } from "@/sanity/lib/live";
import { articleBySlugQuery } from "@/sanity/lib/queries";

import { CustomPortableText } from "../../components/global/custom-portable-text";

export type ArticlePageProps = {
  data: ArticleType | null;
  encodeDataAttribute?: EncodeDataAttributeCallback;
};

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function ArticlePage({ params }: Props) {
  const { data: article } = await sanityFetch({
    query: articleBySlugQuery,
    params,
    stega: false,
  });

  if (!article?._id && !(await draftMode()).isEnabled) {
    notFound();
  }

  const { name, createddate, authors, bodycopy } = article ?? {};

  const dataAttribute
    = article?._id && article._type
      ? createDataAttribute({
          baseUrl: studioUrl,
          id: article._id,
          type: article._type,
        })
      : null;

  return (
    <div>
      {/* <p>{params.article}</p> */}
      <main className="container flex flex-col items-center py-16 md:py-20 lg:flex-row">
        <div>
          {/* Title */}
          {name && (
            <div className="text-4xl" data-sanity={dataAttribute?.("name")}>
              {name}
              <br />
              <span className="text-sm">{createddate}</span>
            </div>
          )}
          <ul>
            {authors
              && authors.map(author => (
                <li key={author.name}>
                  <a href={`/person/${author.slug}`}>
                    <span>{author.name}</span>
                  </a>
                </li>
              ))}
          </ul>
          <div>
            {bodycopy && (
              <>
                <CustomPortableText
                  id={article?._id || null}
                  type={article?._type || null}
                  path={["bodycopy"]}
                  paragraphClasses=""
                  value={bodycopy}
                />
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
