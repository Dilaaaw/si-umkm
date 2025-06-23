import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Produk from '@/models/Produk';
import Pelatihan from '@/models/Pelatihan';
import Ulasan from '@/models/Ulasan';

export async function GET() {
  try {
    await dbConnect();

    const totalProduk = await Produk.countDocuments();
    const totalPelatihan = await Pelatihan.countDocuments();
    const totalUlasan = await Ulasan.countDocuments();

    const semuaUlasan = await Ulasan.find();
    const totalRating = semuaUlasan.reduce((sum, u) => sum + (u.rating || 0), 0);
    const rataRating = semuaUlasan.length > 0 ? (totalRating / semuaUlasan.length) : 0;

    return NextResponse.json({
      totalProduk,
      totalPelatihan,
      totalUlasan,
      rataRating: Number(rataRating.toFixed(1)),
    });
  } catch (err) {
    console.error('[GET /api/statistik]', err.message);
    return NextResponse.json({ error: 'Gagal mengambil data statistik' }, { status: 500 });
  }
}
