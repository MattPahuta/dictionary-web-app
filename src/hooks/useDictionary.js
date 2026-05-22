import { useState, useCallback } from "react";

const BASE_URL = 'https://api.dictionaryapi.dev/api/v2/entries/en';

// pull the cleanest phonetic text and first available audio URL from phonetics array
function extractPhonetic(entry) {
  const { phonetic, phonetics = [] } = entry;

  //** phonetics is an array of potentially multiple objects */
  // get the first object with an audio property that's not ""
  const withAudio = phonetics.find((p) => p.audio && p.audio.trim() !== '');
  // get the first object with text property that's not ""
  const withText = phonetics.find((p) => p.text && p.text.trim() !== '');

  return {
    text: withAudio?.text || withText?.text || phonetic || '',
    audio: withAudio?.audio || null,
  }
}

// normalize word entry received from API into better shape for UI
function normalizeEntry(entry) {
  const { text: phoneticText, audio: audioUrl } = extractPhonetic(entry);

  return {
    word: entry.word,
    phonetic: phoneticText,
    audioUrl,
    meanings: entry.meanings.map((m) => ({
      partOfSpeech: m.partOfSpeech,
      definitions: m.definitions.map((d) => ({
        definition: d.definition,
        example: d.example || null,
      })),
      synonyms: m.synonyms || [],
      antonyms: m.antonym || [],
    })),
    sourceUrls: entry.sourceUrls || [],
  }
}

export function useDictionary() {
  const [result, setResult] = useState(null); // normalized entry or null
  const [status, setStatus] = useState('idle'); // 'idle' | 'loading' | 'success' | 'error'
  const [error, setError] = useState(null); // error message or null

  // useCallback to keep function reference stable, safe to pass via props
  const search = useCallback(async (word) => {
    const query = word.trim();
    if (!query) return;

    setStatus('loading');
    setError(null);
    setResult(null);

    try {
      const res = await fetch(`${BASE_URL}/${encodeURIComponent(query)}`);

      if (!res.ok) {
        if (res.status === 404) {
          const apiError = await res.json();
          setError(apiError)
        } else {
          setError({
            title: "Something went wrong",
            message: `The server returned an unexpected error (${res.status}).`,
            resolution: "Please try again."
          })
        }
        setStatus('error');
        return;
      }

      const data = await res.json();
      setResult(normalizeEntry(data[0])); // API returns an array; take first entry
      setStatus('success');
    } catch (error) {
      console.log("An error has occurred. ", error);
      setError({
        title: "Connection Error",
        message: "Unable to reach the dictionary service.",
        resolution: "Check you internet connection and try again."
      });
      setStatus('error');
    }
  }, []);

  const reset = useCallback(() => {
    setResult(null);
    setStatus('idle');
    setError(null);
  }, []);

  return { result, status, error, search, reset };
}