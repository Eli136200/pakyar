'use client';

import { Suspense } from 'react';
import InnerLocationPage from './InnerLocationPage';

export default function SelectLocationPage() {
  return (
    <Suspense fallback={<div className="p-6 text-sm text-gray-500">در حال بارگذاری نقشه…</div>}>
      <InnerLocationPage />
    </Suspense>
  );
}
