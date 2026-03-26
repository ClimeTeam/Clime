'use client';

import { useEffect, useRef } from 'react';

const LAGOS_CENTER = [6.5244, 3.3792];
const LAGOS_BOUNDS = [
  [6.3533, 2.7765],
  [6.7035, 3.9675],
];

export default function MapView({ onLocationSelect, selectedLocation }) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markerRef = useRef(null);

  // Effect 1 — Initialize the map once on mount
  useEffect(() => {
    const initMap = async () => {
      const L = (await import('leaflet')).default;
      await import('leaflet/dist/leaflet.css');

      if (mapContainerRef.current._leaflet_id) {
        mapContainerRef.current._leaflet_id = null;
      }

      const map = L.map(mapContainerRef.current, {
        center: LAGOS_CENTER,
        zoom: 11,
        minZoom: 10,
        maxZoom: 18,
        maxBounds: LAGOS_BOUNDS,
        maxBoundsViscosity: 1.0,
        zoomControl: false,
      });

      L.tileLayer(
        'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
        { attribution: '&copy; OpenStreetMap contributors &copy; CARTO' }
      ).addTo(map);

      L.control.zoom({ position: 'bottomleft' }).addTo(map);

      // When user clicks the map directly
      map.on('click', (e) => {
        const { lat, lng } = e.latlng;
        if (onLocationSelect) onLocationSelect({ lat, lng });
      });

      mapInstanceRef.current = map;
    };

    initMap();

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Effect 2 — React to selectedLocation changes
  // This runs every time selectedLocation prop changes
  useEffect(() => {
    if (!selectedLocation || !mapInstanceRef.current) return;

    const { lat, lng } = selectedLocation;

    const updateMap = async () => {
      const L = (await import('leaflet')).default;

      // Remove previous marker if it exists
      if (markerRef.current) {
        markerRef.current.remove();
      }

      // Place new marker
      markerRef.current = L.circleMarker([lat, lng], {
        radius: 8,
        fillColor: '#0D9488',
        color: '#ffffff',
        weight: 2,
        fillOpacity: 1,
      }).addTo(mapInstanceRef.current);

      // Fly the map to the selected location
      mapInstanceRef.current.flyTo([lat, lng], 15, {
        animate: true,
        duration: 1.2,
      });
    };

    updateMap();
  }, [selectedLocation]); 
  // The dependency array [selectedLocation] means this effect
  // only runs when selectedLocation changes — not on every render

  return <div ref={mapContainerRef} className="w-full h-full" />;
}