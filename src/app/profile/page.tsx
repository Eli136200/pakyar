'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';

// DatePicker فقط کلاینت
const DatePicker: any = dynamic(() => import('react-multi-date-picker'), { ssr: false });
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';

type FormState = {
  userType: 'شهروندی' | 'صنفی';
  firstName: string;
  lastName: string;
  gender: '' | 'آقا' | 'خانم';
  birthDateISO: string | null;
  email: string;
  referralCode: string;
  phone: string;
};

const REQUIRED_FIELDS: Array<keyof FormState> = ['firstName', 'lastName', 'gender'];

// تبدیل مقدار DatePicker (جلالی) به ISO (میلادی)
const toISO = (pickerValue: any): string | null => {
  if (!pickerValue) return null;
  try {
    const g: Date | undefined = pickerValue?.toDate?.();
    if (!g || isNaN(g.getTime())) return null;
    return new Date(Date.UTC(g.getFullYear(), g.getMonth(), g.getDate(), 0, 0, 0)).toISOString();
  } catch {
    return null;
  }
};

export default function ProfilePage() {
  const router = useRouter();

  const [formData, setFormData] = useState<FormState>({
    userType: 'شهروندی',
    firstName: '',
    lastName: '',
    gender: '',
    birthDateISO: null,
    email: '',
    referralCode: '',
    phone: '',
  });

  const [birthPickerValue, setBirthPickerValue] = useState<any>(null);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const datepickerRef = useRef<any>(null);

  // بارگذاری شماره از localStorage (صرفاً نمایش)
  useEffect(() => {
    try {
      const raw = localStorage.getItem('user');
      if (!raw) return;
      const u = JSON.parse(raw);
      setFormData((p) => ({ ...p, phone: u?.phone || '' }));
    } catch {}
  }, []);

  // اسکیما ولیدیشن
  const validate = useMemo(
    () => (values: FormState) => {
      const e: Record<string, string> = {};
      REQUIRED_FIELDS.forEach((f) => {
        const v = values[f] as unknown as string;
        if (!v || !String(v).trim()) e[f as string] = 'این فیلد الزامی است.';
      });
      if (values.email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(values.email.trim())) {
        e.email = 'ایمیل معتبر وارد کنید.';
      }
      return e;
    },
    []
  );

  useEffect(() => {
    setErrors(validate(formData));
  }, [formData, validate]);

  const isFormValid = Object.keys(errors).length === 0;

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name } = e.target;
    setTouched((t) => ({ ...t, [name]: true }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setFormData((p) => ({ ...p, [name]: type === 'radio' ? (value as any) : value }));
  };

  const handleBirthChange = (val: any) => {
    setBirthPickerValue(val);
    setFormData((p) => ({ ...p, birthDateISO: toISO(val) }));
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault?.();
    setErrorMsg('');
    setTouched((t) =>
      REQUIRED_FIELDS.reduce((acc, f) => ({ ...acc, [f]: true }), { ...t })
    );
    if (!isFormValid) return;

    setSubmitting(true);
    try {
      const raw = localStorage.getItem('user');
      if (!raw) throw new Error('کاربر یافت نشد. لطفاً ابتدا شماره را ثبت کنید.');
      const user = JSON.parse(raw);
      if (!user?.id) throw new Error('شناسه کاربر نامعتبر است. مجدداً وارد شوید.');

      const res = await fetch('/api/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.id,
          userType: formData.userType,
          firstName: formData.firstName.trim(),
          lastName: formData.lastName.trim(),
          gender: formData.gender,
          birthDate: formData.birthDateISO,
          email: formData.email?.trim() || null,
          referralCode: formData.referralCode?.trim() || null,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data?.success) throw new Error(data?.error || 'خطا در ذخیره پروفایل');

      localStorage.setItem('user', JSON.stringify({ ...user, ...data.user }));
      router.push('/select-location');
    } catch (err: any) {
      setErrorMsg(err?.message || 'مشکلی رخ داد. دوباره تلاش کنید.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div dir="rtl" className="min-h-screen bg-gradient-to-b from-white to-gray-50 font-[IRANYekanXFaNum]">
      {/* هدر */}
      <header className="sticky top-0 z-20 bg-white/85 backdrop-blur border-b">
        <div className="max-w-md mx-auto flex items-center justify-between px-4 h-14">
          <button
            onClick={() => router.back()}
            className="grid place-items-center rounded-full w-9 h-9 border hover:bg-gray-50 active:scale-95 transition"
            aria-label="بازگشت"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" className="rtl:rotate-180">
              <path fill="currentColor" d="M15.54 3.54L7.08 12l8.46 8.46l1.42-1.42L9.92 12l7.04-7.04z"/>
            </svg>
          </button>
          <h1 className="text-base font-bold">پروفایل</h1>
          <span className="w-9" />
        </div>
      </header>

      {/* کارت فرم */}
      <main className="px-4 pb-28">
        <div className="max-w-md mx-auto">
          <div className="bg-white/95 rounded-3xl shadow-[0_10px_30px_-12px_rgba(0,0,0,0.15)] border border-gray-100 p-5 mt-3">
       

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* نوع حساب */}
              <div>
                <label className="block text-xs text-gray-500 mb-2">نوع حساب</label>
                <div className="grid grid-cols-2 gap-2 bg-gray-50 p-1 rounded-2xl border">
                  {(['شهروندی', 'صنفی'] as const).map((t) => (
                    <label
                      key={t}
                      className={`cursor-pointer text-sm text-center rounded-xl py-2 transition
                      ${formData.userType === t ? ' bg-[#00a63e] hover:bg-[#03b345] text-white shadow-sm' : 'text-gray-600 hover:bg-white'}`}
                    >
                      <input
                        type="radio"
                        name="userType"
                        value={t}
                        checked={formData.userType === t}
                        onChange={handleChange}
                        className="hidden"
                      />
                      {t}
                    </label>
                  ))}
                </div>
              </div>

              {/* نام و نام خانوادگی */}
              <div className="grid grid-cols-2 gap-3">
                <Field
                  label="نام"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.firstName && errors.firstName}
                  icon="user"
                />
                <Field
                  label="نام خانوادگی"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.lastName && errors.lastName}
                  icon="user"
                />
              </div>

              {/* جنسیت */}
              <div>
                <label className="block text-xs text-gray-500 mb-2">جنسیت</label>
                <div className={`grid grid-cols-2 gap-2 bg-gray-50 p-1 rounded-2xl border ${touched.gender && errors.gender ? 'border-rose-300' : ''}`}>
                  {(['آقا', 'خانم'] as const).map((g) => (
                    <label
                      key={g}
                      className={`cursor-pointer text-sm text-center rounded-xl py-2 transition
                      ${formData.gender === g ? 'bg-[#00a63e] hover:bg-[#03b345]  text-white shadow-sm' : 'text-gray-600 hover:bg-white'}`}
                    >
                      <input
                        type="radio"
                        name="gender"
                        value={g}
                        checked={formData.gender === g}
                        onChange={handleChange}
                        onBlur={() => setTouched((t) => ({ ...t, gender: true }))}
                        className="hidden"
                      />
                      {g}
                    </label>
                  ))}
                </div>
                {touched.gender && errors.gender && (
                  <p className="text-rose-600 text-[11px] mt-1">{errors.gender}</p>
                )}
              </div>

              {/* تاریخ تولد (جلالی) — نسخه نهایی با آیکنِ قابل کلیک */}
              <div className="space-y-1">
                <label className="text-xs text-gray-500">تاریخ تولد </label>
                <div className="relative z-50">
                  <span
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer"
                    onClick={() => datepickerRef.current?.openCalendar?.()}
                    aria-label="باز کردن تقویم"
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && datepickerRef.current?.openCalendar?.()}
                  >
                    <Icon name="calendar" />
                  </span>

                  <div className="pr-4 pl-9 rounded-2xl border h-12 flex items-center bg-white focus-within:ring-2 focus-within:ring-emerald-500">
                    <DatePicker
                      ref={datepickerRef}
                      value={birthPickerValue}
                      onChange={handleBirthChange}
                      calendar={persian}
                      locale={persian_fa}
                      calendarPosition="bottom-right"
                      editable={false}
                      portal
                      containerStyle={{ width: '100%' }}
                      inputClass="w-full outline-none bg-transparent text-sm cursor-pointer"
                      style={{ width: '100%', background: 'transparent', boxShadow: 'none' }}
                    />
                  </div>
                </div>
              </div>

            

              {/* ایمیل */}
              <Field
                label="ایمیل"
                name="email"
                type="email"
                placeholder="example@mail.com"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.email && errors.email}
                icon="mail"
              />

              {/* کد معرف */}
              <Field
                label="کد معرف (اختیاری)"
                name="referralCode"
                placeholder="در صورت داشتن کد وارد کنید"
                value={formData.referralCode}
                onChange={handleChange}
                icon="tag"
              />

              {errorMsg ? (
                <div className="rounded-xl bg-rose-50 border border-rose-200 p-3 text-rose-700 text-sm">
                  {errorMsg}
                </div>
              ) : null}

              <div className="h-2" />
            </form>
          </div>
        </div>
      </main>

      {/* دکمه ثابت پایین */}
      <div className="fixed bottom-0 inset-x-0 z-20">
        <div className="max-w-md mx-auto px-4 pb-5 pt-3 bg-gradient-to-t from-white/90 to-white/0">
          <button
            onClick={() => handleSubmit()}
            disabled={submitting || !isFormValid}
            className="w-full h-12 rounded-full font-bold text-white
            bg-[#00a63e] hover:bg-[#03b345] active:scale-[0.99]
                       shadow-[0_12px_24px_-8px_rgba(16,185,129,0.6)]
                       disabled:opacity-60 disabled:cursor-not-allowed transition"
          >
            {submitting ? 'در حال ذخیره…' : 'ذخیره اطلاعات و ادامه'}
          </button>
          {!isFormValid && (
            <p className="text-[11px] text-gray-500 text-center mt-2">
              لطفاً فیلدهای ضروری را تکمیل کنید.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

/* -------------------- Components -------------------- */

type FieldProps = {
  label?: string;
  name: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
  disabled?: boolean;
  icon?: 'user' | 'calendar' | 'phone' | 'mail' | 'tag' | undefined;
  helper?: string;
  error?: string | false;
};

function Field({
  label,
  name,
  value,
  onChange,
  onBlur,
  placeholder,
  type = 'text',
  disabled = false,
  icon,
  helper,
  error,
}: FieldProps) {
  return (
    <div className="space-y-1">
      {label ? <label className="text-xs text-gray-500">{label}</label> : null}
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
          <Icon name={icon} />
        </span>
        <input
          type={type}
          name={name}
          value={value || ''}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          disabled={disabled}
          readOnly={disabled} // ← برای جلوگیری از هشدار onChange وقتی disabled است
          className={`w-full rounded-2xl
          border border-gray-300         /* رنگ مرزی در حالت عادی */
          bg-white pr-4 pl-9 h-12 text-sm text-right
          outline-none
          focus:border-[#00A76F]         /* رنگ مرزی در فوکوس */
          focus:ring-2 focus:ring-[#00A76F]/30  /* هالهٔ فوکوس */
          ${disabled ? 'bg-gray-100 text-gray-500 cursor-not-allowed' : ''}
          ${error ? 'border-rose-300 focus:border-rose-500 focus:ring-rose-200' : ''}`}
        />
      </div>
      {error ? <p className="text-[11px] text-rose-600">{error}</p> : null}
      {helper ? <p className="text-[11px] text-gray-500">{helper}</p> : null}
    </div>
  );
}

function Icon({ name }: { name?: string }) {
  const common = { width: 18, height: 18, viewBox: '0 0 24 24', fill: 'currentColor' };
  switch (name) {
    case 'user':
      return (
        <svg {...common}><path d="M12 12a5 5 0 1 0-5-5a5 5 0 0 0 5 5m0 2c-4.42 0-8 2.24-8 5v1h16v-1c0-2.76-3.58-5-8-5"/></svg>
      );
    case 'calendar':
      return (
        <svg {...common}><path d="M19 4h-1V2h-2v2H8V2H6v2H5a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2m0 15H5V10h14z"/></svg>
      );
    case 'phone':
      return (
        <svg {...common}><path d="M20 15.5c-1.25 0-2.45-.2-3.57-.57a1 1 0 0 0-1 .25l-2.2 2.2a15.05 15.05 0 0 1-6.6-6.6l2.2-2.2a1 1 0 0 0 .25-1A11.6 11.6 0 0 1 8.5 4H6a1 1 0 0 0-1 1c0 9.39 7.61 17 17 17a1 1 0 0 0 1-1v-2.5a1 1 0 0 0-1-1z"/></svg>
      );
    case 'mail':
      return (
        <svg {...common}><path d="M20 8v8H4V8l8 5zM4 6h16l-8 5z"/></svg>
      );
    case 'tag':
      return (
        <svg {...common}><path d="M21.41 11.58L12.41 2.58a2 2 0 0 0-1.41-.58H4a2 2 0 0 0-2 2v7a2 2 0 0 0 .59 1.41l9 9a2 2 0 0 0 2.83 0l6-6a2 2 0 0 0-.01-2.83M6.5 7A1.5 1.5 0 1 1 5 5.5A1.5 1.5 0 0 1 6.5 7"/></svg>
      );
    default:
      return <svg {...common}><circle cx="12" cy="12" r="9" /></svg>;
  }
}
