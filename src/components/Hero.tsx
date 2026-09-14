import TechIcon, { type TechSlug } from "./TechIcon";
import styles from "./Hero.module.css";

/* No lugar do "As featured in" da referência (a Mirai não tem imprensa
   pra citar): as ferramentas com que os sites são construídos. */
const TOOLS: { slug: TechSlug; name: string }[] = [
  { slug: "html5", name: "HTML" },
  { slug: "css", name: "CSS" },
  { slug: "javascript", name: "JavaScript" },
  { slug: "typescript", name: "TypeScript" },
  { slug: "react", name: "React" },
  { slug: "nextjs", name: "Next.js" },
  { slug: "vercel", name: "Vercel" },
  { slug: "git", name: "Git" },
];

export default function Hero() {
  return (
    <section id="hero" className={styles.hero}>
      <div className={styles.inner}>
        {/* Título diagramado: três linhas em posições diferentes, uma
            linha fina dentro do texto e o fecho em itálico à direita.
            O aria-label lê a frase inteira; as linhas são só desenho. */}
        <h1 className={styles.title} aria-label="Sites que fazem negócios parecerem maiores.">
          <span className={`${styles.line} ${styles.l1}`} aria-hidden="true">
            <span>Sites que fazem</span>
          </span>
          <span className={`${styles.line} ${styles.l2}`} aria-hidden="true">
            <span>
              negócios <i className={styles.rule} />
            </span>
          </span>
          <span className={`${styles.line} ${styles.l3}`} aria-hidden="true">
            <span>
              <em>parecerem maiores.</em>
            </span>
          </span>
        </h1>

        <div className={styles.aside}>
          <p>
            Design, desenvolvimento e performance sob o mesmo teto — para empresas que precisam de
            um site à altura do que já construíram.
          </p>
          <a href="#work" className="btnPill">
            Ver projetos
            <span className="pillArrow" aria-hidden="true">
              ↗
            </span>
          </a>
        </div>
      </div>

      <div className={styles.tools}>
        <span className={styles.toolsLabel}>Construído com</span>
        <div className={styles.toolsViewport}>
          <div className={styles.toolsTrack}>
            {[0, 1].map((copy) => (
              <ul key={copy} className={styles.toolsGroup} aria-hidden={copy === 1 || undefined}>
                {TOOLS.map((tool) => (
                  <li key={tool.slug}>
                    <TechIcon slug={tool.slug} size={22} mono />
                    {tool.name}
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
