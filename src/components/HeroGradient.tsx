"use client";

import { GrainGradient } from "@paper-design/shaders-react";
import styles from "./HeroGradient.module.css";

export default function HeroGradient() {
  return (
    <div className={styles.wrap} aria-hidden="true">
      <GrainGradient
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
        colors={["#eef0fc", "#cdd3f7", "#f3d9cd", "#e2795a"]}
        colorBack="#ffffff"
        softness={0.9}
        intensity={0.35}
        noise={0.1}
        shape="wave"
        scale={1.1}
        speed={0.4}
      />
    </div>
  );
}
