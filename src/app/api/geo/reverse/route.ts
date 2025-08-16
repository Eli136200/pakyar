export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const lat = searchParams.get('lat');
  const lng = searchParams.get('lng');

  if (!lat || !lng || isNaN(Number(lat)) || isNaN(Number(lng))) {
    return new Response('lat,lng required', { status: 400 });
  }

  const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`;
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 5000); // 5s timeout

  try {
    const res = await fetch(url, {
      headers: { 'User-Agent': 'pakyar-app/1.0 (contact: example@example.com)' },
      signal: controller.signal,
      cache: 'no-store',
    });
    clearTimeout(timeout);

    if (!res.ok) return new Response('geo service error', { status: 502 });

    const data = await res.json();
    return Response.json({ address: data.display_name || '' });
  } catch (err) {
    return new Response('Geo service timeout or error', { status: 504 });
  }
}
