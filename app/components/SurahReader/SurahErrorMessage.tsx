import { QueryObserverResult } from "@tanstack/react-query";

interface SurahErrorMessageProps {
  refetch: () => Promise<QueryObserverResult>;
}

export function SurahErrorMessage({ refetch }: SurahErrorMessageProps) {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen gap-6 p-4 text-center">
      <h1 className="text-xl font-bold text-text-primary font-figtree">Unable to load chapters</h1>

      <button
        onClick={() => refetch()}
        className="px-6 py-2 rounded border border-border bg-surface text-text-primary font-figtree transition-colors hover:border-text-primary"
      >
        Try Again
      </button>
    </main>
  );
}
