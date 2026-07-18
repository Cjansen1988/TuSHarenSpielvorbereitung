// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCDoNvmvv8tgUQ9CM1tYCQ7JsSEF1QF6P0",
  authDomain: "tusharenspielvorbereitung.firebaseapp.com",
  projectId: "tusharenspielvorbereitung",
  storageBucket: "tusharenspielvorbereitung.firebasestorage.app",
  messagingSenderId: "640969364886",
  appId: "1:640969364886:web:7155800f829bda442939b7",
  measurementId: "G-0HSY59JJHG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);