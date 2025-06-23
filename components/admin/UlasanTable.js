'use client';

import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

export default function UlasanTable() {
  const [ulasan, setUlasan] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/ulasan')
      .then((res) => res.json())
      .then((data) => {
        const formatted = data.map((item) => ({
          ...item,
          createdAt: item.createdAt ? new Date(item.createdAt) : null,
        }));

        setUlasan(formatted);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: 'Hapus Ulasan?',
      text: 'Tindakan ini tidak bisa dibatalkan.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#e11d48',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Ya, hapus',
      cancelButtonText: 'Batal',
    });

    if (!confirm.isConfirmed) return;

    const res = await fetch('/api/ulasan', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });

    if (res.ok) {
      setUlasan((prev) => prev.filter((u) => u._id !== id));
      Swal.fire({
        icon: 'success',
        title: 'Berhasil',
        text: 'Ulasan berhasil dihapus!',
      });
    } else {
      let errorMessage = 'Terjadi kesalahan.';
      try {
        const contentType = res.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          const error = await res.json();
          errorMessage = error?.error || errorMessage;
        } else {
          const text = await res.text();
          errorMessage = text || errorMessage;
        }
      } catch (err) {
        console.error('❌ Gagal parsing error response:', err);
      }
    
      Swal.fire({
        icon: 'error',
        title: 'Gagal',
        text: errorMessage,
      });
    }
    
  };

  if (loading) return <p className="p-4 text-gray-600">Memuat data ulasan...</p>;
  if (ulasan.length === 0) return <p className="p-4 text-gray-600">Belum ada ulasan yang masuk.</p>;

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border text-sm rounded-lg shadow bg-white">
        <thead className="bg-pink-300 text-gray-800 text-left">
          <tr>
            <th className="p-3">Produk</th>
            <th className="p-3">Nama Pengulas</th>
            <th className="p-3">Komentar</th>
            <th className="p-3">Rating</th>
            <th className="p-3">Tanggal</th>
            <th className="p-3">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {ulasan.map((item, index) => {
            const key = item._id || `${item.produkId}-${index}`;

            return (
              <tr key={key} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
<td className="p-3 text-gray-800 font-medium">
  {item.namaProduk || item.produkId || '❓Tidak Diketahui'}
</td>

                <td className="p-3 text-gray-700">{item.nama || 'Anonim'}</td>
                <td className="p-3 text-gray-600 whitespace-pre-wrap">
                  {item.komentar || '-'}
                </td>
                <td className="p-3 text-yellow-700 font-bold">
                  {[...Array(item.rating)].map((_, i) => (
                    <span key={i}>★</span>
                  ))}{' '}
                  ({item.rating})
                </td>
                <td className="p-3 text-gray-500 text-sm">
                  {item.createdAt
                    ? new Date(item.createdAt).toLocaleString('id-ID', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })
                    : '❌ Tidak Ada'}
                </td>
                <td className="p-3">
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="text-red-600 hover:text-red-800 text-sm font-medium"
                  >
                    🗑 Hapus
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
