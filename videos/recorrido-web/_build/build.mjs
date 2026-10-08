// Genera index.html a partir de la lista de escenas. Correr: node build.mjs
import fs from "node:fs";

const K = 1200 / 1440; // px de video por px CSS del sitio
const BX = 72, BY = 150, BAR = 50, VW = 1200, VH = 750;
const CAP = "assets/capturas/";
const DOMINIO = "distrito-propiedades.vercel.app";

// Tamaño CSS (1440 de ancho) de cada captura de escritorio, según el PNG a 1.5x
const SHOTS = {
  "home-full": [2160, 6564], "catalogo-full": [2160, 6554], "catalogo-filtro-vp": [2160, 1350],
  "ficha-full": [2160, 4853], "tasacion-full": [2160, 2291], "contacto-full": [2160, 2232],
  "admin-login-vp": [2160, 1350], "admin-resumen-vp": [2160, 1350], "admin-propiedades-vp": [2160, 1350],
  "admin-editar-full": [2138, 4068], "admin-textos-vp": [2160, 1350],
};
const disp = (s) => [(SHOTS[s][0] / 1.5) * K, (SHOTS[s][1] / 1.5) * K];

const P1 = "Parte 1 — La página que ven sus clientes";
const P2 = "Parte 2 — El panel de administración";

