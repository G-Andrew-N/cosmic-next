"use client";

import useSWR, { mutate as globalMutate } from "swr";
import type { APODData } from "@/lib/nasa-apod";
import { getDefaultDateRange } from "@/lib/nasa-apod";

const NASA_API = "https://api.nasa.gov/planetary/apod";

/**
 * NASA API rate limits: 1000 req/hour with API key, 30 req/hour with DEMO_KEY.
 * Caching keeps us well under limits.
 */

function getApiKey(): string {
  const key = process.env.NEXT_PUBLIC_NASA_API_KEY;
  if (!key) throw new Error("NEXT_PUBLIC_NASA_API_KEY is not set");
  return key;
}

async function fetcher<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(res.statusText);
  return res.json();
}

// Today's APOD changes daily - cache 1 hour
const TODAY_REVALIDATE = 3600_000;

// Archive/timeline range - cache 1 hour
const RANGE_REVALIDATE = 3600_000;

// Historical dates never change - cache 24 hours
const DATE_REVALIDATE = 86400_000;

const SWR_CONFIG = {
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
  dedupingInterval: 60_000, // Dedupe requests within 1 min
};

export function useTodayAPOD() {
  const apiKey = getApiKey();
  const { data, error, isLoading, mutate } = useSWR<APODData>(
    apiKey ? `${NASA_API}?api_key=${apiKey}` : null,
    fetcher,
    {
      ...SWR_CONFIG,
      revalidateIfStale: true,
      refreshInterval: TODAY_REVALIDATE,
      dedupingInterval: TODAY_REVALIDATE,
    }
  );
  return { data, error, isLoading, mutate };
}

const RANGE_CACHE_KEY = "apod-range-90";

export function useAPODRange() {
  const apiKey = getApiKey();
  const { startDate, endDate } = getDefaultDateRange(90);
  const url = apiKey
    ? `${NASA_API}?api_key=${apiKey}&start_date=${startDate}&end_date=${endDate}`
    : null;

  const { data, error, isLoading, mutate } = useSWR<APODData[]>(
    url ? RANGE_CACHE_KEY : null,
    () =>
      fetcher<APODData[]>(url!).then((arr) => {
        const sorted = Array.isArray(arr)
          ? arr.sort((a, b) => b.date.localeCompare(a.date))
          : [];
        sorted.forEach((item) =>
          globalMutate(`apod-date-${item.date}`, item, { revalidate: false })
        );
        return sorted;
      }),
    {
      ...SWR_CONFIG,
      revalidateIfStale: true,
      refreshInterval: RANGE_REVALIDATE,
      dedupingInterval: RANGE_REVALIDATE,
    }
  );
  return { data, error, isLoading, mutate };
}

/** Preload range data on hover (e.g. Archive/Timeline links) */
export function preloadAPODRange(): void {
  const apiKey = typeof window !== "undefined" ? process.env.NEXT_PUBLIC_NASA_API_KEY : null;
  if (!apiKey) return;

  const { startDate, endDate } = getDefaultDateRange(90);
  const url = `${NASA_API}?api_key=${apiKey}&start_date=${startDate}&end_date=${endDate}`;
  fetcher<APODData[]>(url).then((arr) => {
    const sorted = Array.isArray(arr)
      ? arr.sort((a, b) => b.date.localeCompare(a.date))
      : [];
    sorted.forEach((item) =>
      globalMutate(`apod-date-${item.date}`, item, { revalidate: false })
    );
    globalMutate(RANGE_CACHE_KEY, sorted);
  });
}

/** Fetch APODs for a specific month - for Timeline filter */
export function useAPODRangeForMonth(year: number, month: number) {
  const apiKey = getApiKey();
  const start = new Date(year, month, 1);
  const end = new Date(year, month + 1, 0);
  const startDate = start.toISOString().slice(0, 10);
  const endDate = end.toISOString().slice(0, 10);
  const cacheKey = `apod-month-${year}-${month}`;
  const url = apiKey
    ? `${NASA_API}?api_key=${apiKey}&start_date=${startDate}&end_date=${endDate}`
    : null;

  const { data, error, isLoading, mutate } = useSWR<APODData[]>(
    url ? cacheKey : null,
    () =>
      fetcher<APODData[]>(url!).then((arr) => {
        const sorted = Array.isArray(arr)
          ? arr.sort((a, b) => b.date.localeCompare(a.date))
          : [];
        sorted.forEach((item) =>
          globalMutate(`apod-date-${item.date}`, item, { revalidate: false })
        );
        return sorted;
      }),
    {
      ...SWR_CONFIG,
      revalidateIfStale: false,
      dedupingInterval: RANGE_REVALIDATE,
    }
  );
  return { data, error, isLoading, mutate };
}

/** Preload today's APOD on hover (e.g. Home link) */
export function preloadTodayAPOD(): void {
  const apiKey = typeof window !== "undefined" ? process.env.NEXT_PUBLIC_NASA_API_KEY : null;
  if (!apiKey) return;

  const url = `${NASA_API}?api_key=${apiKey}`;
  import("swr").then(({ mutate }) => {
    mutate(url, fetcher<APODData>(url));
  });
}

export function useAPODByDate(date: string | undefined) {
  const apiKey = getApiKey();
  const url =
    apiKey && date
      ? `${NASA_API}?api_key=${apiKey}&date=${date}`
      : null;

  const { data, error, isLoading, mutate } = useSWR<APODData | null>(
    url ? `apod-date-${date}` : null,
    async () => {
      const res = await fetch(url!);
      if (res.status === 404) return null;
      if (!res.ok) throw new Error(res.statusText);
      return res.json();
    },
    {
      ...SWR_CONFIG,
      revalidateIfStale: false,
      refreshInterval: 0,
      dedupingInterval: DATE_REVALIDATE,
    }
  );
  return { data, error, isLoading, mutate };
}
