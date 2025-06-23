'use client';
import { useState } from 'react';

export default function UlasanForm({ onSubmit }) {
  const [komentar, setKomentar] = useState('');
  const [rating, setRating] = useState(5);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (komentar && rating) {
      onSubmit({ komentar, rating });
      setKomentar('');
      setRating(5);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6">
      <h3 className="font-semibold text-gray-700 mb-2">📝 Tulis Ulasan</h3>

      <div className="flex gap-1 mb-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            onClick={() => setRating(star)}
            className={`cursor-pointer text-2xl ${
              star <= rating ? 'text-yellow-400' : 'text-gray-300'
            }`}
          >
            ★
          </span>
        ))}
      </div>

      <textarea
        value={komentar}
        onChange={(e) => setKomentar(e.target.value)}
        className="p-2 border border-pink-500 text-gray-800 rounded w-full mb-2"
        placeholder="Tulis komentar..."
        rows={3}
        required
      />

      <button
        type="submit"
        className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600"
      >
        Kirim Ulasan
      </button>
    </form>
  );
}
