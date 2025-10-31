import * as queryStore from "@sanity/react-loader";

import { settingsQuery } from "../lib/queries";

/**
 * Exports to be used in client-only or components that render both server and client
 * TODO: Add types
 */
export function useQuery(query, params, options) {
  const snapshot = queryStore.useQuery(query, params, options);

  // Always throw errors if there are any
  if (snapshot.error) {
    throw snapshot.error;
  }

  return snapshot;
}

/**
 * Loaders that are used in more than one place are declared here, otherwise they're colocated with the component
 */
export function useSettings(initial) {
  return useQuery(settingsQuery, {}, { initial });
}
