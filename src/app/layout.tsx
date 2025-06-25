import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"; // Import Toaster

const geistSans = GeistSans; // Use direct import as per Next/Font v14+
const geistMono = GeistMono;

export const metadata: Metadata = {
  title: 'Chithram Imagen',
  description: 'Craft stunning visuals from your imagination with AI.',
  icons: null, // Explicitly disable favicon generation/serving by Next.js
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
