'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import StatistikChart from '@/components/admin/StatistikChart';

export default function StatistikAdminPage() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('/api/statistik')
      .then((res) => res.json())
      .then(setData);
  }, []);

  if (!data) {
    return (
      <main className="min-h-screen bg-[#F9F7F7] flex items-center justify-center">
        <p className="text-gray-600 text-lg">📡 Memuat statistik...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F9F7F7] p-6 space-y-10">
      {/* Header & Tombol Kembali */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-extrabold text-[#3C486B]">
          📈 Statistik Aplikasi Si-UMKM
        </h1>
        <Link
          href="/admin/dashboard"
          className="bg-[#B0F2B6] text-[#005C4B] px-4 py-2 rounded hover:bg-[#A0EFB5] transition"
        >
          🔙 Kembali ke Dashboard
        </Link>
      </div>

      {/* Kartu Statistik */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatistikCard title="Total Produk" value={data.totalProduk} color="#D5AAFF" />
        <StatistikCard title="Total Pelatihan" value={data.totalPelatihan} color="#FFB3C6" />
        <StatistikCard title="Total Ulasan" value={data.totalUlasan} color="#FFDAC1" />
        <StatistikCard title="Rata-Rata Rating" value={data.rataRating} color="#B5EAD7" />
      </div>

      {/* Grafik */}
      <StatistikChart />
    </main>
  );
}

// Komponen Kartu Statistik
function StatistikCard({ title, value, color }) {
  return (
    <div
      className="rounded-lg p-6 shadow-md text-white"
      style={{ backgroundColor: color }}
    >
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="text-3xl font-bold mt-2">{value}</p>
    </div>
  );
}
