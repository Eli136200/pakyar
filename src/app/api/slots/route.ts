export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const date = searchParams.get('date');
  const lat = searchParams.get('lat');
  const lng = searchParams.get('lng');

  if (!date || !lat || !lng)
    return new Response('Missing parameters', { status: 400 });

  const slots = [
    { id: '1', label: '۹:۰۰ – ۱۱:۰۰', available: true },
    { id: '2', label: '۱۱:۰۰ – ۱۳:۰۰', available: true },
    { id: '3', label: '۱۵:۰۰ – ۱۷:۰۰', available: true },
    { id: '4', label: '۱۷:۰۰ – ۱۹:۰۰', available: false },
  ];

  return Response.json(slots);
}
