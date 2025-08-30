"use client";
import Link from "next/link";

export default function HomeActionCard({ href, Icon, title, gradient }) {
  return (
    <Link
      href={href}
      className={[
        "rounded-2xl h-28 w-full",
        "bg-gradient-to-br", gradient,
        "shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5 active:translate-y-0",
        "flex flex-col items-center justify-center gap-2",
        "border border-white/20",
      ].join(" ")}
      dir="rtl"
    >
      {/* توخالی اجباری: تمام path های داخل SVG بدون fill و با stroke سفید */}
      <Icon
        className={[
          "w-10 h-10 text-white",
          // به همه‌ی عناصر داخلی SVG اعمال می‌شود:
          "[&_*]:fill-transparent",
          "[&_*]:stroke-current",
          "[&_*]:stroke-[1.5]",
          // اگر جایی fill اجباری داشته باشی، این مهم است:
          "fill-transparent",
          "stroke-current",
        ].join(" ")}
      />

      <span className="text-white text-xs font-medium text-center">
        {title}
      </span>
    </Link>
  );
}
