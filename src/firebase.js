import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCDoNvmvv8tgUQ9CM1tYCQ7JsSEF1QF6P0",
  authDomain: "tusharenspielvorbereitung.firebaseapp.com",
  projectId: "tusharenspielvorbereitung",
  storageBucket: "tusharenspielvorbereitung.firebasestorage.app",
  messagingSenderId: "640969364886",
  appId: "1:640969364886:web:7155800f829bda442939b7",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const COLLECTION = "tusharen2";
