import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Pelatihan from '@/models/Pelatihan';

export async function GET() {
  try {
    await dbConnect();
    const data = await Pelatihan.find();
    return NextResponse.json(data);
  } catch (error) {
    console.error('[DEBUG GET]', error);
    return NextResponse.json({ error: 'Gagal ambil data debug' }, { status: 500 });
  }
}
