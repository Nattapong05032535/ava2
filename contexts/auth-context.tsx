"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import { MOCK_USERS, type MockUser } from "@/constants/user";

interface AuthContextType {
  currentUser: MockUser | null;
  isLoggedIn: boolean;
  login: (id: string, password: string) => { success: boolean; error?: string };
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<MockUser | null>(null);

  const login = useCallback((id: string, password: string) => {
    const user = MOCK_USERS.find((u: MockUser) => u.id === id && u.password === password);
    if (user) {
      setCurrentUser(user);
      return { success: true };
    }
    return { success: false, error: "รหัสผู้ใช้หรือรหัสผ่านไม่ถูกต้อง" };
  }, []);

  const logout = useCallback(() => {
    setCurrentUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, isLoggedIn: !!currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
