import { SurahPageData } from "@/app/types/surah";
import { VerseLine } from "./VerseLine";
import { SurahPageShimmer } from "./SurahPageShimmer";
import { constructPageLines } from "@/app/lib/surah-helpers";

interface SurahPageProps {
  page: SurahPageData;
}

export function SurahPage({ page }: SurahPageProps) {
  const { pageNumber, isComplete, verses } = page;

  if (!isComplete) {
    return <SurahPageShimmer linesPerPage={15} />;
  }

  const lines = constructPageLines(verses);

  return (
    <section
      data-page={pageNumber}
      aria-label={`Page ${pageNumber}`}
      dir="rtl"
      lang="ar"
      className="mushaf-page-section"
    >
      <div className="mushaf-page-content" lang="ar" dir="rtl" role="group" aria-label="Ayah Page">
        {lines.map(({ lineNumber, words }) => (
          <VerseLine key={lineNumber} words={words} />
        ))}
      </div>

      <footer className="mushaf-page-footer">
        <span aria-label={`Page Number ${pageNumber}`}>{pageNumber}</span>
        <hr />
      </footer>
    </section>
  );
}