const escenas = [
  { id: "s2", start: 11, dur: 9, url: "/", shots: ["home-full"],
    kicker: "Paso 1 de 7", title: "La portada",
    body: "Es lo primero que ve un cliente al entrar: una foto grande, el nombre de su inmobiliaria y un buscador.",
    bullets: [[1.2, "Imagen de impacto con su nombre"], [4.2, "Buscador para comprar, alquilar o vender"]],
    cam: [[0, 0, 0, 1], [1.4, 2.4, 110, 430, 1.5, "power2.inOut"]],
    rings: [[4.0, 4.4, [56, 686, 1062, 150]]] },
  { id: "s3", start: 20, dur: 11, url: "/", shots: ["home-full"],
    kicker: "Paso 2 de 7", title: "Más abajo en la portada",
    body: "Sus propiedades destacadas y los motivos para elegir su inmobiliaria.",
    bullets: [[2.6, "Usted elige qué avisos se destacan"], [8.2, "Sus fortalezas, bien a la vista"]],
    cam: [[0, 0, 640, 1], [0.3, 2.3, 0, 1250, 1, "power2.inOut"], [6.0, 2.0, 0, 2560, 1, "power2.inOut"]],
    rings: [[2.6, 3.2, [44, 1334, 1352, 676]], [8.2, 2.6, [40, 2795, 1360, 352]]] },
  { id: "s4", start: 31, dur: 10, url: "/propiedades", shots: ["catalogo-full", "catalogo-filtro-vp"], swap: 5.0,
    kicker: "Paso 3 de 7", title: "Todas las propiedades",
    body: "El catálogo completo, con foto, precio y ubicación de cada una.",
    bullets: [[1.2, "Filtros por operación, tipo, zona, precio y ambientes"], [5.2, "El cliente ve solo lo que le interesa"]],
    cam: [[0, 0, 0, 1], [5.6, 4.0, 40, 40, 1.08, "sine.inOut"]],
    rings: [[1.2, 2.8, [74, 308, 1292, 126]], [5.3, 3.0, [70, 446, 230, 40]]],
    cursor: { t: 3.3, from: [700, 640], to: [200, 372], move: 1.1, click: 4.6, out: 5.4 } },
  { id: "s5", start: 41, dur: 11, url: "/propiedades/depto-devoto-01", shots: ["ficha-full"],
    kicker: "Paso 4 de 7", title: "La ficha de cada propiedad",
    body: "Fotos grandes, precio, características y ubicación, todo claro y ordenado.",
    bullets: [[1.2, "Galería de fotos"], [4.4, "Botón de WhatsApp: le escriben con la propiedad ya indicada"], [9.0, "Ambientes, metros y servicios"]],
    cam: [[0, 0, 0, 1], [0.6, 2.0, 86, 395, 1.12, "power2.inOut"], [7.4, 1.8, 0, 990, 1, "power2.inOut"]],
    rings: [[1.2, 2.8, [52, 413, 794, 585]], [4.4, 2.9, [914, 537, 446, 72]], [9.1, 1.9, [48, 1026, 802, 660]]],
    cursor: { t: 4.6, from: [760, 760], to: [1150, 575], move: 1.0, click: 5.9, out: 7.0 } },
  { id: "s6", start: 52, dur: 8, url: "/tasacion", shots: ["tasacion-full"],
    kicker: "Paso 5 de 7", title: "Pedido de tasación",
    body: "Quien quiere vender o alquilar su propiedad le deja sus datos en un minuto.",
    bullets: [[1.2, "Formulario simple y guiado"], [5.0, "Le llega directo a su WhatsApp o a su mail"]],
    cam: [[0, 0, 40, 1]],
    rings: [[1.2, 3.4, [662, 152, 726, 742]], [5.0, 2.6, [698, 725, 328, 72]]],
    cursor: { t: 5.0, from: [1100, 560], to: [870, 762], move: 0.9, click: 6.1, out: 7.4 } },
  { id: "s7", start: 60, dur: 6, url: "/contacto", shots: ["contacto-full"],
    kicker: "Paso 6 de 7", title: "Contacto",
    body: "Teléfono, mail, horario y un mapa para llegar a su oficina.",
    bullets: [[1.0, "Todos sus datos en un solo lugar"], [3.2, "WhatsApp siempre a mano, en cada página"]],
    cam: [[0, 0, 0, 1]],
    rings: [[1.0, 2.0, [52, 318, 1336, 537]], [3.2, 2.5, [1181, 4, 207, 72]]] },
  { id: "s10", start: 78, dur: 5, url: "/admin/login", shots: ["admin-login-vp"],
    kicker: "Paso 1 de 5", title: "Acceso privado",
    body: "Usted entra con su usuario y contraseña. Solo usted puede hacer cambios.",
    bullets: [[2.6, "Seguro y sin complicaciones"]],
    cam: [[0, 0, 0, 1], [0.5, 2.0, 300, 214, 1.7, "power2.inOut"]],
    rings: [[2.6, 2.2, [508, 282, 424, 390]]] },
  { id: "s11", start: 83, dur: 10, url: "/admin", shots: ["admin-resumen-vp"],
    kicker: "Paso 2 de 5", title: "El resumen de su negocio",
    body: "Apenas entra, ve cómo viene su inmobiliaria en números.",
    bullets: [[1.0, "Propiedades activas, consultas y operaciones cerradas"], [6.0, "Qué avisos interesan y cuáles conviene revisar"]],
    cam: [[0, 0, 0, 1], [0.6, 1.8, 290, 20, 1.3, "power2.inOut"], [4.8, 1.2, 0, 0, 1, "power2.inOut"]],
    rings: [[1.0, 3.6, [292, 102, 1106, 146]], [6.0, 3.4, [292, 252, 1106, 372]]] },
  { id: "s12", start: 93, dur: 8, url: "/admin/propiedades", shots: ["admin-propiedades-vp"],
    kicker: "Paso 3 de 5", title: "Sus propiedades",
    body: "Todas en una lista, con buscador y filtros.",
    bullets: [[1.0, "Pausar, marcar como cerrada o borrar, con un clic"], [5.0, "Cargar una nueva cuando quiera"]],
    cam: [[0, 0, 0, 1]],
    rings: [[1.0, 3.4, [1104, 212, 254, 690]], [5.0, 2.6, [1202, 26, 194, 56]]],
    cursor: { t: 1.4, from: [900, 520], to: [1162, 252], move: 1.0, out: 4.2, then: { t: 5.1, to: [1300, 56], move: 0.9, click: 6.2, out: 7.4 } } },
  { id: "s13", start: 101, dur: 9, url: "/admin/propiedades/depto-devoto-01", shots: ["admin-editar-full"],
    kicker: "Paso 4 de 5", title: "Cargar una propiedad",
    body: "Un formulario simple: dirección, precio, ambientes y descripción. Al guardar, la web se actualiza sola.",
    bullets: [[1.0, "Se completa como una ficha en papel"], [6.0, "Suba las fotos desde su computadora"]],
    cam: [[0, 0, 0, 1], [4.0, 2.0, 0, 1560, 1, "power2.inOut"]],
    rings: [[1.0, 2.8, [292, 136, 782, 512]], [6.1, 2.6, [301, 1845, 782, 490]]] },
  { id: "s14", start: 110, dur: 5, url: "/admin/textos", shots: ["admin-textos-vp"],
    kicker: "Paso 5 de 5", title: "Los títulos de su web",
    body: "Cambie los textos principales de cada página, sin depender de nadie.",
    bullets: [[0.8, "Escribe, guarda y listo"]],
    cam: [[0, 0, 0, 1], [0.3, 1.6, 104, 40, 1.25, "power2.inOut"]],
    rings: [[1.0, 3.4, [317, 192, 735, 104]]] },
];

