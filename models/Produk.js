import mongoose from 'mongoose';

const UlasanSchema = new mongoose.Schema(
  {
    komentar: String,
    rating: Number,
    nama: String,
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: true }
);

const ProdukSchema = new mongoose.Schema(
  {
    nama: String,
    deskripsi: String,
    harga: Number,
    gambar: String,
    email: String,
    ulasan: [UlasanSchema], // ✅ array of subdocument
  },
  { timestamps: true }
);

export default mongoose.models.Produk || mongoose.model('Produk', ProdukSchema);
