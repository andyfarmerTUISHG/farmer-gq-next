import Link from "next/link";

import { getArticles } from "@/sanity/queries";

export default async function Article() {
	const articles = await getArticles();
	return (
		<main>
			<h1> Article List Page</h1>
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
		</main>
	);
}
