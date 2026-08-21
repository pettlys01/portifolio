import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  axes: ["opsz", "SOFT", "WONK"],
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://portfolio-lucas.vercel.app"),
  title: "Lucas — Digital Studio",
  description:
    "Websites institucionais e landing pages premium, construídos com direção de arte, performance e atenção aos detalhes.",
  openGraph: {
    title: "Lucas — Digital Studio",
    description:
      "Websites institucionais e landing pages premium, construídos com direção de arte, performance e atenção aos detalhes.",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className={`${fraunces.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  );
}
