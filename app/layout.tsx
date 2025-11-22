import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { Providers } from "./providers";

const figtree = Figtree({
  subsets: ["latin"],
  variable: "--font-figtree",
  display: "swap",
});

const kfgqpc = localFont({
  src: "../public/fonts/kfgqpc.woff2",
  variable: "--font-kfgqpc",
  display: "swap",
  preload: true,
  adjustFontFallback: false,
});

const surahList = localFont({
  src: "../public/fonts/surah-list.woff",
  variable: "--font-surah-list",
  display: "swap",
  preload: true,
  adjustFontFallback: false,
});

export const metadata: Metadata = {
  title: "Quran.com",
  description: "Explore the Holy Quran with beautiful interface",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${figtree.variable} ${kfgqpc.variable} ${surahList.variable} [scrollbar-gutter:stable]`}
    >
      <body className="antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
