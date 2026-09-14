import Image from "next/image";
import Link from "next/link";
import { projects } from "@/data/projects";
import { DIRECT_MESSAGE, whatsAppUrl } from "@/lib/contact";
import styles from "./SiteFooter.module.css";

export default function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.top}>
          <div className={styles.connect}>
            <h2 className={styles.big}>
              Vamos
              <br />
              conversar
            </h2>
            <p>Me conta o que o seu negócio faz e o que o site precisa resolver.</p>
            <a className="btnPill" href={whatsAppUrl(DIRECT_MESSAGE)} target="_blank" rel="noopener noreferrer">
              Chamar no WhatsApp
              <span className="pillArrow" aria-hidden="true">
                ↗
              </span>
            </a>
          </div>

          <nav className={styles.cols} aria-label="Rodapé">
            <div>
              <h3>Projetos</h3>
              <ul>
                {projects.map((project) => (
                  <li key={project.slug}>
                    <Link href={`/projetos/${project.slug}`}>{project.title}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3>Serviços</h3>
              <ul>
                <li>
                  <Link href="/#services">Redesign</Link>
                </li>
                <li>
                  <Link href="/#services">Site institucional</Link>
                </li>
                <li>
                  <Link href="/#services">Landing page</Link>
                </li>
              </ul>
            </div>
            <div>
              <h3>Estúdio</h3>
              <ul>
                <li>
                  <Link href="/#process">Processo</Link>
                </li>
                <li>
                  <Link href="/#contact">Contato</Link>
                </li>
                <li>
                  <a href="https://github.com/pettlys01" target="_blank" rel="noopener noreferrer">
                    GitHub
                  </a>
                </li>
              </ul>
            </div>
          </nav>
        </div>

        <div className={styles.bottom}>
          <Image src="/mirai-mark-light.png" alt="Mirai" width={421} height={177} />
          <span>Design e desenvolvimento para negócios que querem se destacar.</span>
          <span className={styles.copy}>© {year} Mirai</span>
        </div>
      </div>
    </footer>
  );
}
