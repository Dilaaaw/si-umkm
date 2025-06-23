'use client';

import { gql, useQuery } from '@apollo/client';
import { useSearchParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import client from '@/lib/apollo-client';

const CARI_PRODUK = gql`
  query CariProduk($keyword: String!) {
    cariProduk(keyword: $keyword) {
      _id
      nama
      harga
      gambar
    }
  }
`;

export default function PencarianProdukPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialKeyword = searchParams.get('keyword') || '';
  const [keyword, setKeyword] = useState(initialKeyword);

  const handleSearch = () => {
    if (keyword.trim()) {
      router.push(`/produk/cari?keyword=${encodeURIComponent(keyword)}`);
    }
  };

  const { data, loading, error, refetch } = useQuery(CARI_PRODUK, {
    variables: { keyword },
    client,
    skip: !keyword,
  });

  // Refetch jika keyword dari URL berubah
  useEffect(() => {
    if (initialKeyword) {
      refetch({ keyword: initialKeyword });
    }
  }, [initialKeyword, refetch]);

  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-100 to-purple-100 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-pink-600 text-center mb-6">
          Hasil Pencarian Produk
        </h1>

        <div className="mb-8 flex gap-2 max-w-md mx-auto">
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

        {loading && <p className="text-center text-gray-500">Memuat hasil...</p>}
        {error && <p className="text-center text-red-500">{error.message}</p>}

        {data?.cariProduk?.length === 0 && (
          <p className="text-center text-gray-500">Tidak ada hasil ditemukan.</p>
        )}

        {data?.cariProduk?.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.cariProduk.map((p) => (
              <div
                key={p._id}
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
                <h2 className="text-xl font-bold text-pink-700">{p.nama}</h2>
                <p className="text-pink-600 font-semibold">
                  Rp {Number(p.harga).toLocaleString('id-ID')}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
