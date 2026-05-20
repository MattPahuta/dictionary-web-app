import { useState } from "react";

function SearchForm({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchError, setSearchError] = useState(false);

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
      {/* form controls wrapper - for styling */}
      <div className="flex gap-4 flex-col sm:flex-row">
        {/* mobile - width full, h-48px */}
        <input
          type="search"
          name="search"
          aria-label="Search"
          placeholder="Search for any word..."
          required
          value={searchTerm}
          onChange={(event) => {
            setSearchTerm(event.target.value);
          }}
          className="min-h-12 px-3 py-1.5 block w-full caret-purple-500 rounded-lg border-0 text-base bg-neutral-200 text-slate-950 dark:bg-zinc-800 dark:text-zinc-50 outline-1 -outline-offset-1 outline-slate-300 dark:outline-zinc-700 focus:outline-2 focus:-outline-offset-2 focus:outline-purple-500"
        />
        <button
          type="submit"
          className="min-h-12 px-5 py-2 inline-flex gap-3 items-center justify-center whitespace-nowrap rounded-lg font-medium bg-slate-900 dark:bg-zinc-100 text-zinc-50 dark:text-zinc-950 shadow-xs hover:bg-slate-800 dark:hover:bg-zinc-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-500 cursor-pointer">
          <svg
            aria-hidden="true"
            focusable="false"
            className=""  
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 18 18">
            <path
              fill="none"
              stroke="#a855f7"
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
        <span className="text-red-500">
          Whoops, can't be empty...
        </span>
      )}
    </form>
  );
}

export default SearchForm;
