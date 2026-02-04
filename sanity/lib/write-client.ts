import { createClient } from "next-sanity";

import {
  apiVersion,
  dataset,
  projectId,
} from "@/sanity/lib/api";

// Write client for creating/updating content - SERVER ONLY
export const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
  perspective: "published",
});
