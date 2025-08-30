import withPWA from "next-pwa";
import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

/** تنظیمات پایه‌ی نکست برای پروژه‌های بزرگ */
const baseConfig: NextConfig = {
  reactStrictMode: true,

  // جلوگیری از توقف Build روی Render به‌خاطر خطاهای ESLint
  eslint: { ignoreDuringBuilds: true },

  // تنظیمات بین‌المللی (i18n) برای زبان‌ها و دامنه‌ها
  i18n: {
    locales: ["fa", "en"], // زبان‌های پشتیبانی‌شده
    defaultLocale: "fa",    // زبان پیش‌فرض
    domains: [
      {
        domain: "example.com",  // دامنه‌ای که برای سایت استفاده می‌کنی
        defaultLocale: "fa",    // زبان پیش‌فرض در این دامنه
      },
    ],
  },
};

/** خروجی: پیکربندی + PWA (Workbox) */
export default withPWA({
  dest: "public",       // تولید service worker و فایل‌های مرتبط در public
  register: true,       // ثبت خودکار SW
  skipWaiting: true,    // نسخه جدید SW سریع فعال شود
  disable: !isProd,     // فقط در production فعال باشد

  // کش‌های اصلی برای اسکیل مناسب
  runtimeCaching: [
    // HTML/صفحات
    {
      urlPattern: ({ request }) =>
        request.destination === "document" || request.mode === "navigate",
      handler: "NetworkFirst",
      options: {
        cacheName: "html-cache",
        networkTimeoutSeconds: 5,
        expiration: { maxEntries: 50, maxAgeSeconds: 60 * 60 * 24 },
      },
    },
    // استاتیک‌ها (JS/CSS/فونت/عکس/worker)
    {
      urlPattern: ({ request }) =>
        ["style", "script", "worker", "font", "image"].includes(
          request.destination
        ),
      handler: "StaleWhileRevalidate",
      options: {
        cacheName: "static-cache",
        expiration: { maxEntries: 300, maxAgeSeconds: 60 * 60 * 24 * 30 },
      },
    },
    // APIهای GET پروژه (در صورت نیاز مسیر را تغییر بده)
    {
      urlPattern: /\/api\/.*$/i,
      handler: "NetworkFirst",
      method: "GET",
      options: {
        cacheName: "api-cache",
        networkTimeoutSeconds: 5,
        expiration: { maxEntries: 100, maxAgeSeconds: 60 * 10 },
      },
    },
  ],
})(baseConfig);
