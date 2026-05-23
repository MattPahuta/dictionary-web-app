import WordHeader from "./WordHeader";
import Definitions from "./Definitions";

function WordResult({ result, onWordClick }) {
  const { word, phonetic, audioUrl, meanings, sourceUrls } = result;

  return (
    <article className="space-y-6">
      <WordHeader word={word} phonetic={phonetic} audioUrl={audioUrl} />

      {meanings.map((meaning, index) => (
        <Definitions
          key={`${meaning.partOfSpeech}-${index}`}
          meaning={meaning}
          onWordClick={onWordClick}
        />
      ))}

      {/* Source URL footer */}
      {sourceUrls?.length > 0 && (
        <footer className="py-6 border-t border-gray-200 dark:border-neutral-700">
          <div className="flex flex-wrap items-center gap-3 text-sm">
            <span className="text-neutral-500 dark:text-neutral-400">Source</span>
              <a
                href={sourceUrls[0]}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 underline hover:text-purple-500 dark:hover:text-purple-400">
                {sourceUrls[0]}
                <svg
                  aria-hidden="true"
                  focusable="false"
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 14 14">
                  <path
                    fill="none"
                    stroke="#838383"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M6.09 3.545H2.456A1.455 1.455 0 0 0 1 5v6.545A1.455 1.455 0 0 0 2.455 13H9a1.455 1.455 0 0 0 1.455-1.455V7.91m-5.091.727 7.272-7.272m0 0H9m3.636 0V5"
                  />
                </svg>
              </a>
          </div>
        </footer>
      )}
    </article>
  );
}

export default WordResult;