const grupos = [
  { id: "ga", start: 11, end: 66.6, part: P1, escenas: ["s2", "s3", "s4", "s5", "s6", "s7"] },
  { id: "gb", start: 78, end: 115.2, part: P2, escenas: ["s10", "s11", "s12", "s13", "s14"] },
];

let html = "";
let js = "";
const audios = [];
const sfx = (t, file, vol, dur) => audios.push({ t, file, vol, dur });
const r2 = (n) => Math.round(n * 100) / 100;

// ---------- grupos (marco de navegador + encabezado de parte) ----------
for (const g of grupos) {
  html += `
    <div id="${g.id}-head" class="clip head" data-start="${g.start}" data-duration="${r2(g.end - g.start + (g.id === "ga" ? 8 : 0))}" data-track-index="2">
      <div class="head-in" id="${g.id}-head-in"><span class="dot"></span><span>${g.part}</span></div>
    </div>
    <div id="${g.id}-frame" class="clip frame" data-start="${g.start}" data-duration="${r2(g.end - g.start)}" data-track-index="3">
      <div class="frame-in o0" id="${g.id}-frame-in">
        <div class="bar"><i></i><i></i><i></i><div class="url" id="${g.id}-url"></div></div>
        <div class="vpbg"></div>
      </div>
    </div>`;
  js += `
  tl.fromTo("#${g.id}-frame-in", { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.9, ease: "power3.out" }, ${g.start});
  tl.to("#${g.id}-frame-in", { opacity: 0, y: -30, duration: 0.5, ease: "power2.in" }, ${r2(g.end - 0.55)});
  tl.fromTo("#${g.id}-head-in", { opacity: 0, x: -24 }, { opacity: 1, x: 0, duration: 0.7, ease: "power2.out" }, ${g.start + 0.2});`;
}

