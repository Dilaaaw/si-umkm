// app/api/pelatihan/route.js
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Pelatihan from '@/models/Pelatihan';

// ===================
// GET Semua Pelatihan
// ===================
export async function GET() {
  try {
    await dbConnect();
    const data = await Pelatihan.find().sort({ tanggal: 1 });
    return NextResponse.json(data);
  } catch (error) {
    console.error('[GET /api/pelatihan]', error.message);
    return NextResponse.json({ error: 'Gagal mengambil data pelatihan' }, { status: 500 });
  }
}

// ===================
// POST Tambah Pelatihan Baru
// ===================
export async function POST(req) {
  try {
    await dbConnect();

    const body = await req.json();
    const { nama, penyelenggara, tanggal, tempat, deskripsi } = body;

    if (!nama || !penyelenggara || !tanggal || !tempat) {
      return NextResponse.json({ error: 'Semua field wajib diisi' }, { status: 400 });
    }

    const pelatihanBaru = await Pelatihan.create({
      nama: nama.trim(),
      penyelenggara: penyelenggara.trim(),
      tanggal,
      tempat: tempat.trim(),
      deskripsi: deskripsi?.trim() || '', // ✅ ini pastikan tersimpan
    });

    return NextResponse.json(pelatihanBaru);
  } catch (error) {
    console.error('[POST /api/pelatihan]', error.message);
    return NextResponse.json({ error: 'Gagal tambah pelatihan' }, { status: 500 });
  }
}

  

// ===================
// DELETE Pelatihan
// ===================
export async function DELETE(req) {
  try {
    await dbConnect();
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json({ error: 'ID pelatihan tidak ditemukan' }, { status: 400 });
    }

    await Pelatihan.findByIdAndDelete(id);
    return NextResponse.json({ message: 'Pelatihan berhasil dihapus' });
  } catch (error) {
    console.error('[DELETE /api/pelatihan]', error.message);
    return NextResponse.json({ error: 'Gagal hapus pelatihan' }, { status: 500 });
  }
}
