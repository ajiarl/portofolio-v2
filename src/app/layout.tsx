import type { Metadata } from "next";
import { Bricolage_Grotesque, JetBrains_Mono } from "next/font/google";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import GridBackground from "@/components/layout/GridBackground";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ajiarlando.my.id"),
  title: "Aji Arlando - Fullstack Developer",
  description: "Full-stack developer building production web applications independently. Laravel · Next.js · TypeScript · Docker.",
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Aji Arlando - Fullstack Developer",
    description: "Full-stack developer building production web applications independently. Laravel · Next.js · TypeScript · Docker.",
    url: "https://ajiarlando.my.id",
    siteName: "Aji Arlando",
    images: [
      {
        url: "/og-image.webp",
        width: 1200,
        height: 630,
        alt: "Aji Arlando Portfolio Banner",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aji Arlando - Fullstack Developer",
    description: "Full-stack developer building production web applications independently. Laravel · Next.js · TypeScript · Docker.",
    images: ["/og-image.webp"],
  },
  verification: {
    google: "1unL3YsiRPyUZi-_4wOtKmDUNJq57hp7-uktQ4wlFnw",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${bricolage.variable} ${jetbrainsMono.variable} antialiased min-h-[100dvh] flex flex-col`}>
        <GridBackground />
        <Navbar />
        {children}
        <Footer />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
