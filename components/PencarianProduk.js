'use client';

import { gql, useQuery } from '@apollo/client';
import client from '@/lib/apollo-client';
import { useState } from 'react';

const CARI_PRODUK = gql`
  query CariProduk($keyword: String!) {
    cariProduk(keyword: $keyword) {
      nama
      harga
    }
  }
`;

export default function PencarianProduk() {
  const [keyword, setKeyword] = useState('');
  const { data, loading, error, refetch } = useQuery(CARI_PRODUK, {
    variables: { keyword },
    skip: !keyword, // hanya query saat ada keyword
  });

  return (
    <div>
      <input
        placeholder="Cari produk..."
        value={keyword}
        onChange={(e) => {
          setKeyword(e.target.value);
          refetch({ keyword: e.target.value });
        }}
      />
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      <ul>
        {data?.cariProduk?.map((p) => (
          <li key={p.nama}>{p.nama} - Rp{p.harga}</li>
        ))}
      </ul>
    </div>
  );
}
