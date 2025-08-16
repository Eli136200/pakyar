'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function GetPhonePage() {
  const [phone, setPhone] = useState('');
  const router = useRouter();

  const handleSubmit = async () => {
    if (!phone) {
      alert('لطفاً شماره موبایل را وارد کنید');
      return;
    }

    try {
      const res = await fetch('/api/get-phone', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone }),
      });

      if (res.ok) {
        router.push('/dashboard');
      } else {
        alert('شماره موبایل در سیستم یافت نشد');
      }
    } catch (error) {
      console.error('خطا در ارسال شماره:', error);
      alert('خطا در اتصال به سرور');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-600 p-6 text-white">
      {/* متن خوش آمد */}
      <h1 className="text-2xl md:text-3xl font-bold mb-2 text-center">
        به پاکیار خوش آمدید
      </h1>
      <p className="mb-8 text-sm md:text-base text-center">
        برای ورود شماره همراه خود را وارد کنید
      </p>

      {/* ورودی با آیکن SVG */}
      <div className="flex items-center bg-white rounded-full px-4 py-2 w-full max-w-xs mb-6 shadow">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-5 h-5 text-green-600 mr-2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 20.25a8.25 8.25 0 1115 0v.75H4.5v-.75z"
          />
        </svg>
        <input
          type="tel"
          placeholder="شماره همراه"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="flex-1 text-black bg-transparent outline-none text-center text-base"
        />
      </div>

      {/* دکمه سفید */}
      <button
        onClick={handleSubmit}
        className="bg-white text-black font-medium px-8 py-2 rounded-full shadow hover:bg-gray-100 transition-colors w-full max-w-xs"
      >
        ارسال کد
      </button>
    </div>
  );
}
