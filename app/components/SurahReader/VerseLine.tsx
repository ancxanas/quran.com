import { Fragment } from "react";
import { Word } from "../../types/verse";
import { SURAH_LAYOUT_CONFIG } from "./layout-config";

interface VerseLineProps {
  words: Word[];
  chapterId: number;
  pageNumber: number;
}

export function VerseLine({ words, chapterId, pageNumber }: VerseLineProps) {
  const centerLine = SURAH_LAYOUT_CONFIG[chapterId]?.includes(pageNumber) ?? false;
  return (
    <span className={`flex ${centerLine ? "justify-center gap-1" : "justify-between"}`}>
      {words.map((word, index) => (
        <Fragment key={`${chapterId}-${word.id}`}>
          <span>{word.text_qpc_hafs}</span>

          {index < words.length - 1 && <span aria-hidden>{"\u200C"}</span>}
        </Fragment>
      ))}
    </span>
  );
}
