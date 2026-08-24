import styles from "./ProcessCard.module.css";

export default function ProcessCard({
  num,
  title,
  body,
  items,
}: {
  num: string;
  title: string;
  body: string;
  items: string[];
}) {
  return (
    <div className={styles.card}>
      <div className={styles.layer}>
        <div className={styles.header}>
          <span className={styles.num}>{num}</span>
          <h3 className={styles.title}>{title}</h3>
        </div>

        <p className={styles.body}>{body}</p>

        <ul className={styles.list}>
          {items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
