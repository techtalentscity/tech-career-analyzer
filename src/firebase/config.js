// src/firebase/config.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration for Favored Online project
const firebaseConfig = {
  apiKey: "AIzaSyDgVyHTsiJXDkRJ_osP6EAcQSMIHRndSDg",
  authDomain: "favored-online-f3e8b.firebaseapp.com",
  projectId: "favored-online-f3e8b",
  storageBucket: "favored-online-f3e8b.firebasestorage.app",
  messagingSenderId: "786977722322",
  appId: "1:786977722322:web:7d2dad47e024f17b2c020b",
  measurementId: "G-PHPCMW9FQK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const auth = getAuth(app);
const analytics = getAnalytics(app);
const db = getFirestore(app);

// Export the services for use in your app
export { auth, analytics, db };
