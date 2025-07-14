// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCVRVzfjEhoyXF4M7IUM-8zl-EbKiIqxd4",
  authDomain: "aura-app-7df46.firebaseapp.com",
  projectId: "aura-app-7df46",
  storageBucket: "aura-app-7df46.firebasestorage.app",
  messagingSenderId: "576683437308",
  appId: "1:576683437308:web:3bc40b17e1466e841abb79"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
