import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";

let firebaseAdminApp;

if (!getApps().length) {
  const serviceAccount = JSON.parse(process.env.FIREBASE_ADMIN_CREDENTIALS);

  firebaseAdminApp = initializeApp({
    credential: cert(serviceAccount),
  });
}

const adminAuth = getAuth();

export { adminAuth };
