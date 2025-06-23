// app/api/test-post/route.js
import dbConnect from "@/lib/mongodb";
import Produk from "@/models/Produk";
import { NextResponse } from "next/server";

export async function GET() {
  await dbConnect();
  const dummy = await Produk.create({
    nama: "Kopi Arabika Gayo",
    deskripsi: "Kopi khas Aceh dengan cita rasa kuat.",
    harga: 30000
  });
  return NextResponse.json(dummy);
}
