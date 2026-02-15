import { NextResponse } from "next/server";

export const runtime = "edge";

const NASA_API = "https://api.nasa.gov/planetary/apod";

export async function GET() {
  const apiKey = process.env.NASA_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "NASA_API_KEY is not configured" },
      { status: 500 }
    );
  }

  const url = `${NASA_API}?api_key=${apiKey}`;

  try {
    const res = await fetch(url, { next: { revalidate: 3600 } });
    if (!res.ok) {
      const text = await res.text();
      return NextResponse.json(
        { error: `NASA API error: ${res.status} ${text}` },
        { status: res.status }
      );
    }
    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    console.error("NASA APOD fetch failed:", err);
    return NextResponse.json(
      { error: "Failed to fetch from NASA API", cause: String(err) },
      { status: 502 }
    );
  }
}
