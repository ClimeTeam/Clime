'use client';

export default function GpsButton({ onLocationSelect }) {
  const handleGps = () => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      (position) => {
        onLocationSelect({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (err) => console.error('GPS error:', err)
    );
  };

  return (
    <button
      onClick={handleGps}
      className="absolute bottom-8 right-4 z-[1000] w-11 h-11 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-brand-light transition-colors"
    >
      <svg className="w-5 h-5 text-brand-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    </button>
  );
}