'use client';

import React from "react";
import {
  FaMobileAlt,
  FaHandHoldingHeart,
  FaTags,
  FaHeadset,
  FaWallet,
  FaFileInvoiceDollar,
} from "react-icons/fa";

// جایگزین موقت BannerSlider
function BannerSliderPlaceholder() {
  return (
    <div className="bg-gray-200 rounded-xl h-32 flex items-center justify-center text-gray-600">
      بنر اسلایدر (تستی)
    </div>
  );
}

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* هدر سبز */}
      <div className="bg-green-600 rounded-b-3xl py-12 px-4 relative">
        <div className="absolute left-4 top-4 bg-white p-2 rounded-xl shadow">🔔</div>
        <div className="flex justify-center">
          <div className="text-white text-3xl font-bold">♻️</div>
        </div>
      </div>

      {/* کارت سفید روی هدر سبز */}
      <div className="relative z-10 -mt-12 px-4">
        <div className="bg-white border-[2px] border-green-600 rounded-[32px] px-4 py-2 flex justify-between items-center shadow-[0_0_0_3px_#16a34a]">
          <div className="flex flex-col items-center w-1/2">
            <span className="text-sm text-gray-500">اعتبار</span>
            <div className="flex items-center gap-1 font-bold">
              <span>۰</span>
              <span className="text-sm text-gray-600">تومان</span>
            </div>
          </div>
          <div className="w-px h-8 bg-gray-300" />
          <div className="flex flex-col items-center w-1/2">
            <span className="text-sm text-gray-500">امتیازات</span>
            <span className="font-bold">۰</span>
          </div>
        </div>
      </div>

      {/* بنر اسلایدر */}
      <div className="px-4 mt-6">
        <BannerSliderPlaceholder />
      </div>

      {/* دکمه‌ها */}
      <div className="px-4 mt-4 grid grid-cols-3 gap-4">

        {/* دکمه 1 - شارژ و اینترنت */}
        <div
          onClick={() => alert("رفتن به صفحه شارژ و اینترنت")}
          className="bg-white rounded-2xl shadow p-4 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-gray-50 transition"
        >
          <FaMobileAlt className="text-green-600 text-2xl mb-2" />
          <span className="text-sm font-medium">شارژ و اینترنت</span>
        </div>

        {/* دکمه 2 - نیکوکاری */}
        <div
          onClick={() => alert("رفتن به صفحه نیکوکاری")}
          className="bg-white rounded-2xl shadow p-4 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-gray-50 transition"
        >
          <FaHandHoldingHeart className="text-green-600 text-2xl mb-2" />
          <span className="text-sm font-medium">اخبار شهر</span>
        </div>

        {/* دکمه 3 - استعلام قیمت */}
        <div
          onClick={() => alert("رفتن به صفحه استعلام قیمت")}
          className="bg-white rounded-2xl shadow p-4 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-gray-50 transition"
        >
          <FaTags className="text-green-600 text-2xl mb-2" />
          <span className="text-sm font-medium">استعلام قیمت</span>
        </div>

        {/* دکمه 4 - پشتیبانی */}
        <div
          onClick={() => alert("رفتن به صفحه پشتیبانی")}
          className="bg-white rounded-2xl shadow p-4 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-gray-50 transition"
        >
          <FaHeadset className="text-green-600 text-2xl mb-2" />
          <span className="text-sm font-medium">پشتیبانی</span>
        </div>

        {/* دکمه 5 - کیف پول */}
        <div
          onClick={() => alert("رفتن به صفحه کیف پول")}
          className="bg-white rounded-2xl shadow p-4 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-gray-50 transition"
        >
          <FaWallet className="text-green-600 text-2xl mb-2" />
          <span className="text-sm font-medium">کیف پول</span>
        </div>

        {/* دکمه 6 - پرداخت قبض */}
        <div
          onClick={() => alert("رفتن به صفحه پرداخت قبض")}
          className="bg-white rounded-2xl shadow p-4 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-gray-50 transition"
        >
          <FaFileInvoiceDollar className="text-green-600 text-2xl mb-2" />
          <span className="text-sm font-medium">پرداخت قبض</span>
        </div>

      </div>

      {/* محتوای پایین‌تر */}
      <div className="p-4">
        <h1 className="text-xl font-bold mb-4">داشبورد پاکیار</h1>
      </div>
    </div>
  );
}
