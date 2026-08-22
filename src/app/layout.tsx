import type { Metadata } from "next";
import { Geist, Geist_Mono, Bricolage_Grotesque } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const bricolage = Bricolage_Grotesque({
  variable: "--font-display-face",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://portifolio-pi-nine-80.vercel.app"),
  title: "LCS — Estúdio Digital",
  description:
    "Sites institucionais e landing pages construídos com direção de arte, desenvolvimento e performance sob o mesmo teto.",
  openGraph: {
    title: "LCS — Estúdio Digital",
    description:
      "Sites institucionais e landing pages construídos com direção de arte, desenvolvimento e performance sob o mesmo teto.",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} ${bricolage.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
