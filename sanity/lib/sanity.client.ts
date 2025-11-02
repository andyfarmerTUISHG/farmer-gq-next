import { defineLive } from "next-sanity/live";

import { env } from "@/app/(site)/env/index";

import { client } from "./client";

const token = env.SANITY_API_READ_TOKEN;
if (!token) {
  throw new Error("Missing SANITY_API_READ_TOKEN");
}

export const { sanityFetch, SanityLive } = defineLive({
  client,
  serverToken: token,
  browserToken: token,
});
