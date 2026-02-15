/**
 * NASA APOD API - Server-side only (uses API key from env)
 * https://api.nasa.gov/api.html#apod
 */

export interface APODData {
  date: string;
  title: string;
  explanation: string;
  url: string;
  media_type: "image" | "video";
  copyright?: string;
  hdurl?: string;
}

const API_BASE = "https://api.nasa.gov/planetary/apod";

function getApiKey(): string {
  const key = process.env.NASA_API_KEY;
  if (!key) {
    throw new Error(
      "NASA_API_KEY is not set. Add it to .env.local (see .env.example)"
    );
  }
  return key;
}

const FETCH_TIMEOUT_MS = 60000; // 60s - Node server may need longer than browser
const FETCH_RETRIES = 3;

async function fetchFromNASA(params: Record<string, string>): Promise<unknown> {
  const apiKey = getApiKey();
  const searchParams = new URLSearchParams({ ...params, api_key: apiKey });
  const url = `${API_BASE}?${searchParams.toString()}`;

  let lastError: unknown;
  for (let attempt = 1; attempt <= FETCH_RETRIES; attempt++) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(
        () => controller.abort(),
        FETCH_TIMEOUT_MS
      );

      const res = await fetch(url, {
        signal: controller.signal,
        next: { revalidate: 3600 }, // Cache for 1 hour
      });

      clearTimeout(timeoutId);

      if (!res.ok) {
        const text = await res.text();
        throw new Error(`NASA APOD API error ${res.status}: ${text}`);
      }

      return res.json();
    } catch (err) {
      lastError = err;
      if (attempt < FETCH_RETRIES) {
        await new Promise((r) => setTimeout(r, 2000)); // 2s delay before retry
      }
    }
  }

  throw lastError;
}

/** Fetch today's APOD */
export async function fetchTodayAPOD(): Promise<APODData> {
  const data = (await fetchFromNASA({})) as APODData;
  return data;
}

/** Fetch APOD for a specific date (YYYY-MM-DD) */
export async function fetchAPODByDate(date: string): Promise<APODData | null> {
  try {
    const data = (await fetchFromNASA({ date })) as APODData;
    return data;
  } catch (err) {
    if (err instanceof Error && /404|400/.test(err.message)) return null;
    throw err;
  }
}

/** Fetch APODs for a date range (returns array, newest first in API response) */
export async function fetchAPODRange(
  startDate: string,
  endDate: string
): Promise<APODData[]> {
  const data = (await fetchFromNASA({
    start_date: startDate,
    end_date: endDate,
  })) as APODData[] | { code?: number; msg?: string };

  if (Array.isArray(data)) {
    return data.sort((a, b) => b.date.localeCompare(a.date));
  }

  const err = data as { code?: number; msg?: string };
  throw new Error(err.msg || `NASA API error: ${JSON.stringify(err)}`);
}

/** Get date range for archive/timeline (last N days) */
export function getDefaultDateRange(daysBack = 90): {
  startDate: string;
  endDate: string;
} {
  const end = new Date();
  const start = new Date();
  start.setDate(start.getDate() - daysBack);

  return {
    startDate: start.toISOString().slice(0, 10),
    endDate: end.toISOString().slice(0, 10),
  };
}
