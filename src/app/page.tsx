"use client";

import Image from "next/image";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SplashPage() {
  const router = useRouter();

  useEffect(() => {
    const timeout = setTimeout(() => {
      router.push("/get-phone"); // مسیر بعد از اسپلش
    }, 3000); // نمایش برای ۳ ثانیه

    return () => clearTimeout(timeout);
  }, [router]);

  return (
    <div className="flex flex-col justify-center items-center min-h-screen text-center bg-white">
      <Image
        src="/logo-fardis.png" // مطمئن شو که در public قرار گرفته
        alt="لوگو"
        width={200}
        height={200}
        className="mb-6 mt-32"
      />
      <h1 className="text-6xl font-bold text-green-600">فـردیـس</h1>
      <h2 className="text-xl font-bold text-green-500 mt-2">شهر هوشمند</h2>

      <div className="flex-grow" />

      <h3 className="text-md font-semibold mb-1">اپلیکیشن پاکیار</h3>
      <p className="text-sm mb-8">نسخه 1.1.1</p>
    </div>
  );
}
