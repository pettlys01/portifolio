import { projects } from "@/data/projects";
import ProjectIndex from "./ProjectIndex";
import ProjectTile from "./ProjectTile";
import styles from "./Work.module.css";

/* Uma fileira só, correndo, com todos os cards na proporção dos prints
   (16:10). Embaixo, o índice dos projetos: nome, tipo e acesso ao case. */
export default function Work() {
  return (
    <section id="work" className={styles.section}>
      <h2 className={styles.label}>Projetos em destaque</h2>
      <div className={styles.row}>
        <div className={styles.track}>
          {[0, 1].map((copy) => (
            <div key={copy} className={styles.group} aria-hidden={copy === 1 || undefined}>
              {projects.map((project) => (
                <ProjectTile key={project.slug} project={project} duplicate={copy === 1} />
              ))}
            </div>
          ))}
        </div>
      </div>
      <ProjectIndex />
    </section>
  );
}
