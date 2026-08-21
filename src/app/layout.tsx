import type { Metadata } from "next";
import { Zilla_Slab, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const zillaSlab = Zilla_Slab({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const plexSans = IBM_Plex_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://portifolio-pi-nine-80.vercel.app"),
  title: "LCS — Estúdio Digital",
  description:
    "Sites institucionais e landing pages construídos com precisão: direção de arte, desenvolvimento e performance sob o mesmo teto.",
  openGraph: {
    title: "LCS — Estúdio Digital",
    description:
      "Sites institucionais e landing pages construídos com precisão: direção de arte, desenvolvimento e performance sob o mesmo teto.",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={`${zillaSlab.variable} ${plexSans.variable} ${plexMono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
