import dbConnect from "@/lib/dbConnect";
import Produk from "@/models/Produk";

export const resolvers = {
  Query: {
    async cariProduk(_, { keyword }) {
      await dbConnect();
      return await Produk.find({
        nama: { $regex: keyword, $options: 'i' },
      });
    },
  },
};
