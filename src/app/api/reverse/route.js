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

    const props = feature.properties;

    const name =
      props.name ||
      props.street ||
      props.district ||
      'Unknown Location';

    // county is the LGA in Lagos, state is "Lagos State"
    const subtext = [
      props.county ? `${props.county} LGA` : null,
      props.state || 'Lagos',
    ]
      .filter(Boolean)
      .join(', ');

    return Response.json({ name, subtext });
  } catch (error) {
    console.error('Reverse geocode error:', error.message);
    return Response.json({ name: 'Unknown Location', subtext: '' });
  }
}