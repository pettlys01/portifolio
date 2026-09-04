"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FEATURED_COUNT, projects } from "@/data/projects";
import Reveal from "./Reveal";
import SectionIntro from "./SectionIntro";
import styles from "./Work.module.css";

export default function Work() {
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? projects : projects.slice(0, FEATURED_COUNT);
  const hiddenCount = projects.length - FEATURED_COUNT;

  // Ao fechar, a lista encolhe e a rolagem "sobra" acima do que o usuário
  // estava vendo — sem isso o botão "Ver mais" reaparece longe do clique.
  // Guardamos onde ele deve pousar (o topo do próprio botão) antes de
  // colapsar o estado.
  const moreRef = useRef<HTMLDivElement>(null);
  function handleCollapse() {
    setShowAll(false);
    requestAnimationFrame(() => {
      moreRef.current?.scrollIntoView({ block: "center" });
    });
  }

  return (
    <section id="work" className={styles.section}>
      <SectionIntro
        title="Categorias diferentes, o mesmo problema central."
        lead="Elevador, clínica, guincho ou salgado — o produto muda. A pergunta que o design precisa responder primeiro não muda: por que essa pessoa deveria confiar agora?"
      />

      <div className={styles.list}>
        {visible.map((project, i) => (
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
                {/* Dimensões intrínsecas em vez de `fill`: a própria
                    imagem dá altura à caixa. Com `fill` a altura
                    dependia de aspect-ratio, e se a imagem falhasse a
                    caixa colapsava para uma barra fina. */}
                <span className={styles.desktop}>
                  <Image
                    src={project.image}
                    alt={`Site ${project.title} no desktop`}
                    width={1600}
                    height={1200}
                    sizes="(max-width: 900px) 100vw, 760px"
                    className={styles.desktopImg}
                    priority={i === 0}
                  />
                </span>

                <span className={styles.phone}>
                  <Image
                    src={project.imageMobile}
                    alt={`Site ${project.title} no celular`}
                    width={720}
                    height={1440}
                    sizes="220px"
                    className={styles.phoneImg}
                  />
                </span>
              </Link>

              <div className={styles.info}>
                <div className={styles.infoTop}>
                  <span className={styles.number}>{project.number}</span>
                  {i >= FEATURED_COUNT && (
                    <button
                      type="button"
                      className={styles.close}
                      onClick={handleCollapse}
                      aria-label={`Fechar ${project.title} e voltar aos projetos principais`}
                    >
                      <span aria-hidden="true">×</span>
                    </button>
                  )}
                </div>

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

      {!showAll && hiddenCount > 0 && (
        <div className={styles.more} ref={moreRef}>
          <button
            type="button"
            className="btn btnGhost"
            onClick={() => setShowAll(true)}
          >
            Ver mais projetos
            <span className={styles.moreArrow} aria-hidden="true">
              ↓
            </span>
          </button>
        </div>
      )}
    </section>
  );
}
