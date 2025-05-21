// src/context/AuthContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { 
  GoogleAuthProvider, 
  signInWithPopup, 
  signOut, 
  onAuthStateChanged 
} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase/config";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);
  
  // Check if user is authorized (has paid)
  const checkAuthorization = async (user) => {
    if (!user) {
      setIsAuthorized(false);
      return false;
    }
    
    try {
      // Check if user's email exists in paidUsers collection
      const userEmail = user.email;
      const paidUserRef = doc(db, "paidUsers", userEmail);
      const paidUserDoc = await getDoc(paidUserRef);
      
      // If the user has a valid payment record, authorize them
      if (paidUserDoc.exists() && paidUserDoc.data().isPaid) {
        setIsAuthorized(true);
        return true;
      } else {
        setIsAuthorized(false);
        return false;
      }
    } catch (error) {
      console.error("Error checking authorization:", error);
      setIsAuthorized(false);
      return false;
    }
  };
  
  // Sign in with Google
  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      // After successful sign in, check authorization
      await checkAuthorization(result.user);
      return result;
    } catch (error) {
      console.error("Error signing in with Google", error);
      throw error;
    }
  };

  // Sign out
  const logout = async () => {
    try {
      await signOut(auth);
      setIsAuthorized(false);
    } catch (error) {
      console.error("Error signing out", error);
      throw error;
    }
  };

  // Observer for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      
      if (user) {
        // Check if user is authorized (has paid)
        await checkAuthorization(user);
      } else {
        // User signed out, reset authorization
        setIsAuthorized(false);
      }
      
      setLoading(false);
    });
    
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    isAuthorized,
    signInWithGoogle,
    logout,
    checkAuthorization, // Export this so components can refresh authorization status
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
