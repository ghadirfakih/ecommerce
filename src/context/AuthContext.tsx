"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";

interface AuthContextType {
  user: string | null;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

interface User {
  email: string;
  password: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<string | null>(null);
  const router = useRouter();

  // Load the logged-in user from localStorage on component mount
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(savedUser);
    }
  }, []);

  // Retrieve registered users from localStorage
  const getRegisteredUsers = (): User[] => {
    const users = localStorage.getItem("registeredUsers");
    return users ? JSON.parse(users) : [];
  };

  // Save updated list of registered users
  const saveRegisteredUsers = (users: User[]) => {
    localStorage.setItem("registeredUsers", JSON.stringify(users));
  };

  // Login function
  const login = async (email: string, password: string) => {
    const registeredUsers = getRegisteredUsers();
    const validUser = registeredUsers.find(
      (user) => user.email === email && user.password === password
    );

    if (validUser) {
      localStorage.setItem("user", email);
      setUser(email);
      router.push("/dashboard");
      return { success: true };
    }

    return { success: false, error: "Invalid credentials" };
  };

  // Register function
  const register = async (email: string, password: string) => {
    const registeredUsers = getRegisteredUsers();

    // Check if the email is already registered
    if (registeredUsers.some((user) => user.email === email)) {
      return { success: false, error: "Email already registered" };
    }

    // Add the new user and save to localStorage
    registeredUsers.push({ email, password });
    saveRegisteredUsers(registeredUsers);

    localStorage.setItem("user", email);
    setUser(email);
    router.push("/dashboard");

    return { success: true };
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to use AuthContext
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
