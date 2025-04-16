import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../../Views/Authentication/auth";
import { onAuthStateChanged } from "firebase/auth";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser({ ...user });
        setUserLoggedIn(true);
        const storedRole = localStorage.getItem("userRole");
        setUserRole(storedRole);
      } else {
        setCurrentUser(null);
        setUserLoggedIn(false);
        setUserRole(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    userLoggedIn,
    loading,
    userRole,
    setUserRole,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
