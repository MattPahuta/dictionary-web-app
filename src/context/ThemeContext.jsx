import {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    const stored = localStorage.getItem("theme");
    if (stored) return stored === "dark";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  const [font, setFont] = useState("sans");

  
  useEffect(() => {
    const root = document.documentElement;
    const savedFont = localStorage.getItem("dict-font") || "sans";
    setFont(savedFont);
    if (theme) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [theme]);

  const toggleTheme = () => setTheme((prev) => !prev);

  const changeFont = (font) => {
    setFont(font);
    localStorage.setItem("dict-font", font);
  };

  return (
    <ThemeContext.Provider
      value={{ theme, toggleTheme, font, changeFont }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
