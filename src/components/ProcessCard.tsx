import styles from "./ProcessCard.module.css";

export default function ProcessCard({
  num,
  variant,
  title,
  body,
  items,
}: {
  num: string;
  variant: "pulse" | "settle" | "check";
  title: string;
  body: string;
  items: string[];
}) {
  return (
    <div className={`${styles.card} ${styles[variant]}`}>
      <div className={styles.header}>
        <span className={styles.node}>{num}</span>
        <h3 className={styles.title}>{title}</h3>
      </div>

      <p className={styles.body}>{body}</p>

      <ul className={styles.list}>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
