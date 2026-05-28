import { useState, useCallback } from "react";

const BASE_URL = 'https://api.dictionaryapi.dev/api/v2/entries/en';

function extractPhonetic(entry) {
  const { phonetic, phonetics = [] } = entry;
  const withAudio = phonetics.find((p) => p.audio && p.audio.trim() !== '');
  const withText = phonetics.find((p) => p.text && p.text.trim() !== '');

  return {
    text: withAudio?.text || withText?.text || phonetic || '',
    audio: withAudio?.audio || null,
  }
}

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

  const search = useCallback(async (word) => {
    const query = word.trim();
    if (!query) return;

    setStatus('loading');
    setError(null);
    setResult(null);

    try {
      const res = await fetch(`${BASE_URL}/${encodeURIComponent(query)}`);

      if (!res.ok) {
        // Only attempt to parse the body for 404s — other status codes
        // may not return a JSON body at all
        if (res.status === 404) {
          let apiBody = {};
          try { apiBody = await res.json(); } catch { /* leave apiBody as {} */ }
          setError(normalizeError(404, apiBody));
          setStatus('error');
          return;
        }

        // Non-404 HTTP errors (500, 429, etc.)
        setError(normalizeError(res.status));
        setStatus('error');
        return;
      }

      const data = await res.json();
      setResult(normalizeEntry(data[0]));
      setStatus('success');

    } catch {
      // fetch() itself threw — true network failure
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