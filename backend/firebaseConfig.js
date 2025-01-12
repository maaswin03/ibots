import admin from "firebase-admin";
import dotenv from "dotenv";

dotenv.config();

const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT;

if (!serviceAccount) {
  throw new Error('FIREBASE_SERVICE_ACCOUNT environment variable is not set');
}

admin.initializeApp({
  credential: admin.credential.cert(JSON.parse(serviceAccount)),
})

const db = admin.firestore();

export { db };
