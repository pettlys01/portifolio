"use client";

import { useEffect, useMemo, useState } from "react";
import { Cloud, renderSimpleIcon, type ICloud } from "react-icon-cloud";
import { ICONS } from "./TechIcon";

/* Ordem em que os ícones entram na esfera. Usa os mesmos logos já
   embutidos no projeto — nenhuma requisição externa. */
const SLUGS = [
  "html5",
  "css",
  "javascript",
  "typescript",
  "react",
  "nextjs",
  "git",
  "vercel",
  "analytics",
];

const cloudProps: Omit<ICloud, "children"> = {
  containerProps: {
    style: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
    },
  },
  options: {
    reverse: true,
    depth: 1,
    wheelZoom: false,
    imageScale: 2,
    activeCursor: "default",
    tooltip: "native",
    initial: [0.08, -0.08],
    clickToFront: 500,
    tooltipDelay: 0,
    outlineColour: "#0000",
    maxSpeed: 0.035,
    minSpeed: 0.015,
  },
};

export default function IconCloud() {
  /* TagCanvas mede o DOM ao montar; só renderiza depois que o
     componente está no cliente. */
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const icons = useMemo(
    () =>
      SLUGS.map((slug) => {
        const data = ICONS[slug];
        return renderSimpleIcon({
          icon: {
            title: data.title,
            slug,
            hex: data.hex.replace("#", ""),
            path: data.path,
            source: "",
            svg: "",
          },
          // fundo da seção, para o cálculo de contraste da biblioteca
          bgHex: "#08080a",
          fallbackHex: "#f7f6f4",
          minContrastRatio: 1.6,
          size: 46,
          aProps: {
            href: undefined,
            target: undefined,
            rel: undefined,
            onClick: (e: React.MouseEvent) => e.preventDefault(),
          },
        });
      }),
    []
  );

  if (!mounted) return null;

  return <Cloud {...cloudProps}>{icons}</Cloud>;
}
