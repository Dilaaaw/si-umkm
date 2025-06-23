import mongoose from 'mongoose';

const AdminSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// Cegah re-deklarasi model saat hot reload
const Admin = mongoose.models.Admin || mongoose.model('Admin', AdminSchema);

export default Admin;
