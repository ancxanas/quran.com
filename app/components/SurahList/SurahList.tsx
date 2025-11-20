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
  const { data: surahs, isLoading, error } = useSurahs(initialSurahs);

  if (error) {
    return <p role="alert">Failed to load surahs: {error.message}</p>;
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
