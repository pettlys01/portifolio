"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./HeroShader.module.css";

/* Shader WebGL2 escrito à mão (fbm com domain warping, técnica do
   Inigo Quilez) — sem lib nenhuma. Pra um fullscreen shader único
   isso já É o que uma lib como OGL geraria de boilerplate; adicionar
   dependência aqui seria peso sem função. Única exceção deliberada
   à regra de "cor só no trabalho real": roxo, contido a este
   elemento, do mesmo jeito que o btnGlow fica restrito a um CTA. */

const VERT_SRC = `#version 300 es
void main() {
  vec2 pos = vec2((gl_VertexID << 1) & 2, gl_VertexID & 2);
  gl_Position = vec4(pos * 2.0 - 1.0, 0.0, 1.0);
}`;

const FRAG_SRC = `#version 300 es
precision highp float;

uniform vec2 uResolution;
uniform float uTime;
uniform vec2 uMouse;

out vec4 fragColor;

vec2 hash2(vec2 p) {
  p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
  return -1.0 + 2.0 * fract(sin(p) * 43758.5453123);
}

float vnoise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  float a = dot(hash2(i + vec2(0.0, 0.0)), f - vec2(0.0, 0.0));
  float b = dot(hash2(i + vec2(1.0, 0.0)), f - vec2(1.0, 0.0));
  float c = dot(hash2(i + vec2(0.0, 1.0)), f - vec2(0.0, 1.0));
  float d = dot(hash2(i + vec2(1.0, 1.0)), f - vec2(1.0, 1.0));
  return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}

float fbm(vec2 p, int octaves) {
  float v = 0.0;
  float amp = 0.5;
  mat2 rot = mat2(0.8, 0.6, -0.6, 0.8);
  for (int i = 0; i < 6; i++) {
    if (i >= octaves) break;
    v += amp * vnoise(p);
    p = rot * p * 2.0 + vec2(3.1, 1.7);
    amp *= 0.55;
  }
  return v;
}

vec3 palette(float t, vec3 ink, vec3 deep, vec3 mist, vec3 electric, vec3 spark) {
  vec3 col = mix(ink, deep, smoothstep(0.0, 0.55, t));
  col = mix(col, mist, smoothstep(0.45, 0.75, t));
  col = mix(col, electric, smoothstep(0.7, 0.92, t));
  col = mix(col, spark, smoothstep(0.9, 1.05, t));
  return col;
}

void main() {
  vec2 uv = (gl_FragCoord.xy - 0.5 * uResolution.xy) / uResolution.y;

  vec3 ink      = vec3(0.020, 0.008, 0.031);
  vec3 deep     = vec3(0.180, 0.063, 0.396);
  vec3 mist     = vec3(0.298, 0.208, 0.459);
  vec3 electric = vec3(0.486, 0.227, 0.929);
  vec3 spark    = vec3(0.929, 0.914, 0.988);

  float t = uTime;
  vec2 mouseOffset = uMouse * 0.07;

  vec2 p = uv * vec2(1.6, 2.0);
  p += vec2(0.3, -0.15) * t;
  p.x += 0.35 * sin(uv.y * 1.3 + t * 0.12);
  vec2 q = vec2(fbm(p + mouseOffset, 5), fbm(p + vec2(5.2, 1.3) + mouseOffset, 5));
  vec2 r = vec2(
    fbm(p + 3.2 * q + vec2(1.7, 9.2) + 0.09 * t, 5),
    fbm(p + 3.2 * q + vec2(8.3, 2.8) + 0.07 * t, 5)
  );
  float field = fbm(p + 3.2 * r, 6);
  field = smoothstep(-0.35, 0.75, field);
  float vig = 1.0 - smoothstep(0.35, 1.25, length(uv * vec2(0.85, 1.05)));

  vec3 col = palette(field * vig, ink, deep, mist, electric, spark);
  col = mix(ink, col, vig);

  fragColor = vec4(col, 1.0);
}`;

