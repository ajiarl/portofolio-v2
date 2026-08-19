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
  description: "Building robust, systematic solutions from the ground up, with a focus on Information Systems and technical precision.",
  openGraph: {
    title: "Aji Arlando - Fullstack Developer",
    description: "Building robust, systematic solutions from the ground up, with a focus on Information Systems and technical precision.",
    url: "https://ajiarlando.my.id",
    siteName: "Aji Arlando",
    images: [
      {
        url: "/screenshot.png",
        width: 1440,
        height: 900,
        alt: "Aji Arlando Portfolio Banner",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aji Arlando - Fullstack Developer",
    description: "Building robust, systematic solutions from the ground up, with a focus on Information Systems and technical precision.",
    images: ["/screenshot.png"],
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