// ---------- escenas de navegador ----------
escenas.forEach((e, idx) => {
  const g = grupos.find((g) => g.escenas.includes(e.id));
  const ultima = g.escenas[g.escenas.length - 1] === e.id;
  const primera = g.escenas[0] === e.id;
  const stageDur = ultima ? g.end - e.start : e.dur + 0.8;
  const [w0, h0] = disp(e.shots[0]);

  let inner = e.shots
    .map((s, i) => {
      const [w, h] = disp(s);
      return `<img id="${e.id}-img${i}" class="shot" src="${CAP}${s}.png" style="width:${r2(w)}px;height:${r2(h)}px" alt="" />`;
    })
    .join("");
  e.rings.forEach(([, , b], i) => {
    const pad = 8;
    inner += `<div class="ring" id="${e.id}-r${i}" style="left:${r2(b[0] * K - pad)}px;top:${r2(b[1] * K - pad)}px;width:${r2(b[2] * K + pad * 2)}px;height:${r2(b[3] * K + pad * 2)}px"></div>`;
  });
  if (e.cursor) {
    inner += `<div class="cursor" id="${e.id}-cur"><div class="ripple" id="${e.id}-rip"></div><svg viewBox="0 0 32 32" width="44" height="44"><path d="M5 3 L5 26 L11 20.5 L15.2 29.5 L19.6 27.6 L15.5 18.8 L23.5 18.8 Z" fill="#1A1714" stroke="#fff" stroke-width="2.2" stroke-linejoin="round"/></svg></div>`;
  }
  html += `
    <div id="${e.id}" class="clip vp" data-start="${e.start}" data-duration="${r2(stageDur)}" data-track-index="4">
      <div class="fade" id="${e.id}-fade">
        <div class="stage" id="${e.id}-stage" style="height:${r2(h0)}px">${inner}</div>
      </div>
    </div>
    <div id="${e.id}-url" class="clip urlclip" data-start="${e.start}" data-duration="${e.dur}" data-track-index="5"><span>${DOMINIO}${e.url === "/" ? "" : e.url}</span></div>`;

  // Fundido de entrada (la primera de cada grupo entra con el marco)
  if (!primera) {
    js += `
  tl.fromTo("#${e.id}-fade", { opacity: 0, scale: 1.015 }, { opacity: 1, scale: 1, duration: 0.7, ease: "power2.out" }, ${e.start});`;
    sfx(e.start - 0.15, "whoosh-suave", 0.22, 2);
  }
  // Cámara
  const [, , x0, y0, s0] = e.cam[0];
  js += `
  tl.set("#${e.id}-stage", { transformOrigin: "0 0", x: ${r2(-x0 * K * s0)}, y: ${r2(-y0 * K * s0)}, scale: ${s0} }, ${e.start});`;
  e.cam.slice(1).forEach(([t, d, x, y, s, ease]) => {
    js += `
  tl.to("#${e.id}-stage", { x: ${r2(-x * K * s)}, y: ${r2(-y * K * s)}, scale: ${s}, duration: ${d}, ease: "${ease}" }, ${r2(e.start + t)});`;
  });
  // Cambio de captura (filtro aplicado)
  if (e.swap) {
    js += `
  tl.fromTo("#${e.id}-img1", { opacity: 0 }, { opacity: 1, duration: 0.5, ease: "power1.inOut" }, ${r2(e.start + e.swap)});`;
  }
  // Recuadros
  e.rings.forEach(([t, d], i) => {
    js += `
  tl.fromTo("#${e.id}-r${i}", { opacity: 0, scale: 1.05 }, { opacity: 1, scale: 1, duration: 0.5, ease: "power2.out" }, ${r2(e.start + t)});
  tl.to("#${e.id}-r${i}", { opacity: 0, duration: 0.45, ease: "power1.in" }, ${r2(e.start + t + d)});`;
    sfx(e.start + t, "pop", 0.3, 1.4);
  });
  // Cursor
  if (e.cursor) {
    const c = e.cursor;
    const pos = ([x, y]) => `x: ${r2(x * K)}, y: ${r2(y * K)}`;
    js += `
  tl.set("#${e.id}-cur", { ${pos(c.from)} }, ${r2(e.start + c.t)});
  tl.fromTo("#${e.id}-cur", { opacity: 0 }, { opacity: 1, duration: 0.3 }, ${r2(e.start + c.t)});
  tl.to("#${e.id}-cur", { ${pos(c.to)}, duration: ${c.move}, ease: "power2.inOut" }, ${r2(e.start + c.t + 0.1)});`;
    const click = (tc) => {
      js += `
  tl.to("#${e.id}-cur svg", { scale: 0.82, duration: 0.12, yoyo: true, repeat: 1, ease: "power1.inOut" }, ${r2(e.start + tc)});
  tl.fromTo("#${e.id}-rip", { opacity: 0.9, scale: 0.2 }, { opacity: 0, scale: 1.6, duration: 0.6, ease: "power2.out" }, ${r2(e.start + tc)});`;
      sfx(e.start + tc - 0.02, "click", 0.7, 0.6);
    };
    if (c.click) click(c.click);
    if (c.then) {
      js += `
  tl.to("#${e.id}-cur", { ${pos(c.then.to)}, duration: ${c.then.move}, ease: "power2.inOut" }, ${r2(e.start + c.then.t)});`;
      if (c.then.click) click(c.then.click);
      js += `
  tl.to("#${e.id}-cur", { opacity: 0, duration: 0.3 }, ${r2(e.start + c.then.out)});`;
    } else {
      js += `
  tl.to("#${e.id}-cur", { opacity: 0, duration: 0.3 }, ${r2(e.start + c.out)});`;
    }
  }
});

