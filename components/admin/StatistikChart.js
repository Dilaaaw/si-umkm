'use client';

import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

export default function StatistikChart() {
  const [produk, setProduk] = useState([]);
  const [pelatihan, setPelatihan] = useState([]);

  useEffect(() => {
    fetch('/api/statistik/grafik')
      .then(res => res.json())
      .then(data => {
        setProduk(data.produkPerBulan || []);
        setPelatihan(data.pelatihanPerBulan || []);
      });
  }, []);

  const mergedData = Array.from(new Set([...produk.map(p => p.month), ...pelatihan.map(p => p.month)]))
    .sort()
    .map(month => ({
      month,
      produk: produk.find(p => p.month === month)?.total || 0,
      pelatihan: pelatihan.find(p => p.month === month)?.total || 0,
    }));

  return (
    <div className="bg-white p-6 mt-10 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4 text-[#3C486B]">📊 Grafik Pertumbuhan</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={mergedData} margin={{ top: 10, right: 30, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="produk" fill="#845EC2" name="Produk" />
          <Bar dataKey="pelatihan" fill="#FF9671" name="Pelatihan" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
