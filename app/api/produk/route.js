// app/api/produk/route.js

import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Produk from '@/models/Produk';
import Ulasan from '@/models/Ulasan';

// ===================
// GET /api/produk
// ===================
export async function GET(req) {
  try {
    await dbConnect();

    const { searchParams } = new URL(req.url);
    const email = searchParams.get('email');
    const filter = email ? { email } : {};

    const produkList = await Produk.find(filter).sort({ createdAt: -1 }).lean();

    const hasil = await Promise.all(
      produkList.map(async (produk) => {
        // Ambil ulasan dari array produk.ulasan
        const ulasanArray = produk.ulasan || [];

        const totalRating = ulasanArray.reduce((sum, u) => sum + (u.rating || 0), 0);
        const rataRating = ulasanArray.length > 0 ? totalRating / ulasanArray.length : 0;

        return {
          ...produk,
          rating: parseFloat(rataRating.toFixed(1)), // max 1 digit desimal
        };
      })
    );

    return NextResponse.json(hasil);
  } catch (error) {
    console.error('[GET /api/produk] Gagal ambil produk:', error);
    return NextResponse.json({ error: 'Gagal mengambil produk' }, { status: 500 });
  }
}

// ===================
// POST /api/produk
// ===================
export async function POST(req) {
  try {
    await dbConnect();
    const body = await req.json();
    const { nama, deskripsi = "", harga, gambar = "", email } = body;

    if (!nama || !harga || !email) {
      return NextResponse.json({ error: "Nama, harga, dan email wajib diisi" }, { status: 400 });
    }

    const hargaNumber = Number(harga);
    if (isNaN(hargaNumber) || hargaNumber <= 0) {
      return NextResponse.json({ error: "Harga harus berupa angka positif" }, { status: 400 });
    }

    const produkBaru = await Produk.create({
      nama: nama.trim(),
      deskripsi: deskripsi.trim(),
      harga: hargaNumber,
      gambar: gambar.trim(),
      email: email.trim(),
    });

    return NextResponse.json(produkBaru);
  } catch (error) {
    console.error("[POST /api/produk] Gagal tambah produk:", error);
    return NextResponse.json({ error: "Gagal tambah produk" }, { status: 500 });
  }
}

// ===================
// DELETE /api/produk
// ===================
export async function DELETE(req) {
  try {
    await dbConnect();
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json({ error: "ID produk wajib dikirim" }, { status: 400 });
    }

    // Hapus produk
    await Produk.findByIdAndDelete(id);

    // Opsional: Hapus juga semua ulasan terkait produk (jika disimpan terpisah)
    await Ulasan.deleteMany({ produkId: id });

    return NextResponse.json({ message: "Produk berhasil dihapus" });
  } catch (error) {
    console.error("[DELETE /api/produk] Gagal hapus produk:", error);
    return NextResponse.json({ error: "Gagal hapus produk" }, { status: 500 });
  }
}
