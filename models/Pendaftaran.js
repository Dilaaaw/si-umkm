// models/Pendaftaran.js
import mongoose from 'mongoose';

const PendaftaranSchema = new mongoose.Schema({
  nama: { type: String, required: true },
  email: { type: String, required: true },
  pelatihanId: { type: String, required: true },
  tanggalDaftar: { type: Date, default: Date.now },
});

export default mongoose.models.Pendaftaran || mongoose.model('Pendaftaran', PendaftaranSchema);
