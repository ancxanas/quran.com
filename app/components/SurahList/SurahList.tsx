"use client";

import { SurahCard } from "./SurahCard";
import { SurahListShimmer } from "./SurahListShimmer";
import { useSurahs } from "../../hooks/useSurahs";
import { Surah } from "../../types/surah";
import Link from "next/link";

interface SurahListProps {
  initialSurahs: Surah[];
}

export default function SurahList({ initialSurahs }: SurahListProps) {
  const { data: surahs, isLoading, error, refetch } = useSurahs(initialSurahs);

  if (error) {
    <main className="flex flex-col items-center justify-center min-h-screen gap-6 p-4 text-center">
      <h1 className="text-xl font-bold text-text-primary font-figtree">Unable to load chapters</h1>

      <button
        onClick={() => refetch()}
        className="px-6 py-2 rounded border border-border bg-surface text-text-primary font-figtree transition-colors hover:border-text-primary"
      >
        Try Again
      </button>
    </main>;
  }

  if (isLoading && !surahs) {
    return <SurahListShimmer />;
  }

  return (
    <main>
      <section
        aria-label="List of Surahs"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-1"
      >
        {surahs.map((surah: Surah) => (
          <SurahCard key={surah.id} surah={surah} />
        ))}
      </section>
    </main>
  );
}
