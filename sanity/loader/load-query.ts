import "server-only";

import * as queryStore from "@sanity/react-loader";
import { draftMode } from "next/headers";

import { client } from "@/sanity/lib/client";
import { articleBySlugQuery, settingsQuery } from "@/sanity/lib/queries";
import { token } from "@/sanity/lib/token";
import { ArticleType, SettingsPayload } from "@/types";

const serverClient = client.withConfig({
  token,
  // Enable stega if it's a Vercel preview deployment, as the Vercel Toolbar has controls that shows overlays
  stega: process.env.VERCEL_ENV === "preview",
});

/**
 * Sets the server client for the query store, doing it here ensures that all data fetching in production
 * happens on the server and not on the client.
 * Live mode in `sanity/presentation` still works, as it uses the `useLiveMode` hook to update `useQuery` instances with
 * live draft content using `postMessage`.
 */
queryStore.setServerClient(serverClient);

const usingCdn = serverClient.config().useCdn;

// Automatically handle draft mode
export const loadQuery = (async  (query, params = {}, options = {}) => {
  const {
    perspective = (await draftMode()).isEnabled ? "previewDrafts" : "published",
  } = options;

  //Don't cache by default
  let revalidate: NextFetchRequestConfig["revalidate"] = 0;
  // If `next.tags` is set, and we're not using the CDN, then it's safe to cache
  if (!usingCdn && Array.isArray(options.next?.tags)) {
    revalidate = false;
  } else if (usingCdn) {
    revalidate = 60;
  }
  return queryStore.loadQuery(query, params, {
    ...options,
    next: {
      revalidate,
      ...(options.next || {}),
    },
    perspective,
    // Enable stega if in Draft Mode, to enable overlays when outside Sanity Studio
    stega: (await draftMode()).isEnabled,
  });
}) satisfies typeof queryStore.loadQuery;

export function loadSettings() {
  return loadQuery<SettingsPayload>(
    settingsQuery,
    {},
    { next: { tags: ["settings", "article"] } }
  );
}

export function loadArticle(slug: string) {
  return loadQuery<ArticleType | null>(
    articleBySlugQuery,
    { slug },
    { next: { tags: [`article:${slug}`] } }
  );
}
