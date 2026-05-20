import { useTheme } from "./context/ThemeContext"
import { useDictionary } from "./hooks/useDictionary";
import Header from "./components/Header";
import SearchForm from "./components/SearchForm";

const fontMap = {
  sans: 'font-sans',
  serif: 'font-serif',
  mono: 'font-mono',
}

function App() {
  const { font } = useTheme();
  const { result, status, error, search } = useDictionary();

  return (
    <div
      className={`min-h-screen ${fontMap[font]} dark:bg-zinc-950 dark:text-zinc-50 bg-zinc-50 text-zinc-800 space-y-8`}>
      <Header />
      <main className="max-w-3xl mx-auto px-4 sm:px-5">
        <h1 className="sr-only">Dictionary Search</h1>
        <SearchForm onSearch={search} />

        {/* Temporary status output  */}
        <div className="text-sm opacity-60">
          {status === "loading" && <p>Loading...</p>}
          {status === "error" && (
            <p className="text-red-500">{error}</p>
          )}
          {status === "success" && <p>Found: {result.word}</p>}
        </div>
        {/* <h1 className="text-2xl">Dictionary web app</h1>
        <p className="font-serif">Serif font</p>
        <p className="font-mono">Monospace font</p>
        <button onClick={() => search('keyboard')} className="py-2 px-4 bg-violet-500 text-white rounded-lg cursor-pointer">Test: search "keyboard"</button>
        <pre className="mt-6 text-sm overflow-auto">
          status: {status}
          {error && `\nerror: ${error}`}
          {result && `\n\n${JSON.stringify(result, null, 2)}`}
        </pre> */}
      </main>
    </div>
  );
}

export default App
