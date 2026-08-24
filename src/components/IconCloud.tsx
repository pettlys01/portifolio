"use client";

import { useEffect, useMemo, useState } from "react";
import { Cloud, renderSimpleIcon, type ICloud } from "react-icon-cloud";
import TechIcon, { ICONS, type TechSlug } from "./TechIcon";
import styles from "./IconCloud.module.css";

const SLUGS: TechSlug[] = [
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

/* Grade estática: é o que aparece em toque e sempre que a esfera
   não puder rodar. A esfera roda em canvas e depende de recursos que
   nem todo navegador de celular entrega — o conteúdo não pode
   depender disso para existir. */
function StaticGrid() {
  return (
    <ul className={styles.grid}>
      {SLUGS.map((slug) => (
        <li key={slug} className={styles.cell} title={ICONS[slug].title}>
          <TechIcon slug={slug} size={30} />
        </li>
      ))}
    </ul>
  );
}

export default function IconCloud() {
  const [mode, setMode] = useState<"static" | "cloud">("static");

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const wide = window.matchMedia("(min-width: 980px)").matches;
    if (fine && wide) setMode("cloud");
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
        dragControl: true,
        fadeIn: 600,
      },
    }),
    []
  );

  if (mode === "static") return <StaticGrid />;

  return <Cloud {...cloudProps}>{icons}</Cloud>;
}
