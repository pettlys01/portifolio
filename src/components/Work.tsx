import Link from "next/link";
import { projects } from "@/data/projects";
import ProjectVisual from "./ProjectVisual";
import Reveal from "./Reveal";
import styles from "./Work.module.css";

export default function Work() {
  return (
    <section id="work" className={styles.section}>
      <Reveal>
        <div className={styles.heading}>
          <span className={styles.headingLabel}>Projetos selecionados</span>
          <span className={styles.headingRule} />
        </div>
      </Reveal>

      <div className={styles.grid}>
        {projects.map((project, i) => (
          <Reveal key={project.slug} delay={i * 80}>
            <article className={styles.project}>
              <ProjectVisual
                href={`/projetos/${project.slug}`}
                src={project.image}
                alt={`Captura de tela do site ${project.title}`}
                priority={i === 0}
              />

              <Link href={`/projetos/${project.slug}`} className={styles.top}>
                <span className={styles.number}>{project.number}</span>
                <h3 className={styles.title}>{project.title}</h3>
              </Link>
              <span className={styles.category}>{project.category}</span>

              <div className={styles.bottom}>
                <span className={styles.technologies}>
                  {project.technologies.join(" · ")}
                </span>
                <Link href={`/projetos/${project.slug}`} className="btn btnGhost">
                  Ver case ↗
                </Link>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
