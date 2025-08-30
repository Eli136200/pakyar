'use client';

import CopyButton from '@/components/invite/CopyButton';

export default function InviteCard({ referralCode, onShare }) {
  return (
    <section
      className="relative overflow-hidden rounded-3xl border border-neutral-200 bg-white p-5 sm:p-6 shadow-sm"
      aria-label="دعوت از دوستان"
      dir="rtl"
    >
      {/* المان‌های دکور گرادیانی (بدون تصویر) */}
      <div className="pointer-events-none absolute -top-24 -left-24 h-48 w-48 rounded-full bg-green-100 blur-3xl opacity-60" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-48 w-48 rounded-full bg-emerald-100 blur-3xl opacity-70" />

      {/* لوگو کوچک/آیکن */}
      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-50">
        <svg viewBox="0 0 24 24" className="h-8 w-8 text-green-600" fill="currentColor">
          <path d="M12 2a10 10 0 1 0 10 10A10.011 10.011 0 0 0 12 2Zm1 14h-2v-2h2Zm0-4h-2V6h2Z" />
        </svg>
      </div>

      <h2 className="text-center text-lg sm:text-xl font-bold text-neutral-800">دعوت از دوستان</h2>
      <p className="mt-2 text-center text-sm sm:text-[15px] leading-7 text-neutral-600">
        به راحتی این کد را برای دوستانت ارسال کن تا موقع ثبت نام در اپلیکیشن به عنوان کد معرف ازش استفاده کنند و امتیاز دریافت کنید.
      </p>

      {/* باکس نمایش کد معرف */}
      <div className="mx-auto mt-4 flex max-w-xs items-center gap-2 rounded-2xl bg-green-50 px-4 py-3 text-center">
        <div className="flex-1">
          <div className="select-all text-2xl font-extrabold tracking-widest text-green-700">{referralCode}</div>
        </div>
        <CopyButton text={referralCode} />
      </div>

      {/* دکمه ارسال کد */}
      <div className="mt-4">
        <button
          type="button"
          onClick={onShare}
          className="w-full rounded-2xl bg-green-600 px-4 py-3 text-white font-semibold shadow-sm hover:bg-green-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500"
        >
          ارسال کد به دوستان
        </button>
      </div>
    </section>
  );
}
