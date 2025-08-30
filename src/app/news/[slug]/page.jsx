// app/news/[slug]/page.jsx
import Image from "next/image";
import Link from "next/link";
import { NEWS_ITEMS } from "@/data/news";

export async function generateStaticParams() {
  return NEWS_ITEMS.map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({ params }) {
  const item = NEWS_ITEMS.find((n) => n.slug === params.slug);
  if (!item) return { title: "خبر یافت نشد" };
  return {
    title: `${item.title} | اخبار پاکیار`,
    description: item.excerpt,
    openGraph: { title: item.title, description: item.excerpt, images: [item.image] },
  };
}

export default function NewsDetailPage({ params }) {
  const item = NEWS_ITEMS.find((n) => n.slug === params.slug);
  if (!item) {
    return (
      <main className="mx-auto max-w-3xl px-3 sm:px-4 md:px-6 py-10" dir="rtl">
        <p className="text-neutral-700 dark:text-neutral-300">خبر موردنظر یافت نشد.</p>
        <Link href="/news" className="mt-4 inline-flex text-green-700 dark:text-emerald-400">
          بازگشت به اخبار
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-3xl px-3 sm:px-4 md:px-6 py-6 sm:py-8 md:py-10" dir="rtl">
      <nav className="text-sm text-neutral-600 dark:text-neutral-400">
        <Link href="/news" className="hover:text-neutral-900 dark:hover:text-white">اخبار</Link>
        <span className="mx-2">/</span>
        <span className="text-neutral-900 dark:text-neutral-200">{item.title}</span>
      </nav>

      <h1 className="mt-3 text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
        {item.title}
      </h1>

      <div className="mt-2 flex items-center gap-3 text-xs sm:text-sm text-neutral-600 dark:text-neutral-400">
        <span className="rounded-full border px-2 py-0.5 border-neutral-200 dark:border-neutral-700">{item.tag}</span>
        <time dateTime={item.date}>{new Date(item.date).toLocaleDateString("fa-IR")}</time>
      </div>

      <div className="mt-5 relative w-full h-56 sm:h-72 md:h-80 rounded-3xl overflow-hidden ring-1 ring-black/5 dark:ring-white/10">
        <Image src={item.image} alt={item.title} fill sizes="100vw" className="object-cover" priority />
      </div>

      <article className="prose prose-neutral dark:prose-invert max-w-none mt-6 sm:mt-8 prose-p:leading-8">
        <p className="text-[15px] sm:text-base">{item.content}</p>
      </article>

      <div className="mt-8">
        <Link
          href="/news"
          className="inline-flex items-center gap-2 rounded-2xl border px-4 py-2 text-sm border-neutral-300/70 dark:border-neutral-700/70 hover:bg-neutral-50 dark:hover:bg-neutral-800/40"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
          بازگشت به اخبار
        </Link>
      </div>
    </main>
  );
}
