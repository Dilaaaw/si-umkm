import mongoose from 'mongoose';

const mongoose = require('mongoose');
const pendaftarSchema = new mongoose.Schema({
  nama: String,
  email: String,
});
const PelatihanSchema = new mongoose.Schema({
  nama: String,
  penyelenggara: String,
  tanggal: Date,
  tempat: String,
  deskripsi: String,
  pendaftar: [
    {
      nama: String,
      email: String,
    },
  ],
});

module.exports = mongoose.models.Pelatihan || mongoose.model('Pelatihan', PelatihanSchema);
