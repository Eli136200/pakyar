import { NextResponse } from 'next/server';
// import { prisma } from '@/lib/prisma'; // اگر داری

export async function GET() {
  // نمونه‌ی ثابت — اینجا را به دیتابیس وصل کن
  // const userId = ... (از سشن/توکن)
  // const data = await prisma.referral.findUnique({ where: { userId }, select: { code: true, invitedCount: true } });

  const data = { code: '9776', invitedCount: 0 };
  return NextResponse.json(data);
}
