'use client';

import dynamic from 'next/dynamic';

// ⛔ SSR dimatikan karena komponen ini butuh useEffect, router, dsb.
const DetailPelatihanClient = dynamic(() => import('./DetailPelatihanClient'), {
  ssr: false,
});

export default function Page() {
  return <DetailPelatihanClient />;
}
