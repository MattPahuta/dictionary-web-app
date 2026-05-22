import { useTheme } from "./context/ThemeContext";
import { useDictionary } from "./hooks/useDictionary";
import Header from "./components/Header";
import SearchForm from "./components/SearchForm";
import WordResult from "./components/WordResult";

const fontMap = {
  sans: "font-sans",
  serif: "font-serif",
  mono: "font-mono",
};

function App() {
  const { font } = useTheme();
  const { result, status, error, search } = useDictionary();

  return (
    <div
      className={`min-h-screen ${fontMap[font]} dark:bg-zinc-950 dark:text-zinc-50 bg-zinc-50 text-zinc-800 space-y-8`}>
      <Header />
      <main className="max-w-3xl mx-auto px-4 sm:px-5 space-y-8 sm:space-y-10">
        <SearchForm onSearch={search} />

        {/* Loading state */}
        {status === "loading" && (
          <div className="flex justify-center py-16">
            <div className="w-10 h-10 rounded-full border-4 border-purple-500 border-t-transparent motion-safe:animate-spin" />
          </div>
        )}

        {/* Error state */}
        {status === "error" && (
          <div className="text-center py-16 space-y-4">
            <span className="text-5xl">😕</span>
            <h2 className="text-xl font-bold">
              No definitions found
            </h2>
            <p className="text-zinc-500">{error}</p>
          </div>
        )}

        {/* Success state */}
        {status === "success" && result && (
          <WordResult result={result} onWordClick={search} />
        )}
      </main>
    </div>
  );
}

export default App;
