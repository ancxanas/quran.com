import { Verse, Word } from "../types/verse";
import { SurahPageData, PageLine } from "../types/surah";

export function prepareSurahPages(verses: Verse[], hasNextPage: boolean): SurahPageData[] {
  if (!verses.length) return [];

  const grouped = new Map<number, Verse[]>();
  let maxLoadedPage = 0;

  for (const verse of verses) {
    const pageNumber = verse.page_number!;
    maxLoadedPage = Math.max(maxLoadedPage, pageNumber);

    if (!grouped.has(pageNumber)) {
      grouped.set(pageNumber, []);
    }

    grouped.get(pageNumber)?.push(verse);
  }

  return Array.from(grouped.entries())
    .sort(([a], [b]) => a - b)
    .map(([pageNumber, pageVerses]) => ({
      pageNumber,
      verses: pageVerses,
      isComplete: pageNumber < maxLoadedPage || !hasNextPage,
    }));
}

export function constructPageLines(verses: Verse[]): PageLine[] {
  const allWords = verses.flatMap((verse) => verse.words ?? []);
  const groupedByLine = new Map<number, typeof allWords>();

  for (const word of allWords) {
    const lineNumber = word.line_number;
    if (!groupedByLine.has(lineNumber)) {
      groupedByLine.set(lineNumber, []);
    }
    groupedByLine.get(lineNumber)!.push(word);
  }

  return Array.from(groupedByLine.entries()).map(([lineNumber, words]) => ({ lineNumber, words }));
}
