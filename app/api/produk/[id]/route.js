import dbConnect from '@/lib/mongodb';
import Produk from '@/models/Produk';
import { NextResponse } from 'next/server';
import mongoose from 'mongoose';

// Tambah ulasan baru
export async function POST(req, { params }) {
  try {
    await dbConnect();

    const { komentar, rating, nama } = await req.json();
    const produkId = params?.id;

    if (!produkId || !mongoose.Types.ObjectId.isValid(produkId)) {
      return NextResponse.json({ error: 'ID produk tidak valid atau kosong' }, { status: 400 });
    }

    if (!komentar || typeof komentar !== 'string' || !rating || typeof rating !== 'number') {
      return NextResponse.json({ error: 'Data tidak valid' }, { status: 400 });
    }

    const produk = await Produk.findById(produkId);
    if (!produk) {
      return NextResponse.json({ error: 'Produk tidak ditemukan' }, { status: 404 });
    }

    const ulasanBaru = {
      komentar,
      rating,
      nama: nama?.trim() || 'Anonim',
      createdAt: new Date(),
    };

    produk.ulasan.unshift(ulasanBaru);
    await produk.save();

    return NextResponse.json(ulasanBaru, { status: 201 });
  } catch (err) {
    console.error('❌ POST /api/produk/[id]/ulasan error:', err);
    return NextResponse.json({ error: 'Gagal kirim ulasan' }, { status: 500 });
  }
}

// Ambil data produk dan hitung rata-rata rating
export async function GET(req, { params }) {
  try {
    await dbConnect();
    const produkId = params?.id;

    if (!produkId || !mongoose.Types.ObjectId.isValid(produkId)) {
      return NextResponse.json({ error: 'ID produk tidak valid atau kosong' }, { status: 400 });
    }

    const produk = await Produk.findById(produkId);
    if (!produk) {
      return NextResponse.json({ error: 'Produk tidak ditemukan' }, { status: 404 });
    }

    const jumlahRating = produk.ulasan.reduce((total, u) => total + u.rating, 0);
    const rataRating = produk.ulasan.length
      ? jumlahRating / produk.ulasan.length
      : 0;

    const produkObj = produk.toObject();
    produkObj.rating = rataRating;

    return NextResponse.json(produkObj, { status: 200 });
  } catch (err) {
    console.error('❌ GET /api/produk/[id]/ulasan error:', err);
    return NextResponse.json({ error: 'Gagal ambil produk' }, { status: 500 });
  }
}

// Edit data produk
export async function PUT(req, { params }) {
  try {
    await dbConnect();
    const { nama, deskripsi, harga, gambar } = await req.json();

    const produk = await Produk.findByIdAndUpdate(
      params.id,
      { nama, deskripsi, harga, gambar },
      { new: true }
    );

    if (!produk) {
      return NextResponse.json({ error: 'Produk tidak ditemukan' }, { status: 404 });
    }

    return NextResponse.json(produk);
  } catch (error) {
    console.error('❌ PUT /api/produk/[id] error:', error);
    return NextResponse.json({ error: 'Gagal update produk' }, { status: 500 });
  }
}

// Hapus produk
export async function DELETE(req, { params }) {
  try {
    await dbConnect();
    const deleted = await Produk.findByIdAndDelete(params.id);
    if (!deleted) {
      return NextResponse.json({ error: 'Produk tidak ditemukan' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Produk dihapus' });
  } catch (error) {
    console.error('❌ DELETE /api/produk/[id] error:', error);
    return NextResponse.json({ error: 'Gagal hapus produk' }, { status: 500 });
  }
}
