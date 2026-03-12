'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import SearchBar from '@/components/ui/SearchBar';
import GpsButton from '@/components/ui/GpsButton';

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

  const handleLocationSelect = (coords) => {
    setSelectedLocation(coords);
  };

  return (
    <main className="w-full h-screen relative">
      <MapView
        onLocationSelect={handleLocationSelect}
        selectedLocation={selectedLocation}
      />
      <SearchBar onLocationSelect={handleLocationSelect} />
      <GpsButton onLocationSelect={handleLocationSelect} />
    </main>
  );
}