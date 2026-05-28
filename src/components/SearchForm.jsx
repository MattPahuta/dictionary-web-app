import { useState, useEffect } from "react";

function SearchForm({ onSearch, currentWord }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchError, setSearchError] = useState(false);

  useEffect(() => {
    if (currentWord) {
      setSearchTerm(currentWord);
      setSearchError(false);
    }
  }, [currentWord]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!searchTerm.trim()) {
      setSearchError(true);
      return;
    }
    setSearchError(false);
    onSearch(searchTerm.trim());
  };

  return (
    <form className="grid" onSubmit={handleSubmit}>
      <div className="flex gap-4 flex-col sm:flex-row">
        <input
          type="search"
          name="searchedWord"
          aria-label="Search"
          placeholder="Search for any word..."
          value={searchTerm}
          onChange={(event) => {
            setSearchTerm(event.target.value);
          }}
          className={`min-h-12 px-3 py-1.5 block w-full caret-purple-500 rounded-lg border-0 text-base bg-neutral-200 text-slate-950 dark:bg-zinc-800 dark:text-zinc-50 outline-1 -outline-offset-1 dark:outline-zinc-700 focus:outline-2 focus:-outline-offset-2 focus:outline-purple-500 ${searchError ? "outline-red-400" : "outline-slate-300"}`}
        />
        <button
          type="submit"
          className="min-h-12 px-5 py-2 inline-flex gap-3 items-center justify-center whitespace-nowrap rounded-lg font-medium bg-zinc-800 dark:bg-zinc-100 text-white dark:text-zinc-950 shadow-xs hover:bg-zinc-700 dark:hover:bg-zinc-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-500 cursor-pointer">
          <svg
            aria-hidden="true"
            focusable="false"
            className=""
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 18 18">
            <path
              className="stroke-white dark:stroke-zinc-950"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="m12.663 12.663 3.887 3.887M1 7.664a6.665 6.665 0 1 0 13.33 0 6.665 6.665 0 0 0-13.33 0Z"
            />
          </svg>
          Search
        </button>
      </div>
      {searchError && (
        <p
          className="mt-3 text-sm sm:text-base text-red-400"
          aria-live="polite">
          Whoops, can't be empty...
        </p>
      )}
    </form>
  );
}

export default SearchForm;