// ---------- panel de texto (escenas de navegador + celular) ----------
const textos = [
  ...escenas,
  { id: "s8", start: 66, dur: 8, kicker: "Paso 7 de 7", title: "Perfecta en el celular",
    body: "La mayoría de sus clientes va a mirar desde el teléfono. La web se adapta sola a cualquier pantalla.",
    bullets: [[2.0, "Celular, tablet y computadora"]] },
];
for (const e of textos) {
  html += `
    <div id="${e.id}-txt" class="clip txt" data-start="${e.start}" data-duration="${r2(e.dur + 0.45)}" data-track-index="6">
      <div class="txt-in" id="${e.id}-txt-in">
        <p class="kicker" id="${e.id}-k">${e.kicker}</p>
        <h2 class="t" id="${e.id}-t">${e.title}</h2>
        <div class="rule" id="${e.id}-rule"></div>
        <p class="body" id="${e.id}-b">${e.body}</p>
        <ul class="bul">${e.bullets
          .map(([, b], i) => `<li id="${e.id}-li${i}"><span class="chk" id="${e.id}-chk${i}"><svg viewBox="0 0 24 24" width="22" height="22"><path d="M5 12.5l4.2 4.2L19 7" fill="none" stroke="#1A1714" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg></span><span>${b}</span></li>`)
          .join("")}</ul>
      </div>
    </div>`;
  const s = e.start;
  js += `
  tl.fromTo("#${e.id}-k", { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, ${r2(s + 0.25)});
  tl.fromTo("#${e.id}-t", { opacity: 0, y: 34 }, { opacity: 1, y: 0, duration: 0.75, ease: "power3.out" }, ${r2(s + 0.35)});
  tl.fromTo("#${e.id}-rule", { scaleX: 0 }, { scaleX: 1, duration: 0.6, ease: "expo.out" }, ${r2(s + 0.6)});
  tl.fromTo("#${e.id}-b", { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" }, ${r2(s + 0.7)});
  tl.to("#${e.id}-txt-in", { opacity: 0, duration: 0.4, ease: "power1.in" }, ${r2(s + e.dur)});`;
  e.bullets.forEach(([t], i) => {
    js += `
  tl.fromTo("#${e.id}-li${i}", { opacity: 0, x: -22 }, { opacity: 1, x: 0, duration: 0.55, ease: "power3.out" }, ${r2(s + t)});
  tl.fromTo("#${e.id}-chk${i}", { scale: 0 }, { scale: 1, duration: 0.5, ease: "back.out(2.2)" }, ${r2(s + t + 0.1)});`;
  });
}

// ---------- celulares ----------
html += `
    <div id="s8-ph" class="clip phones" data-start="66" data-duration="8.6" data-track-index="4">
      <div class="phone" id="ph-a"><div class="screen"><img id="ph-a-img" src="${CAP}movil-home-full.png" style="width:360px;height:6225px" alt="" /></div><div class="notch"></div></div>
      <div class="phone" id="ph-b"><div class="screen"><img id="ph-b-img" src="${CAP}movil-ficha-full.png" style="width:360px;height:5103px" alt="" /></div><div class="notch"></div></div>
    </div>`;
