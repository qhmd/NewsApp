// src/firebaseConfig.ts
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Ganti dengan konfigurasi Firebase proyek Anda!
const firebaseConfig = {
  apiKey: "AIzaSyDZQuaca0BdKHwMvocDMHn6INj13GkYAFQ",
  authDomain: "newsapp-24538.firebaseapp.com",
  projectId: "newsapp-24538",
  storageBucket: "newsapp-24538.firebasestorage.app",
  messagingSenderId: "726812145169",
  appId: "1:726812145169:web:d7428ea358a3289b4523b0",
  measurementId: "G-EWVX70ZGE9"
};
// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);

// Inisialisasi layanan Firebase
export const auth = getAuth(app);
export const db = getFirestore(app);