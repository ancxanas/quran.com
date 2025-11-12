import { useQuery } from "@tanstack/react-query";

export function useSurahs() {
  return useQuery({
    queryKey: ["surahs"],
    queryFn: async () => {
      const response = await fetch("/api/chapters");
      if (!response.ok) {
        throw new Error("Failed to fetch surahs");
      }

      const data = await response.json();
      return data.data;
    },
    staleTime: 1000 * 60 * 60,
  });
}

export function useSurah(chapterId: number) {
  return useQuery({
    queryKey: ["surah", chapterId],
    queryFn: async () => {
      const response = await fetch(`/api/chapters/${chapterId}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch surah ${chapterId}`);
      }

      const data = await response.json();
      return data.data;
    },
    staleTime: 1000 * 60 * 60,
  });
}
