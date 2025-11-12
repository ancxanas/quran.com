import { Surah, SurahDetailResponse, SurahListResponse } from "../types/surah";
import { Pagination, Verse, VersesResponse } from "../types/verse";
import { withAuth } from "./auth";

const API_BASE_URL = process.env.QURAN_API_BASE_URL;

async function authenticatedFetch(url: string, options: RequestInit = {}) {
  try {
    const response = await fetch(url, {
      ...options,
      headers: await withAuth(options.headers),
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error("Authentication expired - please retry");
      }

      const errorText = await response.text();
      throw new Error(`API error: ${response.status} ${response.statusText} - ${errorText}`);
    }

    return response;
  } catch (error) {
    console.error(`API request failed: ${error}`);
    throw error;
  }
}

export async function getSurahList(): Promise<Surah[]> {
  const response = await authenticatedFetch(`${API_BASE_URL}/chapters`, {
    next: { revalidate: 86400 },
  });

  const data: SurahListResponse = await response.json();

  return data.chapters;
}

export async function getSurahDetails(chapterId: number): Promise<Surah> {
  if (chapterId < 1 || chapterId > 114) {
    throw new Error(`Invalid Surah ID: ${chapterId}`);
  }

  const response = await authenticatedFetch(`${API_BASE_URL}/chapters/${chapterId}`, {
    next: { revalidate: 43200 },
  });

  const data: SurahDetailResponse = await response.json();
  return data.chapter;
}

export async function getSurahVerses(
  chapterId: number,
  page: number = 1,
  perPage: number = 10,
): Promise<VersesResponse> {
  if (chapterId < 1 || chapterId > 114) {
    throw new Error(`Invalid chapter number: ${chapterId}`);
  }

  const wordFields = "text_qpc_hafs";

  try {
    const response = await authenticatedFetch(
      `${API_BASE_URL}/verses/by_chapter/${chapterId}?words=true&page=${page}&per_page=${perPage}&word_fields=${wordFields}`,
      { next: { revalidate: 43200 } },
    );

    const data: VersesResponse = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching verses for Surah ${chapterId}: ${error}`);
    throw error;
  }
}
