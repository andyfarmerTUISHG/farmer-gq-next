import Link from "next/link";

import type { SettingsPayload } from "@/types";

import { urlForImage } from "@/sanity/lib/utils";

export default function ArticleShowcaseLayout({
  data,
}: {
  data: SettingsPayload;
}) {
  return (
    <>
      <div className="bg-grey-50" id="blog">
        <div className="container py-16 md:py-20">
          <h2 className="font-header text-primary text-center text-4xl font-semibold uppercase sm:text-5xl lg:text-6xl">
            I also like to share my thoughts
          </h2>
          <h4 className="font-header pt-6 text-center text-xl font-medium text-black sm:text-2xl lg:text-3xl">
            Check out my favourite posts!
          </h4>
          <div className="mx-auto grid w-full grid-cols-1 gap-6 pt-12 sm:w-3/4 lg:w-full lg:grid-cols-3 xl:gap-10">
            {data?.showcaseArticles
              && data.showcaseArticles.map(article => (
                <a
                  key={article._id}
                  href={`/articles/${article.slug}`}
                  className="shadow"
                >
                  <div
                    style={{
                      backgroundImage: article.asset
                        ? `url(${urlForImage(article.asset)?.width(400).height(300).url()})`
                        : "url(/assets/img/post-01.png)",
                    }}
                    className="group relative h-72 bg-cover bg-center bg-no-repeat sm:h-84 lg:h-64 xl:h-72"
                  >
                    <span className="from-blog-gradient-from to-blog-gradient-to absolute inset-0 block bg-gradient-to-b bg-cover bg-center bg-no-repeat opacity-10 transition-opacity group-hover:opacity-50"></span>
                    <span className="font-body absolute right-0 bottom-0 mr-4 mb-4 block rounded-full border-2 border-white px-6 py-2 text-center text-sm font-bold text-white uppercase md:text-base">
                      Read More
                    </span>
                  </div>
                  <div className="bg-white px-5 py-6 xl:py-8">
                    <span className="font-body block text-lg font-semibold text-black">
                      {article.name}
                    </span>
                    <span className="font-body text-grey-20 block pt-2"></span>
                  </div>
                </a>
              ))}
          </div>
          <h5>
            <Link href="/articles">See all posts</Link>
          </h5>
        </div>
      </div>
    </>
  );
}
