import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";

import axios from "axios";
import { auth } from "../firebase/firebase.config";

export const AuthContext = createContext(null);

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ Create user with email/password
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // ✅ Sign in with email/password
  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // ✅ Sign in with Google
  const signInWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  // ✅ Log out
  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  // ✅ Update user profile
  const updateUser = ({ displayName, photoURL }) => {
    if (auth.currentUser) {
      return updateProfile(auth.currentUser, { displayName, photoURL });
    }
  };

  // ✅ Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        const idToken = await currentUser.getIdToken();
        setToken(idToken);

        // ✅ Check if user exists in MongoDB, if not, save
        try {
          await axios.get(`https://share-the-meal-server-sigma.vercel.app/api/users?email=${currentUser.email}`);
          console.log("✅ User exists in MongoDB");
        } catch (err) {
          if (err.response?.status === 404) {
            try {
              await axios.post("https://share-the-meal-server-sigma.vercel.app/api/users", {
                name: currentUser.displayName || "Unknown",
                email: currentUser.email,
                photo: currentUser.photoURL || null,
              });
              console.log("✅ User saved to MongoDB");
            } catch (postErr) {
              console.error("❌ Error saving user:", postErr.message);
            }
          } else if (err.response?.status === 409) {
            console.log("⚠️ User already exists in MongoDB");
          } else {
            console.error("❌ Error fetching user:", err.message);
          }
        }
      } else {
        setToken(null);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // ✅ Context value
  const authInfo = {
    user,
    token,
    loading,
    createUser,
    signIn,
    signInWithGoogle,
    logOut,
    updateUser,
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
