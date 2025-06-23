// app/pendaftaran/page.js
export const dynamic = "force-dynamic";
import React from 'react';

async function getData() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/pendaftaran`, {
    cache: 'no-store'
  });

  if (!res.ok) return [];

  return res.json();
}

export default async function PendaftaranPage() {
  const data = await getData();

  return (
    <main className="p-6 min-h-screen bg-gradient-to-br from-pink-50 to-purple-100">
      <h1 className="text-2xl font-bold text-center text-pink-600 mb-4">📋 Daftar Peserta Pelatihan</h1>
      {data.length === 0 ? (
        <p className="text-center text-gray-500">Belum ada pendaftaran.</p>
      ) : (
        <ul className="space-y-4 max-w-3xl mx-auto">
          {data.map((p) => (
            <li key={p._id} className="p-4 bg-white rounded shadow border-l-4 border-pink-500">
              <p className="font-semibold text-gray-800">👤 {p.nama} ({p.email})</p>
              <p className="text-sm text-gray-600">📝 Pelatihan ID: {p.pelatihanId}</p>
              <p className="text-xs text-gray-400">🕒 {new Date(p.tanggal).toLocaleString('id-ID')}</p>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
