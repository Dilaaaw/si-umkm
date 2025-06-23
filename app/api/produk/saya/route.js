// app/api/produk/saya/route.js
import dbConnect from "@/lib/mongodb";
import Produk from "@/models/Produk";
import { NextResponse } from "next/server";
import { getAuth } from "firebase-admin/auth";
import { getFirebaseAdmin } from "@/lib/firebaseAdmin"; // Ganti ini ✅

export async function GET(req) {
  try {
    await dbConnect();

    const authHeader = req.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Token tidak ditemukan" }, { status: 401 });
    }

    const idToken = authHeader.split(" ")[1];

    // Inisialisasi Firebase Admin hanya saat dibutuhkan ✅
    const admin = getFirebaseAdmin();

    const decoded = await getAuth(admin).verifyIdToken(idToken);

    const produkSaya = await Produk.find({ userId: decoded.uid });

    return NextResponse.json(produkSaya);
  } catch (err) {
    console.error("Error auth/produk:", err);
    return NextResponse.json({ error: "Gagal mengambil produk" }, { status: 500 });
  }
}
