'use client';

import { useState } from 'react';
import { gql } from '@apollo/client';
import client from '@/lib/apollo-client';

const CARI_PELATIHAN = gql`
  query CariPelatihan($judul: String!) {
    cariPelatihan(judul: $judul) {
      id
      judul
      deskripsi
      tanggal
    }
  }
`;

export default function SearchPelatihanClient() {
  const [query, setQuery] = useState('');
  const [hasil, setHasil] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const { data } = await client.query({
        query: CARI_PELATIHAN,
        variables: { judul: query },
      });
      setHasil(data?.cariPelatihan || []);
    } catch (err) {
      console.error('❌ Gagal cari pelatihan:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mb-6">
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Cari pelatihan..."
        className="border p-2 rounded w-full sm:w-1/2 text-gray-800"
      />
      <button
        onClick={handleSearch}
        className="ml-2 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
      >
        Cari
      </button>

      {loading && <p className="text-blue-500 mt-2">⏳ Mencari...</p>}

      {hasil.length > 0 && (
        <ul className="mt-4">
          {hasil.map((p) => (
            <li key={p.id} className="bg-white p-3 rounded shadow mb-2 text-gray-800">
              <p className="font-semibold">{p.judul}</p>
              <p>{p.deskripsi}</p>
              <p className="text-sm text-gray-600">
                📅 {new Date(p.tanggal).toLocaleDateString('id-ID')}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
