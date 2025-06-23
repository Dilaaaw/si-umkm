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
      setHasil(data.cariPelatihan || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mb-6">
<input
  value={query}
  onChange={(e) => setQuery(e.target.value)}
  placeholder="🔍 Cari pelatihan berdasarkan judul..."
  className="flex-1 border p-2 rounded bg-white text-gray-900 placeholder-gray-500"
/>

      <button onClick={handleSearch} className="ml-2 bg-indigo-600 text-white px-4 py-2 rounded">
        Cari
      </button>
      {loading && <p>Loading...</p>}
      {hasil.length > 0 && (
        <ul className="mt-4">
          {hasil.map((p) => (
            <li key={p.id} className="bg-white p-3 rounded shadow mb-2">
              <p className="font-semibold">{p.judul}</p>
              <p>{p.deskripsi}</p>
              <p className="text-sm text-gray-600">{new Date(p.tanggal).toLocaleDateString('id-ID')}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
