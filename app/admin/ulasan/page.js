'use client';

import UlasanTable from '@/components/admin/UlasanTable';
import Link from 'next/link';

export default function KelolaUlasanPage() {
  return (
    <main className="p-6 bg-white min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6 border-b pb-4">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-yellow-700 tracking-tight">
          ⭐ Ulasan & Rating Produk
        </h1>
        <Link
          href="/admin/dashboard"
          className="bg-yellow-100 text-yellow-800 px-4 py-2 rounded hover:bg-yellow-200 text-sm font-semibold transition"
        >
          🔙 Kembali ke Dashboard
        </Link>
      </div>

      {/* Tabel Ulasan */}
      <section className="mt-4">
        <UlasanTable />
      </section>
    </main>
  );
}
