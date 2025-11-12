import { Fragment } from "react";
import { Word } from "../../types/verse";

interface VerseLineProps {
  words: Word[];
}

export function VerseLine({ words }: VerseLineProps) {
  console.log(
    "words from mushaf",
    words.sort((a, b) => a.id - b.id),
  );
  return (
    <span className="mushaf-verse-line">
      {words.map((word, index) => (
        <Fragment key={word.id}>
          <span>{word.text_qpc_hafs}</span>
          {index < words.length - 1 && <span aria-hidden>{"\u200C"}</span>}
        </Fragment>
      ))}
    </span>
  );
}
