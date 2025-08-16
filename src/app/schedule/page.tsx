'use client';

import { Suspense } from 'react';
import InnerSchedulePage from './InnerSchedulePage';

export default function Page() {
  return (
    <Suspense fallback={<div className="p-6 text-sm text-gray-500">در حال بارگذاری زمان‌بندی…</div>}>
      <InnerSchedulePage />
    </Suspense>
  );
}
