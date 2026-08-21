import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
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
    <html lang="pt-BR" className={poppins.variable}>
      <body>{children}</body>
    </html>
  );
}
