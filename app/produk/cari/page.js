import { Suspense } from 'react';
import PencarianProdukClient from './PencarianProdukClient';

export default function Page() {
  return (
    <Suspense fallback={<div>Memuat pencarian...</div>}>
      <PencarianProdukClient />
    </Suspense>
  );
}
