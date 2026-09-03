import Image from "next/image";
import styles from "./Footer.module.css";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.brand}>
        {/* Footer fica sempre sobre o fundo escuro da página (nunca
            sobre a seção clara de Serviços, que termina bem antes) —
            mirai-mark-light sem precisar de troca condicional aqui. */}
        <Image src="/mirai-mark-light.png" alt="Mirai" width={421} height={177} className={styles.mark} />
        <span className={styles.tagline}>Design e desenvolvimento para negócios que querem se destacar.</span>
      </div>
      <div className={styles.right}>
        <div className={styles.links}>
          <a href="https://github.com/pettlys01" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          <a href="#work">Trabalhos</a>
          <a href="#contact">Contato</a>
        </div>
        <span>© {year} Mirai</span>
      </div>
    </footer>
  );
}
