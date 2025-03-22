// src/app/layout.tsx
import { AuthProvider } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar"; // Import Sidebar
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <div className="grid grid-cols-12">
            <Sidebar /> {/* Sidebar */}
            <div className="col-span-10">
              <Navbar />
              <div className="p-8">{children}</div>
            </div>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
