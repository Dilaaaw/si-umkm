'use client';
import Link from 'next/link';

export default function TrainingCard({ pelatihan }) {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-all space-y-2">
      <h2 className="text-lg font-semibold text-blue-700">{pelatihan.nama}</h2>
      <p className="text-sm text-gray-600">📅 {pelatihan.tanggal}</p>
      <p className="text-sm text-gray-600">🏛️ {pelatihan.penyelenggara}</p>
      <p className="text-sm text-gray-600">📍 {pelatihan.tempat}</p>

      <Link
        href={`/pelatihan/${pelatihan._id}`}
        className="inline-block mt-3 bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded"
      >
        Lihat Detail
      </Link>
    </div>
  );
}
