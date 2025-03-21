// src/app/layout.tsx
import { AuthProvider } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";  // Import Sidebar
import "@/styles/globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <div className="flex">
            <Sidebar />  {/* Sidebar */}
            <div className="ml-64 w-full">
              <Navbar />
              <div className="p-8">{children}</div>
            </div>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