function supportsWebGL2() {
  try {
    return !!document.createElement("canvas").getContext("webgl2");
  } catch {
    return false;
  }
}

function compile(gl: WebGL2RenderingContext, type: number, src: string) {
  const shader = gl.createShader(type)!;
  gl.shaderSource(shader, src);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error(gl.getShaderInfoLog(shader));
  }
  return shader;
}

export default function HeroShader() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [supported, setSupported] = useState(false);

  useEffect(() => {
    setSupported(supportsWebGL2());
  }, []);

  useEffect(() => {
    if (!supported) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl2", { antialias: false, alpha: false });
    if (!gl) return;

    const program = gl.createProgram()!;
    gl.attachShader(program, compile(gl, gl.VERTEX_SHADER, VERT_SRC));
    gl.attachShader(program, compile(gl, gl.FRAGMENT_SHADER, FRAG_SRC));
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error(gl.getProgramInfoLog(program));
      return;
    }
    gl.useProgram(program);

    const uResolution = gl.getUniformLocation(program, "uResolution");
    const uTime = gl.getUniformLocation(program, "uTime");
    const uMouse = gl.getUniformLocation(program, "uMouse");

    const dpr = Math.min(window.devicePixelRatio || 1, 1.75);

    function resize() {
      if (!canvas) return;
      const w = Math.max(1, Math.floor(canvas.clientWidth * dpr));
      const h = Math.max(1, Math.floor(canvas.clientHeight * dpr));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        gl!.viewport(0, 0, w, h);
      }
    }

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    const mouseTarget = [0, 0];
    const mouseSmooth = [0, 0];

    function handlePointerMove(e: PointerEvent) {
      mouseTarget[0] = (e.clientX / window.innerWidth) * 2 - 1;
      mouseTarget[1] = -((e.clientY / window.innerHeight) * 2 - 1);
    }
    window.addEventListener("pointermove", handlePointerMove);

    /* Perda de contexto acontece de verdade em celular sob pressão de
       memória (troca de app, várias abas). Sem isso, o canvas trava
       num frame parado pra sempre, sem cair pro fallback. */
    function handleContextLost(e: Event) {
      e.preventDefault();
      cancelAnimationFrame(rafId);
      setSupported(false);
    }
    canvas.addEventListener("webglcontextlost", handleContextLost);

    const reduceMotionMQ = window.matchMedia("(prefers-reduced-motion: reduce)");
    let animClock = 0;
    let lastFrame = performance.now();
    let rafId = 0;

    function frame(now: number) {
      try {
        const dt = Math.min(0.05, (now - lastFrame) / 1000);
        lastFrame = now;

        if (!reduceMotionMQ.matches) {
          animClock += dt * 0.6;
        }

        mouseSmooth[0] += (mouseTarget[0] - mouseSmooth[0]) * 0.03;
        mouseSmooth[1] += (mouseTarget[1] - mouseSmooth[1]) * 0.03;

        gl!.uniform2f(uResolution, canvas!.width, canvas!.height);
        gl!.uniform1f(uTime, animClock);
        gl!.uniform2f(uMouse, mouseSmooth[0], mouseSmooth[1]);
        gl!.drawArrays(gl!.TRIANGLES, 0, 3);

        rafId = requestAnimationFrame(frame);
      } catch (err) {
        /* Um erro aqui não pode simplesmente parar o loop e deixar o
           canvas congelado sem explicação — cai pro fallback estático. */
        console.error("HeroShader: falha no loop de render, caindo pro fallback.", err);
        setSupported(false);
      }
    }
    rafId = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(rafId);
      canvas.removeEventListener("webglcontextlost", handleContextLost);
      ro.disconnect();
      window.removeEventListener("pointermove", handlePointerMove);
      gl.deleteProgram(program);
    };
  }, [supported]);

  if (!supported) {
    return <div className={styles.fallback} aria-hidden="true" />;
  }

  return <canvas ref={canvasRef} className={styles.canvas} />;
}
