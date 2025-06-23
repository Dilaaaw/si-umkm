'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import firebaseApp from '@/lib/firebase';

export default function DaftarPelatihan() {
  const [pelatihanList, setPelatihanList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = getAuth(firebaseApp);
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({
          nama: user.displayName || 'User',
          email: user.email,
        });
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchPelatihan = async () => {
      try {
        const res = await fetch('/api/pelatihan');
        if (!res.ok) throw new Error('Gagal mengambil data pelatihan');
        const data = await res.json();
        setPelatihanList(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPelatihan();
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-indigo-700 mb-8">
          📚 Daftar Pelatihan UMKM
        </h1>

        {loading && (
          <p className="text-center text-gray-500">⏳ Memuat daftar pelatihan...</p>
        )}
        {error && (
          <p className="text-center text-red-500">❌ {error}</p>
        )}
        {!loading && pelatihanList.length === 0 && (
          <p className="text-center text-gray-500">Belum ada pelatihan tersedia.</p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {pelatihanList.map((item) => (
            <div
              key={item._id}
              className="bg-white border border-gray-200 p-4 rounded shadow hover:shadow-lg transition"
            >
              <h2 className="text-xl font-semibold text-indigo-800 mb-1">{item.nama}</h2>
              <p className="text-sm text-gray-600 mb-1">
                📅 {new Date(item.tanggal).toLocaleDateString('id-ID')}
              </p>
              <p className="text-sm text-gray-600 mb-2">🏛️ {item.penyelenggara}</p>
              <p className="text-gray-800 mb-3 line-clamp-3">{item.deskripsi || 'Tidak ada deskripsi.'}</p>
              <Link
                href={`/pelatihan/${item._id}`}
                className="inline-block bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded text-sm font-semibold"
              >
                Lihat Detail
              </Link>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
