import dbConnect from '@/lib/mongodb';
import Produk from '@/models/Produk';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    await dbConnect();

    const semuaProduk = await Produk.find();

    const semuaUlasan = [];

    semuaProduk.forEach((produk) => {
      produk.ulasan.forEach((u) => {
        const plain = u.toObject?.() || u;

        semuaUlasan.push({
          _id: plain._id,
          komentar: plain.komentar,
          rating: plain.rating,
          nama: plain.nama?.trim() || 'Anonim', // ✅ pastikan nama tampil kalau ada
          createdAt: plain.createdAt || produk.createdAt || null,
          produkId: produk._id.toString(),
          produkNama: produk.nama,
        });
      });
    });

    return NextResponse.json(semuaUlasan, { status: 200 });
  } catch (err) {
    console.error('❌ GET /api/ulasan error:', err);
    return NextResponse.json({ error: 'Gagal ambil data ulasan.' }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    await dbConnect();
    const { id } = await request.json();

    const produk = await Produk.findOne({ 'ulasan._id': id });

    if (!produk) {
      return NextResponse.json({ error: 'Ulasan tidak ditemukan' }, { status: 404 });
    }

    produk.ulasan = produk.ulasan.filter((u) => u._id.toString() !== id);
    await produk.save();

    return NextResponse.json({ message: 'Ulasan dihapus' }, { status: 200 });
  } catch (err) {
    console.error('❌ Gagal hapus ulasan:', err);
    return NextResponse.json({ error: 'Gagal hapus ulasan' }, { status: 500 });
  }
}
