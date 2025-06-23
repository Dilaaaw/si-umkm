'use client';

import { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import firebaseApp from '@/lib/firebase';
import { useRouter } from 'next/navigation';

export default function TambahProduk() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [form, setForm] = useState({
    nama: '',
    deskripsi: '',
    harga: '',
    gambar: '',
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const auth = getAuth(firebaseApp);
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      if (u) setUser(u);
    });
    return () => unsubscribe();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImagePreview(URL.createObjectURL(file));
    setUploading(true);

    const formData = new FormData();
    formData.append('image', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (data.url) {
        setForm((prev) => ({ ...prev, gambar: data.url }));
      } else {
        throw new Error('Upload gagal');
      }
    } catch (err) {
      console.error('Gagal upload:', err);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      alert('Kamu belum login');
      return;
    }

    const dataToSend = {
      ...form,
      email: user.email,
    };

    console.log("🚀 Data dikirim:", dataToSend);

    setLoading(true);
    try {
      const res = await fetch('/api/produk', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToSend),
      });

      if (res.ok) {
        router.push('/umkm/produk'); // ✅ redirect otomatis
      } else {
        const data = await res.json();
        alert(data.error || 'Gagal menambahkan produk');
      }
    } catch (err) {
      console.error('Tambah produk error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-300 to-purple-100 py-10 px-4">
      <form
        onSubmit={handleSubmit}
        className="relative z-10 max-w-xl mx-auto bg-white shadow-md rounded-lg p-6"
      >
        <h1 className="text-2xl font-bold mb-6 text-center text-pink-600">📦 Tambah Produk Baru</h1>

        <label className="block text-sm font-medium text-gray-700 mb-1">Nama Produk</label>
        <input
          type="text"
          name="nama"
          value={form.nama}
          onChange={handleChange}
          placeholder="Contoh: Kue Lapis Legit"
          className="w-full p-2 border border-pink-500 rounded mb-4 text-gray-700"
          required
        />

        <label className="block text-sm font-medium text-gray-700 mb-1">Deskripsi</label>
        <textarea
          name="deskripsi"
          value={form.deskripsi}
          onChange={handleChange}
          placeholder="Deskripsi singkat tentang produk Anda..."
          rows={4}
          className="w-full p-2 border border-pink-500 rounded mb-4 text-gray-700"
          required
        />

        <label className="block text-sm font-medium text-gray-700 mb-1">Harga (Rp)</label>
        <input
          type="number"
          name="harga"
          value={form.harga}
          onChange={handleChange}
          placeholder="Contoh: 15000"
          className="w-full p-2 border border-pink-500 rounded mb-4 text-gray-700"
          required
        />

        <label className="block text-sm font-medium text-gray-700 mb-1">🖼 Upload Gambar Produk</label>
        <input
          type="file"
          id="gambar"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
        <label
          htmlFor="gambar"
          className="inline-block bg-pink-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-pink-600 transition mb-2"
        >
          📂 Pilih dari perangkat
        </label>
        <label className="block text-sm font-medium text-gray-700 mb-1">Ukuran gambar jangan lebih dari 32MB</label>

        {uploading && <p className="text-sm text-gray-600">Mengunggah gambar...</p>}
        {imagePreview && (
          <img
            src={imagePreview}
            alt="Preview"
            className="mb-4 w-full h-40 object-cover rounded border"
          />
        )}

        <button
          type="submit"
          disabled={loading || uploading}
          className="w-full bg-pink-500 text-white py-2 rounded hover:bg-pink-600 transition"
        >
          {loading ? '⏳ Menyimpan...' : '📥 Tambah Produk'}
        </button>
      </form>
    </main>
  );
}
