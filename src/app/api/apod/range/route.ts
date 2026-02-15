import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

const NASA_API = "https://api.nasa.gov/planetary/apod";

export async function GET(request: NextRequest) {
  const apiKey = process.env.NASA_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "NASA_API_KEY is not configured" },
      { status: 500 }
    );
  }

  const { searchParams } = new URL(request.url);
  const startDate = searchParams.get("start_date");
  const endDate = searchParams.get("end_date");

  if (!startDate || !endDate) {
    return NextResponse.json(
      { error: "start_date and end_date are required" },
      { status: 400 }
    );
  }

  const url = `${NASA_API}?api_key=${apiKey}&start_date=${startDate}&end_date=${endDate}`;

  try {
    const res = await fetch(url, { next: { revalidate: 3600 } });
    if (!res.ok) {
      const text = await res.text();
      return NextResponse.json(
        { error: `NASA API error: ${res.status} ${text}` },
        { status: res.status }
      );
    }
    const data = (await res.json()) as Array<{ date: string; [key: string]: unknown }>;
    const sorted = Array.isArray(data)
      ? data.sort((a, b) => b.date.localeCompare(a.date))
      : [];
    return NextResponse.json(sorted);
  } catch (err) {
    console.error("NASA APOD range fetch failed:", err);
    return NextResponse.json(
      { error: "Failed to fetch from NASA API", cause: String(err) },
      { status: 502 }
    );
  }
}
