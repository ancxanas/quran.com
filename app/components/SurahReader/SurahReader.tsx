"use client";

import { useInfiniteVerses } from "@/app/hooks/useInfiniteVerses";
import { prepareSurahPages } from "@/app/lib/surah-helpers";
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
  rootMargin: "200px 0px",
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

  const pages = useMemo(() => {
    const verses = pagesData?.pages.flatMap((page) => page.data) ?? [];
    return prepareSurahPages(verses, hasNextPage ?? false);
  }, [pagesData, hasNextPage]);

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

  if (status === "pending") {
    return (
      <main className="mushaf-main">
        <SurahPageShimmer />
      </main>
    );
  }

  if (status === "error") {
    return (
      <main className="mushaf-main">
        <SurahErrorMessage />
      </main>
    );
  }

  return (
    <main className="mushaf-main">
      <header className="flex justify-center mushaf-header-container">
        <h1
          className="font-surah-list rtl:flex gap-0.5 text-text-primary mushaf-header-title"
          dir="rtl"
        >
          <span>surah-icon</span>
          <span>{`surah${chapterId.toString().padStart(3, "0")}`}</span>
        </h1>
      </header>

      <article aria-label={`Chapter ${chapterId}`} className="mushaf-article">
        {surah?.bismillah_pre && (
          <div className="mushaf-bismillah-container">
            <Bismillah className="text-text-primary mushaf-bismillah-svg" />
          </div>
        )}

        {pages.map((page) => (
          <SurahPage key={page.pageNumber} page={page} />
        ))}

        {hasNextPage && (
          <div
            ref={loadTriggerRef}
            aria-hidden="true"
            className="mushaf-load-trigger"
            role="status"
            aria-label="Loading more pages..."
          ></div>
        )}

        {isFetchingNextPage && <SurahPageShimmer linesPerPage={15} />}
      </article>
    </main>
  );
}
