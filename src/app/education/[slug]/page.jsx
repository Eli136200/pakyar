import Image from 'next/image';
import Link from 'next/link';
import { EDUCATION_POSTS } from '@/data/education';

export function generateStaticParams() {
  return EDUCATION_POSTS.map(p => ({ slug: p.slug }));
}

export default function EducationDetailPage({ params }) {
  const post = EDUCATION_POSTS.find(p => p.slug === params.slug);
  if (!post) {
    return (
      <div className="p-6">
        <p>یافت نشد.</p>
        <Link href="/education" className="text-green-700">بازگشت</Link>
      </div>
    );
  }

  return (
<div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 pb-28 font-[IRANYekanXFaNum]" dir="rtl">
      {/* هدر */}
      <div className="relative overflow-hidden rounded-b-3xl">
        <div className="absolute inset-0 bg-[radial-gradient(1200px_600px_at_90%_-10%,#22c55e33,transparent),linear-gradient(180deg,#16a34a,#16a34a)]"></div>
        <div className="relative z-10 flex items-center justify-between px-4 py-4 text-white">
          <Link href="/education" className="text-white/90 text-sm">⟵ بازگشت</Link>
          <h1 className="text-lg font-black">جزئیات</h1>
          <span className="opacity-0">.</span>
        </div>
      </div>

      {/* کارت محتوا */}
      <div className="px-4 ">
        <div className="rounded-3xl border border-neutral-200/60 dark:border-neutral-800/60
                        bg-white/80 dark:bg-neutral-900/70 backdrop-blur-md p-3
                        shadow-[0_10px_30px_-12px_rgba(0,0,0,0.25)]">
          <div className="relative h-48 w-full overflow-hidden rounded-2xl">
            <Image
              src={post.cover}
              alt=""
              fill
              className="object-cover"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent"></div>
            <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between text-xs text-white/90">
              <span className="px-2 py-0.5 rounded-full bg-white/20 backdrop-blur-sm">{post.categoryLabel}</span>
              <span className="rounded-full bg-black/30 px-2 py-0.5">{post.dateFa}</span>
            </div>
          </div>

       

          <h2 className="mt-3 text-[18px] font-extrabold text-neutral-900 dark:text-neutral-100 leading-8">
            {post.title}
          </h2>

          <article className="prose prose-sm max-w-none prose-p:leading-7
                              prose-headings:font-bold prose-headings:text-neutral-900
                              prose-p:text-neutral-800 dark:prose-p:text-neutral-200
                              dark:prose-headings:text-neutral-100" dir="rtl">
            {post.content.map((p, i) => (
              <p key={i} className="mt-3">{p}</p>
            ))}
            <h3 className="mt-6">نکات کلیدی</h3>
            <ul className="list-disc mr-5">
              <li>تفکیک درست = افزایش کیفیت بازیافت</li>
              <li>حذف آلودگی‌ها قبل از تحویل</li>
              <li>تحویل به مراکز مجاز برای پسماندهای خاص</li>
            </ul>
          </article>
        </div>
      </div>
    </div>
  );
}
