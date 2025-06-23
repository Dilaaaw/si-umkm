'use client';

import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import firebaseApp from '@/lib/firebase';

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
    await signOut(getAuth(firebaseApp));
    router.push('/');
  };

  const handleBack = () => {
    router.push('/umkm/dashboard'); // ⬅️ Pastikan ini jalan
  };

  return (
    <main className="min-h-screen bg-blue-50 flex items-center justify-center p-6">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center">
        <div className="flex flex-col items-center">
          {user?.foto ? (
            <img
              src={user.foto}
              alt="Foto Profil"
              className="w-24 h-24 rounded-full border-4 border-blue-400 mb-4 shadow"
            />
          ) : (
            <div className="w-24 h-24 rounded-full bg-blue-200 flex items-center justify-center text-white text-3xl font-bold mb-4 shadow">
              {user?.nama?.[0] || 'U'}
            </div>
          )}

          <h1 className="text-2xl font-bold text-blue-800 mb-1">👤 {user?.nama}</h1>
          <p className="text-gray-600 mb-6">{user?.email}</p>

          <div className="space-y-3 w-full">
            <button
              onClick={handleBack}
              className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 rounded"
            >
              ⬅️ Kembali ke Dashboard
            </button>
            <button
              onClick={handleLogout}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded"
            >
              🔒 Logout
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
