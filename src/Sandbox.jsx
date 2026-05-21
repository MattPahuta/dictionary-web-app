
        {
          /* Temporary status output  */
        }
        <div className="text-sm opacity-60">
          {status === "loading" && <p>Loading...</p>}
          {status === "error" && (
            <p className="text-red-500">{error}</p>
          )}
          {status === "success" && <p>Found: {result.word}</p>}
        </div>;
        
        {
          /* <h1 className="text-2xl">Dictionary web app</h1>
        <p className="font-serif">Serif font</p>
        <p className="font-mono">Monospace font</p>
        <button onClick={() => search('keyboard')} className="py-2 px-4 bg-violet-500 text-white rounded-lg cursor-pointer">Test: search "keyboard"</button>
        <pre className="mt-6 text-sm overflow-auto">
          status: {status}
          {error && `\nerror: ${error}`}
          {result && `\n\n${JSON.stringify(result, null, 2)}`}
        </pre> */
        }