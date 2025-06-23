'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function HalamanPelatihan() {
  const [pelatihan, setPelatihan] = useState([]);

  useEffect(() => {
    fetch('/api/pelatihan')
      .then((res) => res.json())
      .then((data) => setPelatihan(data))
      .catch((err) => console.error('Gagal ambil data pelatihan:', err));
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 p-6">
      <h1 className="text-3xl font-bold text-center text-green-700 mb-6">📚 Pelatihan & Pembinaan</h1>

      {pelatihan.length === 0 ? (
        <p className="text-center text-gray-600 italic">Belum ada data pelatihan</p>
      ) : (
        <div className="grid gap-4 max-w-4xl mx-auto">
{pelatihan.map((item, index) => (
  <Link href={`/pelatihan/${item._id}`} key={item._id || index}>
    <div className="bg-white p-4 rounded shadow border-l-4 border-green-400 hover:bg-green-50 transition cursor-pointer">
      <h2 className="text-xl font-semibold text-green-700">{item.nama}</h2>
      <p className="text-sm text-gray-600">🧑‍🏫 {item.penyelenggara}</p>
      <p className="text-sm text-gray-600">📅 {new Date(item.tanggal).toLocaleDateString()}</p>
    </div>
  </Link>
))}
        </div>
      )}
    </main>
  );
}