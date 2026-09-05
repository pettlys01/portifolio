import Image from "next/image";
import styles from "./ProcessMediaCard.module.css";

export default function ProcessMediaCard({
  eyebrow,
  title,
  body,
  meta,
  image,
}: {
  eyebrow: string;
  title: string;
  body: string;
  meta: string;
  image: string;
}) {
  return (
    <div className={styles.card}>
      <div className={styles.frame}>
        <Image
          src={image}
          alt={`Ilustração da etapa "${title}" do processo`}
          fill
          sizes="(max-width: 900px) 100vw, 640px"
          className={styles.img}
        />
      </div>

      <div className={styles.body}>
        <p className={styles.eyebrow}>{eyebrow}</p>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.text}>{body}</p>
        <p className={styles.meta}>{meta}</p>
      </div>
    </div>
  );
}
