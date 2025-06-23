// lib/firebase.js
import { initializeApp, getApps } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
// Optional: hanya jika kamu ingin analytics
// import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyD-pynT0f-4SFuoCXnp6t2H-lQ2cCT0VqQ",
  authDomain: "si-umkm-uaspbf.firebaseapp.com",
  projectId: "si-umkm-uaspbf",
  storageBucket: "si-umkm-uaspbf.appspot.com",
  messagingSenderId: "888495866063",
  appId: "1:888495866063:web:3ac65b7584bf9ec58777ba",
  measurementId: "G-J0EKZEESCN",
};

// Inisialisasi Firebase
const firebaseApp = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const auth = getAuth(firebaseApp);
const provider = new GoogleAuthProvider();

export { auth, provider };
export default firebaseApp;