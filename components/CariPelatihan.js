"use client";
import { useState } from "react";

export default function CariPelatihan() {
  const [judul, setJudul] = useState("");
  const [hasil, setHasil] = useState([]);

  const handleCari = async () => {
    const res = await fetch("/api/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `
          query($judul: String!) {
            cariPelatihan(judul: $judul) {
              id
              judul
              deskripsi
              tanggal
            }
          }
        `,
        variables: { judul },
      }),
    });

    const data = await res.json();
    setHasil(data.data.cariPelatihan);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">Cari Pelatihan UMKM</h2>
      <input
        type="text"
        value={judul}
        onChange={(e) => setJudul(e.target.value)}
        placeholder="Masukkan judul pelatihan"
        className="border p-2 rounded"
      />
      <button
        onClick={handleCari}
        className="bg-blue-600 text-white px-4 py-2 ml-2 rounded"
      >
        Cari
      </button>

      <ul className="mt-4 space-y-2">
        {hasil.map((item) => (
          <li key={item.id} className="p-3 border rounded shadow">
            <p className="font-bold">{item.judul}</p>
            <p>{item.deskripsi}</p>
            <p className="text-sm text-gray-500">{item.tanggal}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
