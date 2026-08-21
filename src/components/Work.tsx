import { projects } from "@/data/projects";
import Reveal from "./Reveal";
import styles from "./Work.module.css";

export default function Work() {
  return (
    <section id="work" className={styles.section}>
      <Reveal>
        <p className={styles.heading}>Selected Work</p>
      </Reveal>

      {projects.map((project, i) => (
        <Reveal key={project.slug} delay={i * 80}>
          <article className={styles.project}>
            <div className={styles.info}>
              <span className={styles.number}>{project.number}</span>
              <h3 className={styles.title}>{project.title}</h3>
              <span className={styles.category}>{project.category}</span>
              <p className={styles.description}>{project.description}</p>
              <a
                className={styles.cta}
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                Explore project →
              </a>
            </div>

            <a
              className={styles.visual}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Abrir ${project.title}`}
            >
              <span className={styles.placeholder}>{project.title}</span>
            </a>
          </article>
        </Reveal>
      ))}
    </section>
  );
}
