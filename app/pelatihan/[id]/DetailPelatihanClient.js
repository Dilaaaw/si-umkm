// ✅ FILE: app/pelatihan/[id]/DetailPelatihanClient.js
'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import firebaseApp from '@/lib/firebase';

export default function DetailPelatihanClient() {
  const { id } = useParams();
  const [pelatihan, setPelatihan] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formVisible, setFormVisible] = useState(false);
  const [form, setForm] = useState({ nama: '', email: '' });

  const csrfToken = Cookies.get('csrfToken');

  useEffect(() => {
    const auth = getAuth(firebaseApp);
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const nama = user.displayName || 'User';
        const email = user.email;
        setUser({ nama, email });
        setForm({ nama, email });
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!id) return;
    fetch(`/api/pelatihan/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error('Gagal ambil data');
        return res.json();
      })
      .then(setPelatihan)
      .catch((err) => console.error('❌ Gagal ambil detail pelatihan:', err))
      .finally(() => setLoading(false));
  }, [id]);

  const handleClickDaftar = () => {
    if (!user) return alert('Silakan login terlebih dahulu!');
    setFormVisible(true);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/pendaftaran', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-csrf-token': csrfToken, // ✅ kirim CSRF token
        },
        body: JSON.stringify({
          pelatihanId: id,
          nama: form.nama,
          email: form.email,
        }),
      });
      if (!res.ok) throw new Error('Gagal simpan pendaftaran');
      alert('✅ Berhasil daftar!');
      setFormVisible(false);
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) return <p className="text-center mt-10 text-blue-600">⏳ Memuat detail pelatihan...</p>;
  if (!pelatihan) return <p className="text-center mt-10 text-red-500">❌ Pelatihan tidak ditemukan</p>;

  return (
    <main className="min-h-screen bg-blue-50 p-6">
      <div className="bg-white p-6 rounded shadow max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-blue-700 mb-4">📚 Detail Pelatihan</h1>

        <h2 className="text-xl font-semibold text-gray-800 mb-2">{pelatihan.nama}</h2>
        <p className="text-base text-gray-700 mb-1">
          📅 <span className="font-semibold text-blue-700">Tanggal:</span>{' '}
          {new Date(pelatihan.tanggal).toLocaleDateString('id-ID')}
        </p>
        <p className="text-base text-gray-700 mb-1">
          🏛️ <span className="font-semibold text-blue-700">Penyelenggara:</span>{' '}
          {pelatihan.penyelenggara}
        </p>
        <p className="text-base text-gray-700 mb-4">
          📍 <span className="font-semibold text-blue-700">Tempat:</span> {pelatihan.tempat}
        </p>

        {pelatihan.deskripsi && (
          <p className="text-gray-700 whitespace-pre-line border-t pt-4 mt-4 text-justify">
            📝 <b>Deskripsi:</b><br />{pelatihan.deskripsi}
          </p>
        )}

        <button
          onClick={handleClickDaftar}
          className="mt-6 bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded transition"
        >
          Daftar Sekarang
        </button>

        {user && formVisible && (
          <form
            onSubmit={handleSubmit}
            className="mt-6 bg-gray-50 p-4 border border-gray-300 rounded shadow space-y-4"
          >
            <h3 className="text-lg font-semibold text-pink-700">📝 Formulir Pendaftaran</h3>
            <div>
              <label className="block text-sm font-medium text-gray-700">Nama</label>
              <input
                type="text"
                name="nama"
                value={form.nama}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
            >
              Kirim Pendaftaran
            </button>
          </form>
        )}
      </div>
    </main>
  );
}
