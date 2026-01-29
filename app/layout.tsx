import type { Metadata } from "next";
import { Outfit, Inter } from "next/font/google"; // High-end Geometric Sans
import "./globals.css";
import { DataEngineProvider } from "@/lib/data-engine";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: 'swap',
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: 'swap',
});

// PWA Viewport Configuration
export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  title: "Property Dashboard",
  description: "High-end Real Estate Management Simulator",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "PropDashboard",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${outfit.variable} ${inter.variable} antialiased font-sans bg-background text-foreground`}
      >
        <DataEngineProvider>
          {children}
        </DataEngineProvider>
      </body>
    </html>
  );
}
