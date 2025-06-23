'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-white via-pink-100 to-purple-100">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-6 py-4 bg-white shadow-md sticky top-0 z-50">
        <div className="text-2xl font-bold text-pink-600">🌸 Si-UMKM</div>
        <div className="flex gap-4">
          <Link href="/produk" className="text-gray-700 hover:text-pink-600 font-medium">
            Produk
          </Link>
          <Link
  href="/admin/login"
  className="text-pink-600 font-semibold hover:underline"
>
  Admin
</Link>

        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex flex-col-reverse lg:flex-row items-center justify-center flex-1 p-6 lg:p-16 gap-10">
        {/* Text Section */}
        <div className="text-center lg:text-left max-w-xl">
          <h1 className="text-4xl lg:text-5xl font-extrabold text-pink-700 mb-4">
            Selamat Datang di Si-UMKM 💼
          </h1>
          <p className="text-gray-700 text-lg mb-6">
            Platform yang membantu pelaku UMKM mendaftarkan produk, mengikuti pelatihan, dan menjangkau lebih banyak pelanggan secara digital.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Link
              href="/login"
              className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 rounded-md text-lg shadow"
            >
              🔐 Login UMKM
            </Link>
            <Link
              href="/produk"
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-md text-lg shadow"
            >
              🛒 Lihat Produk
            </Link>
          </div>
        </div>

        {/* Image Section */}
        <div className="max-w-md w-full">
          <Image
            src="https://cdn-icons-png.flaticon.com/512/3771/3771497.png"
            alt="UMKM"
            width={500}
            height={500}
            className="w-full h-auto"
          />
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center text-gray-500 py-4 text-sm">
        © 2025 Si-UMKM. Dibuat dengan ❤️ untuk pelaku usaha Indonesia.
      </footer>
    </div>
  );
}
