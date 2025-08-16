// src/app/splash/page.tsx
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function SplashPage() {
  const router = useRouter();

  useEffect(() => {
    const timeout = setTimeout(() => {
      router.replace('/get-phone');
    }, 7000);

    return () => clearTimeout(timeout);
  }, [router]);

  return (
    <main className="flex items-center justify-center min-h-screen bg-green-600 text-white font-[IRANYekanXFaNum]">
      <div className="text-center">
        <div className="text-5xl mb-4">♻️</div>
        <h1 className="text-xl font-bold">پاکیار</h1>
        <p className="text-sm mt-2">به اپلیکیشن مدیریت پسماند خوش آمدید</p>
      </div>
    </main>
  );
}
