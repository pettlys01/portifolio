// Gera no ComfyUI local as imagens da seção "Nenhum site sai de molde
// pronto" (objetos 3D recortados) e das faixas de serviço, e converte pra
// webp em public/. Requer o ComfyUI Desktop aberto (porta 8188).
//
// uso: node tools/gen-art.mjs <pasta-dos-png-brutos> [nome ...]
import { execFileSync } from "node:child_process";
import { mkdirSync } from "node:fs";
import path from "node:path";

const COMFY = "C:/Users/Lucas/Documents/comfy-gen/comfy-gen.mjs";
const PY = "C:/Users/Lucas/AppData/Local/Comfy-Desktop/ComfyUI-Installs/ComfyUI/ComfyUI/.venv/Scripts/python.exe";
const ROOT = path.resolve(import.meta.dirname, "..");

const raw = process.argv[2];
const only = process.argv.slice(3);
if (!raw) throw new Error("informe a pasta dos PNG brutos");
mkdirSync(raw, { recursive: true });
mkdirSync(path.join(ROOT, "public/showcase"), { recursive: true });
mkdirSync(path.join(ROOT, "public/solutions"), { recursive: true });

// Fundo preto liso de propósito: o recorte (tools/cutout.py) desfaz a
// mistura com o fundo, e o site é escuro — então não sobra halo.
const OBJECT =
  " It floats alone in mid-air in the centre of an endless pure black void, with empty darkness all around it and nothing else in the frame. It is lit softly from the upper left with a cool glow along its back edges, glossy highlights and crisp detail, premium 3D render with a playful toy-like feel.";

