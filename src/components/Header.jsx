import { useTheme } from "../context/ThemeContext";

const fonts = [
  { value: "sans", label: "Sans Serif" },
  { value: "serif", label: "Serif" },
  { value: "mono", label: "Mono" },
];

function Header() {
  const { theme, toggleTheme, font, changeFont } = useTheme();

  return (
    <header className="w-full max-w-3xl mx-auto py-5 px-4 sm:px-5 flex items-center justify-between">
      {/* logo */}
      <svg
        className="w-7 sm:w-8"
        xmlns="http://www.w3.org/2000/svg"
        width="34"
        height="38"
        viewBox="0 0 34 38">
        <g
          fill="none"
          fillRule="evenodd"
          stroke="#838383"
          strokeLinecap="round"
          strokeWidth="1.5">
          <path d="M1 33V5a4 4 0 0 1 4-4h26.8A1.2 1.2 0 0 1 33 2.2v26.228M5 29h28M5 37h28" />
          <path strokeLinejoin="round" d="M5 37a4 4 0 1 1 0-8" />
          <path d="M11 9h12" />
        </g>
      </svg>
      {/* right side controls */}
      <div className="flex gap-4 items-center">
        {/* font select */}
        <div className="relative">
          <select
            name="fontSelect"
            value={font}
            onChange={(e) => changeFont(e.target.value)}
            className="appearance-none cursor-pointer pr-8 pl-3 py-1.5 rounded-lg text-sm font-bold border border-transparent focus:outline-none focus:ring-2 focus:ring-purple-500 bg-zinc-50 dark:bg-zinc-800 dark:text-zinc-50 text-zinc-900"
            aria-label="Switch font">
            {fonts.map((font) => (
              <option
                key={font.value}
                value={font.value}
                className="font-semibold">
                {font.label}
              </option>
            ))}
          </select>
          {/* custom dropdown arrow image */}
          <div className="absolute right-2 top-1/2 -translate-y-1/2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="8"
              viewBox="0 0 14 8">
              <path
                fill="none"
                stroke="#ad46ff"
                strokeWidth="1.5"
                d="m1 1 6 6 6-6"
              />
            </svg>
          </div>
        </div>
        {/* vertical divider */}
        <div className="w-px h-6 bg-neutral-400"></div>
        {/* light/dark theme toggle */}
        <button
          onClick={toggleTheme}
          role="switch"
          aria-checked={theme === "dark"}
          aria-label="Toggle dark mode"
          className="relative w-10 h-6 rounded-full cursor-pointer focus-visible:outline-2 outline-offset-4 focus-visible:outline-purple-500  bg-neutral-400 dark:bg-purple-500">
          <span className="absolute top-1 left-1 size-4 rounded-full bg-white transition-transform duration-300 translate-x-0 dark:translate-x-4"></span>
        </button>
        {/* moon icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="22"
          height="22"
          viewBox="0 0 22 22">
          <path
            fill="none"
            stroke="#838383"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M1 10.449a10.544 10.544 0 0 0 19.993 4.686C11.544 15.135 6.858 10.448 6.858 1A10.545 10.545 0 0 0 1 10.449Z"
          />
        </svg>
      </div>
    </header>
  );
}

export default Header;
