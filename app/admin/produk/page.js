import ProdukTable from '@/components/admin/ProdukTable';
import Link from 'next/link';

export default function KelolaProdukPage() {
  return (
    <main className="p-6 bg-white min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-blue-700">📦 Kelola Produk UMKM</h1>
        <Link
          href="/admin/dashboard"
          className="bg-blue-100 text-blue-700 px-4 py-2 rounded hover:bg-blue-200 text-sm font-medium transition"
        >
          🔙 Kembali ke Dashboard
        </Link>
      </div>

      <ProdukTable />
    </main>
  );
}
