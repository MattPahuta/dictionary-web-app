function Definitions({ meaning, onWordClick }) {
  const { partOfSpeech, definitions, synonyms, antonyms } = meaning;

  return (
    <div className="">
      <div className="mb-6 flex gap-5 items-center">
        <h2 className="text-lg sm:text-2xl italic font-bold">
          {partOfSpeech}
        </h2>
        <div className="h-px flex-1 bg-gray-200 dark:bg-neutral-700"></div>
      </div>
      <p className="mb-4 sm:text-xl text-neutral-600 dark:text-neutral-400">
        Meaning
      </p>
      <ul
        role="list"
        className="pl-4 sm:pl-6 list-disc space-y-3 marker:text-purple-500">
        {definitions.map((item, index) => (
          <li key={index} className="">
            <div className="flex flex-col gap-1 sm:gap-2">
              <span>{item.definition}</span>
              {item.example && (
                <span className="text-neutral-600 dark:text-neutral-400">
                  &ldquo;{item.example}&rdquo;
                </span>
              )}
            </div>
          </li>
        ))}
      </ul>
      {synonyms.length > 0 && (
        <WordTagList
          label="Synonyms"
          words={synonyms}
          onWordClick={onWordClick}
        />
      )}
      {antonyms.length > 0 && (
        <WordTagList
          label="Antonyms"
          words={antonyms}
          onWordClick={onWordClick}
        />
      )}
    </div>
  );
}

function WordTagList({ label, words, onWordClick }) {
  return (
    <div className="mt-5 flex gap-4">
      <h3 className="text-neutral-600 dark:text-neutral-400 sm:text-xl">
        {label}
      </h3>
      <ul className="flex flex-wrap gap-x-3 gap-y-2">
        {words.map((word) => (
          <li>
            <button
              key={word}
              onClick={() => onWordClick(word)}
              className="py-1 px-2 rounded-lg text-purple-700 dark:text-purple-400 font-bold hover:underline focus-visible:outline-2 focus-visible:outline-purple-700 dark:focus-visible:outline-white outline-offset-1 cursor-pointer">
              {word}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Definitions;
