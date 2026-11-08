import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import TanStackProvider from "@/providers/TanStackProvider";
import { Toaster } from "react-hot-toast";
import Header from "@/components/Header/Header";
import { Suspense } from "react";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "RentalCar",
  description: "Find your perfect rental car",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <TanStackProvider>
          <Suspense fallback={<div />}>
            <Header />
          </Suspense>
          {children}
        </TanStackProvider>
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
