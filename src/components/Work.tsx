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
          <span className="sectionLabel">Projetos</span>
          <span className={styles.headingRule} />
        </div>
        <h2 className={styles.headingTitle}>
          Dois projetos, dois problemas diferentes.
        </h2>
      </Reveal>

      <div className={styles.grid}>
        {projects.map((project, i) => (
          <Reveal key={project.slug} delay={i * 90}>
            <article className={styles.project}>
              <Link
                href={`/projetos/${project.slug}`}
                className={styles.visual}
                aria-label={`Ver case de ${project.title}`}
              >
                <Image
                  src={project.image}
                  alt={`Captura de tela do site ${project.title}`}
                  fill
                  sizes="(max-width: 820px) 100vw, 620px"
                  className={styles.image}
                  quality={92}
                  priority={i === 0}
                />
              </Link>

              <div className={styles.body}>
                <Link href={`/projetos/${project.slug}`} className={styles.top}>
                  <span className={styles.number}>{project.number}</span>
                  <h3 className={styles.title}>{project.title}</h3>
                </Link>
                <span className={styles.category}>{project.category}</span>
                <p className={styles.description}>{project.description}</p>

                <div className={styles.tags}>
                  {project.technologies.map((tech) => (
                    <span key={tech} className={styles.tag}>
                      {tech}
                    </span>
                  ))}
                </div>

                <div className={styles.footer}>
                  <Link
                    href={`/projetos/${project.slug}`}
                    className="btn btnGhost"
                  >
                    Ver case completo ↗
                  </Link>
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
