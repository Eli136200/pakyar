export async function POST(req: Request) {
  const body = await req.json();
  // اینجا می‌تونی ولیدیشن/ثبت DB انجام بدی
  return Response.json({ id: 'mock-123', ok: true }, { status: 201 });
}
