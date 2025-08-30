// src/app/api/auth/me/route.js

import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req) {
  try {
    const authHeader = req.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "توکن وجود ندارد" }, { status: 401 });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
    });

    if (!user) {
      return NextResponse.json({ error: "کاربر یافت نشد" }, { status: 404 });
    }

    return NextResponse.json({
      id: user.id,
      phone: user.phone,
      firstName: user.firstName,
      lastName: user.lastName,
      profileCompleted: user.profileCompleted,
    });
  } catch (error) {
    return NextResponse.json({ error: "توکن نامعتبر" }, { status: 401 });
  }
}
