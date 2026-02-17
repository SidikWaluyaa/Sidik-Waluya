import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PortoSidik | Product Designer & Fullstack Developer",
  description: "Senior Product Designer & High-end Developer portfolio with premium CMS.",
  openGraph: {
    title: "PortoSidik | Product Designer & Fullstack Developer",
    description: "Premium portfolio of PortoSidik",
    type: "website",
    locale: "en_US",
    url: "https://portosidik.vercel.app", // Fallback
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
