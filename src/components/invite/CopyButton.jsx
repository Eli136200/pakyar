'use client';

import { useState } from 'react';

export default function CopyButton({ text }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // fallback: انتخاب متن انجام شده (باکس کد select-all است)
      alert('برای کپی، کد را انتخاب و Ctrl+C بزنید.');
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      className="inline-flex items-center justify-center rounded-xl border border-green-200 bg-white px-3 py-2 text-sm font-medium text-green-700 hover:bg-green-50"
      aria-label="کپی کد"
      title="کپی کد"
    >
      {copied ? (
        <span className="flex items-center gap-1">
          <CheckIcon /> کپی شد
        </span>
      ) : (
        <span className="flex items-center gap-1">
          <CopyIcon /> کپی
        </span>
      )}
    </button>
  );
}

function CopyIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="9" y="9" width="13" height="13" rx="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}
