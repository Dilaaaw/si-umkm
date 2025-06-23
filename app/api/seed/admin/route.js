import dbConnect from '@/lib/mongodb';
import Admin from '@/models/Admin';
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';

export async function GET() {
  await dbConnect();

  const email = 'admin@example.com';
  const password = 'admin123';

  const existing = await Admin.findOne({ email });
  if (existing) {
    return NextResponse.json({ message: 'Admin sudah ada' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const admin = new Admin({ email, password: hashedPassword });
  await admin.save();

  return NextResponse.json({ message: 'Admin berhasil ditambahkan' });
}
