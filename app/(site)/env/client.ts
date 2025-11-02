import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  client: {
    NEXT_PUBLIC_SANITY_PROJECT_ID: z.string(),
    NEXT_PUBLIC_SANITY_DATASET: z.string(),
    NEXT_PUBLIC_SANITY_API_VERSION: z.string().optional(),
    NEXT_PUBLIC_SANITY_PROJECT_TITLE: z.string().optional(),
  },
  /* eslint-disable node/no-process-env */
  experimental__runtimeEnv: {
    NEXT_PUBLIC_SANITY_PROJECT_ID: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    NEXT_PUBLIC_SANITY_DATASET: process.env.NEXT_PUBLIC_SANITY_DATASET,
    NEXT_PUBLIC_SANITY_API_VERSION: process.env.NEXT_PUBLIC_SANITY_API_VERSION,
    NEXT_PUBLIC_SANITY_PROJECT_TITLE: process.env.NEXT_PUBLIC_SANITY_PROJECT_TITLE,
  },
  /* eslint-enable node/no-process-env */
  emptyStringAsUndefined: true,
});
