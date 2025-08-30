"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

function Header() {
  const router = useRouter();
  return (
    <header className="sticky top-0 z-10 bg-green-600 text-white" dir="rtl">
      <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-4">
        <button
          onClick={() => router.back()}
          className="rounded-full p-2 transition hover:bg-white/10"
          aria-label="بازگشت"
        >
          {/* آیکن برگشت (در RTL معکوس) */}
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
               fill="currentColor" className="h-5 w-5 rotate-180">
            <path fillRule="evenodd"
                  d="M7.72 12.53a.75.75 0 0 1 0-1.06l6-6a.75.75 0 1 1 1.06 1.06L9.31 12l5.47 5.47a.75.75 0 1 1-1.06 1.06l-6-6Z"
                  clipRule="evenodd"/>
          </svg>
        </button>
        <h1 className="text-base font-semibold">ارتباط با پشتیبانی</h1>
        <span className="w-9" />
      </div>
    </header>
  );
}

function Card({ title, icon, children }) {
  return (
    <section
      className="rounded-3xl border border-neutral-200/70 bg-white/80 p-4 shadow-[0_8px_24px_rgba(0,0,0,0.06)] backdrop-blur dark:border-neutral-800/60 dark:bg-neutral-900/70"
      dir="rtl"
    >
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-[15px] font-bold text-neutral-800 dark:text-neutral-100">{title}</h2>
        {icon}
      </div>
      {children}
    </section>
  );
}

function Field({ label, as = "input", value, onChange, placeholder, required, rows = 4 }) {
  const common =
    "w-full rounded-2xl border border-neutral-200/70 bg-white px-3 py-3 text-[14px] text-neutral-800 placeholder:text-neutral-400 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-100 dark:border-neutral-800/60 dark:bg-neutral-900/60 dark:text-neutral-100";
  return (
    <div className="space-y-1" dir="rtl">
      {label && <label className="block text-sm text-neutral-600 dark:text-neutral-300">{label}</label>}
      {as === "textarea" ? (
        <textarea className={common} rows={rows} value={value} onChange={onChange} placeholder={placeholder} required={required} />
      ) : (
        <input className={common} value={value} onChange={onChange} placeholder={placeholder} required={required} />
      )}
    </div>
  );
}

export default function SupportPage() {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  const submitTicket = async (e) => {
    e.preventDefault();
    if (!title.trim() || !message.trim()) {
      setToast({ type: "error", msg: "لطفاً عنوان و متن پیام را کامل وارد کنید." });
      return;
    }
    setLoading(true);
    setToast(null);
    try {
      const res = await fetch("/api/support/create-ticket", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: title.trim(), message: message.trim() }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || "ارسال ناموفق بود");
      setToast({ type: "success", msg: "تیکت شما با موفقیت ارسال شد." });
      setTitle("");
      setMessage("");
    } catch (err) {
      setToast({ type: "error", msg: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 pb-24 font-[IRANYekanXFaNum]">
      <Header />

      <main className="mx-auto grid max-w-3xl gap-5 p-4">
        {/* تماس با ما */}
        <Card
          title="تماس با ما"
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                 fill="#2563eb" className="h-5 w-5">
              <path d="M2.25 6.75c0-1.243 1.007-2.25 2.25-2.25h3a2.25 2.25 0 0 1 2.25 2.25v.75a2.25 2.25 0 0 1-2.25 2.25H6.28a.75.75 0 0 0-.53.22l-1.5 1.5a.75.75 0 0 1-1.28-.53V6.75Z" />
              <path d="M21.75 17.25c0 1.243-1.007 2.25-2.25 2.25h-3a2.25 2.25 0 0 1-2.25-2.25v-.75A2.25 2.25 0 0 1 16.5 14.25h1.22a.75.75 0 0 0 .53-.22l1.5-1.5a.75.75 0 0 1 1.28.53v4.14Z" />
            </svg>
          }
        >
          <p className="mb-3 text-[13px] leading-6 text-neutral-600">
            مشتری گرامی، می‌توانید با لمس دکمه زیر مستقیماً با پشتیبانی ما تماس بگیرید.
          </p>
          <a
            href="tel:+989000000000" // ← شماره واقعی را جایگزین کنید
            className="inline-flex w-full items-center justify-center rounded-2xl bg-green-100 px-4 py-3 text-sm font-semibold text-green-700 transition hover:bg-green-200"
          >
            تماس مستقیم
          </a>
        </Card>

        {/* ارسال تیکت */}
        <Card
          title="ارسال تیکت"
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                 fill="#1d4ed8" className="h-5 w-5">
              <path d="M12 3.75a8.25 8.25 0 1 0 8.25 8.25A8.259 8.259 0 0 0 12 3.75Zm.75 4.5a.75.75 0 0 0-1.5 0v3.75a.75.75 0 0 0 .44.68l3 1.35a.75.75 0 1 0 .62-1.36l-2.56-1.15V8.25Z"/>
            </svg>
          }
        >
          <p className="mb-3 text-[13px] leading-6 text-neutral-600">
            برای پیگیری بهتر، می‌توانید پیام خود را به صورت تیکت برای ما ارسال کنید.
          </p>

          <form onSubmit={submitTicket} className="space-y-3">
            <Field
              placeholder="عنوان"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <Field
              as="textarea"
              rows={5}
              placeholder="متن پیام"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-2xl bg-green-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? "در حال ارسال…" : "تایید و ارسال"}
            </button>
          </form>

          <Link
            href="/support/tickets"
            className="mt-3 inline-flex w-full items-center justify-center rounded-2xl bg-green-100 px-4 py-3 text-sm font-semibold text-green-700 transition hover:bg-green-200"
          >
            مشاهده تیکت های ارسالی
          </Link>

          {toast && (
            <div
              className={`mt-3 rounded-xl border px-3 py-2 text-sm ${
                toast.type === "success"
                  ? "border-green-200 bg-green-50 text-green-700"
                  : "border-red-200 bg-red-50 text-red-700"
              }`}
            >
              {toast.msg}
            </div>
          )}
        </Card>
      </main>
    </div>
  );
}
