'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

const MapClient = dynamic(() => import('./MapClient'), { ssr: false });

type LatLng = { lat: number; lng: number };

export default function SelectLocationPage() {
  const router = useRouter();
  const sp = useSearchParams();

  const [pos, setPos] = useState<LatLng>({ lat: 35.7219, lng: 51.0069 });
  const [address, setAddress] = useState<string>('');
  const [loadingAddr, setLoadingAddr] = useState(false);

  // بازیابی موقعیت اولیه از query یا localStorage
  useEffect(() => {
    const qsLat = sp.get('lat');
    const qsLng = sp.get('lng');
    if (qsLat && qsLng) {
      setPos({ lat: Number(qsLat), lng: Number(qsLng) });
      return;
    }
    const saved = localStorage.getItem('pakyar_pickup_location');
    if (saved) {
      try {
        const v = JSON.parse(saved);
        if (v.lat && v.lng) setPos({ lat: v.lat, lng: v.lng });
      } catch {}
    }
  }, [sp]);

  // گرفتن آدرس معکوس (reverse geocode)
  useEffect(() => {
    let cancel = false;
    (async () => {
      setLoadingAddr(true);
      try {
        const r = await fetch(`/api/geo/reverse?lat=${pos.lat}&lng=${pos.lng}`, { cache: 'no-store' });
        const j = await r.json();
        if (!cancel) setAddress(j.address || '');
      } catch {
        if (!cancel) setAddress('');
      } finally {
        if (!cancel) setLoadingAddr(false);
      }
    })();
    return () => { cancel = true; };
  }, [pos]);

  // ⬅️ نسخه اصلاح‌شده تابع تأیید موقعیت
  const confirm = () => {
    const value = { lat: pos.lat, lng: pos.lng, address };
    localStorage.setItem('pakyar_pickup_location', JSON.stringify(value));

    // ✅ تأخیر کوتاه برای اطمینان از ذخیره در localStorage
    setTimeout(() => {
      router.push(`/schedule?lat=${pos.lat}&lng=${pos.lng}`);
    }, 200);
  };

  return (
    <main dir="rtl" className="min-h-screen bg-white flex flex-col font-[IRANYekanXFaNum]">
      {/* نقشه بالا */}
      <div className="flex-1">
        <MapClient value={pos} onChange={setPos} />
      </div>

      {/* پایین: آدرس و دکمه */}
      <div className="bg-white p-4 pt-3 shadow-[0_-8px_24px_rgba(0,0,0,0.06)]">
        <div className="mx-auto max-w-md">
          <div className="text-xs text-gray-500 mb-1">آدرس انتخاب‌شده:</div>
          <div className="text-sm text-gray-800 line-clamp-2 mb-3">
            {loadingAddr ? 'در حال دریافت آدرس...' : (address || '—')}
          </div>

          <input
            type="text"
            placeholder="توضیحات/جزئیات آدرس (اختیاری)"
            className="w-full rounded-2xl border border-gray-200 px-3 py-3 text-sm outline-none mb-3"
          />

          <button
            onClick={confirm}
            className="w-full bg-green-600 hover:bg-green-700 active:scale-[0.99] text-white rounded-2xl py-3 text-sm font-medium"
          >
            انتخاب موقعیتِ جمع‌آوری
          </button>
        </div>
      </div>
    </main>
  );
}
