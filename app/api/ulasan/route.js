import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Produk from '@/models/Produk';
import mongoose from 'mongoose';

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
          nama: plain.nama || 'Anonim',
          balasan: plain.balasan || '',
          createdAt: plain.createdAt,
          namaProduk: produk.nama,
          produkId: produk._id.toString(),
          emailPemilik: produk.email,
        });
      });
    });

    return NextResponse.json(semuaUlasan, { status: 200 });
  } catch (err) {
    console.error('❌ GET /api/ulasan error:', err);
    return NextResponse.json({ error: 'Gagal ambil data ulasan.' }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    await dbConnect();
    const { id } = await req.json();

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: 'ID ulasan tidak valid' }, { status: 400 });
    }

    // Cari produk yang memiliki ulasan dengan ID ini
    const produk = await Produk.findOne({ 'ulasan._id': id });
    if (!produk) {
      return NextResponse.json({ error: 'Ulasan atau produk tidak ditemukan' }, { status: 404 });
    }

    // Hapus ulasan dari array ulasan produk
    produk.ulasan = produk.ulasan.filter((u) => u._id.toString() !== id);
    await produk.save();

    return NextResponse.json({ message: 'Ulasan berhasil dihapus' }, { status: 200 });
  } catch (err) {
    console.error('❌ DELETE /api/ulasan error:', err);
    return NextResponse.json({ error: 'Terjadi kesalahan saat menghapus ulasan' }, { status: 500 });
  }
}
