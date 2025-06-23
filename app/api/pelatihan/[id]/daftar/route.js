import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Pendaftaran from '@/models/Pendaftaran';

export async function POST(req, { params }) {
  try {
    await connectDB();
    const { id } = params;
    const { email } = await req.json();

    const pendaftaran = new Pendaftaran({ pelatihanId: id, email });
    await pendaftaran.save();

    return NextResponse.json({ message: 'Berhasil mendaftar', pendaftaran });
  } catch (err) {
    console.error('Error:', err);
    return NextResponse.json({ error: 'Gagal simpan pendaftaran' }, { status: 500 });
  }
}
