"use client";

import { useParams } from "next/navigation";
import { notFound } from "next/navigation";
import { DetailView } from "./DetailView";
import { useAPODByDate } from "@/hooks/useAPOD";
import { Sparkles } from "lucide-react";
import Link from "next/link";
import { CosmicButton } from "./CosmicButton";

function LoadingState() {
  return (
    <div className="min-h-screen bg-deep-space flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="flex gap-2">
          {[0, 1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="w-3 h-3 rounded-full bg-nebula-blue animate-pulse"
              style={{ animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </div>
        <p className="text-sm text-gray-400">Loading...</p>
      </div>
    </div>
  );
}

function ErrorState({
  message,
  onRetry,
}: {
  message: string;
  onRetry: () => void;
}) {
  return (
    <div className="min-h-screen bg-deep-space flex items-center justify-center">
      <div className="text-center max-w-md px-6">
        <Sparkles className="w-16 h-16 text-nebula-blue mx-auto mb-4 opacity-50" />
        <h2 className="text-xl font-display mb-2">Unable to load</h2>
        <p className="text-gray-400 text-sm mb-6">{message}</p>
        <div className="flex gap-3 justify-center">
          <button
            onClick={onRetry}
            className="px-6 py-3 bg-nebula-blue rounded-lg hover:bg-[#5A90FF] transition-colors text-sm"
          >
            Retry
          </button>
          <Link href="/archive">
            <CosmicButton variant="secondary">Archive</CosmicButton>
          </Link>
        </div>
      </div>
    </div>
  );
}

export function DetailWithClientFetch() {
  const params = useParams();
  const date = typeof params.date === "string" ? params.date : "";
  const { data, error, isLoading, mutate } = useAPODByDate(date);

  if (!date) {
    notFound();
  }

  if (data === null && !isLoading) {
    notFound();
  }

  if (error) {
    return <ErrorState message={error.message} onRetry={() => mutate()} />;
  }

  if (isLoading || !data) {
    return <LoadingState />;
  }

  const baseUrl =
    typeof window !== "undefined"
      ? window.location.origin
      : process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";
  const shareUrl = `${baseUrl}/detail/${data.date}`;

  return <DetailView apod={data} shareUrl={shareUrl} />;
}
