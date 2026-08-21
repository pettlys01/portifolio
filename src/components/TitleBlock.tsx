"use client";

import { useEffect, useState } from "react";
import styles from "./TitleBlock.module.css";

const SHEETS = [
  { id: "hero", label: "Abertura" },
  { id: "work", label: "Trabalhos" },
  { id: "about", label: "Método" },
  { id: "contact", label: "Contato" },
];

export default function TitleBlock() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const sections = SHEETS.map((s) => document.getElementById(s.id)).filter(
      (el): el is HTMLElement => el !== null
    );

    const ratios = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          ratios.set(entry.target.id, entry.intersectionRatio);
        });

        let bestId = SHEETS[0].id;
        let bestRatio = 0;
        ratios.forEach((ratio, id) => {
          if (ratio > bestRatio) {
            bestRatio = ratio;
            bestId = id;
          }
        });

        const index = SHEETS.findIndex((s) => s.id === bestId);
        if (index !== -1 && bestRatio > 0) setActive(index);
      },
      { threshold: [0, 0.25, 0.5, 0.75, 1] }
    );

    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className={styles.block} aria-hidden="true">
      <span className={styles.dot} />
      <span className={styles.sheet}>
        Folha {String(active + 1).padStart(2, "0")}/{String(SHEETS.length).padStart(2, "0")}
      </span>
      <span>— {SHEETS[active].label}</span>
    </div>
  );
}
