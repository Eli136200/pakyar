'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function EduCard({ post }) {
  return (
    <Link
      href={`/education/${post.slug}`}
      className="group block rounded-3xl border border-neutral-200/60 dark:border-neutral-800/60
                 bg-white/80 dark:bg-neutral-900/70 backdrop-blur-md shadow-[0_10px_30px_-12px_rgba(0,0,0,0.25)]
                 transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_18px_50px_-12px_rgba(0,0,0,0.35)]"
      dir="rtl"
    >
      <div className="p-3">
        <div className="relative h-44 w-full overflow-hidden rounded-2xl">
          <Image
            src={post.cover}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority={false}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
          <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between text-xs text-white/90">
            <span className="px-2 py-0.5 rounded-full bg-white/20 backdrop-blur-sm">
              {post.categoryLabel}
            </span>
            <span className="rounded-full bg-black/30 px-2 py-0.5">{post.dateFa}</span>
          </div>
        </div>

        <h3 className="mt-3 text-[15px] font-extrabold text-neutral-900 dark:text-neutral-100 leading-7 line-clamp-2 text-right">
          {post.title}
        </h3>
        <p className="mt-1 text-[13px] text-neutral-600 dark:text-neutral-300 line-clamp-2 text-right">
          {post.excerpt}
        </p>

        <div className="mt-3 flex items-center gap-2 text-[12px] text-neutral-500 dark:text-neutral-400">
          <span className="inline-flex items-center rounded-full border px-2 py-0.5 border-neutral-200 dark:border-neutral-800">
            {/* قبلاً: {post.readingTime} */}
            جزئیات بیشتر
          </span>
        </div>
      </div>
    </Link>
  );
}
