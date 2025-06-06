"use client";
import Link from "next/link";
import styled from "styled-components";

const PaginationStyles = styled.div`
  display: flex;
  align-content: center;
  align-items: center;
  justify-items: center;
  border: 1px solid var(--grey);
  margin: 1em 0px;
  border-radius: 5px;
  text-align: center;
  & > * {
    padding: 1rem;
    flex: 1;
    border-right: 1px solid var(--grey);
    text-decoration: none;
    &[aria-current="page"],
    &.current {
      background: var(--purple);
      color: var(--yellow);
    }
    &[aria-disabled="true"] {
      pointer-events: none;
      color: var(--grey);
    }
  }

  @media (max-width: 800px) {
    .word {
      display: none;
    }
    font-size: 1.4rem;
  }
`;

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
  const hasPrevPage = prevPage >= 1;

  return (
    <div>
      <PaginationStyles>
        <Link
          title="Previous Page"
          aria-disabled={!hasPrevPage}
          href={`${base}?page=${prevPage}`}
        >
          &#8592; <span className="word"> Prev</span>
        </Link>

        {Array.from({ length: totalPages }).map((_, i) => (
          <Link href={`${base}?page=${i + 1}`} key={`page-${i + 1}`}>
            {i + 1}
          </Link>
        ))}

        <Link
          title="Next Page"
          aria-disabled={!hasNextPage}
          href={`${base}?page=${nextPage}`}
        >
          <span className="word">Next </span>&#8594;
        </Link>
      </PaginationStyles>
    </div>
  );
}
