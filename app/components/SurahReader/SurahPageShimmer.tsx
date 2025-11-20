interface SurahPageShimmerProps {
  linesPerPage?: number;
}

export function SurahPageShimmer({ linesPerPage = 15 }: SurahPageShimmerProps) {
  return (
    <div className="@container w-full max-w-full mx-auto sm:max-w-112 md:max-w-128 lg:max-w-136 xl:max-w-xl px-4 sm:px-6 py-6 flex flex-col text-right gap-2 @[400px]:gap-3 @[550px]:gap-4">
      {Array.from({ length: linesPerPage }, (_, i) => (
        <span
          key={i}
          dir="rtl"
          className="block rounded-md min-h-[1.35rem] @[375px]:min-h-6 @[450px]:min-h-[1.7rem] @[550px]:min-h-[1.9rem] @[650px]:min-h-[2.1rem] @[750px]:min-h-[2.3rem] bg-linear-to-r from-(--surface) via-(--border) to-(--surface) bg-size-[200%_100%] animate-[shimmer_1.6s_infinite]"
          aria-hidden="true"
        ></span>
      ))}
    </div>
  );
}
