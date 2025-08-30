import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const body = await req.json();

    const {
      userId,
      userType,
      firstName,
      lastName,
      gender,
      birthDate,
      email,
      referralCode,
    } = body;

    // ذخیره یا آپدیت کاربر
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        userType,
        firstName,
        lastName,
        gender,
        birthDate: birthDate ? new Date(birthDate) : null,
        email,
        referralCode,
        profileCompleted: true,
      },
    });

    return NextResponse.json({ success: true, user: updatedUser });
  } catch (error) {
    console.error("Error saving profile:", error);
    return NextResponse.json(
      { success: false, error: "خطا در ذخیره پروفایل" },
      { status: 500 }
    );
  }
}
