import "server-only";

import { env } from "@/app/(site)/env/index";

export const token = env.SANITY_API_READ_TOKEN;

if (!token) {
  throw new Error("Missing SANITY_API_READ_TOKEN");
}
