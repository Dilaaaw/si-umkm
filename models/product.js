import mongoose from 'mongoose';

const ProdukSchema = new mongoose.Schema({
  nama: { type: String, required: true },
  deskripsi: String,
  gambar: String,
  harga: Number,
  status: { type: String, default: 'draft' },
  pemilik: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  rating: { type: Number, default: 0 },
  ulasan: [
    {
      nama: String,
      komentar: String,
      nilai: Number,
      tanggal: { type: Date, default: Date.now }
    }
  ],
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Produk || mongoose.model('Produk', ProdukSchema);
