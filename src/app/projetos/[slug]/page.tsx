import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ScrollShot from "@/components/ScrollShot";
import Contact from "@/components/Contact";
import GrowMedia from "@/components/GrowMedia";
import Nav from "@/components/Nav";
import ProjectTile from "@/components/ProjectTile";
import Reveal from "@/components/Reveal";
import SiteFooter from "@/components/SiteFooter";
import { projects, shotsFor } from "@/data/projects";
import styles from "./case.module.css";

type Params = { slug: string };

const TAG_COLORS = ["var(--band-1)", "var(--band-2)", "var(--band-3)", "var(--band-4)"];

function listPt(items: string[]) {
  if (items.length < 2) return items.join("");
  return `${items.slice(0, -1).join(", ")} e ${items[items.length - 1]}`;
}

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};

  return {
    title: `${project.title} — Mirai`,
    description: project.description,
  };
}

/**
 * Página de case no formato da referência: abertura clara com título
 * em itálico e tags coloridas, imagem que cresce ao rolar, texto
 * editorial, bloco escuro com o resultado, o site rodando no desktop
 * e outros projetos. Todo o texto vem de data/projects.ts.
 */
export default async function ProjectPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  const shots = shotsFor(project.slug);
  const categories = project.category.split("·").map((c) => c.trim());
  const tags = [...categories, ...project.technologies];
  const host = new URL(project.url).hostname;
  const others = projects.filter((p) => p.slug !== project.slug);

  return (
    <>
      <Nav tone="light" />
      <main>
        <div className={styles.paper}>
          <header className={`container ${styles.head}`}>
            <Link href="/#work" className={styles.back}>
              ← Projetos
            </Link>
            <h1 className={styles.title}>
              <em>{project.title}</em>
              <span>{categories.join(" — ")}</span>
            </h1>
            <ul className={styles.tags}>
              {tags.map((tag, i) => (
                <li key={tag} style={{ background: TAG_COLORS[i % TAG_COLORS.length] }}>
                  {tag}
                </li>
              ))}
            </ul>
          </header>

          <GrowMedia>
            <Image
              src={project.image}
              alt={`Site ${project.title} no desktop`}
              width={1600}
              height={1200}
              sizes="100vw"
              priority
            />
          </GrowMedia>

          <section className={`container ${styles.intro}`}>
            <Reveal>
              <span className={`eyebrow ${styles.eyebrowInk}`}>{`{ ${project.category} }`}</span>
              <p className={styles.introLead}>{project.description}</p>
            </Reveal>
            <div className={styles.introCols}>
              <Reveal delay={80}>
                <h2 className={styles.colLabel}>O desafio</h2>
                <p>{project.challenge}</p>
              </Reveal>
              <Reveal delay={160}>
                <h2 className={styles.colLabel}>A direção</h2>
                <p>{project.approach}</p>
              </Reveal>
            </div>
          </section>
        </div>

        <section className={styles.dark}>
          <div className={`container ${styles.resultGrid}`}>
            <Reveal className={styles.phoneCol}>
              <div className={styles.phone}>
                <ScrollShot src={shots.mobile} label={`Site ${project.title} no celular`} duration={18} />
              </div>
            </Reveal>
            <Reveal delay={100}>
              <span className={`eyebrow ${styles.eyebrowViolet}`}>{"{ O resultado }"}</span>
              <h2 className={styles.resultTitle}>{project.result}</h2>
              <ul className={styles.checks}>
                <li>Construído com {listPt(project.technologies)}</li>
                <li>Versão para desktop e celular</li>
                <li>No ar em {host}</li>
              </ul>
              <a className="btnPill" href={project.url} target="_blank" rel="noopener noreferrer">
                Abrir o site
                <span className="pillArrow" aria-hidden="true">
                  ↗
                </span>
              </a>
            </Reveal>
          </div>
        </section>

        <div className={styles.paper}>
          <section className={`container ${styles.gallery}`}>
            <Reveal>
              <span className={`eyebrow ${styles.eyebrowInk}`}>{"{ No desktop }"}</span>
            </Reveal>
            <Reveal delay={80}>
              <div className={styles.browser}>
                <div className={styles.browserBar} aria-hidden="true">
                  <i />
                  <i />
                  <i />
                  <span>{host}</span>
                </div>
                <div className={styles.browserScreen}>
                  <ScrollShot src={shots.desktop} label={`Site ${project.title} no computador`} duration={16} />
                </div>
              </div>
            </Reveal>
          </section>
        </div>

        <section className={styles.more}>
          <div className="container">
            <h2 className={styles.moreTitle}>Outros projetos</h2>
            <div className={styles.moreGrid}>
              {others.map((other) => (
                <ProjectTile key={other.slug} project={other} layout="grid" />
              ))}
            </div>
          </div>
        </section>

        <Contact />
      </main>
      <SiteFooter />
    </>
  );
}
