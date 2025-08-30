'use client';

import { useMemo, useState, useEffect } from 'react';
import EduCard from '@/components/EduCard';
import { EDUCATION_CATEGORIES, EDUCATION_POSTS } from '@/data/education';
import Link from "next/link";

const Skeleton = () => (
  <div className="animate-pulse rounded-3xl border border-neutral-200/60 dark:border-neutral-800/60 bg-white/60 dark:bg-neutral-900/60 p-3" dir="rtl">
    <div className="h-44 w-full rounded-2xl bg-neutral-200/70 dark:bg-neutral-800/70" />
    <div className="mt-3 h-4 w-3/4 rounded bg-neutral-200/70 dark:bg-neutral-800/70" />
    <div className="mt-2 h-3 w-5/6 rounded bg-neutral-200/70 dark:bg-neutral-800/70" />
  </div>
);

export default function EducationPage() {
  const [activeTab, setActiveTab] = useState('clean-nature');
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 350);
    return () => clearTimeout(t);
  }, []);

  const filtered = useMemo(() => {
    const base = EDUCATION_POSTS.filter(p => p.category === activeTab);
    if (!query.trim()) return base;
    const q = query.trim();
    return base.filter(p =>
      [p.title, p.excerpt, p.categoryLabel].some(v => v?.includes(q))
    );
  }, [activeTab, query]);

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 pb-24 font-[IRANYekanXFaNum]" dir="rtl">
      {/* هدر گرادیانی با بلور */}
      <div className="relative overflow-hidden rounded-b-3xl">
        <div className="absolute inset-0 bg-[radial-gradient(1200px_600px_at_90%_-10%,#22c55e33,transparent),linear-gradient(180deg,#16a34a,#16a34a)]"></div>
        <div className="relative z-10 px-4 py-5 text-white backdrop-blur-sm">
        <Link href="/dashboard" className="text-white/90 text-sm">⟵ بازگشت</Link>

          <h1 className="text-center text-lg font-black tracking-tight">مطالب آموزشی</h1>
          <p className="mt-1 text-center text-white/90 text-xs">
            آموزش‌های کاربردی تفکیک و بازیافت — پاکیار
          </p>

          {/* نوار جستجو */}
          <div className="mt-4 mx-auto max-w-xl">
            <div className="flex items-center gap-2 rounded-2xl bg-white/90 text-neutral-700 px-3 py-2 shadow-inner backdrop-blur">
              <input
                dir="rtl"
                value={query}
                onChange={e => setQuery(e.target.value)}
                className="w-full bg-transparent outline-none text-sm placeholder:text-neutral-400 text-right"
                placeholder="جستجو در عنوان و خلاصه…"
              />
              <span className="text-xs px-2 py-1 rounded-full bg-neutral-100 text-neutral-600">
                جستجو
              </span>
            </div>
          </div>
        </div>

        {/* تب‌های چیپ اسکرول‌پذیر */}
        <div className="relative z-10 -mt-3 px-4 pb-3">
          <div className="flex gap-2 overflow-x-auto no-scrollbar">
            {EDUCATION_CATEGORIES.map((cat) => {
              const active = activeTab === cat.key;
              return (
                <button
                  key={cat.key}
                  onClick={() => setActiveTab(cat.key)}
                  className={`whitespace-nowrap rounded-full border px-4 py-2 text-sm transition
                    ${active
                      ? 'bg-white text-green-700 border-white shadow-sm'
                      : 'bg-white/70 text-neutral-700 border-white/60 hover:bg-white'}
                  `}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* گرید کارت‌ها */}
      <div className="px-4 mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {loading
          ? Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} />)
          : filtered.map((post) => <EduCard key={post.id} post={post} />)
        }
        {!loading && filtered.length === 0 && (
          <div className="col-span-full text-center text-neutral-500 dark:text-neutral-400 py-10">
            نتیجه‌ای یافت نشد.
          </div>
        )}
      </div>
    </div>
  );
}
