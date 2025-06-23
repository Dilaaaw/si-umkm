"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const linkClass = (href) =>
    pathname === href
      ? "text-pink-600 font-semibold underline"
      : "text-gray-700 hover:text-pink-500";

  return (
    <nav className="bg-white px-6 py-4 shadow-md flex justify-between items-center">
      <h1 className="text-xl font-bold text-pink-600">Si-UMKM</h1>
      <div className="space-x-4">
        <Link href="/" className={linkClass("/")}>Home</Link>
        <Link href="/produk" className={linkClass("/produk")}>Produk</Link>
        <Link href="/pelatihan" className={linkClass("/pelatihan")}>Pelatihan</Link>
        <Link href="/profile" className={linkClass("/profile")}>Profil</Link>
        <Link href="/admin/dashboard" className={linkClass("/admin/dashboard")}>Admin</Link>
      </div>
    </nav>
  );
}

