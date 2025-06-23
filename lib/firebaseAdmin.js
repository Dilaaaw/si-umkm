// lib/firebaseAdmin.js
import admin from 'firebase-admin';
import serviceAccount from './serviceAccountKey.json'; // file ini kamu download dari Firebase Console

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

export default admin;
