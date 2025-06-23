import { gql } from 'apollo-server-micro';

export const typeDefs = gql`
  type Produk {
    _id: ID!
    nama: String!
    deskripsi: String
    harga: Int
    gambar: String
    pelaku: String
  }

  type Query {
    cariProduk(keyword: String!): [Produk]
  }
`;
