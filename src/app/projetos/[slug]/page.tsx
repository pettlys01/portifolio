import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import Nav from "@/components/Nav";
import { projects } from "@/data/projects";
import styles from "./page.module.css";

type Params = { slug: string };

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};

  return {
    title: `${project.title} — LCS`,
    description: project.description,
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  return (
    <>
      <Nav />
      <main>
        <header className={styles.header}>
          <Link href="/#work" className={styles.back}>
            ← Projetos
          </Link>
        </header>

        <div className={styles.intro}>
          <div>
            <span className={styles.number}>{project.number}</span>
            <h1 className={styles.title}>{project.title}</h1>
            <p className={styles.category}>{project.category}</p>
          </div>
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`btn btnPrimary ${styles.visitLink}`}
          >
            Visitar site <span className="arrow" aria-hidden="true">↗</span>
          </a>
        </div>

        <div className={styles.heroImage}>
          <Image
            src={project.image}
            alt={`Captura de tela do site ${project.title}`}
            fill
            sizes="100vw"
            quality={92}
            priority
          />
        </div>

        <div className={styles.details}>
          <div className={styles.detail}>
            <h2>O desafio</h2>
            <p>{project.challenge}</p>
          </div>
          <div className={styles.detail}>
            <h2>Direção</h2>
            <p>{project.approach}</p>
          </div>
          <div className={styles.detail}>
            <h2>Resultado</h2>
            <p>{project.result}</p>
          </div>
        </div>

        <div className={styles.footerRow}>
          <span className={styles.technologies}>
            {project.technologies.map((tech) => (
              <span key={tech} className={styles.tag}>
                {tech}
              </span>
            ))}
          </span>
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btnGhost"
          >
            Visitar site <span className="arrow" aria-hidden="true">↗</span>
          </a>
        </div>

        <CTA />
      </main>
      <Footer />
    </>
  );
}
