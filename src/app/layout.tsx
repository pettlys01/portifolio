import type { Metadata } from "next";
import { Libre_Caslon_Text, Roboto } from "next/font/google";
import Ambient from "@/components/Ambient";
import Loader from "@/components/Loader";
import "./globals.css";

/* Roboto no corpo e na interface — a mesma grotesca da referência,
   aberta e confortável em parágrafos grandes. */
const roboto = Roboto({
  variable: "--font-sans",
  subsets: ["latin"],
});

/* Libre Caslon Text nos títulos: comparada lado a lado com a "memogram"
   da Creativeans (proprietária), foi a livre mais próxima em largura,
   peso e itálico. A Instrument Serif anterior era condensada e, com
   espaçamento negativo, deixava os títulos apertados. */
const caslon = Libre_Caslon_Text({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

/* Roda durante o parse do HTML, antes da primeira pintura: decide se o
   loader aparece (todo carregamento, menos com "reduzir movimento").
   Sem isso a página pintaria e só depois o loader cobriria — um piscar. */
const INTRO_SCRIPT = `(function(){try{var d=document.documentElement;var rm=window.matchMedia("(prefers-reduced-motion: reduce)").matches;d.classList.add(rm?"intro-done":"intro-run")}catch(e){document.documentElement.classList.add("intro-done")}})();`;

export const metadata: Metadata = {
  metadataBase: new URL("https://portifolio-pi-nine-80.vercel.app"),
  title: "Mirai — Criação de Sites e Design Web",
  description:
    "Sites institucionais e landing pages construídos com direção de arte, desenvolvimento e performance sob o mesmo teto.",
  openGraph: {
    title: "Mirai — Criação de Sites e Design Web",
    description:
      "Sites institucionais e landing pages construídos com direção de arte, desenvolvimento e performance sob o mesmo teto.",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={`${roboto.variable} ${caslon.variable}`}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: INTRO_SCRIPT }} />
      </head>
      <body>
        <Loader />
        <Ambient />
        {children}
      </body>
    </html>
  );
}
