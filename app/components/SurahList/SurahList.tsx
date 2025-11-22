"use client";

import { useState, useMemo } from "react";
import { SurahCard } from "./SurahCard";
import { SurahListShimmer } from "./SurahListShimmer";
import { useSurahs } from "../../hooks/useSurahs";
import { Surah } from "../../types/surah";
import { SearchBar } from "./SearchBar";

interface SurahListProps {
  initialSurahs: Surah[];
}

export default function SurahList({ initialSurahs }: SurahListProps) {
  const { data: surahs, isLoading, error, refetch } = useSurahs(initialSurahs);

  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredSurahs = useMemo(() => {
    const list = surahs || [];
    if (!searchQuery.trim()) return list;

    const lowerQuery = searchQuery.toLowerCase();

    return list.filter((surah: Surah) => {
      return (
        String(surah.id).includes(lowerQuery) ||
        surah.name_simple.toLowerCase().includes(lowerQuery) ||
        surah.translated_name.name.toLowerCase().includes(lowerQuery)
      );
    });
  }, [searchQuery, surahs]);

  if (error) {
    return (
      <main className="flex flex-col items-center justify-center min-h-screen gap-6 p-4 text-center">
        <h1 className="text-xl font-bold text-text-primary font-figtree">
          Unable to load chapters
        </h1>

        <button
          onClick={() => refetch()}
          className="px-6 py-2 rounded border border-border bg-surface text-text-primary font-figtree transition-colors hover:border-text-primary"
        >
          Try Again
        </button>
      </main>
    );
  }

  if (isLoading && !surahs) {
    return <SurahListShimmer />;
  }

  return (
    <main>
      <SearchBar value={searchQuery} onChange={setSearchQuery} />

      {filteredSurahs.length ? (
        <section
          aria-label="List of Surahs"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-1"
        >
          {filteredSurahs.map((surah: Surah) => (
            <SurahCard key={surah.id} surah={surah} />
          ))}
        </section>
      ) : (
        <section className="text-center py-12 ">
          <p className="text-text-secondary font-figtree text-lg">No Surahs found matching</p>
        </section>
      )}
    </main>
  );
}
