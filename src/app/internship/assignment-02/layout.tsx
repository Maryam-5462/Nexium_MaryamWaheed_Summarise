import type { Metadata } from "next";
import { Geist, Geist_Mono, Noto_Nastaliq_Urdu } from "next/font/google";
import "@/app/globals.css";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});
const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});
const urduFont = Noto_Nastaliq_Urdu({
  subsets: ["arabic"],
  weight: "400",
  variable: "--font-urdu",
});

export const metadata: Metadata = {
  title: "Blog Summariser",
  description: "Summarise and translate blogs into Urdu",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${urduFont.variable}`}
    >
      <body className="antialiased">{children}</body>
    </html>
  );
}
