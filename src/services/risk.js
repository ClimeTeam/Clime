export async function getRiskData(name, lat, lng) {
  const response = await fetch('/api/risk', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, lat, lng }),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.error || `API error: ${response.status}`);
  }

  return response.json();
}
