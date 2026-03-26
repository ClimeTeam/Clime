'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import SearchBar from '@/components/ui/SearchBar';
import GpsButton from '@/components/ui/GpsButton';
import ResultsPanel from '@/components/panel/ResultsPanel';
import { reverseGeocode } from '@/services/geocoding';
import { getRiskData } from '@/services/risk';

const MapView = dynamic(() => import('@/components/map/MapView'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-screen bg-brand-light flex items-center justify-center">
      <p className="text-brand-gray text-sm">Loading map...</p>
    </div>
  ),
});

export default function Home() {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [riskData, setRiskData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLocationSelect = async (coords) => {
    // Step 1 — Get location name if we don't have it
    if (!coords.name || !coords.subtext) {
      const { name, subtext } = await reverseGeocode(coords.lat, coords.lng);
      coords = {
        ...coords,
        name: coords.name || name,
        subtext: coords.subtext || subtext,
      };
    }

    // Step 2 — Open panel and set loading state
    setSelectedLocation(coords);
    setIsPanelOpen(true);
    setIsLoading(true);
    setError(null);
    setRiskData(null);

    // Step 3 — Fetch risk data from backend
    try {
      const data = await getRiskData(coords.name, coords.lat, coords.lng);
      setRiskData(data);
    } catch (err) {
      setError('Could not load risk data for this location. Please try again.');
    } finally {
      // This runs whether the request succeeded or failed
      setIsLoading(false);
    }
  };

  return (
    <main className="w-full h-screen relative">
      <MapView
        onLocationSelect={handleLocationSelect}
        selectedLocation={selectedLocation}
      />
      <SearchBar onLocationSelect={handleLocationSelect} />
      <GpsButton onLocationSelect={handleLocationSelect} />
      <ResultsPanel
        isOpen={isPanelOpen}
        location={selectedLocation}
        riskData={riskData}
        isLoading={isLoading}
        error={error}
        onClose={() => setIsPanelOpen(false)}
      />
    </main>
  );
}