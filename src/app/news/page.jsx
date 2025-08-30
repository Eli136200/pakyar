// app/news/page.jsx
import Link from "next/link";
import NewsCard from "@/components/NewsCard";
import { NEWS_ITEMS } from "@/data/news";

export const metadata = {
  title: "اخبار پاکیار",
  description: "آخرین اخبار و بروزرسانی‌های اپلیکیشن پاکیار",
};

export default function NewsPage({ searchParams }) {
  const q = (searchParams?.q ?? "").toString().trim();
  const filtered = q
    ? NEWS_ITEMS.filter(
        (n) =>
          (n.title || "").includes(q) ||
          (n.excerpt || "").includes(q)
      )
    : NEWS_ITEMS;

  return (
    <main className="min-h-screen bg-neutral-50 dark:bg-neutral-950" dir="rtl">
      {/* Header like Education, NO categories */}
{/* Header – EXACT like Education */}
<div className="bg-green-600 text-white rounded-b-3xl shadow-[inset_0_-24px_80px_rgba(0,0,0,0.10)]">
  <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-8 pt-6 pb-7 md:pt-7 md:pb-8" dir="rtl">
    {/* top row: back / title / spacer */}
    <div className="flex items-center justify-between">
      <Link
        href="/dashboard"
        className="inline-flex items-center gap-2 text-white/90 hover:text-white text-[13px] md:text-sm"
      >
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
        بازگشت
      </Link>

      {/* title + subhead centered */}
      <div className="text-center">
        <h1 className="font-extrabold tracking-tight text-[20px] sm:text-[22px] md:text-[24px] leading-[1.4]">
          اخبار پاکیار
        </h1>
        <p className="mt-1 text-white/85 text-[12.5px] md:text-[13.5px] leading-[1.8]">
          آموزش‌های کاربردی تفکیک و بازیافت — پاکیار
        </p>
      </div>

      <div className="w-16" /> {/* balance spacer */}
    </div>

    {/* search pill – same size & look */}
{/* search input with inline button like Education */}
<form action="/news" method="GET" className="mt-4 flex justify-center">
  <div className="relative w-full sm:w-[520px]">
    <input
      name="q"
      defaultValue={(searchParams?.q ?? '').toString()}
      placeholder="جستجو در عنوان و خلاصه..."
      className="w-full h-12 rounded-[24px] bg-white/95 text-neutral-800 placeholder:text-neutral-500 shadow-inner pr-4 pl-20
                 focus:outline-none focus:ring-4 focus:ring-white/30"
    />
    <button
      type="submit"
      className="absolute left-2 top-1/2 -translate-y-1/2 h-8 px-4 rounded-full bg-white text-green-700 text-[13px] font-medium shadow-sm hover:bg-neutral-100 transition"
    >
      جستجو
    </button>
  </div>
</form>

  </div>
</div>


      {/* Content */}
      <div className="mx-auto max-w-6xl px-3 sm:px-6 md:px-8 py-6 md:py-8">
        <div className="grid gap-4 sm:gap-5 md:gap-6">
          {filtered.map((item) => (
            <NewsCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </main>
  );
}
