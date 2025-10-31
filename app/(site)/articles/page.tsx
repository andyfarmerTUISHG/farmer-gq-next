import Pagination from "@/app/(site)/components/pagination";
import { formatDate } from "@/app/utils/functions";
import { sanityFetch } from "@/sanity/lib/live";
import { paginatedArticlesQuery } from "@/sanity/lib/queries";

export default async function ArticleListRoute({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const pageSize = Number.parseInt(process.env.NEXT_PAGE_SIZE || "15");
  const resolvedSearchParams = await searchParams;
  const page = resolvedSearchParams?.page
    ? Number.parseInt(resolvedSearchParams.page, 10)
    : 1;
  const skip = (page - 1) * pageSize;

  const { data } = await sanityFetch({
    query: paginatedArticlesQuery,
    params: {
      skip: Math.floor(skip),
      pageSize: Math.floor(skip + pageSize), // Calculate the end of the range
    },
  });

  const articles = data || [];
  const articleCount = articles.length > 0 ? articles[0]?.articleCount || 0 : 0;
  // const { data: articlesPagination } = await loadPaginatedArticle(skip, finish);

  // Define some vars
  // const articleCount = articlesPagination && articlesPagination[0].articleCount;
  return (
    <main className="container flex flex-col items-center py-16 md:py-20 lg:flex-row">
      <h1>
        {" "}
        {articleCount}
        {" "}
        Articles Listing
        {" "}
      </h1>

      <div>
        <ol>
          {articles
            && articles.map(article => (
              <li key={`pag-${article._id}`}>
                <a href={`/articles/${article.slug}`}>
                  {article.name}
                  <br />
                  <span className="text-xs">
                    <b>
                      Created:
                    </b>
                    {formatDate(article._createdAt)}
                    &nbsp;|&nbsp;
                    <b>
                      Updated:
                    </b>
                    {formatDate(article._updatedAt)}
                  </span>
                </a>
              </li>
            ))}
        </ol>

        <Pagination
          pageSize={pageSize}
          totalCount={articleCount}
          currentPage={page}
          base="/articles"
        />
      </div>
    </main>
  );
}
