'use client';
import DOMPurify from 'dompurify';
import { useState } from 'react';

export default function UmkmForm() {
  const [nama, setNama] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const cleanNama = DOMPurify.sanitize(nama); // prevent XSS

    await fetch('/api/umkm', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nama: cleanNama }),
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={nama}
        onChange={(e) => setNama(e.target.value)}
        placeholder="Nama UMKM"
      />
      <button type="submit">Simpan</button>
    </form>
  );
}
