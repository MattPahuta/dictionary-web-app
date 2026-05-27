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

  const [font, setFont] = useState("sans"); // sans, serif, mono

  useEffect(() => {
    const savedTheme = localStorage.getItem("dict-theme") || "light";
    const savedFont = localStorage.getItem("dict-font") || "sans";
    setTheme(savedTheme);
    setFont(savedFont);
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
    }
  }, []);


  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    localStorage.setItem("dict-theme", nextTheme);
    document.documentElement.classList.toggle("dark", nextTheme === "dark");
  };

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
