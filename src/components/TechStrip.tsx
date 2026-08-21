import styles from "./TechStrip.module.css";

const capabilities = ["Design", "Development", "Motion", "Performance"];

export default function TechStrip() {
  return (
    <section className={styles.section}>
      {capabilities.map((item) => (
        <span key={item} className={styles.item}>
          {item}
        </span>
      ))}
    </section>
  );
}
