'use client';
import ProdukCard from '@/components/ProductCard';
import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import firebaseApp from '@/lib/firebase';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';

export default function ProdukSaya() {
  const [produkList, setProdukList] = useState([]);
  const [user, setUser] = useState(null);
  const [keyword, setKeyword] = useState('');
  const router = useRouter();

  useEffect(() => {
    const auth = getAuth(firebaseApp);
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user?.email) {
        setUser(user);
        try {
          const res = await fetch(`/api/produk?email=${user.email}`, {
            cache: 'no-store',
          });
          if (!res.ok) throw new Error(`HTTP error ${res.status}`);
          const data = await res.json();
          setProdukList(Array.isArray(data) ? data : []);
        } catch (err) {
          console.error('Gagal ambil produk:', err);
          setProdukList([]);
        }
      }
    });
    return () => unsubscribe();
  }, []);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Yakin ingin menghapus produk ini?',
      text: 'Tindakan ini tidak bisa dibatalkan!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#e3342f',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Ya, hapus!',
    });

    if (!result.isConfirmed) return;

    try {
      const res = await fetch(`/api/produk/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setProdukList((prev) => prev.filter((p) => p._id !== id));
        await Swal.fire('Berhasil!', 'Produk dihapus.', 'success');
      } else {
        throw new Error('Gagal menghapus');
      }
    } catch (err) {
      console.error(err);
      await Swal.fire('Error', 'Terjadi kesalahan server', 'error');
    }
  };

  const handleLogout = async () => {
    const auth = getAuth(firebaseApp);
    await signOut(auth);
    router.push('/');
  };

  const produkTersaring = produkList.filter((p) =>
    p.nama.toLowerCase().includes(keyword.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-100 p-6">
      <div className="max-w-6xl mx-auto">

        {/* 🔙 Tombol Kembali dan 🔓 Logout */}
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={() => router.push('/umkm/dashboard')}
            className="text-sm text-pink-600 underline hover:text-pink-800"
          >
            ← Kembali ke Dashboard
          </button>
          <button
            onClick={handleLogout}
            className="text-sm text-red-500 underline hover:text-red-700"
          >
            🔓 Logout
          </button>
        </div>

        {/* 🔍 Input Pencarian */}
        <label className="block text-sm text-gray-600 font-medium mb-1">
          🔍 Cari Produk Saya
        </label>
        <input
          type="text"
          placeholder="Ketik nama produk..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className="w-full p-2 border text-pink-700ko border-gray-300 rounded mb-6"
        />

        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-pink-700">🛍 Produk Saya</h1>
          <Link
            href="/umkm/produk/tambah"
            className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600"
          >
            ➕ Tambah Produk
          </Link>
        </div>

        {produkTersaring.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {produkTersaring.map((p) => (
              <div key={p._id} className="border p-4 rounded shadow bg-white">
                {p.gambar ? (
                  <img
                    src={p.gambar}
                    alt={p.nama}
                    className="w-full h-40 object-cover mb-2 rounded"
                  />
                ) : (
                  <div className="w-full h-40 bg-gray-200 flex items-center justify-center text-gray-400 rounded">
                    Tidak Ada Gambar
                  </div>
                )}

                {/* ⭐ Rata-rata rating */}
                {typeof p.rating === 'number' && (
                  <div className="flex items-center gap-1 mb-2">
                    {[1, 2, 3, 4, 5].map((bintang) => (
                      <span
                        key={bintang}
                        className={`text-lg ${bintang <= Math.round(p.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                      >
                        ★
                      </span>
                    ))}
                    <span className="text-sm text-gray-600 ml-1">({p.rating.toFixed(1)})</span>
                  </div>
                )}

                <h2 className="text-xl font-bold text-gray-800 mb-1">{p.nama}</h2>
                <p className="text-gray-600 text-sm mb-2">{p.deskripsi}</p>
                <p className="text-pink-600 font-semibold text-lg mb-3">
                  Rp {parseInt(p.harga).toLocaleString('id-ID')}
                </p>

                <div className="flex gap-2">
                  <button
                    onClick={() => router.push(`/umkm/produk/edit/${p._id}`)}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                  >
                    ✏️ Edit
                  </button>
                  <button
                    onClick={() => handleDelete(p._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    🗑 Hapus
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">
            {user ? 'Belum ada produk.' : 'Memuat...'}
          </p>
        )}
      </div>
    </main>
  );
}