const ART = [
  {
    name: "cursor",
    kind: "object",
    seed: 11,
    prompt:
      "A chunky three-dimensional mouse pointer arrow sculpted from glossy lavender violet resin with soft rounded bevelled edges, tilted at a dynamic angle as if flying upward, with an iridescent sheen shifting to sky blue along its edges." +
      OBJECT,
  },
  {
    name: "phone",
    kind: "object",
    seed: 22,
    prompt:
      "A chunky rounded smartphone made of glossy white ceramic floating at a playful tilted angle, its screen glowing with a smooth gradient of violet, pink and warm amber arranged as a few soft rounded blocks like a simple page layout. The screen shows only colored shapes and has no lettering." +
      OBJECT,
  },
  {
    name: "bolt",
    kind: "object",
    seed: 34,
    prompt:
      "A bold three-dimensional lightning bolt made of translucent glowing amber and pink glass, thick and rounded like a soft toy, tilted diagonally and hovering high in empty space, with warm light passing through it and a bright inner glow." +
      OBJECT,
  },
  {
    name: "lock",
    kind: "object",
    seed: 44,
    prompt:
      "A chunky rounded padlock made of polished pastel sky blue metal with a glossy lavender shackle, soft bevelled edges and a small round keyhole on its face, tilted slightly, its smooth surfaces reflecting soft studio light." +
      OBJECT,
  },
  {
    name: "lens",
    kind: "object",
    seed: 55,
    prompt:
      "A playful oversized magnifying glass with a thick glossy pink handle and a round lens of clear sky blue glass framed by a bright lavender rim, floating diagonally, with light refracting through the lens." +
      OBJECT,
  },
  {
    name: "window",
    kind: "object",
    seed: 66,
    prompt:
      "Three floating rounded rectangular panels of frosted translucent glass shaped like simplified app windows, tinted lavender, sky blue and soft pink, stacked slightly offset in depth. Each panel has three tiny round dots along its top edge and a few soft rounded blocks as content, and has no lettering." +
      OBJECT,
  },
  // Cartões da seção: ilustrações pra compor (não prints de site), uma por
  // etapa do processo.
  {
    name: "card-entender",
    kind: "card",
    seed: 401,
    prompt:
      "A whimsical isometric miniature diorama seen from above that fills the whole frame: a cozy little research room built from glossy clay, with a giant magnifying glass leaning over a round table covered in colourful sticky notes and pinned cards joined by thin red threads, tiny potted plants, lavender walls and the warm glow of an amber lamp. Rich saturated violet, sky blue, pink and amber colours, soft global illumination, tilt-shift depth of field, playful premium 3D toy render. The room is empty of people and the notes show only coloured shapes with no lettering." ,
  },
  {
    name: "card-estruturar",
    kind: "card",
    seed: 402,
    prompt:
      "A whimsical isometric miniature diorama seen from above that fills the whole frame: a tiny city being laid out on a sky blue blueprint floor, glossy pastel blocks of different heights arranged in neat rows along thin white guide lines, a small yellow crane lowering a lavender block into place, a giant ruler and drafting compass lying across the ground. Rich saturated violet, sky blue, pink and amber colours, soft global illumination, tilt-shift depth of field, playful premium 3D toy render. The scene is empty of people and has no lettering.",
  },
  {
    name: "card-desenhar",
    kind: "card",
    seed: 403,
    prompt:
      "A whimsical isometric miniature diorama seen from above that fills the whole frame: a tiny design garden where a giant glossy fountain pen nib stands like a monument over flowing ribbon curves of pink and violet, oversized colour swatch cards fanned out like trees, round paint drops resting on the lawn like balloons, a winding path of sky blue tiles. Rich saturated violet, sky blue, pink and amber colours, soft global illumination, tilt-shift depth of field, playful premium 3D toy render. The garden is empty of people and has no lettering.",
  },
  {
    name: "card-construir",
    kind: "card",
    // A seed 404 desenhou um bonequinho perto da esteira.
    seed: 405,
    prompt:
      "A whimsical isometric miniature diorama seen from above that fills the whole frame: a tiny construction site assembling a giant upright web page panel covered in soft rounded blocks, small yellow cranes and scaffolding around it, conveyor belts carrying glowing pill shaped buttons and little picture tiles toward the panel, warm amber work lights. Rich saturated violet, sky blue, pink and amber colours, soft global illumination, tilt-shift depth of field, playful premium 3D toy render. The only figures in the scene are the cranes, the trucks and the machines, and the panel shows only shapes with no lettering.",
  },
  // Etapas do processo: mesmo estilo dos cartões, cenas diferentes, em paisagem.
  {
    name: "process-entender",
    kind: "process",
    seed: 501,
    prompt:
      "A whimsical isometric miniature diorama that fills the whole frame: a tiny glossy clay listening studio on a round floating island, a big pastel speech bubble sculpture hovering above a small desk with an open notebook, a vintage microphone and a pair of headphones, little lavender bookshelves and potted plants around it. Rich saturated violet, sky blue, pink and amber colours, soft global illumination, tilt-shift depth of field, playful premium 3D toy render. The only figures in the scene are objects and plants, and the notebook shows only coloured shapes with no lettering.",
  },
  {
    name: "process-estruturar",
    kind: "process",
    seed: 502,
    prompt:
      "A whimsical isometric miniature diorama that fills the whole frame: a tiny architect workshop on a sky blue platform, the skeleton of a building made of thin lavender rods and pink joints standing over rolled blueprint sheets, a stack of coloured blocks sorted by size and a small hanging lamp. Rich saturated violet, sky blue, pink and amber colours, soft global illumination, tilt-shift depth of field, playful premium 3D toy render. The only figures in the scene are objects, and the sheets show only lines with no lettering.",
  },
  {
    name: "process-desenhar",
    kind: "process",
    seed: 503,
    prompt:
      "A whimsical isometric miniature diorama that fills the whole frame: a tiny painter studio on a mint green platform, a giant glossy paint roller resting where it has painted a wide pink stripe across the floor, towers of colour swatch chips, jars of violet and amber paint and a small easel holding a canvas with soft rounded shapes. Rich saturated violet, sky blue, pink and amber colours, soft global illumination, tilt-shift depth of field, playful premium 3D toy render. The only figures in the scene are objects, with no lettering anywhere.",
  },
  {
    name: "process-construir",
    kind: "process",
    seed: 504,
    prompt:
      "A whimsical isometric miniature diorama that fills the whole frame: a tiny factory line on a violet platform, a glossy robotic arm placing rounded interface tiles into a big open laptop, a conveyor belt carrying pill shaped buttons and little picture tiles, warm amber work lights. Rich saturated violet, sky blue, pink and amber colours, soft global illumination, tilt-shift depth of field, playful premium 3D toy render. The only figures in the scene are the machines and the robotic arm, and the screen shows only shapes with no lettering.",
  },
  {
    name: "process-aprovar",
    kind: "process",
    seed: 505,
    prompt:
      "A whimsical isometric miniature diorama that fills the whole frame: a tiny celebration podium on a lavender platform, a giant glossy mint green check mark sculpture standing on a round pedestal, pastel balloons tied to it, small confetti pieces and ribbon curls scattered on the floor, soft warm light. Rich saturated violet, sky blue, pink and amber colours, soft global illumination, tilt-shift depth of field, playful premium 3D toy render. The only figures in the scene are objects, with no lettering anywhere.",
  },
  {
    name: "redesign",
    kind: "scene",
    seed: 101,
    prompt:
      "A studio still life of two small sculptures of website pages standing side by side on a smooth pale blue surface against a soft pale blue backdrop. The left sculpture is made of dull cracked grey clay with crooked uneven blocks, the right one is a fresh glossy version built from polished lavender, pink and amber resin blocks neatly aligned. Soft diffused daylight from the left, gentle shadows, shallow depth of field, 50mm lens, premium product photography. The surfaces show only shapes and have no lettering.",
  },
  {
    name: "institucional",
    kind: "scene",
    seed: 202,
    prompt:
      "An elegant architectural scale model of a modern office building standing on a pale sand coloured plinth against a warm cream backdrop. Its facade is a grid of glossy glass panels tinted lavender and sky blue, a few panels glowing softly from within, with tiny trees made of green felt around the base. Soft warm afternoon light from the right, long gentle shadows, 85mm lens, shallow depth of field, premium product photography. The building has no signs and no lettering.",
  },
  {
    name: "landing",
    kind: "scene",
    seed: 303,
    prompt:
      "A single tall rounded glossy panel shaped like a web page standing upright on a round white pedestal against a soft mint green backdrop, with one large glowing amber pill shaped button on its lower half, and a gentle stream of small glossy spheres in violet, pink and sky blue flowing across the scene toward the button. Soft studio light from above, subtle reflections, 50mm lens, premium 3D product render. The panel shows only shapes and has no lettering.",
  },
];

