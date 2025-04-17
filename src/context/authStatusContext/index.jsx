import { createContext, useContext, useState } from "react";

const AuthStatusContext = createContext();

export function useAuthStatus() {
  return useContext(AuthStatusContext);
}

export function AuthStatusProvider({ children }) {
  // false means not authenticated yet; will be set to true once authentication succeeds.
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  return (
    <AuthStatusContext.Provider
      value={{ isAuthenticating, setIsAuthenticating }}
    >
      {children}
    </AuthStatusContext.Provider>
  );
}
