'use client';

export default function ProdukCard({ produk }) {
  return (
    <div className="bg-white p-4 border border-gray-300 rounded shadow hover:shadow-lg transition">
      <img
        src={produk.gambar || '/no-image.png'}
        alt={produk.nama}
        className="w-full h-40 object-cover rounded mb-2"
      />
      <h2 className="text-lg font-bold text-blue-800">{produk.nama}</h2>
      <p className="text-sm text-gray-600">{produk.kategori || 'Tanpa Kategori'}</p>
      <p className="text-pink-600 font-semibold mt-1">Rp {produk.harga?.toLocaleString('id-ID')}</p>
    </div>
  );
}
