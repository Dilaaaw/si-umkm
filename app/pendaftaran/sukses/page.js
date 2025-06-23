'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function PendaftaranSukses() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/pelatihan'); // redirect kembali setelah 5 detik
    }, 5000);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-100">
      <div className="text-center bg-white p-6 rounded shadow max-w-md">
        <h1 className="text-2xl font-bold text-green-600 mb-2">✅ Pendaftaran Berhasil!</h1>
        <p className="text-gray-700 mb-4">
          Anda telah berhasil mendaftar pelatihan. Kami akan menghubungi Anda melalui email yang Anda gunakan.
        </p>
        <p className="text-sm text-gray-500">
          Anda akan diarahkan kembali ke halaman pelatihan dalam 5 detik...
        </p>
      </div>
    </main>
  );
}
