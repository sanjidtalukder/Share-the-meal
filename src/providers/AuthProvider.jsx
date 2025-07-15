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
import { auth } from "../firebase/src/firebase/firebase.config";
import axios from "axios";

export const AuthContext = createContext(null);

const googleProvider = new GoogleAuthProvider();

const updateUserProfile = async ({ displayName, photoURL }) => {
  if (auth.currentUser) {
    await updateProfile(auth.currentUser, { displayName, photoURL });
  }
};

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);  // <-- token state যোগ করলাম
  const [loading, setLoading] = useState(true);

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signInWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
    setUser(currentUser);

    if (currentUser) {
      const idToken = await currentUser.getIdToken();
      setToken(idToken);

      // ✅ এখানে user কে MongoDB-তে save করো
      try {
        await axios.post("http://localhost:5000/api/users", {
          name: currentUser.displayName || "Unknown",
          email: currentUser.email,
          photo: currentUser.photoURL || null,
        });
        console.log("✅ User saved to MongoDB");
      } catch (err) {
        if (err.response?.status === 409) {
          console.log("⚠️ User already exists in MongoDB");
        } else {
          console.error("❌ Error saving user:", err.message);
        }
      }
    } else {
      setToken(null);
    }

    setLoading(false);
  });

  return () => unsubscribe();
}, []);


  const authInfo = {
    user,
    token,     // <-- token context এ যোগ করলাম
    loading,
    createUser,
    signIn,
    signInWithGoogle,
    logOut,
    updateUserProfile,
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
