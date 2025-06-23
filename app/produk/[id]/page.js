'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';

export default function DetailProduk() {
  const router = useRouter();
  const { id: produkId } = useParams();

  const [produk, setProduk] = useState(null);
  const [ulasanList, setUlasanList] = useState([]);
  const [komentar, setKomentar] = useState('');
  const [rating, setRating] = useState(5);
  const [nama, setNama] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resProduk = await fetch(`/api/produk/${produkId}`);
        if (!resProduk.ok) throw new Error('Produk tidak ditemukan');
        const dataProduk = await resProduk.json();
        setProduk(dataProduk);

        // Ambil ulasan dari field produk.ulasan
        setUlasanList(dataProduk.ulasan || []);
      } catch (err) {
        console.error('❌ Gagal ambil data produk atau ulasan:', err);
        setProduk(null);
      } finally {
        setLoading(false);
      }
    };

    if (produkId) fetchData();
  }, [produkId]);

  const handleSubmitUlasan = async (e) => {
    e.preventDefault();
    if (!komentar || !rating) return;

    try {
      const res = await fetch(`/api/produk/${produkId}/ulasan`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          komentar: komentar.trim(),
          rating: Number(rating),
          nama: nama.trim(),
        }),
      });

      if (!res.ok) {
        const errText = await res.text();
        throw new Error(errText);
      }

      const newUlasan = await res.json();
      newUlasan.createdAt = newUlasan.createdAt ? new Date(newUlasan.createdAt) : new Date();

      setUlasanList((prev) => [newUlasan, ...prev]);
      setKomentar('');
      setRating(5);
      setNama('');
    } catch (err) {
      alert('❌ Gagal kirim ulasan: ' + err.message);
    }
  };

  if (loading) return <p className="text-center mt-10">⏳ Memuat produk...</p>;
  if (!produk) return <p className="text-center mt-10 text-red-500">Produk tidak ditemukan</p>;

  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-100 p-6">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow">
        <button
          onClick={() => router.push('/produk')}
          className="mb-4 text-pink-600 hover:underline font-medium"
        >
          ← Kembali ke Daftar Produk UMKM
        </button>

        {produk.gambar ? (
          <img src={produk.gambar} alt={produk.nama} className="w-full h-60 object-cover rounded mb-4" />
        ) : (
          <div className="w-full h-60 bg-gray-200 flex items-center justify-center rounded mb-4 text-gray-500">
            Tidak Ada Gambar
          </div>
        )}

        <h1 className="text-2xl font-bold text-pink-700 mb-2">{produk.nama}</h1>
        <p className="text-gray-700 mb-2">{produk.deskripsi}</p>
        <p className="text-pink-600 font-semibold text-lg mb-4">
          Rp {typeof produk.harga === 'number' ? produk.harga.toLocaleString('id-ID') : 'Tidak tersedia'}
        </p>

        <h2 className="text-xl font-bold text-pink-600 mt-6 mb-4">⭐ Ulasan Pelanggan</h2>

        {ulasanList.length === 0 ? (
          <p className="text-gray-500 italic">Belum ada ulasan</p>
        ) : (
          <div className="grid gap-4 mb-8">
            {ulasanList.map((u, i) => (
              <div key={i} className="border border-gray-200 p-4 rounded bg-pink-50 shadow-sm">
                <p className="text-sm text-pink-700 font-semibold mb-1">
                  {u.nama || 'Anonim'} ·{' '}
                  {u.createdAt
                    ? new Date(u.createdAt).toLocaleString('id-ID', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })
                    : '⏱ Baru saja'}
                </p>
                <div className="flex items-center gap-1 mb-1">
                  {[...Array(u.rating)].map((_, j) => (
                    <span key={j} className="text-yellow-400 text-lg">★</span>
                  ))}
                </div>
                <p className="text-gray-700">{u.komentar}</p>
              </div>
            ))}
          </div>
        )}

        <form onSubmit={handleSubmitUlasan} className="bg-pink-50 p-4 rounded shadow">
          <h3 className="font-bold text-gray-700 mb-2">📝 Beri Ulasan Anda</h3>

          <div className="mb-2">
            <label className="text-sm font-medium">Nama (opsional)</label>
            <input
              type="text"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              placeholder="Nama Anda"
              className="w-full p-2 border border-pink-300 rounded mt-1 text-gray-700"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Rating</label>
            <div className="flex space-x-1">
              {[1, 2, 3, 4, 5].map((bintang) => (
                <button
                  type="button"
                  key={bintang}
                  onClick={() => setRating(bintang)}
                  className={`text-2xl ${bintang <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
                >
                  ★
                </button>
              ))}
            </div>
          </div>

          <div className="mt-3">
            <textarea
              value={komentar}
              onChange={(e) => setKomentar(e.target.value)}
              placeholder="Tulis komentar Anda..."
              className="w-full p-2 border border-pink-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-400 text-gray-700"
              rows={3}
              required
            />
          </div>

          <button
            type="submit"
            className="mt-3 bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600"
          >
            Kirim Ulasan
          </button>
        </form>
      </div>
    </main>
  );
}
