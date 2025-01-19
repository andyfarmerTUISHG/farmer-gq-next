
import Link from "next/link";

export default function Pagination({
  pageSize,
  totalCount,
  currentPage,
  base,
}) {
  // make some vars
  const totalPages = Math.ceil(totalCount / pageSize) - 1;
  const prevPage = currentPage - 1;
  const nextPage = currentPage + 1;
  const hasNextPage = nextPage <= totalPages;
  const hasPrevPage = prevPage >= 0;

  return (

    <div>
			<div style={{margin: "0 auto",
				border: "2px solid red",
				width: "80%",
				padding: "1.45rem 1.0875rem",}}>
      <Link
        title="Previous Page"
        aria-disabled={!hasPrevPage}
        href={`${base}?page=${prevPage}`}
      >
        &#8592; <span className="word"> Prev
				</span>
      </Link>
			<ul>
			{Array.from({ length: totalPages }).map((_, i) => (
				<li key={`page-${i+1}`}>

      		<Link href={`/article?page=${i + 1}`}>Page
          {i + 1}

					</Link>

				</li>
			))}
			</ul>
      <Link
        title="Next Page"
        aria-disabled={!hasNextPage}
        href={`${base}?page=${nextPage}`}
      >
        <span className="word">Next </span>&#8594;
      </Link>
			</div>
    </div>
  );
}
