export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');

  if (!query) {
    return Response.json({ error: 'Query is required' }, { status: 400 });
  }

  try {
    const res = await fetch(
      `https://photon.komoot.io/api/?q=${encodeURIComponent(
        query + ' Lagos Nigeria'
      )}&limit=5&lang=en`,
      {
        headers: {
          'User-Agent': 'CLIME-App/1.0',
        },
      }
    );

    const data = await res.json();

    // Photon returns GeoJSON format, we normalize it
    // to match what SearchBar expects
    const results = data.features.map((feature) => ({
      place_id: feature.properties.osm_id,
      display_name: [
        feature.properties.name,
        feature.properties.city,
        feature.properties.state,
        feature.properties.country,
      ]
        .filter(Boolean)
        .join(', '),
      lat: feature.geometry.coordinates[1],
      lon: feature.geometry.coordinates[0],
    }));

    return Response.json(results);
  } catch (error) {
    console.error('Geocoding error:', error.message);
    return Response.json({ error: error.message }, { status: 500 });
  }
}