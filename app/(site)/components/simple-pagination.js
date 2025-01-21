

export default function SimplePagination({
  pageSize,
  totalCount,
  currentPage,
	skip,
  base,
}) {
	return (
		<div>
			Example of Simple Pagination
			Page 0 is 0 to 09
			Page 1 is 10 to 19
			Pagge 2 is 20 to 29
			<ul>
				<li>Page Size: {typeof pageSize} {pageSize}</li>
				<li>Total Count: {typeof totalCount} {totalCount}</li>
				<li>Current Page: {typeof currentPage} {currentPage}</li>
				<li>Base: {typeof base} {base}</li>
				<li>Skip: {typeof skip} {skip}</li>
			</ul>
		</div>
	);
}
