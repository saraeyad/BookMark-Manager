import React, { createContext, useContext, useEffect, useState } from "react";
import { AuthUserData } from "@/types";

interface AuthData {
  token: string | null;
  user?: AuthUserData;
}

interface AuthContextType extends AuthData {
  saveAuth: (token: string, user?: AuthUserData) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<AuthUserData | undefined>(undefined);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");
    if (storedToken) setToken(storedToken);
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const saveAuth = (newToken: string, newUser?: AuthUserData) => {
    setToken(newToken);
    localStorage.setItem("token", newToken);
    if (newUser) {
      setUser(newUser);
      localStorage.setItem("user", JSON.stringify(newUser));
    }
  };

  const logout = () => {
    setToken(null);
    setUser(undefined);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ token, user, saveAuth, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
