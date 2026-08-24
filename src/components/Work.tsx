import Image from "next/image";
import Link from "next/link";
import { projects } from "@/data/projects";
import Reveal from "./Reveal";
import SectionIntro from "./SectionIntro";
import styles from "./Work.module.css";

export default function Work() {
  return (
    <section id="work" className={styles.section}>
      <SectionIntro
        title="Dois projetos, dois problemas diferentes."
        lead="Um precisava provar competência técnica. O outro, ganhar confiança antes da primeira visita."
      />

      <div className={styles.list}>
        {projects.map((project, i) => (
          <Reveal key={project.slug}>
            <article
              className={`${styles.project} ${i % 2 === 1 ? styles.flipped : ""}`}
            >
              {/* Desktop + celular na mesma composição: mostra que o
                  site foi construído para os dois, sem precisar dizer. */}
              <Link
                href={`/projetos/${project.slug}`}
                className={styles.visual}
                aria-label={`Ver case de ${project.title}`}
              >
                <span className={styles.desktop}>
                  <Image
                    src={project.image}
                    alt={`Site ${project.title} no desktop`}
                    fill
                    sizes="(max-width: 900px) 100vw, 760px"
                    className={styles.desktopImg}
                    quality={92}
                    priority={i === 0}
                  />
                </span>

                <span className={styles.phone}>
                  <Image
                    src={project.imageMobile}
                    alt={`Site ${project.title} no celular`}
                    fill
                    sizes="200px"
                    className={styles.phoneImg}
                    quality={92}
                  />
                </span>
              </Link>

              <div className={styles.info}>
                <span className={styles.number}>{project.number}</span>

                <Link href={`/projetos/${project.slug}`}>
                  <h3 className={styles.title}>{project.title}</h3>
                </Link>

                <span className={styles.category}>{project.category}</span>

                <p className={styles.description}>{project.description}</p>

                <dl className={styles.meta}>
                  <div>
                    <dt>Desafio</dt>
                    <dd>{project.challenge}</dd>
                  </div>
                </dl>

                <div className={styles.tags}>
                  {project.technologies.map((tech) => (
                    <span key={tech} className={styles.tag}>
                      {tech}
                    </span>
                  ))}
                </div>

                <div className={styles.actions}>
                  <Link
                    href={`/projetos/${project.slug}`}
                    className="btn btnPrimary"
                  >
                    Ver case completo
                    <span className="arrow" aria-hidden="true">
                      ↗
                    </span>
                  </Link>
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btnGhost"
                  >
                    Abrir site
                  </a>
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
