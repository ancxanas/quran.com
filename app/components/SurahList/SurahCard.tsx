import { Surah } from "@/app/types/surah";
import Link from "next/link";

interface SurahCardProps {
  surah: Surah;
}

export function SurahCard({ surah }: SurahCardProps) {
  return (
    <Link href={`/chapters/${surah.id}`}>
      <article className="group flex justify-between items-center rounded p-3 border border-border bg-surface transition hover:border-text-primary">
        <header>
          <p className="flex items-center justify-center w-10 h-10 rounded-md rotate-45 me-6 bg-highlight group-hover:bg-background-secondary">
            <span className="-rotate-45 text-text-primary group-hover:text-text-tirtiary font-bold">
              {surah.id}
            </span>
          </p>
        </header>

        <div className="flex flex-1 justify-between">
          <div className="text-left">
            <h2 className="text-base font-bold">{surah.name_simple}</h2>
            <p className="text-xs font-bold text-text-secondary text-muted-foreground">
              {surah.translated_name.name}
            </p>
          </div>

          <footer className="text-right">
            <p className="font-surah-list">{`surah${surah.id.toString().padStart(3, "0")}`}</p>
            <p className="text-xs font-bold text-text-secondary text-muted-foreground">
              {surah.verses_count} Ayahs
            </p>
          </footer>
        </div>
      </article>
    </Link>
  );
}
