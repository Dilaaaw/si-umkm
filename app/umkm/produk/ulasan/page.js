'use client';
import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import firebaseApp from '@/lib/firebase';

export default function UlasanPage() {
  const [ulasan, setUlasan] = useState([]);
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    const auth = getAuth(firebaseApp);
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user?.email) {
        setUserEmail(user.email);
        try {
          const res = await fetch(`/api/ulasan`);
          if (!res.ok) throw new Error('Gagal fetch ulasan');
          const data = await res.json();
          const milikSaya = data.filter((u) => u.emailPemilik === user.email);
          setUlasan(milikSaya);
        } catch (err) {
          console.error('❌ Gagal mengambil ulasan:', err);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <main className="p-6 min-h-screen bg-white text-black">
      <h1 className="text-2xl font-bold mb-4 text-pink-600">📝 Ulasan & Rating Produk</h1>
      {ulasan.length === 0 ? (
        <p className="text-gray-500">Belum ada ulasan untuk produk Anda.</p>
      ) : (
        <ul className="space-y-4">
          {ulasan.map((u) => (
            <li key={u.ulasanId} className="p-4 border rounded shadow bg-pink-50 text-black">
              <p className="font-semibold">{u.nama} memberikan rating ⭐ {u.rating}</p>
              <p className="text-gray-600 text-sm italic">Untuk produk: <b>{u.namaProduk}</b></p>
              <p className="text-gray-800 italic mb-2">"{u.komentar}"</p>

              {u.balasan && (
                <p className="mt-2 text-sm text-green-600">
                  ✅ Balasan Anda: {u.balasan}
                </p>
              )}
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
