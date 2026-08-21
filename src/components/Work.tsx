import { projects } from "@/data/projects";
import Reveal from "./Reveal";
import styles from "./Work.module.css";

export default function Work() {
  return (
    <section id="work" className={styles.section}>
      <Reveal>
        <div className={styles.heading}>
          <span className={styles.headingLabel}>Trabalhos selecionados</span>
          <span className={styles.headingRule} />
        </div>
      </Reveal>

      {projects.map((project, i) => (
        <Reveal key={project.slug} delay={i * 80}>
          <article className={styles.project}>
            <div className={styles.info}>
              <span className={styles.plateNumber}>{project.plate}</span>
              <h3 className={styles.title}>{project.title}</h3>
              <span className={styles.category}>{project.category}</span>
              <p className={styles.description}>{project.description}</p>
              <a
                className="btn"
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                Ver projeto ↗
              </a>
            </div>

            <div className={styles.plate}>
              <a
                className={styles.visual}
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Abrir ${project.title}`}
              >
                <span className={`${styles.corner} ${styles.cornerTL}`} />
                <span className={`${styles.corner} ${styles.cornerTR}`} />
                <span className={`${styles.corner} ${styles.cornerBL}`} />
                <span className={`${styles.corner} ${styles.cornerBR}`} />
                <span className={styles.placeholder}>{project.title}</span>
              </a>
              <div className={styles.legend}>
                <span>{project.plate}</span>
                <span>{project.technologies.join(" · ")}</span>
              </div>
            </div>
          </article>
        </Reveal>
      ))}
    </section>
  );
}
