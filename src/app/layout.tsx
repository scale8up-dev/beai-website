import type { Metadata } from "next";
import { Bebas_Neue, Plus_Jakarta_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import DevToolbar from "@/components/DevToolbar";
import CursorFollower from "@/components/CursorFollower";
import ResizeHandler from "@/components/ResizeHandler";

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
    icon: '/brand/icon.svg',
    apple: '/brand/favicon.png',
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
        {/* Grain overlay layer */}
        <div aria-hidden="true" className="grain-overlay" />
        <ResizeHandler />
        <CursorFollower />
        {children}
        <DevToolbar />
      </body>
    </html>
  );
}
