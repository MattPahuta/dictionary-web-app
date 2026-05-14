import { useTheme } from "./context/ThemeContext"

const fontMap = {
  sans: 'font-sans',
  serif: 'font-serif',
  mono: 'font-mono',
}

function App() {
  const { theme, font } = useTheme();

  return (
    <div className={`min-h-screen ${fontMap[font]} ${theme === 'dark' ? 'bg-zinc-950 text-zinc-50' : 'bg-zinc-50 text-zinc-900'}`}>
      <div className="max-w-3xl mx-auto">

        <h1 className="text-2xl">Dictionary web app</h1>
      </div>
    </div>
  )
}

export default App
