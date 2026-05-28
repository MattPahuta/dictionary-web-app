import { useState, useCallback } from "react";

const BASE_URL = 'https://api.dictionaryapi.dev/api/v2/entries/en';

// pull the cleanest phonetic text and first available audio URL from phonetics array
function extractPhonetic(entry) {
  const { phonetic, phonetics = [] } = entry;
  const withAudio = phonetics.find((p) => p.audio && p.audio.trim() !== '');
  const withText = phonetics.find((p) => p.text && p.text.trim() !== '');

  return {
    text: withAudio?.text || withText?.text || phonetic || '',
    audio: withAudio?.audio || null,
  }
}

// normalize word entry received from API for consistent shape handling by UI
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
      antonyms: m.antonyms || [],
    })),
    sourceUrls: entry.sourceUrls || [],
  }
}

// normalize errors received from API for consistent error handling by UI components
function normalizeError(status, apiBody = {}) {
  const fallback = {
    title: "No Definitions Found",
    message: "Sorry pal, we couldn't find definitions for the word you were looking for.",
    resolution: "You can try the search again at a later time or head to the web instead." 
  }

  return {
    title: typeof apiBody.title === 'string' ? apiBody.title : fallback.title,
    message: typeof apiBody.message === 'string' ? apiBody.message : fallback.message,
    resolution: typeof apiBody.resolution === 'string' ? apiBody.resolution : fallback.resolution,
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
      const res = await fetch(`${BASE_URL}/${encodeURIComponent(query)}`)

      if (!res.ok) {
        let apiBody = {}

        if (res.status === 404) {
          try { 
            apiBody = await res.json() ;
          } catch { 
            setStatus('error');
            setError(normalizeError(res.status));
          }
        }
        setError(normalizeError(res.status, apiBody));
        setStatus('error');
        return;
      }

      const data = await res.json();
      setResult(normalizeEntry(data[0]));
      setStatus('success');

    } catch {
      setError(normalizeError('network'));
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