'use client';

import React from 'react'; 
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function PelatihanTable() {
  const [pelatihan, setPelatihan] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  const [form, setForm] = useState({
    nama: '',
    penyelenggara: '',
    tanggal: '',
    tempat: '',
    deskripsi: '',
  });

  const fetchData = async () => {
    const res = await fetch('/api/pelatihan');
    const data = await res.json();
    setPelatihan(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const method = isEditing ? 'PUT' : 'POST';
    const url = isEditing ? `/api/pelatihan/${editId}` : '/api/pelatihan';

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      setForm({ nama: '', penyelenggara: '', tanggal: '', tempat: '', deskripsi: '' });
      setIsEditing(false);
      setEditId(null);
      fetchData();
    }
  };

  const handleEdit = (item) => {
    setForm({
      nama: item.nama,
      penyelenggara: item.penyelenggara,
      tanggal: item.tanggal?.slice(0, 10),
      tempat: item.tempat,
      deskripsi: item.deskripsi || '',
    });
    setEditId(item._id);
    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('Hapus pelatihan ini?')) return;

    const res = await fetch('/api/pelatihan', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });

    if (res.ok) fetchData();
  };

  return (
    <div className="space-y-10 p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-purple-800">
          🎓 Kelola <span className="text-pink-600">Pelatihan</span> dan{' '}
          <span className="text-yellow-500">Program Pembinaan</span>
        </h1>
        <Link
          href="/admin/dashboard"
          className="bg-green-200 text-green-900 px-4 py-2 rounded hover:bg-green-300 text-sm font-semibold transition"
        >
          🔙 Kembali ke Dashboard
        </Link>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-pink-50 p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold text-red-600 mb-4">
          {isEditing ? '✏️ Edit Pelatihan' : '➕ Tambah Pelatihan atau Pembinaan'}
        </h2>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block mb-1 text-sm font-semibold text-purple-700">Nama</label>
            <input
              name="nama"
              value={form.nama}
              onChange={handleChange}
              className="w-full p-2 border border-purple-300 rounded bg-white text-gray-900"
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-semibold text-pink-600">Penyelenggara</label>
            <input
              name="penyelenggara"
              value={form.penyelenggara}
              onChange={handleChange}
              className="w-full p-2 border border-pink-300 rounded bg-white text-gray-900"
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-semibold text-green-700">Tanggal</label>
            <input
              type="date"
              name="tanggal"
              value={form.tanggal}
              onChange={handleChange}
              className="w-full p-2 border border-green-300 rounded bg-white text-gray-900"
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-semibold text-orange-600">Tempat</label>
            <input
              name="tempat"
              value={form.tempat}
              onChange={handleChange}
              className="w-full p-2 border border-orange-300 rounded bg-white text-gray-900"
              required
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block mb-1 text-sm font-semibold text-purple-800">Deskripsi</label>
            <textarea
              name="deskripsi"
              value={form.deskripsi}
              onChange={handleChange}
              placeholder="Contoh: Pelatihan ini bertujuan untuk meningkatkan keterampilan digital pelaku UMKM..."
              rows={4}
              className="w-full p-2 border border-purple-300 rounded bg-white text-gray-900"
            />
          </div>
        </div>

        <button
          type="submit"
          className="mt-6 bg-green-200 text-green-900 font-semibold px-6 py-2 rounded hover:bg-green-300 transition"
        >
          💾 {isEditing ? 'Perbarui' : 'Simpan'} 
        </button>
      </form>

      {/* Table */}
      <div className="overflow-x-auto">
        {loading ? (
          <p className="p-4 text-gray-600">⏳ Memuat data pelatihan...</p>
        ) : (
          <table className="min-w-full border text-sm rounded-lg shadow bg-white">
            <thead className="bg-purple-700 text-white">
              <tr>
                <th className="p-3 text-left">Nama</th>
                <th className="p-3 text-left">Penyelenggara</th>
                <th className="p-3 text-left">Tanggal</th>
                <th className="p-3 text-left">Tempat</th>
                <th className="p-3 text-left">Deskripsi</th>
                <th className="p-3 text-left">Aksi</th>
              </tr>
            </thead>
            <tbody className="text-gray-800">
              {pelatihan.map((item, index) => (
                <React.Fragment key={item._id}>
                  <tr className={index % 2 === 0 ? 'bg-gray-50' : 'bg-gray-100'}>
                    <td className="p-3 font-medium">{item.nama}</td>
                    <td className="p-3">{item.penyelenggara}</td>
                    <td className="p-3">{new Date(item.tanggal).toLocaleDateString('id-ID')}</td>
                    <td className="p-3">{item.tempat}</td>
                    <td className="p-3 whitespace-pre-wrap">{item.deskripsi || '-'}</td>
                    <td className="p-3 space-x-2">
                      <button
                        onClick={() => handleEdit(item)}
                        className="text-blue-600 hover:text-blue-800 text-sm"
                      >
                        ✏️ Edit
                      </button>
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="text-red-600 hover:text-red-800 text-sm"
                      >
                        🗑 Hapus
                      </button>
                    </td>
                  </tr>

                  {/* Pendaftar (jika ada) */}
                  {item.pendaftar?.length > 0 && (
                    <tr className="bg-white border-t">
                      <td colSpan="6" className="p-3">
                        <div className="text-sm font-semibold text-purple-700 mb-1">👥 Pendaftar:</div>
                        <ul className="list-disc pl-5 text-gray-800 space-y-1">
                          {item.pendaftar.map((p, i) => (
                            <li key={i}>
                              <b>{p.nama}</b> – {p.email}
                            </li>
                          ))}
                        </ul>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
