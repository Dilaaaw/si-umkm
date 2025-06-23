// ✅ FILE: app/api/pendaftaran/route.js
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import dbConnect from '@/lib/mongodb';
import Pelatihan from '@/models/Pelatihan';

export async function POST(req) {
  try {
    const cookieStore = cookies();
    const csrfCookie = cookieStore.get('csrfToken')?.value;
    const csrfHeader = req.headers.get('x-csrf-token');

    if (!csrfCookie || !csrfHeader || csrfCookie !== csrfHeader) {
      return NextResponse.json({ error: 'CSRF token tidak valid' }, { status: 403 });
    }

    await dbConnect();
    const { pelatihanId, nama, email } = await req.json();

    if (!pelatihanId || !nama || !email) {
      return NextResponse.json({ error: 'Data tidak lengkap' }, { status: 400 });
    }

    const pelatihan = await Pelatihan.findById(pelatihanId);
    if (!pelatihan) {
      return NextResponse.json({ error: 'Pelatihan tidak ditemukan' }, { status: 404 });
    }

    pelatihan.pendaftar.push({ nama, email });
    await pelatihan.save();

    return NextResponse.json({ message: 'Pendaftaran berhasil' });
  } catch (error) {
    console.error('[POST /api/pendaftaran]', error);
    return NextResponse.json({ error: 'Gagal mendaftar pelatihan' }, { status: 500 });
  }
}
