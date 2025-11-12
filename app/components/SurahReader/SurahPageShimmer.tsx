interface SurahPageShimmerProps {
  linesPerPage?: number;
}

export function SurahPageShimmer({ linesPerPage = 15 }: SurahPageShimmerProps) {
  return (
    <div className="mushaf-shimmer-container">
      {Array.from({ length: linesPerPage }, (_, i) => (
        <span key={i} dir="rtl" className="mushaf-shimmer-line" aria-hidden="true"></span>
      ))}
    </div>
  );
}
