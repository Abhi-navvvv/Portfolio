import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import LenisProvider from "@/components/LenisProvider";
import CursorGlow from "@/components/CursorGlow";
import ScrollProgress from "@/components/ScrollProgress";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Abhii Navv | Blockchain & ZK Engineer",
  description: "Portfolio of Abhii Navv, 2nd-year CS student at Bennett University specializing in blockchain infrastructure, ZK Proofs, DeFi protocols, and smart contracts.",
  keywords: ["Blockchain", "ZK Proofs", "Cryptography", "Solidity", "Rust", "Bennett University", "Developer Portfolio"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} antialiased dark`}
    >
      <body className="min-h-screen bg-[#0a0a0f] text-white selection:bg-violet-accent/30 selection:text-white overflow-x-hidden">
        <LenisProvider>
          <ScrollProgress />
          <CursorGlow />
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}
