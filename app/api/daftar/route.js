// app/api/daftar/route.js
import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Pendaftaran from '@/models/Pendaftaran';

export async function POST(req) {
  try {
    const { pelatihanId } = await req.json();
    await connectDB();

    const simpan = await Pendaftaran.create({ pelatihan: pelatihanId });

    return NextResponse.json(simpan);
  } catch (err) {
    return NextResponse.json(
      { error: 'Gagal simpan pendaftaran' },
      { status: 500 }
    );
  }
}
