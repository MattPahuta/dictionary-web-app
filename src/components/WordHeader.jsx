import { useRef, useState } from "react";

function WordHeader({ word, phonetic, audioUrl }) {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  const handlePlay = () => {
    if (!audioRef.current) return;
    audioRef.current.play();
  };

  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="mb-2 text-4xl sm:text-6xl font-bold tracking-tight">
          {word}
        </h1>
        {phonetic && (
          <p className="text-lg text-purple-700 dark:text-purple-400">{phonetic}</p>
        )}
      </div>

      {audioUrl && (
        <>
          <audio
            ref={audioRef}
            src={audioUrl}
            onPlay={() => setPlaying(true)}
            onEnded={() => setPlaying(false)}
          />
          <button
            onClick={handlePlay}
            aria-label={`Play pronunciation of ${word}`}
            aria-pressed={playing}
            className="group border-0 rounded-full flex items-center justify-center cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-purple-500">
            <svg
              className="size-12 sm:h-[75px] sm:w-[75px]"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="75"
              height="75"
              viewBox="0 0 75 75">
              <g fill="#A445ED" fillRule="evenodd">
                <circle
                  cx="37.5"
                  cy="37.5"
                  r="37.5"
                  opacity=".25"
                  className="group-hover:opacity-95 transition-opacity duration-200"
                />
                <path
                  d="M29 27v21l21-10.5z"
                  className={`group-hover:fill-white ${playing ? "fill-white" : "fill-purple-500"} transition-colors duration-200`}
                />
              </g>
            </svg>
          </button>
        </>
      )}
    </div>
  );
}

export default WordHeader;
