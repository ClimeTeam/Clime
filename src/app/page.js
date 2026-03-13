'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import SearchBar from '@/components/ui/SearchBar';
import GpsButton from '@/components/ui/GpsButton';
import ResultsPanel from '@/components/panel/ResultsPanel';
import { reverseGeocode } from '@/services/geocoding';

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

  const handleLocationSelect = async (coords) => {
    // If coords already has a name (from search), use it directly
    // If not (from map click or GPS), reverse geocode to get the name
    if (!coords.name) {
      const { name, subtext } = await reverseGeocode(coords.lat, coords.lng);
      coords = { ...coords, name, subtext };
    }

    setSelectedLocation(coords);
    setIsPanelOpen(true);
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
        onClose={() => setIsPanelOpen(false)}
      />
    </main>
  );
}