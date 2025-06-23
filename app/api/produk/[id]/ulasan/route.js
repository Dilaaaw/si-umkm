// app/api/produk/[id]/ulasan/route.js
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Produk from '@/models/Produk';
import mongoose from 'mongoose';

// ✅ POST ulasan baru
export async function POST(req, { params }) {
  try {
    await dbConnect();

    const { id } = params;
    const { komentar, rating, nama } = await req.json();

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: 'ID produk tidak valid' }, { status: 400 });
    }

    if (!komentar || typeof komentar !== 'string' || !rating || typeof rating !== 'number') {
      return NextResponse.json({ error: 'Data tidak valid' }, { status: 400 });
    }

    const produk = await Produk.findById(id);
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
    console.error('POST /api/produk/[id]/ulasan error:', err);
    return NextResponse.json({ error: 'Gagal kirim ulasan' }, { status: 500 });
  }
}

// ✅ GET semua ulasan
export async function GET(_req, { params }) {
  try {
    await dbConnect();

    const { id } = params;

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: 'ID produk tidak valid' }, { status: 400 });
    }

    const produk = await Produk.findById(id);
    if (!produk) {
      return NextResponse.json({ error: 'Produk tidak ditemukan' }, { status: 404 });
    }

    return NextResponse.json(produk.ulasan || [], { status: 200 });
  } catch (err) {
    console.error('GET /api/produk/[id]/ulasan error:', err);
    return NextResponse.json({ error: 'Gagal ambil ulasan' }, { status: 500 });
  }
}
