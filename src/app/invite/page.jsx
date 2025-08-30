'use client';

import { useEffect, useState } from 'react';
import { useRouter } from "next/navigation";
import InviteCard from '@/components/invite/InviteCard';

export default function InvitePage() {
  const router = useRouter();
  const [referralCode, setReferralCode] = useState('9776');
  const [invitedCount, setInvitedCount] = useState(0);

  useEffect(() => {
    // نمونه: اتصال به API شما
  }, []);

  return (
    <main className="min-h-screen bg-neutral-50 pb-16 font-[IRANYekanXFaNum]" dir="rtl">
      {/* هدر سبز */}
      <div className="bg-green-600 text-white relative">
        <div className="mx-auto max-w-screen-xl px-4 py-4 flex items-center justify-center">
          <h1 className="text-lg md:text-xl font-bold">کد معرف</h1>
        </div>

        {/* دکمه بازگشت سمت راست بالا */}
        <button
          onClick={() => router.back()}
          className="absolute top-4 right-4 flex items-center gap-1 text-white hover:underline"
        >
          <span>بازگشت</span>
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      </div>

      {/* بدنه صفحه */}
      <div className="mx-auto max-w-screen-xl px-4 pt-6">
        {/* شمارش کاربران دعوت‌شده */}
        <div className="mx-auto max-w-2xl">
          <div className="flex items-center justify-center gap-3">
            <span className="text-sm text-neutral-600">کاربران دعوت شده</span>
            <span className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-1 text-sm font-medium shadow-sm border border-neutral-200">
              <svg width="16" height="16" viewBox="0 0 24 24" className="text-green-600" fill="currentColor">
                <path d="M12 2a1 1 0 0 1 1 1v1.07A7.002 7.002 0 0 1 19 11v3l1.553 2.33A1 1 0 0 1 19.708 18H4.292a1 1 0 0 1-.845-1.67L5 14v-3a7.002 7.002 0 0 1 6-6.93V3a1 1 0 0 1 1-1Zm0 20a3 3 0 0 1-2.995-2.824L9 19h6a3 3 0 0 1-2.824 2.995L12 22Z"/>
              </svg>
              <b>{invitedCount}</b>
              <span>کاربر</span>
            </span>
          </div>
        </div>

        {/* کارت دعوت */}
        <div className="mt-4 flex justify-center">
          <div className="w-full max-w-xl">
            <InviteCard
              referralCode={referralCode}
              onShare={() => {
                const text = `سلام! با این کد در پاکیار ثبت‌نام کن و امتیاز بگیر: ${referralCode}`;
                const url = typeof window !== 'undefined' ? window.location.origin : '';
                const shareData = { title: 'پاکیار ♻️', text, url };
                if (navigator.share) {
                  navigator.share(shareData).catch(() => {});
                } else {
                  navigator.clipboard?.writeText(`${text}\n${url}`).then(() => {
                    alert('کد و لینک کپی شد ✅');
                  });
                }
              }}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
