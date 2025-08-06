import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { phone } = await req.json();

    if (!phone) {
      return NextResponse.json(
        { message: 'شماره موبایل الزامی است' },
        { status: 400 }
      );
    }

    // جستجو برای پیدا کردن کاربر
    let user = await prisma.user.findUnique({
      where: { phone },
    });

    // اگر کاربر وجود نداشت → بساز
    if (!user) {
      user = await prisma.user.create({
        data: { phone },
      });
    }

    return NextResponse.json({ message: 'OK' }, { status: 200 });

  } catch (error) {
    console.error('خطا در API دریافت شماره:', error);
    return NextResponse.json(
      { message: 'خطای داخلی سرور' },
      { status: 500 }
    );
  }
}
