// src/firebase/config.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDuub4FXpY2s5Q4l3_anc8IQCLyO53NQ6I",
  authDomain: "techtalents-city.firebaseapp.com",
  projectId: "techtalents-city",
  storageBucket: "techtalents-city.firebasestorage.app",
  messagingSenderId: "429056041618",
  appId: "1:429056041618:web:edda30a3a6e4489772bc4b",
  measurementId: "G-C5J4YS08SB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export { auth, analytics, db };
