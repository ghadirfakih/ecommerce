// src/components/Navbar.tsx
"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className=" bg-gray-800 h-20 p-4 flex justify-between items-center">
      <Link href="/dashboard" className="admin-link text-white font-bold">
        Admin Panel
      </Link>
      <div className="auth-buttons flex items-center">
        {user ? (
          <button
            onClick={logout}
            className="logout-button bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Logout
          </button>
        ) : (
          <Link
            href="/login"
            className="login-button bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}
