import { useInfiniteQuery } from "@tanstack/react-query";

export function useInfiniteVerses(chapterId: number, perPage: number = 10) {
  return useInfiniteQuery({
    queryKey: ["verses", chapterId, perPage],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await fetch(
        `/api/chapters/${chapterId}/verses?page=${pageParam}&per_page=${perPage}`,
      );
      if (!response.ok) {
        throw new Error("Failed to fetch verses");
      }
      return response.json();
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.pagination.next_page,
    staleTime: 1000 * 60 * 5,
  });
}
