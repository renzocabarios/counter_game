import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

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
  title: "CorePlay",
  description: "Team Paldo!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`scroll-smooth font-pressStart subpixel-antialiased`}>
        <Providers>
          <div className="flex min-h-screen flex-col justify-between">
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
