import Reveal from "./Reveal";
import styles from "./Philosophy.module.css";

export default function Philosophy() {
  return (
    <section id="about" className={styles.section}>
      <Reveal>
        <div className={styles.grid}>
          <p className={styles.label}>Approach</p>
          <p className={styles.statement}>
            Não começo pelo código. Começo pela <em>experiência</em> —
            direção visual, hierarquia e ritmo antes de qualquer linha
            escrita.
          </p>
        </div>
      </Reveal>
    </section>
  );
}
