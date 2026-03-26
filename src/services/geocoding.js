export async function reverseGeocode(lat, lng) {
  try {
    const res = await fetch(`/api/reverse?lat=${lat}&lng=${lng}`);
    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Reverse geocode failed:', error);
    return { name: 'Unknown Location', subtext: '' };
  }
}