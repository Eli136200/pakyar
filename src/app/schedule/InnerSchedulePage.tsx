'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

type Slot = { id: string; label: string; available: boolean };

export default function InnerSchedulePage() {
  const router = useRouter();
  const sp = useSearchParams();

  const days = useMemo(() => {
    const toFa = (n: number) => n.toString().replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹'[+d]);
    const daysOut = [];
    for (let i = 0; i < 4; i++) {
      const g = new Date();
      g.setDate(g.getDate() + i);
      const j = new Intl.DateTimeFormat('fa-IR-u-nu-latn', {
        weekday: 'long', day: 'numeric', month: 'long'
      }).format(g);
      const [weekday, day, month] = j.split(' ');
      daysOut.push({
        key: g.toISOString().slice(0, 10),
        label: `${weekday} ${toFa(+day)} ${month}`
      });
    }
    return daysOut;
  }, []);

  const [lat, setLat] = useState<number | null>(null);
  const [lng, setLng] = useState<number | null>(null);
  const [address, setAddress] = useState('');
  const [checkedLocal, setCheckedLocal] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('pakyar_pickup_location');
    if (saved) {
      try {
        const v = JSON.parse(saved);
        if (v.lat && v.lng) {
          setLat(v.lat);
          setLng(v.lng);
          setAddress(v.address ?? '');
        }
      } catch {}
    }
    setCheckedLocal(true);
  }, []);

  useEffect(() => {
    if (checkedLocal && (lat == null || lng == null)) {
      router.replace('/select-location');
    }
  }, [lat, lng, checkedLocal, router]);

  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [slots, setSlots] = useState<Slot[]>([]);
  const [slotId, setSlotId] = useState<string | null>(null);
  const [note, setNote] = useState('');

  useEffect(() => {
    if (!selectedDay && days[0]) setSelectedDay(days[0].key);
  }, [days, selectedDay]);

  useEffect(() => {
    if (!selectedDay || lat == null || lng == null) return;
    (async () => {
      const r = await fetch(`/api/slots?date=${selectedDay}&lat=${lat}&lng=${lng}`, { cache: 'no-store' });
      const data: Slot[] = await r.json();
      setSlots(data);
      setSlotId(null);
    })();
  }, [selectedDay, lat, lng]);

  const submit = async () => {
    if (!slotId || lat == null || lng == null || !selectedDay) return;
    const res = await fetch('/api/pickups', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        location: { lat, lng, address },
        date: selectedDay,
        slotId,
        note,
      }),
    });
    if (res.ok) router.replace('/dashboard?success=1');
    else alert('ثبت نشد؛ دوباره تلاش کنید.');
  };

  return (
    <main dir="rtl" className="min-h-screen bg-white font-[IRANYekanXFaNum]">
      <header className="bg-green-600 text-white rounded-b-3xl px-4 pt-10 pb-16 relative">
        <button
          onClick={() => router.back()}
          className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 text-gray-800 grid place-items-center shadow"
        >←</button>
        <div className="text-center">
          <h1 className="text-lg font-semibold">زمان‌بندی جمع‌آوری</h1>
          <p className="text-sm text-white/90 mt-1">روز و بازه‌ی زمانی دلخواه‌تان را انتخاب کنید</p>
        </div>

        <div className="mx-4 mt-6 bg-white rounded-2xl shadow-[0_8px_20px_rgba(0,0,0,.12)] p-4 text-gray-800">
          <div className="text-xs text-gray-500 mb-1">آدرس انتخاب‌شده</div>
          <div className="text-sm font-medium line-clamp-2">{address || '—'}</div>
        </div>
      </header>

      <section className="px-4 -mt-10 space-y-6 pb-28">
        <div className="bg-white rounded-2xl border border-gray-200 p-4">
          <h2 className="text-sm font-semibold mb-3">انتخاب تاریخ</h2>
          <div className="overflow-x-auto no-scrollbar">
            <div className="flex gap-2 min-w-max">
              {days.map(d => (
                <button
                  key={d.key}
                  onClick={() => setSelectedDay(d.key)}
                  className={`w-32 shrink-0 rounded-2xl border px-2 py-3 text-center
                    ${selectedDay === d.key ? 'border-green-600 bg-green-50 text-green-700' : 'border-gray-200 bg-white text-gray-700'}`}
                >{d.label}</button>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 p-4">
          <h2 className="text-sm font-semibold mb-3">انتخاب بازه زمانی</h2>
          <div className="grid grid-cols-2 gap-2">
            {slots.map(s => (
              <button
                key={s.id}
                disabled={!s.available}
                onClick={() => setSlotId(s.id)}
                className={`rounded-xl border px-3 py-3 text-sm
                  ${!s.available ? 'border-gray-200 text-gray-400 bg-gray-50 cursor-not-allowed'
                    : slotId === s.id ? 'border-green-600 bg-green-50 text-green-700'
                    : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50'}`}
              >{s.label}</button>
            ))}
          </div>
          {!slots.length && (
            <p className="text-xs text-gray-500 mt-3">برای این روز بازه‌ای موجود نیست.</p>
          )}
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 p-4">
          <h3 className="text-sm font-semibold mb-2">توضیحات (اختیاری)</h3>
          <textarea
            value={note}
            onChange={e => setNote(e.target.value)}
            rows={3}
            placeholder="مثلاً: زنگ واحد ۲ را بزنید…"
            className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm outline-none focus:border-green-600"
          />
        </div>
      </section>

      <footer className="fixed bottom-0 inset-x-0 bg-white/95 backdrop-blur border-t">
        <div className="max-w-md mx-auto px-4 py-3">
          <button
            onClick={submit}
            disabled={!slotId}
            className={`w-full rounded-2xl py-3 text-sm font-medium
              ${slotId ? 'bg-green-600 text-white hover:bg-green-700 active:scale-[0.99]' : 'bg-gray-200 text-gray-500 cursor-not-allowed'}`}
          >تأیید زمان‌بندی</button>
        </div>
      </footer>
    </main>
  );
}
