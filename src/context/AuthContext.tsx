"use client";
import { createContext, useContext, useState, ReactNode } from "react";
import { useRouter } from "next/navigation";

interface AuthContextType {
  user: string | null;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<string | null>(null);
  const router = useRouter();

  const login = async (email: string, password: string) => {
    // Simulating API call
    if (email === "admin@example.com" && password === "password") {
      localStorage.setItem("user", email);
      setUser(email);
      router.push("/dashboard");
      return { success: true };
    }
    return { success: false, error: "Invalid credentials" };
  };

  const register = async (email: string, password: string) => {
    // Simulating API call
    if (email && password) {
      localStorage.setItem("user", email);
      setUser(email);
      router.push("/dashboard");
      return { success: true };
    }
    return { success: false, error: "Registration failed" };
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    router.push("/login");
  };

  return <AuthContext.Provider value={{ user, login, register, logout }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
