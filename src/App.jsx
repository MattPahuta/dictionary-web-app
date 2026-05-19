import { useTheme } from "./context/ThemeContext"
import { useDictionary } from "./hooks/useDictionary";
import Header from "./components/Header";

const fontMap = {
  sans: 'font-sans',
  serif: 'font-serif',
  mono: 'font-mono',
}

function App() {
  const { theme, font } = useTheme();
  const { result, status, error, search } = useDictionary();

  return (
    <div className={`min-h-screen ${fontMap[font]} ${theme === 'dark' ? 'bg-zinc-950 text-zinc-50' : 'bg-zinc-50 text-zinc-800'}`}>
      <div className="max-w-3xl mx-auto space-y-8">
        <Header />
        <h1 className="text-2xl">Dictionary web app</h1>
        <p className="font-serif">Serif font</p>
        <p className="font-mono">Monospace font</p>
        <button onClick={() => search('keyboard')} className="py-2 px-4 bg-violet-500 text-white rounded-lg cursor-pointer">Test: search "keyboard"</button>

        <pre className="mt-6 text-sm overflow-auto">
          status: {status}
          {error && `\nerror: ${error}`}
          {result && `\n\n${JSON.stringify(result, null, 2)}`}
        </pre>
      </div>
    </div>
  )
}

export default App
