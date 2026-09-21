import type { Metadata } from "next";
import { Bebas_Neue, Plus_Jakarta_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import SiteOverlays from "@/components/SiteOverlays";
import ResizeHandler from "@/components/ResizeHandler";
import SmoothScroll from "@/components/SmoothScroll";

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas-neue",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta-sans",
});

const ibmPlexMono = IBM_Plex_Mono({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-ibm-plex-mono",
});

export const metadata: Metadata = {
  title: "Business Evolution AI",
  description: "Next.js App Router with TypeScript and Tailwind CSS v4",
  icons: {
    icon: [
      { url: '/brand/tab-icon.svg', type: 'image/svg+xml' },
      { url: '/brand/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/brand/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
    shortcut: '/brand/tab-icon.svg',
    apple: [
      { url: '/brand/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${bebasNeue.variable} ${plusJakartaSans.variable} ${ibmPlexMono.variable}`}
    >
      <body className="relative min-h-screen bg-dark text-[#e2e2dd] antialiased">
        <SmoothScroll />
        <SiteOverlays />
        <ResizeHandler />
        {children}
      </body>
    </html>
  );
}
