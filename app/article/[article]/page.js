import { PortableText } from "@portabletext/react";

import { getSingleArticle } from "@/sanity/queries";

export default async function Article({params}) {

	const slug = params.article;


	const article = await getSingleArticle(slug);


	return (
		<div>
			<h1> Single Article Page</h1>
			<h2>{article.name}</h2>

			<PortableText value={article.bodycopy} />
		</div>
	);
}
