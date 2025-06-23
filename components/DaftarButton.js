// components/DaftarButton.js
'use client';

import { useRouter } from 'next/navigation';

export default function DaftarButton({ pelatihanId }) {
  const router = useRouter();

  const handleDaftar = async () => {
    try {
      const res = await fetch(`/api/daftar`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pelatihanId }),
      });

      if (!res.ok) {
        throw new Error('Gagal simpan pendaftaran');
      }

      router.push('/pendaftaran'); // redirect ke halaman pendaftaran
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <button
      onClick={handleDaftar}
      className="mt-4 bg-pink-600 hover:bg-pink-700 text-white font-semibold px-4 py-2 rounded shadow"
    >
      Daftar Sekarang
    </button>
  );
}
