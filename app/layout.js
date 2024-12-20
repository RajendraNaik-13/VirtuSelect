import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/sonner";
import Header from "./Dashboard/_components/Header";
import { ThemeProvider } from "../components/themeprovider";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "VirtuSelect",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
      
      <ClerkProvider>
      
      <html lang="en">
        <body className={inter.className}>
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
          <Header/><Toaster />{children}
          </ThemeProvider>
          </body>
      </html>
      </ClerkProvider>
  
    

  );
}