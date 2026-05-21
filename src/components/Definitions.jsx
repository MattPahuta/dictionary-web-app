function Definitions({ meaning, onWordClick }) {
  const { partOfSpeech, definitions, synonyms, antonyms } = meaning;

  return (
    <div className="">
      {/* part of speech and horizontal rule */}
      <div className="mb-6 flex gap-5 items-center">
        <h3 className="text-lg font-bold">{partOfSpeech}</h3>
        <div className="h-px flex-1 bg-gray-200 dark:bg-neutral-700"></div>
      </div>
      {/* Meaning label */}
      <h4 className="mb-4 text-neutral-500">Meaning</h4>
      {/* Definitions list */}
      <ul
        role="list"
        className="space-y-3 list-disc marker:text-purple-500">
        {definitions.map((item, index) => (
          <li key={index} className="flex gap-4">
            <p className="">{item.definition}</p>
            {item.example && (
              <p className="mt-1 text-neutral-500">
                &ldquo;{item.example}&rdquo;
              </p>
            )}
          </li>
        ))}
      </ul>
      {/* Synonyms */}
      {synonyms.length > 0 && (
        <WordTagList
          label="Synonyms"
          words={synonyms}
          onWordClick={onWordClick}
        />
      )}
      {/* Antonyms */}
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

// Generate section for list of synonyms or antonyms, if available
function WordTagList({ label, words, onWordClick }) {
  <div className="flex">
    <h4 className="mb-4 text-neutral-500">{label}</h4>
    <ul className="flex flex-wrap gap-x-3 gap-y-2">
      {words.map((word) => (
        <button
          key={word}
          onClick={() => onWordClick(word)}
          className="text-purple-500 font-bold hover:underline focus-visible:outline-2 focus-visible:outline-purple-500 outline-offset-2">
          {word}
        </button>
      ))}
    </ul>
  </div>;
}

export default Definitions;