js += `
  tl.fromTo("#ph-a", { opacity: 0, y: 120, rotation: -4 }, { opacity: 1, y: 0, rotation: -3, duration: 1.0, ease: "power3.out" }, 66.4);
  tl.fromTo("#ph-b", { opacity: 0, y: 160, rotation: 6, scale: 0.88 }, { opacity: 1, y: 0, rotation: 4, scale: 0.88, duration: 1.0, ease: "power3.out" }, 66.7);
  tl.to("#ph-a-img", { y: -1500, duration: 5.2, ease: "sine.inOut" }, 68.0);
  tl.to("#ph-b-img", { y: -1000, duration: 4.6, ease: "sine.inOut" }, 68.6);
  tl.to(["#ph-a", "#ph-b"], { opacity: 0, y: -40, duration: 0.5, ease: "power2.in" }, 74.0);`;
sfx(66.3, "ui-open", 0.5, 1.1);

// ---------- intro ----------
html += `
    <div id="intro" class="clip dark" data-start="0" data-duration="7.5" data-track-index="8">
      <div class="dark-in" id="intro-in">
        <div class="collage">
          <img id="ic1" src="${CAP}home-vp.png" alt="" />
          <img id="ic2" src="${CAP}ficha-vp.png" alt="" />
          <img id="ic3" src="${CAP}admin-resumen-vp.png" alt="" />
        </div>
        <div class="veil"></div>
        <div class="intro-txt">
          <p class="dk-kicker" id="i-k">Recorrido guiado · 2 minutos</p>
          <h1 class="dk-title" id="i-t">Su inmobiliaria, en internet</h1>
          <p class="dk-sub" id="i-s">La página web para sus clientes y el panel para administrarla, paso a paso.</p>
          <p class="dk-note" id="i-n">Los nombres y datos que va a ver son de ejemplo.</p>
        </div>
      </div>
    </div>`;
js += `
  tl.fromTo("#ic1", { opacity: 0, x: 0, y: 80, rotation: -8 }, { opacity: 1, y: 0, duration: 1.4, ease: "power3.out" }, 0.1);
  tl.fromTo("#ic2", { opacity: 0, y: 120, rotation: -8 }, { opacity: 1, y: 0, duration: 1.4, ease: "power3.out" }, 0.3);
  tl.fromTo("#ic3", { opacity: 0, y: 160, rotation: -8 }, { opacity: 1, y: 0, duration: 1.4, ease: "power3.out" }, 0.5);
  tl.to(".collage", { x: -160, duration: 7.5, ease: "none" }, 0);
  tl.fromTo("#i-k", { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }, 0.9);
  tl.fromTo("#i-t", { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1.0, ease: "power4.out" }, 1.15);
  tl.fromTo("#i-s", { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }, 1.9);
  tl.fromTo("#i-n", { opacity: 0 }, { opacity: 1, duration: 0.8, ease: "power1.out" }, 3.0);
  tl.to("#intro-in", { opacity: 0, duration: 0.5, ease: "power1.in" }, 7.0);`;
sfx(0, "riser", 0.7, 2.5);
sfx(1.15, "premium-open", 0.45, 2.5);

// ---------- separadores de parte ----------
const capitulo = (id, start, num, title, sub) => {
  html += `
    <div id="${id}" class="clip dark" data-start="${start}" data-duration="4.5" data-track-index="8">
      <div class="dark-in o0" id="${id}-in">
        <div class="ghost" id="${id}-g">${num}</div>
        <div class="ch-txt">
          <p class="dk-kicker" id="${id}-k">Parte ${num}</p>
          <h1 class="dk-title ch" id="${id}-t">${title}</h1>
          <div class="dk-rule" id="${id}-r"></div>
          <p class="dk-sub" id="${id}-s">${sub}</p>
        </div>
      </div>
    </div>`;
  js += `
  tl.fromTo("#${id}-in", { opacity: 0 }, { opacity: 1, duration: 0.5, ease: "power1.out" }, ${start});
  tl.fromTo("#${id}-g", { x: 120, opacity: 0 }, { x: -60, opacity: 1, duration: 4.5, ease: "sine.out" }, ${start});
  tl.fromTo("#${id}-k", { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, ${start + 0.3});
  tl.fromTo("#${id}-t", { opacity: 0, y: 46 }, { opacity: 1, y: 0, duration: 0.9, ease: "power4.out" }, ${start + 0.45});
  tl.fromTo("#${id}-r", { scaleX: 0 }, { scaleX: 1, duration: 0.8, ease: "expo.out" }, ${start + 0.9});
  tl.fromTo("#${id}-s", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" }, ${start + 1.1});
  tl.to("#${id}-in", { opacity: 0, duration: 0.5, ease: "power1.in" }, ${start + 4.0});`;
};
capitulo("ch1", 7, 1, "La página que ven sus clientes", "Así encuentran sus propiedades y se comunican con usted.");
capitulo("ch2", 74, 2, "El panel de administración", "Un espacio privado, solo para usted, para manejar su web.");
sfx(6.8, "whoosh-grave", 0.7, 2.2);
sfx(10.9, "whoosh-suave", 0.3, 2);
sfx(71.6, "riser", 0.55, 2.5);
sfx(73.8, "whoosh-grave", 0.7, 2.2);
sfx(77.9, "whoosh-suave", 0.3, 2);
sfx(84.0, "data", 0.45, 1);

