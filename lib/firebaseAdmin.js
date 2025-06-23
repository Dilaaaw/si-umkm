// lib/firebaseAdmin.js
import admin from "firebase-admin";

let firebaseApp = null;

export function getFirebaseAdmin() {
  if (!firebaseApp) {
    const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");
    const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
    const projectId = process.env.FIREBASE_PROJECT_ID;

    if (!privateKey || !clientEmail || !projectId) {
      throw new Error("Missing Firebase Admin credentials");
    }

    firebaseApp = admin.initializeApp({
      credential: admin.credential.cert({
        privateKey,
        clientEmail,
        projectId,
      }),
    });
  }

  return firebaseApp;
}
