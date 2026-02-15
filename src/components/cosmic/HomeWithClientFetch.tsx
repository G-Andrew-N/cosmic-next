"use client";

import { HeroLanding } from "./HeroLanding";
import { useTodayAPOD } from "@/hooks/useAPOD";
import { Sparkles } from "lucide-react";

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
        <p className="text-sm text-gray-400">Loading today&apos;s image...</p>
      </div>
    </div>
  );
}

function ErrorState({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <div className="min-h-screen bg-deep-space flex items-center justify-center">
      <div className="text-center max-w-md px-6">
        <Sparkles className="w-16 h-16 text-nebula-blue mx-auto mb-4 opacity-50" />
        <h2 className="text-xl font-display mb-2">Unable to load</h2>
        <p className="text-gray-400 text-sm mb-6">{message}</p>
        <button
          onClick={onRetry}
          className="px-6 py-3 bg-nebula-blue rounded-lg hover:bg-[#5A90FF] transition-colors text-sm"
        >
          Retry
        </button>
      </div>
    </div>
  );
}

export function HomeWithClientFetch() {
  const { data, error, isLoading, mutate } = useTodayAPOD();

  if (error) {
    return <ErrorState message={error.message} onRetry={() => mutate()} />;
  }

  if (isLoading || !data) {
    return <LoadingState />;
  }

  return <HeroLanding todayAPOD={data} />;
}
