import styles from "./TechStrip.module.css";

const capabilities = ["Direção de arte", "Desenvolvimento", "Motion", "Performance"];

export default function TechStrip() {
  return (
    <section className={styles.section}>
      {capabilities.map((item, i) => (
        <span key={item}>
          {i > 0 && <span className={styles.sep}>／ </span>}
          {item}
        </span>
      ))}
    </section>
  );
}
