import type { Metadata } from "next";
import { Archivo, Geist_Mono } from "next/font/google";
import "./globals.css";

/* Archivo é uma grotesca com eixo de largura variável — em peso alto
   e largura expandida ela tem energia editorial (usada muito em
   design esportivo e de revista) sem perder ar profissional. */
const archivo = Archivo({
  variable: "--font-sans",
  subsets: ["latin"],
  axes: ["wdth"],
});

const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
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
    <html lang="pt-BR" className={`${archivo.variable} ${geistMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
