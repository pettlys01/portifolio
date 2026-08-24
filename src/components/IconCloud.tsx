"use client";

import { useEffect, useMemo, useState } from "react";
import { Cloud, renderSimpleIcon, type ICloud } from "react-icon-cloud";
import { ICONS } from "./TechIcon";

/* Usa os mesmos logos já embutidos no projeto — nenhuma requisição
   externa. Repetidos uma vez para a esfera não ficar rala. */
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

export default function IconCloud() {
  const [mounted, setMounted] = useState(false);
  const [touch, setTouch] = useState(false);

  useEffect(() => {
    setTouch(!window.matchMedia("(hover: hover) and (pointer: fine)").matches);
    setMounted(true);
  }, []);

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
          bgHex: "#08080a",
          fallbackHex: "#f7f6f4",
          minContrastRatio: 1.6,
          size: 44,
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

  const cloudProps: Omit<ICloud, "children"> = useMemo(
    () => ({
      containerProps: {
        style: {
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "100%",
        },
      },
      options: {
        reverse: true,
        depth: 0.92,
        wheelZoom: false,
        imageScale: 2,
        activeCursor: "default",
        tooltip: "native",
        initial: [0.06, -0.06],
        clickToFront: 500,
        tooltipDelay: 0,
        outlineColour: "#0000",
        maxSpeed: 0.028,
        minSpeed: 0.014,
        /* No toque, o arrasto do dedo acelerava a esfera até travar
           e ainda roubava o scroll da página. Em toque ela só gira
           sozinha. */
        dragControl: !touch,
        freezeActive: touch,
        fadeIn: 600,
      },
    }),
    [touch]
  );

  if (!mounted) return null;

  return <Cloud {...cloudProps}>{icons}</Cloud>;
}
