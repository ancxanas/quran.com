"use client";

import { ReactNode } from "react";

import Link from "next/link";

interface SurahNavigationProps {
  chapterId: number;
}

function NavButton({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className="flex-1 w-0 flex items-center justify-center py-3 rounded border border-border bg-surface text-text-primary hover:border-text-primary transition-colors text-xs sm:text-sm font-figtree text-center whitespace-nowrap px-2"
    >
      {children}
    </Link>
  );
}

export function SurahNavigation({ chapterId }: SurahNavigationProps) {
  const prevId = chapterId - 1;
  const nextId = chapterId + 1;

  return (
    <nav
      aria-label="Chapter Navigation"
      className="@container w-full max-w-full sm:max-w-112 md:max-w-128 lg:max-w-136 xl:max-w-xl px-4 sm:px-6 mx-auto gap-1 flex font-figtree"
    >
      {prevId > 0 && <NavButton href={`/chapters/${prevId}`}>Previous Surah</NavButton>}

      <NavButton href="/">Home</NavButton>

      {nextId <= 114 && <NavButton href={`/chapters/${nextId}`}>Next Surah</NavButton>}
    </nav>
  );
}
