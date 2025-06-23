'use client';

import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import firebaseApp from '@/lib/firebase';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const auth = getAuth(firebaseApp);
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({
          nama: user.displayName || 'Pengguna',
          email: user.email,
          foto: user.photoURL || null,
        });
      } else {
        router.push('/login');
      }
    });
    return () => unsubscribe();
  }, [router]);

  const handleLogout = async () => {
    const auth = getAuth(firebaseApp);
    await signOut(auth);
    router.push('/');
  };

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-blue-600 text-lg">⏳ Memuat profil...</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-blue-50 flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full text-center">
        <div className="flex flex-col items-center">
          {user.foto ? (
            <img
              src={user.foto}
              alt="Foto Profil"
              className="w-24 h-24 rounded-full border-4 border-blue-400 mb-4 shadow"
            />
          ) : (
            <div className="w-24 h-24 rounded-full bg-blue-200 flex items-center justify-center text-white text-3xl font-bold mb-4 shadow">
              {user.nama[0]}
            </div>
          )}
          <h1 className="text-2xl font-bold text-blue-800 mb-1">👤 {user.nama}</h1>
          <p className="text-gray-600 mb-6">{user.email}</p>

          <div className="space-y-3 w-full">
            <button
              onClick={() => router.push('/')}
              className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 rounded transition"
            >
              ⬅️ Kembali ke Beranda
            </button>
            <button
              onClick={handleLogout}
              className="w-full bg-pink-600 hover:bg-pink-700 text-white font-semibold py-2 rounded transition"
            >
              🔒 Logout
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
