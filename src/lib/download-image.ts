/**
 * Triggers download: fetches from NASA (browser can reach it).
 * If CORS blocks fetch, opens in new tab (user can save from there).
 */

function getExtension(url: string): string {
  try {
    const pathname = new URL(url).pathname;
    const match = pathname.match(/\.(jpg|jpeg|png|gif|webp)(\?|$)/i);
    return match ? match[1].toLowerCase() : "jpg";
  } catch {
    return "jpg";
  }
}

function triggerDownload(blob: Blob, filename: string): void {
  const blobUrl = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = blobUrl;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(blobUrl);
}

export async function downloadImage(url: string, date: string, _title: string): Promise<void> {
  const ext = getExtension(url);
  const filename = `apod-${date}.${ext}`;

  try {
    const res = await fetch(url, { mode: "cors" });
    if (!res.ok) throw new Error(res.statusText);
    const blob = await res.blob();
    triggerDownload(blob, filename);
  } catch {
    window.open(url, "_blank", "noopener,noreferrer");
  }
}