for (const art of ART) {
  if (only.length && !only.includes(art.name)) continue;
  const [w, h] = art.kind === "object" ? [1024, 1024] : art.kind === "card" ? [832, 1152] : art.kind === "process" ? [1152, 832] : [1216, 832];
  const png = path.join(raw, `${art.name}.png`);
  console.error(`gerando ${art.name}…`);
  execFileSync(
    "node",
    [COMFY, "--prompt", art.prompt, "--out", png, "--width", String(w), "--height", String(h), "--seed", String(art.seed)],
    { stdio: ["ignore", "inherit", "inherit"] }
  );

  if (art.kind === "object") {
    const out = path.join(ROOT, "public/showcase", `${art.name}.webp`);
    execFileSync(PY, [path.join(ROOT, "tools/cutout.py"), png, out, "640", ...(art.cutBelow ? [String(art.cutBelow)] : [])], { stdio: "inherit" });
  } else if (art.kind === "process") {
    const out = path.join(ROOT, "public/process", `${art.name.replace("process-", "etapa-")}.webp`);
    execFileSync(
      PY,
      ["-c", "import sys;from PIL import Image;im=Image.open(sys.argv[1]).convert('RGB');im.resize((880,round(im.height*880/im.width)),Image.LANCZOS).save(sys.argv[2],'WEBP',quality=82,method=6)", png, out],
      { stdio: "inherit" }
    );
    console.log(out);
  } else if (art.kind === "card") {
    const out = path.join(ROOT, "public/showcase", `${art.name}.webp`);
    execFileSync(
      PY,
      ["-c", "import sys;from PIL import Image;im=Image.open(sys.argv[1]).convert('RGB');im.resize((560,round(im.height*560/im.width)),Image.LANCZOS).save(sys.argv[2],'WEBP',quality=82,method=6)", png, out],
      { stdio: "inherit" }
    );
    console.log(out);
  } else {
    const out = path.join(ROOT, "public/solutions", `${art.name}.webp`);
    execFileSync(
      PY,
      ["-c", "import sys;from PIL import Image;Image.open(sys.argv[1]).convert('RGB').save(sys.argv[2],'WEBP',quality=82,method=6)", png, out],
      { stdio: "inherit" }
    );
    console.log(out);
  }
}
