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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-6">دریافت شماره</h1>
      
      <input
        type="text"
        placeholder="شماره موبایل"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className="border p-2 rounded mb-4 w-64 text-center"
      />
      
      <button
        onClick={handleSubmit}
        className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded transition-colors"
      >
        ادامه
      </button>
    </div>
  );
}