// ---------- cierre ----------
html += `
    <div id="close" class="clip dark" data-start="114.6" data-duration="5.4" data-track-index="8">
      <div class="dark-in o0" id="close-in">
        <div class="close-txt">
          <p class="dk-kicker" id="c-k">En resumen</p>
          <h1 class="dk-title" id="c-t">Lista para su inmobiliaria</h1>
          <ul class="dk-bul">
            <li id="c-l0"><span class="chk dk"><svg viewBox="0 0 24 24" width="24" height="24"><path d="M5 12.5l4.2 4.2L19 7" fill="none" stroke="#17140F" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg></span>Con su nombre y sus datos</li>
            <li id="c-l1"><span class="chk dk"><svg viewBox="0 0 24 24" width="24" height="24"><path d="M5 12.5l4.2 4.2L19 7" fill="none" stroke="#17140F" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg></span>Con sus propiedades y sus fotos</li>
            <li id="c-l2"><span class="chk dk"><svg viewBox="0 0 24 24" width="24" height="24"><path d="M5 12.5l4.2 4.2L19 7" fill="none" stroke="#17140F" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg></span>Con su WhatsApp, listo para recibir consultas</li>
          </ul>
          <p class="dk-contact" id="c-c">Consultas por WhatsApp: 11 3025-6777</p>
        </div>
      </div>
    </div>`;
js += `
  tl.fromTo("#close-in", { opacity: 0 }, { opacity: 1, duration: 0.6, ease: "power1.out" }, 114.6);
  tl.fromTo("#c-k", { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, 115.0);
  tl.fromTo("#c-t", { opacity: 0, y: 46 }, { opacity: 1, y: 0, duration: 0.9, ease: "power4.out" }, 115.15);
  tl.fromTo(["#c-l0", "#c-l1", "#c-l2"], { opacity: 0, x: -24 }, { opacity: 1, x: 0, duration: 0.6, ease: "power3.out", stagger: 0.45 }, 115.9);
  tl.fromTo("#c-c", { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" }, 117.6);`;
sfx(114.4, "whoosh-largo", 0.45, 3);
sfx(115.15, "premium-open", 0.45, 2.5);

// ---------- audio ----------
const audioHtml = audios
  .sort((a, b) => a.t - b.t)
  .map((a, i) => `    <audio id="sfx-${String(i).padStart(2, "0")}-${a.file}" src="assets/sfx/${a.file}.wav" data-start="${r2(Math.max(0, a.t))}" data-duration="${a.dur}" data-volume="${a.vol}" data-track-index="${20 + (i % 3)}"></audio>`)
  .join("\n");

const out = fs
  .readFileSync(new URL("./template.html", import.meta.url), "utf8")
  .replace("<!--ESCENAS-->", html)
  .replace("<!--AUDIO-->", audioHtml)
  .replace("/*TIMELINE*/", js);
fs.writeFileSync(new URL("../index.html", import.meta.url), out);
console.log(`index.html: ${escenas.length} escenas de navegador, ${audios.length} sonidos`);
