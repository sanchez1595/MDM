import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { AppHeader } from "@/components/app-header";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "MDM Platform",
  description: "Plataforma de gestión de datos maestros",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background min-h-screen flex flex-col`}
      >
        <AppHeader />
        <main className="flex-1 w-full max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
          {children}
        </main>
        <footer className="mt-12 text-center text-xs text-muted-foreground py-4">
          <p>© 2023 MDM Data Platform. Todos los derechos reservados.</p>
          <p className="mt-1">Versión 1.0.2</p>
        </footer>
      </body>
    </html>
  );
}
