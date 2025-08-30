'use client';

import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

const MapClient = dynamic(() => import('./MapClient'), { ssr: false });

type LatLng = { lat: number; lng: number };

export default function InnerLocationPage() {
  const router = useRouter();
  const sp = useSearchParams();

  const [pos, setPos] = useState<LatLng>({ lat: 35.7219, lng: 51.0069 });

  // آدرس فقط در استپ 2 گرفته/نمایش داده می‌شود
  const [step, setStep] = useState<1 | 2>(1);
  const [address, setAddress] = useState<string>('');
  const [addressInput, setAddressInput] = useState<string>('');
  const [loadingAddr, setLoadingAddr] = useState(false);
  const userEditedRef = useRef(false);

  // GPS states
  const [isLocating, setIsLocating] = useState(false);
  const [gpsModalOpen, setGpsModalOpen] = useState(false);
  const [gpsErrorText, setGpsErrorText] = useState('سرورِ سنجش موقعیت یا GPS در دسترس نیست. لطفاً از فعال بودن GPS دستگاه خود مطمئن شوید.');
  const askedGeoOnceRef = useRef(false);

  // ---------- Init: از QS/LocalStorage یا GPS ----------
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
        if (v?.lat && v?.lng) {
          setPos({ lat: v.lat, lng: v.lng });
          return; // آدرس را عمداً لود/نمایش نمی‌کنیم
        }
      } catch {}
    }
    if (!askedGeoOnceRef.current) {
      askedGeoOnceRef.current = true;
      requestGeolocation(); // فقط برای سنتر نقشه
    }
  }, [sp]);

  // ---------- فقط در استپ 2 ریورس‌جئو ----------
  useEffect(() => {
    if (step !== 2) return;
    let cancel = false;
    (async () => {
      setLoadingAddr(true);
      try {
        const r = await fetch(`/api/geo/reverse?lat=${pos.lat}&lng=${pos.lng}`, { cache: 'no-store' });
        const j = await r.json();
        const addr = j.address || '';
        if (!cancel) {
          setAddress(addr);
          if (!userEditedRef.current) setAddressInput(prev => prev || addr);
        }
      } catch {
        if (!cancel) setAddress('');
      } finally {
        if (!cancel) setLoadingAddr(false);
      }
    })();
    return () => { cancel = true; };
  }, [pos, step]);

  // ---------- گرفتن GPS با بازخورد و بدون reject ----------
  async function requestGeolocation() {
    setIsLocating(true);
    try {
      if (navigator.permissions && (navigator.permissions as any).query) {
        try {
          const perm: PermissionStatus = await (navigator.permissions as any).query({ name: 'geolocation' });
          if (perm.state === 'denied') {
            setGpsErrorText('اجازه دسترسی به موقعیت غیرفعال است. لطفاً GPS/Location را روشن کرده و اجازه دسترسی بدهید.');
            setGpsModalOpen(true);
            return;
          }
        } catch {}
      }
      if (!navigator.geolocation) {
        setGpsErrorText('مرورگر شما از موقعیت‌یاب پشتیبانی نمی‌کند.');
        setGpsModalOpen(true);
        return;
      }
      await new Promise<void>((resolve) => {
        navigator.geolocation.getCurrentPosition(
          (p) => { setPos({ lat: p.coords.latitude, lng: p.coords.longitude }); resolve(); },
          (err) => {
            setGpsErrorText(
              err.code === err.PERMISSION_DENIED
                ? 'برای استفاده از این صفحه، دسترسی موقعیت لازم است. لطفاً GPS را فعال کرده و اجازه دسترسی بدهید.'
                : 'دریافت موقعیت ناموفق بود. لطفاً GPS را روشن کرده و دوباره تلاش کنید.'
            );
            setGpsModalOpen(true);
            resolve(); // reject نکن تا UI هنگ نکند
          },
          { enableHighAccuracy: true, maximumAge: 10_000, timeout: 10_000 }
        );
      });
    } finally {
      setIsLocating(false);
    }
  }

  // ---------- رفتار دکمه اصلی ----------
  const onPrimaryClick = () => {
    if (step === 1) {
      // ورود به استپ 2: الان آدرس گرفته و فقط در اینپوت نمایش داده می‌شود
      userEditedRef.current = false;
      setAddress('');
      setAddressInput('');
      setStep(2);
      return;
    }
    // استپ 2: ذخیره و رفتن به زمان‌بندی
    const value = { lat: pos.lat, lng: pos.lng, address: (addressInput?.trim() || address || '') };
    localStorage.setItem('pakyar_pickup_location', JSON.stringify(value));
    router.push(`/schedule?lat=${pos.lat}&lng=${pos.lng}`);
  };

  const primaryLabel = step === 1 ? 'انتخاب موقعیتِ جمع‌آوری' : 'تأیید و انتخاب بازه‌ی زمانی جمع‌آوری';

  return (
    <main dir="rtl" className="min-h-screen bg-white flex flex-col font-[IRANYekanXFaNum]">
      {/* نقشه با ارتفاع قطعی */}
      <div className="w-full" style={{ height: 'calc(100dvh - 260px)', minHeight: 360 }}>
        <MapClient
          value={pos}
          onChange={(p: LatLng) => {
            setPos(p);
            // هر تغییر روی نقشه، انتخاب را باطل کند
            setStep(1);
            setAddress('');
            setAddressInput('');
            userEditedRef.current = false;
          }}
        />
      </div>

      {/* پنل پایین */}
      <div className="bg-white p-4 pt-3 shadow-[0_-8px_24px_rgba(0,0,0,0.06)]">
        <div className="mx-auto max-w-md">
          <div className="flex items-center justify-between mb-2">
            <div className="text-xs text-gray-500">آدرس انتخاب‌شده:</div>
            <button
              onClick={requestGeolocation}
              disabled={isLocating}
              className={`text-xs underline ${isLocating ? 'text-gray-400' : 'text-green-600'}`}
            >
              {isLocating ? 'در حال دریافت…' : 'دریافت موقعیت فعلی'}
            </button>
          </div>

          {/* دیگر اینجا آدرس را نمایش نمی‌دهیم—فقط یک‌جا در اینپوت */}
          <div className="text-xs text-gray-400 mb-3">
            {step === 1 ? 'برای مشاهده آدرس، ابتدا موقعیت را انتخاب کنید.' : (loadingAddr ? 'در حال دریافت آدرس…' : '')}
          </div>

          <input
            type="text"
            placeholder={step === 1 ? 'پس از انتخاب موقعیت، آدرس اینجا نمایش داده می‌شود' : 'آدرس را در صورت نیاز ویرایش کنید'}
            value={step === 1 ? '' : addressInput}
            onChange={(e) => { userEditedRef.current = true; setAddressInput(e.target.value); }}
            className="w-full rounded-2xl border border-gray-200 px-3 py-3 text-sm outline-none mb-3"
          />

          <button
            onClick={onPrimaryClick}
            className="w-full bg-green-600 hover:bg-green-700 active:scale-[0.99] text-white rounded-2xl py-3 text-sm font-medium"
            disabled={isLocating || (step === 2 && !((addressInput?.trim()) || address))}
          >
            {primaryLabel}
          </button>
        </div>
      </div>

      {/* مودال GPS */}
      {gpsModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="mx-4 max-w-sm w-full rounded-2xl bg-white p-4 shadow-lg">
            <div className="text-sm text-gray-800 leading-6 mb-4">{gpsErrorText}</div>
            <div className="flex items-center justify-end gap-2">
              <button onClick={() => setGpsModalOpen(false)} className="px-4 py-2 rounded-xl border border-gray-200 text-gray-700 text-sm">بستن</button>
              <button onClick={() => { setGpsModalOpen(false); requestGeolocation(); }} className="px-4 py-2 rounded-xl bg-green-600 text-white text-sm">تلاش مجدد</button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
