export function SurahListShimmer() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-3">
      {Array.from({ length: 24 }).map((_, i) => (
        <div
          key={i}
          className="flex justify-between items-center rounded p-3 border border-border bg-surface h-18"
        >
          <div className="w-10 h-10 rounded-md bg-border/30 animate-pulse me-6 rotate-45"></div>

          <div className="flex flex-1 justify-between items-center">
            <div className="space-y-2">
              <div className="h-4 w-24 bg-border/30 animate-pulse rounded"></div>
              <div className="h-3 w-16 bg-border/30 animate-pulse rounded"></div>
            </div>

            <div className="flex flex-col items-end gap-2">
              <div className="h-5 w-20 bg-border/30 animate-pulse rounded"></div>
              <div className="h-3 w-12 bg-border/30 animate-pulse rounded"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
