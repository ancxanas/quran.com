import { Verse, Word } from "./verse";

export interface TranslatedName {
  language_name: string;
  name: string;
}

export interface Surah {
  id: number;
  revelation_place: string;
  revelation_order: number;
  bismillah_pre: boolean;
  name_simple: string;
  name_complex: string;
  name_arabic: string;
  verses_count: number;
  pages: number[];
  translated_name: TranslatedName;
}

export interface SurahListResponse {
  chapters: Surah[];
}

export interface SurahDetailResponse {
  chapter: Surah;
}

export interface SurahResponse {
  data: {
    metadata: Surah;
    verses: Verse[];
  };
}

export interface ApiErrorResponse {
  error: string;
  message?: string;
}

export interface PageLine {
  lineNumber: number;
  words: Word[];
}

export interface SurahPageData {
  pageNumber: number;
  verses: Verse[];
  isComplete: boolean;
}

export interface SurahReaderProps {
  chapterId: number;
}
