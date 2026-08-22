import Reveal from "./Reveal";
import styles from "./Stack.module.css";

/* Os símbolos referenciam a marca real de cada tecnologia
   (quadrado amarelo do JS, quadrado azul do TS, átomo do React,
   triângulo do Next/Vercel) em vez de ícones decorativos. */
const groups = [
  {
    label: "Base",
    items: [
      { glyph: "🧱", name: "HTML", role: "Estrutura semântica — a base do SEO e da acessibilidade." },
      { glyph: "🎨", name: "CSS", role: "Layout, grid e responsividade, sem framework pesado por padrão." },
      { glyph: "🟨", name: "JavaScript", role: "Comportamento e interações, aplicado onde agrega." },
    ],
  },
  {
    label: "Quando o projeto pede",
    items: [
      { glyph: "🟦", name: "TypeScript", role: "Tipagem estática em projetos que vão crescer." },
      { glyph: "⚛️", name: "React", role: "Interfaces com estado e componentes reaproveitáveis." },
      { glyph: "▲", name: "Next.js", role: "Renderização estática, rotas e otimização de imagem." },
    ],
  },
  {
    label: "Entrega e operação",
    items: [
      { glyph: "🌿", name: "Git", role: "Versionamento — todo projeto com histórico rastreável." },
      { glyph: "▲", name: "Vercel", role: "Deploy contínuo, HTTPS e CDN global inclusos." },
      { glyph: "📊", name: "Analytics", role: "Medição de tráfego para decidir com dado, não achismo." },
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
                    <span className={styles.glyph} aria-hidden="true">
                      {item.glyph}
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
