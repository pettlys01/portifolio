import Reveal from "./Reveal";
import TechIcon, { type TechSlug } from "./TechIcon";
import styles from "./Stack.module.css";

const groups: {
  label: string;
  items: { slug: TechSlug; name: string; role: string }[];
}[] = [
  {
    label: "Base",
    items: [
      {
        slug: "html5",
        name: "HTML",
        role: "Estrutura semântica — a base do SEO e da acessibilidade.",
      },
      {
        slug: "css",
        name: "CSS",
        role: "Layout, grid e responsividade, sem framework pesado por padrão.",
      },
      {
        slug: "javascript",
        name: "JavaScript",
        role: "Comportamento e interações, aplicado onde agrega.",
      },
    ],
  },
  {
    label: "Quando o projeto pede",
    items: [
      {
        slug: "typescript",
        name: "TypeScript",
        role: "Tipagem estática em projetos que vão crescer.",
      },
      {
        slug: "react",
        name: "React",
        role: "Interfaces com estado e componentes reaproveitáveis.",
      },
      {
        slug: "nextjs",
        name: "Next.js",
        role: "Renderização estática, rotas e otimização de imagem.",
      },
    ],
  },
  {
    label: "Entrega e operação",
    items: [
      {
        slug: "git",
        name: "Git",
        role: "Versionamento — todo projeto com histórico rastreável.",
      },
      {
        slug: "vercel",
        name: "Vercel",
        role: "Deploy contínuo, HTTPS e CDN global inclusos.",
      },
      {
        slug: "analytics",
        name: "Analytics",
        role: "Medição de tráfego para decidir com dado, não achismo.",
      },
    ],
  },
];

export default function Stack() {
  return (
    <section id="stack" className={styles.section}>
      <Reveal>
        <div className={styles.heading}>
          <span className="sectionLabel">Stack</span>
          <span className={styles.headingRule} />
        </div>
        <h2 className={styles.headingTitle}>Ferramenta serve ao projeto.</h2>
        <p className={styles.headingBody}>
          Nem todo site precisa de framework. Um institucional de cinco
          páginas roda melhor em HTML, CSS e JavaScript diretos do que numa
          stack que só adiciona peso. A escolha vem do problema.
        </p>
      </Reveal>

      <div className={styles.groups}>
        {groups.map((group, i) => (
          <Reveal key={group.label} delay={i * 80}>
            <div className={styles.group}>
              <h3>{group.label}</h3>
              <ul className={styles.items}>
                {group.items.map((item) => (
                  <li key={item.name} className={styles.item}>
                    <span className={styles.glyph}>
                      <TechIcon slug={item.slug} size={24} />
                    </span>
                    <span>
                      <span className={styles.name}>{item.name}</span>
                      <span className={styles.role}>{item.role}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
