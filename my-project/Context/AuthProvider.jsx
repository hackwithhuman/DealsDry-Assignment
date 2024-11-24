import React, { createContext, useContext, useState } from 'react';

export const AuthContext = createContext();

// AuthProvider to wrap components
export default function AuthProvider({ children }) {
  const logedUser = localStorage.getItem("Users");

  const [authUser, setAuthUser] = useState(
    logedUser ? JSON.parse(logedUser) : undefined
  );

  return (
    <AuthContext.Provider value={[authUser, setAuthUser]}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
