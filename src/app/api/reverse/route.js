export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const lat = searchParams.get('lat');
  const lng = searchParams.get('lng');

  if (!lat || !lng) {
    return Response.json({ error: 'lat and lng are required' }, { status: 400 });
  }

  try {
    const res = await fetch(
      `https://photon.komoot.io/reverse?lat=${lat}&lon=${lng}`,
      { headers: { 'User-Agent': 'CLIME-App/1.0' } }
    );

    const data = await res.json();
    const feature = data.features?.[0];

    if (!feature) {
      return Response.json({ name: 'Unknown Location' });
    }

    // Extract the most useful name from the result
    const name =
      feature.properties.name ||
      feature.properties.street ||
      feature.properties.district ||
      'Unknown Location';

    const subtext = [
      feature.properties.district,
      feature.properties.city,
      feature.properties.state,
    ]
      .filter(Boolean)
      .join(', ');

    return Response.json({ name, subtext });
  } catch (error) {
    console.error('Reverse geocode error:', error.message);
    return Response.json({ name: 'Unknown Location', subtext: '' });
  }
}