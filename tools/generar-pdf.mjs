/**
 * Genera el PDF de la teoría (docs/imprimir.html) con Chrome en modo headless.
 *
 *   node tools/generar-pdf.mjs                  → un PDF con los 13 módulos
 *   node tools/generar-pdf.mjs --por-modulo     → además, un PDF por módulo
 *   node tools/generar-pdf.mjs --salida pdf     → carpeta de destino (por defecto: pdf/)
 *
 * No necesita npm install: levanta un servidor estático local y habla con Chrome
 * por el protocolo DevTools (CDP) usando el WebSocket incorporado de Node.
 */

import { createServer } from "node:http";
import { spawn } from "node:child_process";
import { readFile, mkdir, writeFile, rm } from "node:fs/promises";
import { existsSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const RAIZ  = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DOCS  = path.join(RAIZ, "docs");

/* ---------------------------------------------------------------- argumentos */
const args      = process.argv.slice(2);
const porModulo = args.includes("--por-modulo");
const salidaArg = args[args.indexOf("--salida") + 1];
const SALIDA    = path.resolve(RAIZ, args.includes("--salida") && salidaArg ? salidaArg : "pdf");

/* ---------------------------------------------------------- localizar Chrome */
function buscarChrome() {
  const candidatos = [
    process.env.CHROME_PATH,
    "C:/Program Files/Google/Chrome/Application/chrome.exe",
    "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
    `${process.env.LOCALAPPDATA}/Google/Chrome/Application/chrome.exe`,
    "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
    "C:/Program Files/Microsoft/Edge/Application/msedge.exe",
    "/usr/bin/google-chrome",
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  ].filter(Boolean);
  const encontrado = candidatos.find((p) => existsSync(p));
  if (!encontrado) throw new Error("No encuentro Chrome ni Edge. Define CHROME_PATH con la ruta al ejecutable.");
  return encontrado;
}

/* -------------------------------------------------- servidor estático mínimo */
const MIME = {
  ".html": "text/html; charset=utf-8",
  ".css":  "text/css; charset=utf-8",
  ".js":   "text/javascript; charset=utf-8",
  ".png":  "image/png",
  ".jpg":  "image/jpeg",
  ".svg":  "image/svg+xml",
};

/** Pide al sistema un puerto libre (evita colisiones al relanzar Chrome). */
function puertoLibre() {
  return new Promise((resolve, reject) => {
    const s = createServer();
    s.on("error", reject);
    s.listen(0, "127.0.0.1", () => {
      const { port } = s.address();
      s.close(() => resolve(port));
    });
  });
}

function servirDocs() {
  return new Promise((resolve) => {
    const server = createServer(async (req, res) => {
      const rel = decodeURIComponent(new URL(req.url, "http://x").pathname).replace(/^\/+/, "") || "index.html";
      const file = path.join(DOCS, rel);
      if (!file.startsWith(DOCS)) { res.writeHead(403).end(); return; }
      try {
        const buf = await readFile(file);
        res.writeHead(200, { "Content-Type": MIME[path.extname(file).toLowerCase()] || "application/octet-stream" });
        res.end(buf);
      } catch {
        res.writeHead(404).end("no encontrado");
      }
    });
    server.listen(0, "127.0.0.1", () => resolve({ server, puerto: server.address().port }));
  });
}

/* ------------------------------------------------------------- cliente CDP */
class CDP {
  constructor(ws) { this.ws = ws; this.id = 0; this.pendientes = new Map(); this.oyentes = new Map(); }

  static async conectar(url) {
    const ws = new WebSocket(url);
    await new Promise((ok, ko) => { ws.onopen = ok; ws.onerror = () => ko(new Error("No pude conectar con Chrome (CDP).")); });
    const cdp = new CDP(ws);
    ws.addEventListener("message", (ev) => {
      const msg = JSON.parse(ev.data);
      if (msg.id && cdp.pendientes.has(msg.id)) {
        const { ok, ko } = cdp.pendientes.get(msg.id);
        cdp.pendientes.delete(msg.id);
        msg.error ? ko(new Error(`${msg.error.message} (${msg.method ?? ""})`)) : ok(msg.result);
      } else if (msg.method) {
        (cdp.oyentes.get(msg.method) || []).forEach((fn) => fn(msg.params));
      }
    });
    return cdp;
  }

  enviar(method, params = {}, sessionId) {
    const id = ++this.id;
    return new Promise((ok, ko) => {
      this.pendientes.set(id, { ok, ko });
      this.ws.send(JSON.stringify(sessionId ? { id, method, params, sessionId } : { id, method, params }));
    });
  }

  al(method, fn) {
    if (!this.oyentes.has(method)) this.oyentes.set(method, []);
    this.oyentes.get(method).push(fn);
  }

  cerrar() { this.ws.close(); }
}

const esperar = (ms) => new Promise((r) => setTimeout(r, ms));

/* ------------------------------------------------------------ plantillas PDF */
const estiloPie = "font-family:'Segoe UI',system-ui,sans-serif;font-size:8px;color:#8a817a;width:100%;padding:0 14mm;";

const cabecera = '<div style="font-size:0"></div>';
const pie = (titulo) => `
  <div style="${estiloPie}display:flex;justify-content:space-between;align-items:center;">
    <span>${titulo}</span>
    <span>Página <span class="pageNumber"></span> de <span class="totalPages"></span></span>
  </div>`;

/* ------------------------------------------------------------------ imprimir */
async function imprimir(cdp, { url, destino, tituloPie }) {
  const { targetId } = await cdp.enviar("Target.createTarget", { url: "about:blank" });
  const { sessionId } = await cdp.enviar("Target.attachToTarget", { targetId, flatten: true });

  await cdp.enviar("Page.enable", {}, sessionId);
  await cdp.enviar("Emulation.setEmulatedMedia", { media: "print" }, sessionId);

  const cargada = new Promise((ok) => cdp.al("Page.loadEventFired", ok));
  await cdp.enviar("Page.navigate", { url }, sessionId);
  await Promise.race([cargada, esperar(45_000)]);

  // Espera a que la página avise de que tipografías, imágenes y Mermaid están listos
  const t0 = Date.now();
  for (;;) {
    const { result } = await cdp.enviar(
      "Runtime.evaluate",
      { expression: "window.__pdfReady === true", returnByValue: true },
      sessionId,
    );
    if (result.value === true || Date.now() - t0 > 40_000) break;
    await esperar(200);
  }

  const { data, stream } = await cdp.enviar("Page.printToPDF", {
    printBackground: true,
    preferCSSPageSize: false,
    paperWidth: 8.27,            // A4
    paperHeight: 11.69,
    marginTop: 0.63,
    marginBottom: 0.67,
    marginLeft: 0.55,
    marginRight: 0.55,
    displayHeaderFooter: true,
    headerTemplate: cabecera,
    footerTemplate: pie(tituloPie),
    transferMode: "ReturnAsStream",
  }, sessionId);

  let pdf;
  if (stream) {
    const trozos = [];
    for (;;) {
      const r = await cdp.enviar("IO.read", { handle: stream, size: 2 << 20 }, sessionId);
      if (r.data) trozos.push(Buffer.from(r.data, r.base64Encoded ? "base64" : "utf8"));
      if (r.eof) break;
    }
    await cdp.enviar("IO.close", { handle: stream }, sessionId);
    pdf = Buffer.concat(trozos);
  } else {
    pdf = Buffer.from(data, "base64");
  }

  await writeFile(destino, pdf);
  await cdp.enviar("Target.closeTarget", { targetId });
  return pdf.length;
}

/* ---------------------------------------------------------------------- main */
const kb = (n) => (n / 1024 / 1024).toFixed(1) + " MB";

async function main() {
  const chrome    = buscarChrome();
  const perfilTmp = path.join(tmpdir(), `saa-pdf-${Date.now()}`);
  const { server, puerto } = await servirDocs();
  await mkdir(SALIDA, { recursive: true });

  // Lista de módulos, leída del propio fichero de datos
  const datos = await readFile(path.join(DOCS, "js", "data-teoria.js"), "utf8");
  const ctx = { window: {} };
  new Function("window", datos)(ctx.window);
  const modulos = ctx.window.TEORIA.map((m) => ({ id: m.id, numero: m.numero, titulo: m.titulo }));

  const puertoCdp = await puertoLibre();
  const proc = spawn(chrome, [
    "--headless=new",
    "--disable-gpu",
    "--no-first-run",
    "--no-default-browser-check",
    "--disable-extensions",
    "--hide-scrollbars",
    `--remote-debugging-port=${puertoCdp}`,
    `--user-data-dir=${perfilTmp}`,
    "about:blank",
  ], { stdio: ["ignore", "ignore", "pipe"] });

  let errChrome = "";
  proc.stderr.on("data", (d) => { errChrome += d; });

  let cdp;
  try {
    // Espera a que el puerto de depuración responda (hasta ~30 s)
    let info;
    for (let i = 0; i < 150; i++) {
      if (proc.exitCode !== null) break;
      try { info = await (await fetch(`http://127.0.0.1:${puertoCdp}/json/version`)).json(); break; }
      catch { await esperar(200); }
    }
    if (!info) {
      throw new Error(
        `Chrome no abrió el puerto de depuración (${puertoCdp}).` +
        (errChrome ? `\n${errChrome.split("\n").slice(-6).join("\n")}` : "") +
        "\nCierra otras ventanas de Chrome e inténtalo de nuevo, o define CHROME_PATH apuntando a Edge.",
      );
    }
    cdp = await CDP.conectar(info.webSocketDebuggerUrl);

    const base = `http://127.0.0.1:${puerto}/imprimir.html`;
    const trabajos = [{
      url: base,
      destino: path.join(SALIDA, "AWS-SAA-Teoria-Completa.pdf"),
      tituloPie: "AWS SAA en español · Teoría completa (SAA-C03)",
    }];

    if (porModulo) {
      for (const m of modulos) {
        const num = String(m.numero).padStart(2, "0");
        const slug = m.titulo.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-zA-Z0-9]+/g, "-").replace(/^-|-$/g, "");
        trabajos.push({
          url: `${base}?m=${encodeURIComponent(m.id)}`,
          destino: path.join(SALIDA, `${num}-${slug}.pdf`),
          tituloPie: `AWS SAA · Módulo ${num} — ${m.titulo}`,
        });
      }
    }

    for (const t of trabajos) {
      const bytes = await imprimir(cdp, t);
      console.log(`  ✔ ${path.basename(t.destino)}  (${kb(bytes)})`);
    }

    console.log(`\nPDF generados en: ${SALIDA}`);
    console.log(`Ábrelos con: start "" "${path.join(SALIDA, "AWS-SAA-Teoria-Completa.pdf")}"`);
    console.log(`(o desde el navegador: ${pathToFileURL(path.join(DOCS, "imprimir.html")).href})`);
  } finally {
    cdp?.cerrar();
    proc.kill();
    server.close();
    await esperar(300);
    await rm(perfilTmp, { recursive: true, force: true }).catch(() => {});
  }
}

main().catch((e) => { console.error("Error:", e.message); process.exit(1); });
