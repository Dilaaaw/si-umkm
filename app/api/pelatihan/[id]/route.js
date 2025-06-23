import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Pelatihan from '@/models/Pelatihan';
import mongoose from 'mongoose';

// ========================
// GET /api/pelatihan/[id]
// ========================
export async function GET(req, context) {
  try {
    await dbConnect();
    const { id } = await context.params; // ✅ gunakan await di params

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: 'ID tidak valid' }, { status: 400 });
    }

    const data = await Pelatihan.findById(id);

    if (!data) {
      return NextResponse.json({ error: 'Pelatihan tidak ditemukan' }, { status: 404 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('[GET /api/pelatihan/[id]]', error);
    return NextResponse.json({ error: 'Gagal mengambil data pelatihan' }, { status: 500 });
  }
}

// ========================
// PUT /api/pelatihan/[id]
// ========================
export async function PUT(req, context) {
  try {
    await dbConnect();
    const { id } = await context.params; // ✅ gunakan await di params

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: 'ID tidak valid' }, { status: 400 });
    }

    const body = await req.json();
    const { nama, penyelenggara, tanggal, tempat, deskripsi } = body;

    const updated = await Pelatihan.findByIdAndUpdate(
      id,
      { nama, penyelenggara, tanggal, tempat, deskripsi },
      { new: true }
    );

    if (!updated) {
      return NextResponse.json({ error: 'Pelatihan tidak ditemukan' }, { status: 404 });
    }

    return NextResponse.json(updated);
  } catch (error) {
    console.error('[PUT /api/pelatihan/[id]]', error);
    return NextResponse.json({ error: 'Gagal memperbarui pelatihan' }, { status: 500 });
  }
}
