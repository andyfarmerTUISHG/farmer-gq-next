// sanity/sanity.query.ts

import { groq } from "next-sanity";

import client from "./client";

export async function getProfile() {
  return client.fetch(
    groq`*[_type == "profile"]{
      _id,
      fullName,
      headline
    }`
  );
}

export async function getArticles(start:number, finish:number) {
	console.log(`start  - ${typeof start} ${start} - finish - ${typeof finish} ${finish}`);
	return client.fetch(
		groq`


		*[_type == "article"] | order(_id) [${start}..${finish}] {
  _id,
  "slug": slug.current,
  name,
  createdDate,
  "articleCount": count(*[_type == "article"])
}`
	);
}

export async function getSingleArticle(slug: string) {


	return client.fetch(
	groq`*[_type == "article" && slug.current == "${slug}"][0]{
		_id,
		"slug": slug.current,
		name,
		createddate,
		bodycopy,
		author
	}`
	);
}
