import Link from "next/link";

import Pagination from "@/app/components/pagination";
import { getArticles } from "@/sanity/queries";

export default async function Article({searchParams}) {
	const articles = await getArticles(parseInt((searchParams.page || 0)), parseInt(process.env.NEXT_PAGE_SIZE || 10));

	return (
		<main>
			<h1> Article List Page {articles && articles[0].articleCount}</h1>


			<ul>
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
			</ul>


			<Pagination
				pageSize={parseInt(process.env.NEXT_PAGE_SIZE || 10)}
				totalCount={articles && articles[0].articleCount}
				currentPage={searchParams.page || 0}
				base="/article"
			/>
		</main>
	);
}
