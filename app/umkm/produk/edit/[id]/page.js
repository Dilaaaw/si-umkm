'use client';
import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';

export default function EditProdukPage({ params }) {
  const router = useRouter();
  const { id } = use(params); // ✅ pakai use untuk unwrap params

  const [form, setForm] = useState({
    nama: '',
    deskripsi: '',
    harga: '',
    gambar: '',
  });
  const [gambarFile, setGambarFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const fetchProduk = async () => {
      try {
        const res = await fetch(`/api/produk/${id}`);
        if (!res.ok) throw new Error('Gagal ambil produk');
        const data = await res.json();
        setForm(data);
      } catch (err) {
        console.error('Gagal fetch produk:', err);
      }
    };
    fetchProduk();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setGambarFile(file);
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
      console.error(err);
      Swal.fire('Gagal upload', 'Gagal upload gambar ke imgbb', 'error');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/produk/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        await Swal.fire('Berhasil!', 'Produk diperbarui.', 'success');
        router.push('/umkm/produk');
      } else {
        const data = await res.json();
        Swal.fire('Gagal!', data.error || 'Gagal update produk.', 'error');
      }
    } catch (err) {
      console.error(err);
      Swal.fire('Gagal!', 'Kesalahan server.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    const result = await Swal.fire({
      title: 'Yakin?',
      text: 'Produk akan dihapus!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Ya',
      cancelButtonText: 'Batal',
    });

    if (!result.isConfirmed) return;

    try {
      const res = await fetch(`/api/produk/${id}`, { method: 'DELETE' });
      if (res.ok) {
        await Swal.fire('Berhasil!', 'Produk dihapus.', 'success');
        router.push('/umkm/produk');
      } else {
        Swal.fire('Gagal!', 'Tidak bisa menghapus produk.', 'error');
      }
    } catch (err) {
      Swal.fire('Gagal!', 'Kesalahan server.', 'error');
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 py-10 px-4">
      <div className="max-w-xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-6 text-center text-pink-600">✏️ Edit Produk</h1>

        <label className="block text-sm font-medium text-gray-700 mb-1">Nama Produk</label>
        <input
          type="text"
          name="nama"
          placeholder="Contoh: Kue Lapis Legit"
          value={form.nama}
          onChange={handleChange}
          className="w-full p-2 border border-pink-500 rounded mb-4  text-gray-700"
          required
        />

        <label className="block text-sm font-medium text-gray-700 mb-1">Deskripsi</label>
        <textarea
          name="deskripsi"
          placeholder="Deskripsi singkat tentang produk Anda..."
          value={form.deskripsi}
          onChange={handleChange}
          className="w-full p-2 border border-pink-500 rounded mb-4  text-gray-700"
          rows={4}
          required
        />

        <label className="block text-sm font-medium text-gray-700 mb-1">Harga (Rp)</label>
        <input
          type="number"
          name="harga"
          placeholder="Contoh: 15000"
          value={form.harga}
          onChange={handleChange}
          className="w-full p-2 border border-pink-500 rounded mb-4  text-gray-700"
          required
        />

</div>
      {/* Upload Gambar */}
      <div className="mb-4">
  <label className="block mb-1 font-medium">Gambar Produk</label>
  {form.gambar && (
    <img
      src={form.gambar}
      alt="Preview"
      className="w-full p-2 border border-pink-500 rounded mb-4  text-gray-700"
    />
  )}
  </div>
  {/* input file disembunyikan */}
  <input
    id="uploadGambar"
    type="file"
    accept="image/*"
    onChange={handleFileChange}
    className="hidden"
  />
<label className="block text-sm font-medium text-gray-700 mb-1">🖼 Edit Gambar Produk</label>
  {/* label sebagai tombol custom */}
  <label
    htmlFor="uploadGambar"
    className="inline-block bg-pink-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-pink-600 transition mb-2"
    >
    📁 Pilih gambar dari perangkat
  </label>
  <label className="block text-sm font-medium text-gray-700 mb-1">ukuran gambar jangan lebih dari 32mb</label>
{/* Nama file jika ada */}
{gambarFile && (
  <div className="mb-4">
    <p className="text-sm text-gray-700 mb-2">📸 {gambarFile.name}</p>
    <img
      src={URL.createObjectURL(gambarFile)}
      alt="Preview"
      className="w-full h-48 object-cover rounded border"
    />
  </div>
)}



      <div className="flex gap-2">
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="flex-1 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          {loading ? '⏳ Menyimpan...' : '💾 Simpan Perubahan'}
        </button>
        <button
          onClick={handleDelete}
          className="flex-1 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          🗑️ Hapus Produk
        </button>
      </div>
    </main>
  );
}
