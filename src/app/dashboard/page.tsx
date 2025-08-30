'use client';

import React from "react";
import { User, Headphones, Smartphone, Newspaper, Store, LifeBuoy } from "lucide-react";

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
  FaUserTag,
  FaHeadphones, 
  FaRegNewspaper, 
  FaLifeRing,
} from "react-icons/fa";
import { useRouter } from "next/navigation";
import BannerSlider from "@/components/BannerSlider";
import HomeActionCard from "@/components/HomeActionCard";


export default function DashboardPage() {
  const router = useRouter();

  // ✅ فقط استایل کارت‌ها رنگی شده؛ چینش/ابعاد همون قبلی می‌مونه
  const tiles = [
    { id: "profile",   title: "پروفایل",          href: "/profile",   Icon: User,       gradient: "from-amber-400 to-orange-500" },
    { id: "education", title: "آموزش‌ها",         href: "/education", Icon: Headphones, gradient: "from-rose-400 to-fuchsia-500" },
    { id: "invite",    title: "معرفی به دوستان",  href: "/invite",    Icon: Smartphone, gradient: "from-cyan-500 to-blue-600" },
    { id: "news",      title: "اخبار",            href: "/news",      Icon: Newspaper,  gradient: "from-teal-600 to-emerald-600" },
    { id: "shop",      title: "امتیاز ها",          href: "",      Icon: Store,      gradient: "from-yellow-300 to-yellow-500" },
    { id: "support",   title: "پشتیبانی",         href: "/support",   Icon: LifeBuoy,   gradient: "from-rose-400 to-red-500" },
  ];
  
  

  return (
    <div className="min-h-screen bg-white pb-24 font-[IRANYekanXFaNum]">
      {/* هدر سبز */}
      <div className="bg-green-600 rounded-b-3xl py-10 px-4 relative">
        <div className="absolute right-4 top-4 text-white">
          <FaBell className="w-5 h-5" />
        </div>
        <div className="flex flex-col items-center mb-8">
          <img src="/logo-pakyar.png" alt="پاکیار" width={200} height={63} />
        </div>
      </div>

      {/* کارت سفید روی هدر سبز */}
      <div className="relative z-10 -mt-12 px-4">
        <div className="bg-white border-[2px] border-green-600 rounded-[32px] px-4 py-2 flex justify-between items-center shadow-[0_0_0_3px_#16a34a]">
          <div className="flex flex-col items-center w-1/2">
            <span className="text-sm text-gray-500 font-bold">اعتبار</span>
           { /* <div className="flex items-center gap-1 font-bold">
             <span>۰</span>
          </div>*/}
          </div>
          <div className="w-px h-8 bg-gray-300" />
          <div className="flex flex-col items-center w-1/2">
            <span className="text-sm text-gray-500 font-bold">نام  کاربر</span>
     
          </div>
        </div>
      </div>

      {/* بنر اسلایدر */}
      <div className="px-4 mt-4 mx-5 mb-0">
        <BannerSlider />
      </div>

      {/* گرید کارت‌ها ـ هم‌شکل عکس اول، ولی رنگی */}
      <section className="px-4 mt-6 mx-5" dir="rtl">
        <div className="grid grid-cols-3 gap-3 sm:gap-4">
          {tiles.map((t) => (
            <HomeActionCard key={t.id} {...t} />
          ))}
        </div>
      </section>

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

// (اختیاری) این Tile دیگه استفاده نمی‌شه، ولی حذفش نکردم که چیزی نشکنه.
// اگر خواستی پاکش کن.
function Tile({ icon, label, onClick }) {
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
  const router = useRouter(); 

  return (
    <nav className="fixed bottom-0 inset-x-0 bg-white shadow">
      <div className="max-w-md mx-auto grid grid-cols-5 text-xs py-2">
        <BottomItem label="باشگاه" icon={<FaGift />} onClick={() => alert("باشگاه")} />
        <BottomItem 
          label="پروفایل" 
          icon={<FaWallet />} 
          onClick={() => router.push("/profile")} 
        />
        <BottomItem label="جمع‌آوری" icon={<FaTruck />} onClick={() => alert("جمع‌آوری")} />
        <BottomItem label="فروشگاه" icon={<FaStore />} onClick={() => alert("فروشگاه")} />
        <BottomItem label="خانه" icon={<FaHome />} active onClick={() => alert("خانه")} />
      </div>
    </nav>
  );
}

function BottomItem({ label, icon, active = false, onClick }) {
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
