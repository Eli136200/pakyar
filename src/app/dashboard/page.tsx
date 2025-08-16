'use client';

import React from "react";
import {
  FaMobileAlt,
  FaHandHoldingHeart,
  FaTags,
  FaHeadset,
  FaWallet,
  FaFileInvoiceDollar,
  FaGift,
  FaTruck,
  FaStore,
  FaHome,
  FaBell,
} from "react-icons/fa";
import { useRouter } from "next/navigation";
import BannerSlider from "@/components/BannerSlider";


export default function DashboardPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-white pb-24 font-[IRANYekanXFaNum]">
      {/* هدر سبز */}
      <div className="bg-green-600 rounded-b-3xl py-10 px-4 relative">
        <div className="absolute right-4 top-4 text-white">
          <FaBell className="w-5 h-5" />
        </div>
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
            <span className="text-sm text-gray-500">نام یا شماره کاربر</span>
            <span className="font-bold">۰</span>
          </div>
        </div>
      </div>

      {/* بنر اسلایدر */}
      <div className="px-4 mt-4">
        <BannerSlider />
      </div>

      {/* دکمه‌ها */}
      <div className="px-2 mt-8 grid grid-cols-3 gap-2">
        <Tile icon={<FaMobileAlt />} label="معرفی به دوستان" onClick={() => alert("معرفی به دوستان")} />
        <Tile icon={<FaHeadset />} label="آموزش‌ها" onClick={() => alert("آموزش‌ها")} />
        <Tile icon={<FaTags />} label="قیمت پسماند" onClick={() => alert("قیمت پسماند")} />
        <Tile icon={<FaHandHoldingHeart />} label="اخبار شهر" onClick={() => alert("اخبار شهر")} />
        <Tile icon={<FaWallet />} label="فروشگاه" onClick={() => alert("فروشگاه")} />
        <Tile icon={<FaFileInvoiceDollar />} label="پشتیبانی" onClick={() => alert("پشتیبانی")} />
      </div>

      {/* بخش CTA */}
      <div className="p-4 mt-2">
        <div className="flex flex-col items-center text-center px-4 mt-4">
          <h3 className="text-sm font-semibold mb-1">هنوز درخواستی ثبت نکردین</h3>
          <p className="text-xs text-gray-500 mb-3 mt-2">
            کافیه روی دکمه زیر بزنین و بقیه مراحل رو ادامه بدین
          </p>

          <button
            onClick={() => router.push("/select-location")}
            className="inline-flex items-center justify-center bg-green-600 text-white rounded-full px-8 py-3 text-sm font-medium shadow hover:bg-green-700 active:scale-[0.99]"
          >
            ثبت درخواست جمع‌آوری
          </button>
        </div>
      </div>

      {/* فوتر */}
      <BottomNav />
    </div>
  );
}

/* --- Components --- */

function Tile({
  icon,
  label,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-2xl shadow-xl p-3 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-gray-50 transition"
    >
      <div className="text-green-600 text-2xl mb-2">{icon}</div>
      <span className="text-sm">{label}</span>
    </div>
  );
}

function BottomNav() {
  return (
    <nav className="fixed bottom-0 inset-x-0 bg-white shadow">
      <div className="max-w-md mx-auto grid grid-cols-5 text-xs py-2">
        <BottomItem label="باشگاه" icon={<FaGift />} onClick={() => alert("باشگاه")} />
        <BottomItem label="پروفایل" icon={<FaWallet />} onClick={() => alert("پروفایل")} />
        <BottomItem label="جمع‌آوری" icon={<FaTruck />} onClick={() => alert("جمع‌آوری")} />
        <BottomItem label="فروشگاه" icon={<FaStore />} onClick={() => alert("فروشگاه")} />
        <BottomItem label="خانه" icon={<FaHome />} active onClick={() => alert("خانه")} />
      </div>
    </nav>
  );
}

function BottomItem({
  label,
  icon,
  active = false,
  onClick,
}: {
  label: string;
  icon: React.ReactNode;
  active?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center gap-1 ${active ? "text-green-600" : "text-gray-600"}`}
    >
      <div className="grid place-items-center">
        <span className="text-base">{icon}</span>
      </div>
      {label}
    </button>
  );
}
