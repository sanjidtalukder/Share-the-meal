// import { onAuthStateChanged } from "firebase/auth";
import axios from "axios";
// import { createContext, useEffect, useState } from "react";
// import { auth } from "../../firebase/src/firebase/firebase.config";

import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase/src/firebase/firebase.config";
import { onAuthStateChanged } from "firebase/auth";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      setLoading(false);

      if (currentUser) {
        const { displayName, email } = currentUser;
        const userInfo = {
          name: displayName || "Unknown",
          email,
          role: "user",
        };

        try {
          await axios.post("http://localhost:5000/api/users", userInfo);
        } catch (err) {
          console.error("Failed to save user:", err.message);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
