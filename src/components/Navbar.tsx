// src/components/Navbar.tsx
"use client"; 

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import "@/styles/navbar.css"; 

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar">
      <Link href="/dashboard" className="admin-link">
        Admin Panel
      </Link>
      <div className="auth-buttons">
        {user ? (
          <button onClick={logout} className="logout-button">
            Logout
          </button>
        ) : (
          <Link href="/login" className="login-button">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}