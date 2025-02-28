import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

import "@rainbow-me/rainbowkit/styles.css";
import Providers from "@/components/common/providers";

export const metadata: Metadata = {
  title: "Test DApp",
  description: "Init by Sceiiya",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`font-pressStart subpixel-antialiased`}>
        <Providers>
          <div className="flex min-h-screen flex-col justify-between">
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
