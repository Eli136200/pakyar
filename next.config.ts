// next.config.ts

// @ts-ignore → نادیده گرفتن ارور تایپ‌اسکریپت چون next-pwa تعریف type رسمی ندارد
import withPWA from 'next-pwa';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true
};

const config = withPWA({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
});

export default config(nextConfig);
