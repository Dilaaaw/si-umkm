// scripts/fixUlasanCreatedAt.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Produk from '../models/Produk.js';

dotenv.config({ path: '.env.local' });

async function run() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Terhubung ke MongoDB');

    const semuaProduk = await Produk.find();

    for (const produk of semuaProduk) {
      let diperbarui = false;

      produk.ulasan = produk.ulasan.map((u) => {
        if (!u.createdAt) {
          u.createdAt = new Date(); // default ke sekarang
          diperbarui = true;
        }
        return u;
      });

      if (diperbarui) {
        await produk.save();
        console.log(`🛠 Ulasan diperbarui untuk produk: ${produk.nama}`);
      }
    }

    console.log('✅ Selesai memperbaiki ulasan.');
    process.exit(0);
  } catch (err) {
    console.error('❌ Gagal:', err);
    process.exit(1);
  }
}

run();
