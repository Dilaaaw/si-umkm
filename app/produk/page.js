'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function SemuaProduk() {
  const [produk, setProduk] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [keyword, setKeyword] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchProduk = async () => {
      try {
        const res = await fetch('/api/produk');
        if (!res.ok) throw new Error('Gagal ambil data produk');
        const data = await res.json();
        if (Array.isArray(data)) {
          setProduk(data);
        } else {
          throw new Error('Data produk tidak valid');
        }
      } catch (err) {
        console.error('Error:', err);
        setError('Gagal memuat produk. Silakan coba lagi.');
      } finally {
        setLoading(false);
      }
    };

    fetchProduk();
  }, []);

  const handleSearch = () => {
    if (keyword.trim()) {
      router.push(`/produk/cari?keyword=${encodeURIComponent(keyword)}`);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-100 to-purple-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* 🔙 Tombol kembali ke halaman utama */}
        <div className="mb-6">
          <Link
            href="/"
            className="text-pink-600 hover:text-pink-800 hover:underline font-semibold"
          >
            ← Kembali ke Halaman Utama
          </Link>
        </div>

        <h1 className="text-3xl font-bold text-center text-pink-600 mb-6">🛍 Produk UMKM</h1>

        {/* 🔍 Form Pencarian */}
        <div className="mb-8 max-w-md mx-auto flex gap-2">
          <input
            type="text"
            placeholder="Cari produk..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="flex-1 p-2 border rounded text-gray-800 bg-white shadow-sm"
          />
          <button
            onClick={handleSearch}
            className="bg-pink-500 text-white font-semibold px-4 py-2 rounded hover:bg-pink-600 transition"
          >
            Cari
          </button>
        </div>

        {/* 🔄 Status Loading/Error/Empty */}
        {loading && <p className="text-center text-gray-500">⏳ Memuat produk...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}
        {!loading && !error && produk.length === 0 && (
          <p className="text-center text-gray-500">Belum ada produk ditambahkan.</p>
        )}

        {/* 🧾 Daftar Produk */}
        {!loading && !error && produk.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {produk.map((p) => (
              <Link
                key={p._id}
                href={`/produk/${p._id}`}
                className="bg-white rounded shadow-md p-4 hover:shadow-lg transition"
              >
                {p.gambar ? (
                  <img
                    src={p.gambar}
                    alt={p.nama}
                    className="w-full h-48 object-cover rounded mb-2"
                  />
                ) : (
                  <div className="w-full h-48 bg-gray-100 flex items-center justify-center text-gray-400 rounded">
                    Tidak Ada Gambar
                  </div>
                )}

                {/* ⭐ Rata-rata rating */}
                <div className="flex items-center gap-1 mb-2">
                  {[1, 2, 3, 4, 5].map((bintang) => (
                    <span
                      key={bintang}
                      className={`text-yellow-400 ${
                        bintang <= Math.round(p.rating || 0) ? '' : 'opacity-20'
                      }`}
                    >
                      ★
                    </span>
                  ))}
                  <span className="text-sm text-gray-600 ml-1">
                    ({(p.rating || 0).toFixed(1)})
                  </span>
                </div>

                <h2 className="text-xl font-bold text-pink-700">{p.nama}</h2>
                <p className="text-gray-700 mb-1">{p.deskripsi}</p>
                <p className="text-pink-600 font-semibold">
                  Rp {Number(p.harga).toLocaleString('id-ID')}
                </p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
