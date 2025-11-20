"use client";

import { useInfiniteVerses } from "@/app/hooks/useInfiniteVerses";
import { SurahReaderProps } from "@/app/types/surah";
import { useEffect, useRef, useMemo, Fragment } from "react";
import { SurahPageShimmer } from "./SurahPageShimmer";
import { SurahErrorMessage } from "./SurahErrorMessage";
import { SurahPage } from "./SurahPage";
import { useSurah } from "@/app/hooks/useSurahs";
import Bismillah from "../../../public/icons/bismillah.svg";

const PAGE_SIZE = 20;

const INTERSECTION_CONFIG = {
  threshold: 0.1,
};

export default function SurahReader({ chapterId }: SurahReaderProps) {
  const { data: surah } = useSurah(chapterId);
  const {
    data: pagesData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteVerses(chapterId, PAGE_SIZE);

  const loadTriggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!hasNextPage || isFetchingNextPage) return;

    const observer = new IntersectionObserver((entries) => {
      const [entry] = entries;
      if (entry.isIntersecting) {
        fetchNextPage();
      }
    }, INTERSECTION_CONFIG);

    const trigger = loadTriggerRef.current;
    if (trigger) {
      observer.observe(trigger);
    }

    return () => {
      if (trigger) {
        observer.observe(trigger);
      }
    };
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  const pages = useMemo(() => {
    const verses = pagesData?.pages.flatMap((data) => data.data) ?? [];
    const words = verses.flatMap((v) => v.words);
    const grouped = Object.groupBy(words, (w) => w.v1_page);
    const mushafPages = Object.keys(grouped)
      .map(Number)
      .sort((a, b) => a - b);

    const maxLoaded = Math.max(0, ...mushafPages);

    return mushafPages.map((pageNumber) => ({
      pageNumber,
      words: grouped[pageNumber] ?? [],
      isComplete: pageNumber < maxLoaded || !hasNextPage,
      chapterId,
    }));
  }, [pagesData, hasNextPage]);

  if (status === "pending") {
    return (
      <main className="w-full py-4 min-h-screen">
        <SurahPageShimmer />
      </main>
    );
  }

  if (status === "error") {
    return (
      <main className="w-full py-4 min-h-screen">
        <SurahErrorMessage />
      </main>
    );
  }

  return (
    <main className="flex flex-col justify-center  w-full py-4 min-h-screen">
      <header className="flex justify-center @container w-full max-w-full mb-4">
        <h1
          className="font-surah-list rtl:flex text-text-primary  flex gap-1 items-center justify-center text-[2rem] @[350px]:text-[2.6rem] @[400px]:text-[2.6rem] @[450px]:text-[2.6rem] @[500px]:text-[2.6rem] @[550px]:text-[2.8rem] @[600px]:text-[2.8rem] @[650px]:text-[2.8rem] @[750px]:text-[3rem] @[800px]:text-[3.5rem]"
          dir="rtl"
        >
          <span>surah-icon</span>
          <span>{`surah${chapterId.toString().padStart(3, "0")}`}</span>
        </h1>
      </header>

      <article
        aria-label={`Chapter ${chapterId}`}
        className="flex flex-col items-center gap-6 md:gap-8"
      >
        {surah?.bismillah_pre && (
          <div className="@container w-full max-w-full sm:max-w-112 md:max-w-128 lg:max-w-136 xl:max-w-xl flex justify-center items-center">
            <Bismillah className="text-text-primary w-full h-auto max-w-[200px] @[350px]:max-w-[200px] @[400px]:max-w-[220px] @[450px]:max-w-60 @[500px]:max-w-[300px] @[550px]:max-w-[320px] @[600px]:max-w-[360px] @[650px]:max-w-[380px] @[750px]:max-w-[400px] @[800px]:max-w-[420px] object-contain fill-current" />
          </div>
        )}

        {pages.map((pageItem) => (
          <SurahPage key={pageItem.pageNumber} page={pageItem} />
        ))}

        {hasNextPage && (
          <div
            ref={loadTriggerRef}
            aria-hidden="true"
            className="h-10"
            role="status"
            aria-label="Loading more pages..."
          ></div>
        )}

        {isFetchingNextPage && <SurahPageShimmer linesPerPage={15} />}
      </article>
    </main>
  );
}
