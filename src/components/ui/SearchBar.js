'use client';

import { useState } from 'react';

export default function SearchBar({ onLocationSelect }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const searchLocation = async (value) => {
    setQuery(value);
    if (value.length < 3) return setResults([]);

    setIsLoading(true);
    try {
    const res = await fetch(`/api/search?q=${encodeURIComponent(value)}`);
      const data = await res.json();
      setResults(data);
    } catch (err) {
      console.error('Search error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelect = (result) => {
    setQuery(result.display_name.split(',')[0]);
    setResults([]);
    onLocationSelect({
      lat: parseFloat(result.lat),
      lng: parseFloat(result.lon),
      name: result.display_name.split(',')[0],
    });
  };

  return (
    <div className="absolute top-4 left-1/2 -translate-x-1/2 z-[1000] w-full max-w-xl px-4">
      <div className="relative">
        <div className="flex items-center bg-white rounded-xl shadow-lg px-4 py-3 gap-3">
          <svg className="w-4 h-4 text-brand-gray shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            value={query}
            onChange={(e) => searchLocation(e.target.value)}
            placeholder="Search any location in Lagos"
            className="flex-1 text-sm text-brand-dark placeholder-brand-gray outline-none bg-transparent"
          />
          {isLoading && (
            <div className="w-4 h-4 border-2 border-brand-primary border-t-transparent rounded-full animate-spin shrink-0" />
          )}
        </div>

        {results.length > 0 && (
          <div className="absolute top-full mt-2 w-full bg-white rounded-xl shadow-lg overflow-hidden">
            {results.map((result) => (
              <button
                key={result.place_id}
                onClick={() => handleSelect(result)}
                className="w-full text-left px-4 py-3 text-sm text-brand-dark hover:bg-brand-light border-b border-gray-100 last:border-0"
              >
                <span className="font-medium">
                  {result.display_name.split(',')[0]}
                </span>
                <span className="text-brand-gray ml-1">
                  {result.display_name.split(',').slice(1, 3).join(',')}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}