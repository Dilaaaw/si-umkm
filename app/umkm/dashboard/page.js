'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import firebaseApp from '@/lib/firebase';
import Link from 'next/link';

export default function UmkmDashboard() {
  const [user, setUser] = useState(null);
  const [produk, setProduk] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const auth = getAuth(firebaseApp);
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const email = user.email;
        setUser({ nama: user.displayName || 'UMKM', email });

        // Ambil produk milik user
        const res = await fetch(`/api/produk?umkmEmail=${email}`);
        const data = await res.json();
        setProduk(data || []);
      } else {
        router.push('/login');
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [router]);

  const handleLogout = async () => {
    await signOut(getAuth(firebaseApp));
    router.push('/');
  };

  return (
    <main className="min-h-screen flex flex-col justify-between bg-blue-50">
      {/* Header */}
      <div className="p-6 text-center">
        <h1 className="text-2xl font-bold text-blue-800 mb-1">📦 Si-UMKM</h1>
        <p className="text-sm text-gray-600 mb-4">Selamat Datang, {user?.nama} 👋</p>
        <p className="text-gray-700">
          Kelola produkmu, ikuti pelatihan, dan kembangkan UMKM-mu bersama kami.
        </p>
      </div>

      {/* Konten Tengah */}
      <div className="flex-1 px-4 pb-24">
        {loading ? (
          <p className="text-center text-blue-600">⏳ Memuat produk...</p>
        ) : produk.length === 0 ? (
          <div className="flex flex-col items-center justify-center">
            <img
              src="https://undraw.co/api/illustrations/empty.svg"
              alt="Kosong"
              className="w-64 mb-4"
            />
            <p className="text-gray-500">Belum ada produk yang ditambahkan.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {produk.map((item) => (
              <div key={item._id} className="bg-white rounded shadow p-4">
                <img
                  src={item.gambar || 'https://via.placeholder.com/150'}
                  alt={item.nama}
                  className="w-full h-40 object-cover rounded mb-2"
                />
                <h3 className="text-lg font-semibold text-gray-800">{item.nama}</h3>
                <p className="text-sm text-gray-600">Rp {item.harga?.toLocaleString('id-ID')}</p>
              </div>
            ))}
          </div>
        )}
      </div>
{/* Navbar Bawah */}
<nav className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-md flex justify-around items-center h-16 z-10">
  <Link href="/umkm/produk" className="flex flex-col items-center text-sm text-gray-700 hover:text-blue-600">
    🛍<span className="text-xs">Produk</span>
  </Link>
  <Link href="/umkm/pelatihan" className="flex flex-col items-center text-sm text-gray-700 hover:text-blue-600">
    📘<span className="text-xs">Pelatihan</span>
  </Link>
  <Link href="/umkm/produk/tambah" className="bg-pink-500 text-white px-4 py-2 rounded-full shadow -mt-6 hover:bg-pink-600">
    ➕
  </Link>
  <Link href="/umkm/profile" className="flex flex-col items-center text-sm text-gray-700 hover:text-blue-600">
    👤<span className="text-xs">Profil</span>
  </Link>
  <Link href="/umkm/produk/ulasan" className="flex flex-col items-center text-sm text-gray-700 hover:text-blue-600">
    ⭐<span className="text-xs">Ulasan</span>
  </Link>
</nav>

    </main>
  );
}
