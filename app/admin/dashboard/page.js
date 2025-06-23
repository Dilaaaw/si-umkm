'use client';
import Link from 'next/link';

export default function AdminDashboardPage() {
  return (
    <main className="min-h-screen p-6 bg-gray-50">
      <h1 className="text-3xl font-bold text-blue-700 mb-8">Dashboard Admin - Si-UMKM</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <DashboardCard
          title="📦 Kelola Produk"
          description="Moderasi & hapus produk dari pelaku UMKM."
          href="/admin/produk"
        />
        <DashboardCard
          title="⭐ Ulasan & Rating"
          description="Tinjau ulasan & rating yang masuk."
          href="/admin/ulasan"
        />
        <DashboardCard
          title="📚 Program Pelatihan"
          description="Kelola pelatihan & program pembinaan."
          href="/admin/pelatihan"
        />
        <DashboardCard
          title="📊 Statistik UMKM"
          description="Pantau data statistik keseluruhan sistem."
          href="/admin/statistik"
        />
      </div>
    </main>
  );
}

function DashboardCard({ title, description, href }) {
  return (
    <Link href={href}>
      <div className="bg-white border rounded-2xl p-6 shadow-md hover:shadow-lg transition cursor-pointer hover:bg-blue-50">
        <h2 className="text-xl font-semibold text-blue-800 mb-2">{title}</h2>
        <p className="text-gray-600">{description}</p>
      </div>
    </Link>
  );
}
