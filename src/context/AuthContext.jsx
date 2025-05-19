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
  
  // Check if user is authorized
  const checkAuthorization = async (user) => {
    if (!user) return false;
    
    try {
      // Check if user's email exists in authorizedUsers collection
      const userRef = doc(db, "authorizedUsers", user.email);
      const docSnap = await getDoc(userRef);
      
      return docSnap.exists();
    } catch (error) {
      console.error("Error checking authorization:", error);
      return false;
    }
  };
  
  // Sign in with Google
  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      return result.user;
    } catch (error) {
      console.error("Error signing in with Google", error);
      throw error;
    }
  };

  // Sign out
  const logout = () => {
    return signOut(auth);
  };

  // Observer for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      
      if (user) {
        const authorized = await checkAuthorization(user);
        setIsAuthorized(authorized);
        
        // Sign out if not authorized
        if (!authorized) {
          await signOut(auth);
          setCurrentUser(null);
        }
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
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
