import React, { createContext, useContext,  useState } from "react";
import { AuthUserData } from "@/schemas";

interface AuthData {
  token: string | null;
  user?: AuthUserData;
}

interface AuthContextType extends AuthData {
  saveAuth: (token: string, user?: AuthUserData) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  // Initialize from localStorage synchronously to avoid race condition
  const getInitialToken = () => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("token");
    }
    return null;
  };

  const getInitialUser = (): AuthUserData | undefined => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        try {
          return JSON.parse(storedUser);
        } catch {
          return undefined;
        }
      }
    }
    return undefined;
  };

  const [token, setToken] = useState<string | null>(getInitialToken);
  const [user, setUser] = useState<AuthUserData | undefined>(getInitialUser);

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

export const useAuth = (): AuthContextType => {
  const context = useContext<AuthContextType | undefined>(AuthContext);
  
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
