import Link from "next/link";

import Pagination from "@/app/(site)/components/pagination";
import { loadPaginatedArticle } from "@/sanity/loader/load-query";

export default async function Article(props) {
  const searchParams = await props.searchParams;
  let skip = 0;
  const pageSize = parseInt(process.env.NEXT_PAGE_SIZE || 10);
  const page = searchParams?.page ? parseInt(searchParams.page, 10) : 1;
  if (page === 1) {
    skip = 0;
  } else {
    skip = parseInt(searchParams.page || 0) * pageSize;
  }
  const finish = parseInt(skip + pageSize - 1);
  const { data: articlesPagination } = await loadPaginatedArticle(skip, finish);
  
  //Define some vars
  const articleCount = articlesPagination && articlesPagination[0].articleCount;
  return (
    <main>
  
      <h1> {articleCount} Articles Listing </h1>

			<div>
				<ol>
				{articlesPagination && articlesPagination.map((article) => (
					<li key={`pag-${article._id}`}>
						<Link
							href={`/article/${article.slug}`}
						>{article.name}</Link>
					</li>
				))}
				</ol>
				<Pagination
					pageSize={pageSize}
					totalCount={articleCount}
					currentPage={page}
					base="/article"
				/>

			</div> 
    </main>
  );
}
