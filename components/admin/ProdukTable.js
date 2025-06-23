'use client';

import { useEffect, useState } from 'react';

export default function ProdukTable() {
  const [produk, setProduk] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/produk')
      .then(res => res.json())
      .then(data => {
        setProduk(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleDelete = async (id) => {
    const konfirmasi = confirm('Yakin ingin menghapus produk ini?');
    if (!konfirmasi) return;

    const res = await fetch('/api/produk', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });

    if (res.ok) {
      setProduk(prev => prev.filter(item => item._id !== id));
    }
  };

  if (loading) return <p className="p-4">Memuat data produk...</p>;

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border text-sm rounded-lg overflow-hidden shadow-md">
        <thead className="bg-pink-500 text-white">
          <tr>
            <th className="p-3 text-left">Nama</th>
            <th className="p-3 text-left">Email Pemilik</th>
            <th className="p-3 text-left">Harga</th>
            <th className="p-3 text-left">Rating</th>
            <th className="p-3 text-left">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {produk.map((item, index) => (
            <tr
              key={item._id}
              className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50 hover:bg-gray-100'}
            >
              <td className="p-3 text-gray-800 font-medium">{item.nama}</td>
              <td className="p-3 text-gray-700">{item.email}</td>
              <td className="p-3 text-gray-700">Rp{item.harga.toLocaleString()}</td>
              <td className="p-3 text-yellow-600 font-semibold">{item.rating || '-'}</td>
              <td className="p-3">
                <button
                  onClick={() => handleDelete(item._id)}
                  className="text-red-600 hover:text-red-800 font-medium"
                >
                  🗑 Hapus
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
