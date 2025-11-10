import type { BookListItem } from "@/types";

import BookCard from "@/app/(site)/components/book-card";
import Pagination from "@/app/(site)/components/pagination";
import { env } from "@/app/(site)/env";
import { sanityFetch } from "@/sanity/lib/live";
import { paginatedBooksQuery } from "@/sanity/lib/queries";

type SortOption = "rating" | "dateRead" | "author";

type SearchParams = {
  page?: string;
  sort?: SortOption;
};

export default async function BooksListRoute({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const pageSize = Number.parseInt(env.NEXT_PAGE_SIZE);
  const resolvedSearchParams = await searchParams;
  const page = resolvedSearchParams?.page
    ? Number.parseInt(resolvedSearchParams.page, 10)
    : 1;
  const sort = resolvedSearchParams?.sort || "rating";
  const skip = (page - 1) * pageSize;

  // Map sort parameter to GROQ order clause
  const orderByMap: Record<SortOption, string> = {
    rating: "rating desc",
    dateRead: "dateRead desc",
    author: "author asc",
  };

  const orderBy = orderByMap[sort] || orderByMap.rating;

  const { data } = await sanityFetch({
    query: paginatedBooksQuery,
    params: {
      skip: Math.floor(skip),
      pageSize: Math.floor(skip + pageSize),
      orderBy,
    },
  });

  const books = (data || []) as BookListItem[];

  // Get total count from first book or default to 0
  const totalCount = books.length;

  return (
    <main className="container mx-auto px-4 py-16 md:py-20">
      <div className="mb-8">
        <h1 className="mb-4 text-4xl font-bold">Leadership Books</h1>
        <p className="text-gray-600">
          Explore summaries and insights from
          {" "}
          {totalCount}
          {" "}
          leadership books
        </p>
      </div>

      {/* Sorting Controls */}
      <div className="mb-8 flex flex-wrap items-center gap-4">
        <span className="text-sm font-medium text-gray-700">Sort by:</span>
        <div className="flex gap-2">
          <SortButton
            label="Rating"
            value="rating"
            currentSort={sort}
            currentPage={page}
          />
          <SortButton
            label="Date Read"
            value="dateRead"
            currentSort={sort}
            currentPage={page}
          />
          <SortButton
            label="Author"
            value="author"
            currentSort={sort}
            currentPage={page}
          />
        </div>
      </div>

      {/* Books Grid */}
      {books.length > 0
        ? (
            <div className="mb-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {books.map(book => (
                <BookCard key={book._id} book={book} />
              ))}
            </div>
          )
        : (
            <div className="py-12 text-center">
              <p className="text-gray-500">No books found.</p>
            </div>
          )}

      {/* Pagination */}
      {totalCount > pageSize && (
        <Pagination
          pageSize={pageSize}
          totalCount={totalCount}
          currentPage={page}
          base={`/books?sort=${sort}`}
        />
      )}
    </main>
  );
}

type SortButtonProps = {
  label: string;
  value: SortOption;
  currentSort: SortOption;
  currentPage: number;
};

function SortButton({
  label,
  value,
  currentSort,
  currentPage,
}: SortButtonProps) {
  const isActive = currentSort === value;
  const href = `/books?sort=${value}${currentPage > 1 ? `&page=${currentPage}` : ""}`;

  return (
    <a
      href={href}
      className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${
        isActive
          ? "bg-purple-600 text-white"
          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
      }`}
    >
      {label}
    </a>
  );
}
