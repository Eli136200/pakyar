// components/NewsCard.jsx
import Image from "next/image";
import Link from "next/link";

export default function NewsCard({ item }) {
  return (
    <article
      aria-labelledby={`news-${item.id}`}
      className="group relative overflow-hidden rounded-3xl border border-neutral-200/70 dark:border-neutral-800/60 bg-white/80 dark:bg-neutral-900/70 backdrop-blur transition-all 
      shadow-[0_10px_30px_rgba(0,0,0,0.12),0_2px_6px_rgba(0,0,0,0.06)]
      hover:shadow-[0_18px_60px_rgba(0,0,0,0.20),0_6px_18px_rgba(0,0,0,0.12)]
      dark:shadow-[0_10px_30px_rgba(0,0,0,0.45),0_2px_6px_rgba(0,0,0,0.35)]
      hover:dark:shadow-[0_18px_60px_rgba(0,0,0,0.60),0_8px_24px_rgba(0,0,0,0.45)]
      hover:-translate-y-0.5"
      dir="rtl"
    >
      <Link href={`/news/${item.slug}`} className="flex items-stretch gap-4 p-4 md:p-5">
        {/* text */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 text-xs sm:text-[13px] text-neutral-600 dark:text-neutral-400">
            <span className="rounded-full border px-2 py-0.5 border-neutral-200 dark:border-neutral-700">
              {item.tag}
            </span>
            <time className="opacity-70" dateTime={item.date}>
              {new Date(item.date).toLocaleDateString("fa-IR")}
            </time>
          </div>

          <h3
            id={`news-${item.id}`}
            className="mt-2 text-base sm:text-lg md:text-xl font-semibold tracking-[-0.01em] text-neutral-900 dark:text-white line-clamp-2"
          >
            {item.title}
          </h3>

          <p className="mt-1 sm:mt-2 text-[13px] sm:text-sm text-neutral-700/90 dark:text-neutral-300/90 line-clamp-1">
            {item.excerpt}
          </p>

          <div className="mt-3 sm:mt-4 inline-flex items-center gap-2 text-[13px] sm:text-sm text-green-700 dark:text-emerald-400">
            <span className="transition-transform group-hover:translate-x-0.5">مشاهده خبر</span>
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
          </div>
        </div>

        {/* small thumbnail right */}
        <div className="relative w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 shrink-0 rounded-2xl overflow-hidden ring-1 ring-black/5 dark:ring-white/10">
          <Image
            src={item.image}
            fill
            sizes="(max-width: 640px) 8rem, 10rem"
            className="object-cover object-center transition-transform duration-300 group-hover:scale-[1.03]"
          />
        </div>
      </Link>
    </article>
  );
}
