"use client";

import { SWRConfig } from "swr";

/**
 * Global SWR config: cache responses to reduce API calls and speed up navigation.
 * NASA API limit: 1000 req/hour with key. Our cache keeps us well under that.
 */
const swrConfig = {
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
  dedupingInterval: 60_000, // 1 min - avoid duplicate requests
  keepPreviousData: true, // Show cached data while revalidating
};

export function Providers({ children }: { children: React.ReactNode }) {
  return <SWRConfig value={swrConfig}>{children}</SWRConfig>;
}
