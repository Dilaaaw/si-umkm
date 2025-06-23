// app/api/ulasan/[id]/balas/route.js
import dbConnect from "@/lib/mongodb";
import Produk from "@/models/Produk";
import { NextResponse } from "next/server";

// PUT /api/ulasan/:id/balas
export async function PUT(req, { params }) {
  await dbConnect();

  const { balasan } = await req.json();
  const ulasanId = params.id;

  if (!balasan || !ulasanId) {
    return NextResponse.json({ error: "Balasan tidak valid" }, { status: 400 });
  }

  try {
    // Cari produk yang memiliki ulasan dengan id ini
    const produk = await Produk.findOne({ "ulasan._id": ulasanId });

    if (!produk) {
      return NextResponse.json({ error: "Ulasan tidak ditemukan" }, { status: 404 });
    }

    // Update balasan di dalam array ulasan
    const ulasanItem = produk.ulasan.id(ulasanId);
    ulasanItem.balasan = balasan;
    await produk.save();

    return NextResponse.json(produk.ulasan); // kirim ulasan terbaru
  } catch (error) {
    console.error("Gagal membalas ulasan:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
