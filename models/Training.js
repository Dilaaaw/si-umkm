import mongoose from 'mongoose';

const PelatihanSchema = new mongoose.Schema({
  judul: { type: String, required: true },
  deskripsi: String,
  tanggal: Date,
  penyelenggara: String,
  peserta: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Pelatihan || mongoose.model('Pelatihan', PelatihanSchema);
