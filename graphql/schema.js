import { buildSchema } from "graphql";

// Schema GraphQL
export const schema = buildSchema(`
  type Produk {
    id: ID!
    nama: String!
    harga: Int!
    deskripsi: String
  }

  type Pelatihan {
    id: ID!
    judul: String!
    deskripsi: String
    tanggal: String
  }

  type Query {
    cariProduk(nama: String!): [Produk]
    cariPelatihan(judul: String!): [Pelatihan]
  }
`);

// Data dummy (biasanya ini dari database)
const produkList = [
  { id: "1", nama: "Keripik Pisang", harga: 15000, deskripsi: "Lezat dan renyah" },
  { id: "2", nama: "Kopi Gayo", harga: 25000, deskripsi: "Aroma khas Aceh" },
];

const pelatihanList = [
  { id: "1", judul: "Digital Marketing", deskripsi: "Belajar promosi online", tanggal: "2025-07-01" },
  { id: "2", judul: "Manajemen Keuangan", deskripsi: "Kelola keuangan UMKM", tanggal: "2025-08-15" },
];

// Resolver
export const rootValue = {
  cariProduk: ({ nama }) => {
    return produkList.filter((p) =>
      p.nama.toLowerCase().includes(nama.toLowerCase())
    );
  },
  cariPelatihan: ({ judul }) => {
    return pelatihanList.filter((p) =>
      p.judul.toLowerCase().includes(judul.toLowerCase())
    );
  },
};

