import Link from "next/link";

import Pagination from "@/app/components/pagination";
import { getArticles } from "@/sanity/queries";

export default async function Article({searchParams}) {
	const skip = parseInt((searchParams.page || 0)) * parseInt(process.env.NEXT_PAGE_SIZE || 10);

	const articles = await getArticles(skip, parseInt(process.env.NEXT_PAGE_SIZE || 10 + skip - 1));

	return (
		<main>
			<h1> {articles && articles[0].articleCount} Articles Listing </h1>
			<ol>
			{articles && articles.map((article) => (
				<li key={article._id}>
					<h2>
						<Link
							href={`/article/${article.slug}`}
							>

						{article.name}
							</Link>
						</h2>
				</li>

			))}
			</ol>


			<Pagination
				pageSize={parseInt(process.env.NEXT_PAGE_SIZE || 10)}
				totalCount={articles && articles[0].articleCount}
				currentPage={parseInt(searchParams.page) || 1}
				base="/article"
			/>
		</main>
	);
}
