import Image from "next/image";
import Link from "next/link";
import { projects } from "@/data/projects";
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

      {projects.map((project, i) => (
        <Reveal key={project.slug} delay={i * 80}>
          <article className={styles.project}>
            <Link href={`/projetos/${project.slug}`} className={styles.top}>
              <span className={styles.number}>{project.number}</span>
              <h3 className={styles.title}>{project.title}</h3>
              <span className={styles.category}>{project.category}</span>
            </Link>

            <Link href={`/projetos/${project.slug}`} className={styles.visual}>
              <Image
                src={project.image}
                alt={`Captura de tela do site ${project.title}`}
                fill
                sizes="(max-width: 880px) 100vw, 1200px"
                className={styles.image}
                priority={i === 0}
              />
            </Link>

            <div className={styles.bottom}>
              <span className={styles.technologies}>
                {project.technologies.join(" · ")}
              </span>
              <Link href={`/projetos/${project.slug}`} className="btn btnGhost">
                Ver case completo ↗
              </Link>
            </div>
          </article>
        </Reveal>
      ))}
    </section>
  );
}
