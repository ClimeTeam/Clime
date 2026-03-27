export async function getRiskData(lat, lng, name) {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'https://api.clime.0xy7d.wtf';
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;

  const response = await fetch(`${baseUrl}/v1/risk/assess`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-CLIME-API-KEY': apiKey,
    },
    body: JSON.stringify({
      name: name || 'Unknown',
      lat,
      lng,
    }),
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  const data = await response.json();
  return data;
}