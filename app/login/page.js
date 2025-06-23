'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import firebaseApp from '@/lib/firebase';

export default function LoginPage() {
  const router = useRouter();
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    if (isLoggingIn) return;

    setIsLoggingIn(true);
    setError('');
    const auth = getAuth(firebaseApp);
    const provider = new GoogleAuthProvider();

    try {
      await signInWithPopup(auth, provider);
      router.push('/umkm/dashboard'); // ✅ Redirect ke dashboard
    } catch (err) {
      if (err.code !== 'auth/cancelled-popup-request') {
        console.error('Login error:', err.message);
        setError('❌ Gagal login. Coba lagi nanti.');
      }
    } finally {
      setIsLoggingIn(false);
    }
  };

  return (
    <main className="flex items-center justify-center min-h-screen bg-gradient-to-br from-pink-100 to-purple-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-sm text-center border border-pink-200">
        <h1 className="text-2xl font-bold mb-6 text-pink-700">Masuk ke Si-UMKM</h1>

        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-sm border border-red-300">
            {error}
          </div>
        )}

        <button
          onClick={handleLogin}
          disabled={isLoggingIn}
          className={`w-full px-4 py-2 rounded font-semibold transition ${
            isLoggingIn
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-pink-600 hover:bg-pink-700 text-white'
          }`}
        >
          {isLoggingIn ? 'Memproses...' : 'Masuk dengan Google'}
        </button>
      </div>
    </main>
  );
}
