"use client";

import { useRef, type MouseEvent } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./Work.module.css";

export default function ProjectVisual({
  href,
  src,
  alt,
  priority = false,
}: {
  href: string;
  src: string;
  alt: string;
  priority?: boolean;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const reduceMotion = useRef(false);

  function handleEnter() {
    reduceMotion.current =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }

  function handleMove(e: MouseEvent<HTMLAnchorElement>) {
    const el = ref.current;
    if (!el || reduceMotion.current) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transition = "transform 0.1s ease-out";
    el.style.transform = `perspective(1000px) rotateX(${py * -4}deg) rotateY(${
      px * 6
    }deg) scale(1.012)`;
  }

  function handleLeave() {
    const el = ref.current;
    if (!el) return;
    el.style.transition = "transform 0.5s ease";
    el.style.transform = "";
  }

  return (
    <Link
      ref={ref}
      href={href}
      className={styles.visual}
      onMouseEnter={handleEnter}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 880px) 100vw, 1200px"
        className={styles.image}
        priority={priority}
        quality={92}
      />
    </Link>
  );
}
