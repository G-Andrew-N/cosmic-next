import { NextRequest, NextResponse } from "next/server";

const ALLOWED_HOSTS = ["apod.nasa.gov", "nasa.gov", "i.ytimg.com"];

function isAllowedUrl(url: string): boolean {
  try {
    const host = new URL(url).hostname;
    return ALLOWED_HOSTS.some((h) => host === h || host.endsWith(`.${h}`));
  } catch {
    return false;
  }
}

function getFilename(url: string, date: string): string {
  try {
    const pathname = new URL(url).pathname;
    const match = pathname.match(/\.(jpg|jpeg|png|gif|webp)(\?|$)/i);
    const ext = match ? match[1].toLowerCase() : "jpg";
    return `apod-${date}.${ext}`;
  } catch {
    return `apod-${date}.jpg`;
  }
}

export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get("url");
  const date = request.nextUrl.searchParams.get("date") || "image";

  if (!url || !isAllowedUrl(url)) {
    return NextResponse.json({ error: "Invalid url" }, { status: 400 });
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 60000);
    const res = await fetch(url, {
      signal: controller.signal,
      headers: { "User-Agent": "CosmicTimeline/1.0" },
    });
    clearTimeout(timeout);

    if (!res.ok) {
      return NextResponse.json(
        { error: `Failed to fetch image: ${res.status}` },
        { status: res.status }
      );
    }

    const blob = await res.blob();
    const filename = getFilename(url, date);

    return new NextResponse(blob, {
      headers: {
        "Content-Type": res.headers.get("Content-Type") || "image/jpeg",
        "Content-Disposition": `attachment; filename="${filename}"`,
      },
    });
  } catch (err) {
    console.error("Download proxy error:", err);
    return NextResponse.json(
      { error: "Failed to fetch image" },
      { status: 502 }
    );
  }
}
