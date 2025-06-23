'use client';

import { useEffect, useState } from 'react';

export default function PelatihanTable() {
  const [pelatihan, setPelatihan] = useState([]);
  const [loading, setLoading] = useState(true);

  // Form state
  const [form, setForm] = useState({
    nama: '',
    penyelenggara: '',
    tanggal: '',
    tempat: '',
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

    const res = await fetch('/api/pelatihan', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      setForm({ nama: '', penyelenggara: '', tanggal: '', tempat: '' });
      fetchData(); // refresh data
    }
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
    <div className="space-y-8">

      {/* Form Tambah */}
      <form onSubmit={handleSubmit} className="bg-green-50 p-4 rounded-lg shadow">
        <h2 className="text-lg font-bold text-green-700 mb-4">➕ Tambah Pelatihan</h2>

        <div className="grid gap-3 sm:grid-cols-2">
          <input
            name="nama"
            value={form.nama}
            onChange={handleChange}
            placeholder="Nama Pelatihan"
            className="p-2 border rounded"
            required
          />
          <input
            name="penyelenggara"
            value={form.penyelenggara}
            onChange={handleChange}
            placeholder="Penyelenggara"
            className="p-2 border rounded"
            required
          />
          <input
            name="tanggal"
            type="date"
            value={form.tanggal}
            onChange={handleChange}
            className="p-2 border rounded"
            required
          />
          <input
            name="tempat"
            value={form.tempat}
            onChange={handleChange}
            placeholder="Tempat"
            className="p-2 border rounded"
            required
          />
        </div>

        <button
          type="submit"
          className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Simpan Pelatihan
        </button>
      </form>

      {/* Tabel Pelatihan */}
      <div className="overflow-x-auto">
        {loading ? (
          <p className="p-4">Memuat data pelatihan...</p>
        ) : (
          <table className="min-w-full border text-sm rounded-lg shadow">
            <thead className="bg-green-500 text-white">
              <tr>
                <th className="p-3">Nama</th>
                <th className="p-3">Penyelenggara</th>
                <th className="p-3">Tanggal</th>
                <th className="p-3">Tempat</th>
                <th className="p-3">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {pelatihan.map((item, index) => (
                <tr key={item._id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="p-3 font-medium">{item.nama}</td>
                  <td className="p-3">{item.penyelenggara}</td>
                  <td className="p-3">{new Date(item.tanggal).toLocaleDateString('id-ID')}</td>
                  <td className="p-3">{item.tempat}</td>
                  <td className="p-3">
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      🗑 Hapus
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
