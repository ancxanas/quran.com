import { SurahPageData } from "@/app/types/surah";
import { VerseLine } from "./VerseLine";
import { SurahPageShimmer } from "./SurahPageShimmer";

interface SurahPageProps {
  page: SurahPageData;
}

export function SurahPage({ page }: SurahPageProps) {
  const { pageNumber, isComplete, words, chapterId } = page;

  if (!isComplete) {
    return <SurahPageShimmer linesPerPage={15} />;
  }

  const groupWordsByLine = Object.groupBy(words, (word) => word.line_number);
  const wordsMappedByLine = Object.entries(groupWordsByLine).map(([lineNumber, words]) => ({
    lineNumber: parseInt(lineNumber, 10),
    words: words ?? [],
    chapterId,
  }));

  return (
    <section
      data-page={pageNumber}
      aria-label={`Page ${pageNumber}`}
      dir="rtl"
      lang="ar"
      className="@container w-full max-w-full sm:max-w-112 md:max-w-128 lg:max-w-136 xl:max-w-xl px-4 sm:px-6"
    >
      <div
        className={`font-kfgqpc flex flex-col text-[1.1rem] @[350px]:text-[1.2rem] @[400px]:text-[1.3rem] @[450px]:text-[1.6rem] @[500px]:text-[1.7rem] @[550px]:text-[1.9rem] @[600px]:text-[2.1rem] @[650px]:text-[2.3rem] @[750px]:text-[2.5rem] @[800px]:text-[3rem] leading-relaxed`}
        lang="ar"
        dir="rtl"
        role="group"
        aria-label="Ayah Page"
      >
        {wordsMappedByLine.map(({ lineNumber, words }) => {
          return (
            <VerseLine
              key={lineNumber}
              words={words}
              chapterId={chapterId}
              pageNumber={pageNumber}
            />
          );
        })}
      </div>

      <footer className="text-center mt-6 text-sm text-text-secondary flex flex-col gap-4">
        <span aria-label={`Page Number ${pageNumber}`}>{pageNumber}</span>
        <hr />
      </footer>
    </section>
  );
}
