import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    NODE_ENV: z.enum(["development", "production"]).default("development"),
    NEXT_PAGE_SIZE: z.string().default("15"),
    SANITY_API_READ_TOKEN: z.string().min(1),
    SANITY_API_WRITE_TOKEN: z.string().min(1),
    SANITY_STUDIO_PROJECT_ID: z.string().min(1),
    SANITY_STUDIO_DATASET: z.string().default("production"),
    SANITY_API_PROJECT_ID: z.string().min(1),
    SANITY_API_DATASET: z.string().min(1),
    SANITY_REVALIDATE_SECRET: z.string().optional(),
  },
  // eslint-disable-next-line node/no-process-env
  experimental__runtimeEnv: process.env,
  emptyStringAsUndefined: true,
});
