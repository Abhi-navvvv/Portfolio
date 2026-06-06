import type { Metadata } from "next";
import { Anton, Roboto_Flex } from "next/font/google";
import "./globals.css";
import LenisProvider from "@/components/LenisProvider";
import StarfieldBackground from "@/components/StarfieldBackground";
import ScrollProgress from "@/components/ScrollProgress";

const anton = Anton({
  variable: "--font-anton",
  weight: "400",
  subsets: ["latin"],
});

const roboto = Roboto_Flex({
  variable: "--font-roboto",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Abhinav Singh | Blockchain & ZK Engineer",
  description: "Portfolio of Abhinav Singh, 3rd-year CSE student at Bennett University specializing in blockchain infrastructure, ZK Proofs, DeFi protocols, and smart contracts.",
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
      className={`${anton.variable} ${roboto.variable} antialiased dark`}
    >
      <body className="min-h-screen bg-[#0a0a0a] text-[#fafafa] selection:bg-mint-accent/30 selection:text-white overflow-x-hidden">
        <LenisProvider>
          <ScrollProgress />
          <StarfieldBackground />
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}
