import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Produk from '@/models/Produk';
import Pelatihan from '@/models/Pelatihan';

function groupByMonth(data) {
  const result = {};

  data.forEach(item => {
    const date = new Date(item.createdAt);
    const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    result[key] = (result[key] || 0) + 1;
  });

  return Object.entries(result).map(([month, total]) => ({ month, total }));
}

export async function GET() {
  try {
    await dbConnect();

    const produkList = await Produk.find({}, 'createdAt');
    const pelatihanList = await Pelatihan.find({}, 'createdAt');

    const produkPerBulan = groupByMonth(produkList);
    const pelatihanPerBulan = groupByMonth(pelatihanList);

    return NextResponse.json({ produkPerBulan, pelatihanPerBulan });
  } catch (err) {
    console.error('[GET /api/statistik/grafik]', err.message);
    return NextResponse.json({ error: 'Gagal ambil data grafik' }, { status: 500 });
  }
}
