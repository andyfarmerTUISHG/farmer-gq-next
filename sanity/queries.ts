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

export async function getAllArticles() {
  return client.fetch(
    groq`*[_type == "article"]  {
				_id,
				"slug": slug.current,
				name,
				createdDate,
				"articleCount": count(*[_type == "article"])
			}`
  );
}

export async function getArticles(skip: number, finish: number) {
  return client.fetch(
    groq`*[_type == "article"] | order(_id) [${skip}..${finish}] {
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
