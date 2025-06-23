// models/Ulasan.js
import mongoose from 'mongoose';

const ulasanSchema = new mongoose.Schema({
  produkId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Produk',
    required: true,
  },
  komentar: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    default: 5,
  },
  nama: {
    type: String,
    default: 'Anonim',
  },
  createdAt: { type: Date, default: Date.now },
  },
);

export default mongoose.models.Ulasan || mongoose.model('Ulasan', ulasanSchema);
