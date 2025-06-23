// ✅ FILE: middleware.js
import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';
import { nanoid } from 'nanoid';

async function verifyToken(token) {
  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);
    return payload;
  } catch (err) {
    console.error('[JWT Invalid]', err.message);
    return null;
  }
}

export async function middleware(req) {
  const res = NextResponse.next();
  const { pathname } = req.nextUrl;
  const method = req.method;
  const time = new Date().toISOString();
  const url = req.nextUrl.href;

  // 🧾 Logging untuk semua permintaan API
  if (pathname.startsWith('/api')) {
    console.log(`[API] ${time} - ${method} ${url}`);
  }

  // 🔐 Proteksi halaman admin
  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    const token = req.cookies.get('admin-token')?.value;
    if (!token) {
      console.warn('[ADMIN BLOCKED] Token tidak ditemukan. Redirect ke /admin/login');
      return NextResponse.redirect(new URL('/admin/login', req.url));
    }

    const verified = await verifyToken(token);
    if (!verified) {
      console.warn('[ADMIN BLOCKED] Token tidak valid. Redirect ke /admin/login');
      return NextResponse.redirect(new URL('/admin/login', req.url));
    }

    console.log(`[ADMIN ACCESS] ${time} - ${verified.email || 'Admin'} mengakses ${pathname}`);
  }

  // 🛡️ Tambahkan CSRF token ke semua request jika belum ada
  const csrfToken = req.cookies.get('csrfToken')?.value;
  if (!csrfToken) {
    const newToken = nanoid();
    res.cookies.set('csrfToken', newToken, {
      path: '/',
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
    });
    console.log(`[CSRF] Token baru ditambahkan ke cookie: ${newToken}`);
  }

  return res;
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/api/:path*',
  ],
};
