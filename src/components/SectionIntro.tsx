import type { ReactNode } from "react";
import Reveal from "./Reveal";
import styles from "./SectionIntro.module.css";

/**
 * Abertura de seção.
 *
 * Substitui o par "rótulo em caixa alta + régua horizontal" que se
 * repetia em cinco seções. Repetido tantas vezes, ele virava moldura
 * de template em vez de hierarquia — e o rótulo minúsculo competia
 * com o próprio título sem acrescentar informação. Aqui a hierarquia
 * vem do tamanho do texto (visual-weight.md), não de um enfeite.
 */
export default function SectionIntro({
  title,
  lead,
  light = false,
  children,
}: {
  title: ReactNode;
  lead?: ReactNode;
  light?: boolean;
  children?: ReactNode;
}) {
  return (
    <Reveal>
      <header className={`${styles.intro} ${light ? styles.light : ""}`}>
        <h2 className={styles.title}>{title}</h2>
        {lead && <p className={styles.lead}>{lead}</p>}
        {children}
      </header>
    </Reveal>
  );
}
