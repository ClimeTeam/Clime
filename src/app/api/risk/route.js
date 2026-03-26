export async function POST(request) {
  const body = await request.json();
  const { name, lat, lng } = body;

  if (!lat || !lng) {
    return Response.json({ error: 'lat and lng are required' }, { status: 400 });
  }

  const baseUrl = process.env.CLIME_API_URL || 'http://0.0.0.0:8000';
  const apiKey = process.env.CLIME_API_KEY;

  try {
    const res = await fetch(`${baseUrl}/v1/risk/assess`, {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json',
        ...(apiKey && { 'X-CLIME-API-KEY': apiKey }),
      },
      body: JSON.stringify({ name: name || 'Unknown', lat, lng }),
    });

    if (!res.ok) {
      const text = await res.text();
      console.error('Risk API error:', res.status, text);
      return Response.json({ error: `Upstream error: ${res.status}` }, { status: res.status });
    }

    const data = await res.json();
    return Response.json(data);
  } catch (error) {
    console.error('Risk fetch error:', error.message);
    return Response.json({ error: error.message }, { status: 500 });
  }
}
