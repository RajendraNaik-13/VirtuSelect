import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/theme";
import Header from "./Dashboard/_components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "VirtuSelect",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
      
      <ClerkProvider>
      
      <html lang="en">
        <body className={inter.className}><Header/><Toaster />{children}</body>
      </html>
      </ClerkProvider>
  
    

  );
}
