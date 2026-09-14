"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./Ambient.module.css";

/* Evolução do shader do hero (duas fitas com fbm + domain warping),
   agora fixo atrás da página inteira, mais suave e com mais cor —
   o equivalente Mirai do "C" girando desfocado da referência. Roda em
   resolução baixa (1/4 da tela): as fitas são suaves, então a
   ampliação não perde nada e o custo de GPU cai muito. */

const VERT_SRC = `#version 300 es
void main() {
  vec2 pos = vec2((gl_VertexID << 1) & 2, gl_VertexID & 2);
  gl_Position = vec4(pos * 2.0 - 1.0, 0.0, 1.0);
}`;

const FRAG_SRC = `#version 300 es
precision mediump float;

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
  float a = dot(hash2(i), f);
  float b = dot(hash2(i + vec2(1.0, 0.0)), f - vec2(1.0, 0.0));
  float c = dot(hash2(i + vec2(0.0, 1.0)), f - vec2(0.0, 1.0));
  float d = dot(hash2(i + vec2(1.0, 1.0)), f - vec2(1.0, 1.0));
  return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}

float fbm(vec2 p) {
  float v = 0.0;
  float amp = 0.5;
  mat2 rot = mat2(0.8, 0.6, -0.6, 0.8);
  for (int i = 0; i < 3; i++) {
    v += amp * vnoise(p);
    p = rot * p * 2.0 + vec2(3.1, 1.7);
    amp *= 0.55;
  }
  return v;
}

mat2 rot2(float a) {
  float c = cos(a);
  float s = sin(a);
  return mat2(c, -s, s, c);
}

void main() {
  vec2 uv = (gl_FragCoord.xy - 0.5 * uResolution.xy) / uResolution.y;
  float t = uTime;
  uv = rot2(t * 0.035) * uv;

  float aspect = uResolution.x / uResolution.y;
  float nx = uv.x / max(aspect, 0.75);
  vec2 m = uMouse * 0.06;

  float w1 = fbm(uv * 0.55 + m + vec2(0.0, t * 0.06));
  float y1 = -0.1 + nx * 0.8 + sin(t * 0.08 + nx * 1.7) * 0.24 + (w1 - 0.5) * 0.7;
  float b1 = 1.0 - smoothstep(0.0, 0.42, abs(uv.y - y1));

  float w2 = fbm(uv * 0.5 - m + vec2(3.0, -t * 0.045));
  float y2 = 0.2 - nx * 0.7 + cos(t * 0.07 + nx * 2.2) * 0.22 + (w2 - 0.5) * 0.6;
  float b2 = 1.0 - smoothstep(0.0, 0.36, abs(uv.y - y2));

  vec3 violet = vec3(0.49, 0.23, 0.93);
  vec3 blue = vec3(0.22, 0.62, 0.95);
  vec3 pink = vec3(0.93, 0.36, 0.68);
  vec3 amber = vec3(0.95, 0.68, 0.30);
  vec3 c1 = mix(violet, blue, smoothstep(-0.6, 0.6, nx + 0.3 * sin(t * 0.1)));
  vec3 c2 = mix(pink, amber, smoothstep(-0.5, 0.7, -nx + 0.25 * cos(t * 0.09)));

  float vig = 1.0 - smoothstep(0.35, 1.25, length(uv * vec2(0.85, 1.0)));
  vec3 ink = vec3(0.059, 0.059, 0.067);
  vec3 col = ink + (c1 * pow(b1, 1.6) * 0.85 + c2 * pow(b2, 1.8) * 0.55) * vig;
  fragColor = vec4(col, 1.0);
}`;

const SCALE = 0.25;

function compile(gl: WebGL2RenderingContext, type: number, src: string) {
  const shader = gl.createShader(type)!;
  gl.shaderSource(shader, src);
  gl.compileShader(shader);
  return shader;
}

export default function Ambient() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [fallback, setFallback] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let gl: WebGL2RenderingContext | null = null;
    try {
      gl = canvas.getContext("webgl2", { antialias: false, alpha: false, powerPreference: "low-power" });
    } catch {
      gl = null;
    }
    if (!gl) {
      setFallback(true);
      return;
    }

    const program = gl.createProgram()!;
    gl.attachShader(program, compile(gl, gl.VERTEX_SHADER, VERT_SRC));
    gl.attachShader(program, compile(gl, gl.FRAGMENT_SHADER, FRAG_SRC));
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      setFallback(true);
      return;
    }
    gl.useProgram(program);

    const uResolution = gl.getUniformLocation(program, "uResolution");
    const uTime = gl.getUniformLocation(program, "uTime");
    const uMouse = gl.getUniformLocation(program, "uMouse");

    function resize() {
      if (!canvas || !gl) return;
      const w = Math.max(64, Math.round(window.innerWidth * SCALE));
      const h = Math.max(64, Math.round(window.innerHeight * SCALE));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        gl.viewport(0, 0, w, h);
      }
    }
    resize();
    window.addEventListener("resize", resize);

    const mouseTarget = [0, 0];
    const mouse = [0, 0];
    function onPointer(e: PointerEvent) {
      mouseTarget[0] = (e.clientX / window.innerWidth) * 2 - 1;
      mouseTarget[1] = -((e.clientY / window.innerHeight) * 2 - 1);
    }
    window.addEventListener("pointermove", onPointer);

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    let clock = 12;
    let last = performance.now();
    let acc = 0;
    let raf = 0;

    function render() {
      if (!gl || !canvas) return;
      gl.uniform2f(uResolution, canvas.width, canvas.height);
      gl.uniform1f(uTime, clock);
      gl.uniform2f(uMouse, mouse[0], mouse[1]);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    }

    /* 30 quadros por segundo bastam para um fundo desfocado lento — e
       economizam bateria no celular. */
    function frame(now: number) {
      raf = requestAnimationFrame(frame);
      const dt = Math.min(0.1, (now - last) / 1000);
      last = now;
      acc += dt;
      if (acc < 1 / 30) return;
      clock += acc * 0.55;
      acc = 0;
      mouse[0] += (mouseTarget[0] - mouse[0]) * 0.08;
      mouse[1] += (mouseTarget[1] - mouse[1]) * 0.08;
      try {
        render();
      } catch {
        cancelAnimationFrame(raf);
        setFallback(true);
      }
    }

    function startLoop() {
      cancelAnimationFrame(raf);
      if (reduce.matches) {
        render();
        return;
      }
      last = performance.now();
      raf = requestAnimationFrame(frame);
    }

    function onVisibility() {
      if (document.hidden) cancelAnimationFrame(raf);
      else startLoop();
    }
    document.addEventListener("visibilitychange", onVisibility);

    function onContextLost(e: Event) {
      e.preventDefault();
      cancelAnimationFrame(raf);
      setFallback(true);
    }
    canvas.addEventListener("webglcontextlost", onContextLost);

    startLoop();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointer);
      document.removeEventListener("visibilitychange", onVisibility);
      canvas.removeEventListener("webglcontextlost", onContextLost);
      gl?.deleteProgram(program);
    };
  }, []);

  return (
    <div className={styles.ambient} aria-hidden="true">
      {fallback ? <div className={styles.fallback} /> : <canvas ref={canvasRef} className={styles.canvas} />}
      <div className={styles.dim} />
    </div>
  );
}
