export async function getRiskData(lat, lng) {
  // Get the backend URL from environment variables
  // Falls back to localhost:8000 if not set
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

  const response = await fetch(`${baseUrl}/api/risk?lat=${lat}&lng=${lng}`);

  // If the server responded but with an error status (404, 500 etc)
  // we throw an error with the status so the component knows what went wrong
  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  const data = await response.json();
  return data;
}