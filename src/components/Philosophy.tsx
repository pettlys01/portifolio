import Reveal from "./Reveal";
import styles from "./Philosophy.module.css";

export default function Philosophy() {
  return (
    <section id="about" className={styles.section}>
      <Reveal>
        <div className={styles.grid}>
          <p className={styles.label}>Como eu trabalho</p>
          <p className={styles.statement}>
            Não começo pelo código. Começo pelo{" "}
            <span className={styles.mark}>
              projeto
              <svg viewBox="0 0 100 12" aria-hidden="true">
                <path d="M2 8 C 30 2, 70 2, 98 8" />
              </svg>
            </span>{" "}
            — hierarquia, ritmo e detalhe antes de qualquer linha escrita.
          </p>
        </div>
      </Reveal>
    </section>
  );
}
