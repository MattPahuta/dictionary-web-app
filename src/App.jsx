import { useTheme } from "./context/ThemeContext";
import { useDictionary } from "./hooks/useDictionary";
import Header from "./components/Header";
import SearchForm from "./components/SearchForm";
import WordResult from "./components/WordResult";
import Footer from "./components/Footer";
import NotFound from "./components/NotFound";

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
      className={`min-h-screen flex flex-col ${fontMap[font]} dark:bg-zinc-950 dark:text-zinc-50 bg-zinc-50 text-zinc-800 space-y-8`}>
      <Header />
      <main className="w-full grow max-w-3xl mx-auto px-4 sm:px-5 space-y-8 sm:space-y-10">
        {status === "idle" && (
          <h1 className="text-center text-3xl sm:text-4xl font-semibold">
            Dictionary Search
          </h1>
        )}
        <SearchForm onSearch={search} currentWord={result?.word} />

        {status === "loading" && (
          <div className="flex justify-center py-16">
            <div className="w-10 h-10 rounded-full border-4 border-purple-500 border-t-transparent motion-safe:animate-spin" />
          </div>
        )}

        {status === "error" && <NotFound error={error} />}

        {status === "success" && result && (
          <WordResult result={result} onWordClick={search} />
        )}

      </main>
      <Footer />
    </div>
  );
}

export default App;
