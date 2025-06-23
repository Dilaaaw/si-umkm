import { render, screen } from '@testing-library/react';
import ProductCard from '../components/ProductCard';

describe('ProductCard', () => {
  it('menampilkan nama produk', () => {
    const mockProduk = {
      _id: '123',
      nama: 'Kopi Gayo',
      harga: 25000,
      gambar: 'https://via.placeholder.com/150',
      rating: 4.5,
    };

    render(<ProductCard produk={mockProduk} />);
    expect(screen.getByText('Kopi Gayo')).toBeInTheDocument();
  });
});
