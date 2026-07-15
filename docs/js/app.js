/* =========================================================
   AWS SAA en Español — App (router + render + quiz)
   Vanilla JS, sin dependencias.
   ========================================================= */
(function () {
  "use strict";

  const TEORIA = window.TEORIA || [];
  const EXAMENES = window.EXAMENES || [];
  const app = document.getElementById("app");

  /* ---------- Iconos SVG ---------- */
  const ICON = {
    book: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 5a2 2 0 0 1 2-2h6v16H6a2 2 0 0 0-2 2V5Z"/><path d="M20 5a2 2 0 0 0-2-2h-6v16h6a2 2 0 0 1 2 2V5Z"/></svg>',
    exam: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"/><rect x="9" y="3" width="6" height="4" rx="1"/><path d="m9 14 2 2 4-4"/></svg>',
    clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
    help: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M9.5 9a2.5 2.5 0 0 1 4.5 1.5c0 1.5-2 2-2 3"/><path d="M12 17h.01"/></svg>',
    arrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
    spark: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M18.4 5.6l-2.8 2.8M8.4 15.6l-2.8 2.8"/></svg>',
    layers: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="m12 2 9 5-9 5-9-5 9-5Z"/><path d="m3 12 9 5 9-5"/><path d="m3 17 9 5 9-5"/></svg>',
    target: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.4" fill="currentColor"/></svg>',
  };

  /* ---------- Utilidades ---------- */
  const el = (html) => { const t = document.createElement("template"); t.innerHTML = html.trim(); return t.content.firstElementChild; };
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const letter = (i) => "ABCDEFGH"[i] || "?";
  const findModulo = (id) => TEORIA.find((m) => m.id === id);
  const totalPreguntas = () => TEORIA.reduce((n, m) => n + (m.preguntas ? m.preguntas.length : 0), 0);

  /* =========================================================
     Rutas
     ========================================================= */
  function router() {
    const hash = location.hash.replace(/^#/, "") || "/";
    const parts = hash.split("/").filter(Boolean); // ["teoria","01-..."]
    window.scrollTo(0, 0);
    closeMenu();

    if (parts.length === 0) return renderHome();
    if (parts[0] === "teoria" && parts[1]) return renderModulo(parts[1], parts[2]);
    if (parts[0] === "teoria") return renderTeoriaIndex();
    if (parts[0] === "examenes") return renderExamenes();
    return renderHome();
  }

  function setActiveNav(key) {
    document.querySelectorAll(".nav__links a").forEach((a) => {
      a.classList.toggle("is-active", a.dataset.nav === key);
    });
  }

  /* =========================================================
     Inicio
     ========================================================= */
  function renderHome() {
    setActiveNav("home");
    const nMod = TEORIA.length;
    const nPreg = totalPreguntas();
    const nExam = EXAMENES.reduce((n, e) => n + (e.preguntas ? e.preguntas.length : 0), 0);

    app.innerHTML = `
      <section class="hero wrap reveal">
        <span class="hero__eyebrow">Certificación SAA-C03 · en español</span>
        <h1>Aprueba el <span class="accent">AWS Solutions Architect</span> Associate</h1>
        <p class="hero__lead">Una plataforma ligera para estudiar la certificación en español. Teoría condensada, orientada al examen, y cientos de preguntas de práctica con explicaciones.</p>
        <div class="hero__cta">
          <a class="btn btn--primary" href="#/teoria">${ICON.book} Empezar por la teoría</a>
          <a class="btn btn--ghost" href="#/examenes">${ICON.exam} Ir a los exámenes</a>
        </div>
        <div class="hero__stats">
          <div><div class="stat__num">${nMod}</div><div class="stat__label">Módulos de teoría</div></div>
          <div><div class="stat__num">${nPreg}<small>+</small></div><div class="stat__label">Preguntas de teoría</div></div>
          <div><div class="stat__num">${nExam || "—"}</div><div class="stat__label">Preguntas de examen</div></div>
          <div><div class="stat__num">100<small>%</small></div><div class="stat__label">En español</div></div>
        </div>
      </section>

      <section class="section wrap">
        <div class="paths">
          <a class="path reveal" href="#/teoria">
            <div class="path__icon">${ICON.book}</div>
            <span class="path__kicker">Parte 1</span>
            <h3>Teoría</h3>
            <p>Conceptos esenciales de AWS organizados en ${nMod} módulos, cada uno con sus propias preguntas de repaso para fijar lo aprendido.</p>
            <span class="path__foot">Explorar módulos <span class="arrow">${ICON.arrow}</span></span>
          </a>
          <a class="path reveal" href="#/examenes" style="animation-delay:.08s">
            <div class="path__icon">${ICON.exam}</div>
            <span class="path__kicker">Parte 2</span>
            <h3>Exámenes de práctica</h3>
            <p>Simulacros con preguntas al estilo del examen real, con respuesta correcta y explicación detallada para practicar de forma realista.</p>
            <span class="path__foot">Practicar ahora <span class="arrow">${ICON.arrow}</span></span>
          </a>
        </div>
      </section>
    `;
  }

  /* =========================================================
     Índice de teoría (rejilla de módulos)
     ========================================================= */
  function renderTeoriaIndex() {
    setActiveNav("teoria");
    const cards = TEORIA.map((m, i) => `
      <a class="modcard reveal" href="#/teoria/${m.id}" style="animation-delay:${i * 0.04}s">
        <div class="modcard__top">
          <div class="modcard__num">${String(m.numero).padStart(2, "0")}</div>
          <div class="modcard__weight">${esc(m.peso || "")}</div>
        </div>
        <h3>${esc(m.titulo)}</h3>
        <p>${esc(m.resumen || "")}</p>
        <div class="modcard__foot">
          <span>${ICON.layers} ${m.teoria ? m.teoria.length : 0} secciones</span>
          <span>${ICON.help} ${m.preguntas ? m.preguntas.length : 0} preguntas</span>
        </div>
      </a>`).join("");

    app.innerHTML = `
      <section class="pagehead wrap reveal">
        <div class="crumbs"><a href="#/">Inicio</a><span>/</span> Teoría</div>
        <h1>Teoría</h1>
        <p>Los fundamentos que necesitas para el examen, divididos en ${TEORIA.length} módulos. Cada módulo incluye teoría condensada y preguntas de repaso.</p>
      </section>
      <section class="wrap"><div class="modgrid">${cards}</div></section>
    `;
  }

  /* =========================================================
     Vista de un módulo
     ========================================================= */
  function renderModulo(id, tab) {
    setActiveNav("teoria");
    const m = findModulo(id);
    if (!m) return renderTeoriaIndex();
    const activeTab = tab === "preguntas" ? "preguntas" : "teoria";

    // Sidebar con TODOS los módulos (el activo es una tarjeta con sus secciones)
    const modList = TEORIA.map((mod) => {
      const active = mod.id === m.id;
      const num = String(mod.numero).padStart(2, "0");
      if (active) {
        const secs = (mod.teoria || []).map((s, i) =>
          `<button class="side-sec ${i === 0 ? "is-active" : ""}" data-sec="${s.id}">${esc(s.titulo)}</button>`).join("");
        return `<div class="side-block">
            <a class="side-head" href="#/teoria/${mod.id}">
              <span class="n">${num}</span><span class="txt">${esc(mod.titulo)}</span>
            </a>
            ${secs ? `<div class="side-secs">${secs}</div>` : ""}
          </div>`;
      }
      return `<a class="side-mod" href="#/teoria/${mod.id}">
          <span class="n">${num}</span><span class="txt">${esc(mod.titulo)}</span>
        </a>`;
    }).join("");

    const teoriaHTML = (m.teoria || []).map((s, i) => `
      <section id="seccion-${s.id}">
        <h2><span class="n">${String(i + 1).padStart(2, "0")}</span> ${esc(s.titulo)}</h2>
        ${s.html}
      </section>`).join("");

    app.innerHTML = `
      <div class="doclayout">
        <aside class="sidebar">
          <div class="sidebar__title">Módulos</div>
          <nav class="sidebar__nav">${modList}</nav>
        </aside>

        <div class="doc">
          <div class="doc__inner">
            <div class="pagehead reveal">
              <div class="crumbs">
                <a href="#/">Inicio</a><span>/</span>
                <a href="#/teoria">Teoría</a><span>/</span>
                Módulo ${String(m.numero).padStart(2, "0")}
              </div>
              <h1>${esc(m.titulo)}</h1>
              <p>${esc(m.resumen || "")}</p>
              <div class="modcard__foot" style="margin-top:18px;gap:20px">
                <span>${ICON.clock} ${esc(m.tiempo || "—")}</span>
                <span>${ICON.target} Peso examen ${esc(m.peso || "—")}</span>
              </div>
            </div>

            <div class="tabs" role="tablist">
              <button class="tab ${activeTab === "teoria" ? "is-active" : ""}" data-gototab="teoria">Teoría</button>
              <button class="tab ${activeTab === "preguntas" ? "is-active" : ""}" data-gototab="preguntas">Preguntas <span class="count">(${m.preguntas ? m.preguntas.length : 0})</span></button>
            </div>

            <div ${activeTab !== "teoria" ? "hidden" : ""} data-panel="teoria">
              <div class="prose reveal">${teoriaHTML}</div>
            </div>

            <div ${activeTab !== "preguntas" ? "hidden" : ""} data-panel="preguntas">
              ${renderQuiz(m.preguntas || [])}
            </div>
          </div>
        </div>
      </div>
    `;

    wireTabs(m);
    wireSidebar();
    if (activeTab === "preguntas") wireQuiz();
    else wireScrollSpy();
  }

  /* ---------- Navegación por secciones (sidebar) ---------- */
  function wireSidebar() {
    // Deja el módulo activo a la vista dentro de la sidebar (sin mover la página)
    const centerActive = () => {
      const sb = app.querySelector(".sidebar");
      const nav = app.querySelector(".sidebar__nav");
      const act = app.querySelector(".side-block");
      if (!act) return;
      if (window.matchMedia("(max-width: 900px)").matches) {
        if (nav) {
          const total = app.querySelectorAll(".side-mod").length + 1;
          const num = parseInt((act.querySelector(".n") || {}).textContent, 10) || 1;
          const frac = (num - 1) / Math.max(1, total - 1);
          nav.scrollLeft = frac * (nav.scrollWidth - nav.clientWidth);
        }
      } else if (sb) {
        sb.scrollTop = Math.max(0, act.offsetTop - 140);
      }
    };
    requestAnimationFrame(() => requestAnimationFrame(centerActive));
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(centerActive);

    app.querySelectorAll(".side-sec").forEach((btn) => {
      btn.addEventListener("click", () => {
        const sid = btn.dataset.sec;
        const teoriaPanel = app.querySelector('[data-panel="teoria"]');
        if (teoriaPanel && teoriaPanel.hidden) {
          const tabBtn = app.querySelector('[data-gototab="teoria"]');
          if (tabBtn) tabBtn.click();
        }
        const sec = document.getElementById("seccion-" + sid);
        if (sec) sec.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });
  }

  /* ---------- Pestañas ---------- */
  function wireTabs(m) {
    app.querySelectorAll("[data-gototab]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const target = btn.dataset.gototab;
        app.querySelectorAll(".tab").forEach((t) => t.classList.toggle("is-active", t.dataset.gototab === target));
        app.querySelectorAll("[data-panel]").forEach((p) => (p.hidden = p.dataset.panel !== target));
        const base = `#/teoria/${m.id}`;
        history.replaceState(null, "", target === "preguntas" ? base + "/preguntas" : base);
        if (target === "preguntas") wireQuiz();
        else wireScrollSpy();
      });
    });
  }

  /* ---------- Scroll spy (resalta la sección activa en la sidebar) ---------- */
  function wireScrollSpy() {
    const links = app.querySelectorAll(".side-sec");
    const sections = app.querySelectorAll(".prose section");
    if (!("IntersectionObserver" in window) || !sections.length) return;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          const id = e.target.id.replace("seccion-", "");
          links.forEach((l) => l.classList.toggle("is-active", l.dataset.sec === id));
        }
      });
    }, { rootMargin: "-15% 0px -75% 0px" });
    sections.forEach((s) => obs.observe(s));
  }

  /* =========================================================
     Quiz
     ========================================================= */
  function renderQuiz(preguntas) {
    if (!preguntas.length) {
      return `<div class="empty"><div class="empty__icon">${ICON.help}</div><h2>Sin preguntas todavía</h2><p>Este módulo aún no tiene preguntas de repaso.</p></div>`;
    }
    const qs = preguntas.map((q, qi) => {
      const multi = (q.correctas || []).length > 1;
      const opts = q.opciones.map((o, oi) =>
        `<button class="opt" data-q="${qi}" data-o="${oi}"><span class="opt__key">${letter(oi)}</span><span>${esc(o)}</span></button>`).join("");
      return `
        <div class="q" data-qcard="${qi}">
          <div class="q__head">
            <div class="q__idx">${qi + 1}</div>
            <div>
              <div class="q__text">${esc(q.pregunta)}</div>
              ${multi ? `<span class="q__multi">Selecciona ${q.correctas.length}</span>` : ""}
            </div>
          </div>
          <div class="q__opts">${opts}</div>
          <div class="q__explain" data-explain="${qi}">
            <span class="lbl">Explicación</span>
            ${esc(q.explicacion || "")}
          </div>
        </div>`;
    }).join("");

    return `
      <div class="quiz">
        <div class="quiz__bar">
          <div class="quiz__score">Aciertos: <b data-score>0</b> / ${preguntas.length}</div>
          <div class="quiz__bartrack"><div class="quiz__barfill" data-fill></div></div>
          <button class="quiz__reset" data-reset>Reiniciar</button>
        </div>
        ${qs}
      </div>`;
  }

  function wireQuiz() {
    const panel = app.querySelector('[data-panel="preguntas"]');
    if (!panel) return;
    const m = findModulo(location.hash.split("/")[2]);
    const preguntas = (m && m.preguntas) || [];
    const answered = {};      // qi -> bool (contabilizada)
    const picked = {};        // qi -> Set(oi)

    const updateScore = () => {
      let ok = 0;
      Object.keys(answered).forEach((qi) => { if (answered[qi] === true) ok++; });
      const total = preguntas.length;
      panel.querySelector("[data-score]").textContent = ok;
      panel.querySelector("[data-fill]").style.width = (ok / total * 100) + "%";
    };

    const lockQuestion = (qi) => {
      const q = preguntas[qi];
      const correct = new Set(q.correctas);
      const chosen = picked[qi] || new Set();
      const card = panel.querySelector(`[data-qcard="${qi}"]`);
      card.querySelectorAll(".opt").forEach((btn) => {
        const oi = +btn.dataset.o;
        btn.classList.add("is-locked");
        if (correct.has(oi) && chosen.has(oi)) btn.classList.add("is-correct");
        else if (!correct.has(oi) && chosen.has(oi)) btn.classList.add("is-wrong");
        else if (correct.has(oi) && !chosen.has(oi)) btn.classList.add("is-missed");
      });
      // Acierto = elegidas exactamente iguales a las correctas
      const allRight = chosen.size === correct.size && [...chosen].every((o) => correct.has(o));
      answered[qi] = allRight;
      panel.querySelector(`[data-explain="${qi}"]`).classList.add("is-open");
      updateScore();
    };

    panel.querySelectorAll(".opt").forEach((btn) => {
      btn.addEventListener("click", () => {
        const qi = +btn.dataset.q, oi = +btn.dataset.o;
        const q = preguntas[qi];
        const multi = q.correctas.length > 1;
        if (answered[qi] !== undefined) return; // ya bloqueada
        if (!picked[qi]) picked[qi] = new Set();

        if (!multi) {
          picked[qi] = new Set([oi]);
          lockQuestion(qi);
        } else {
          // multi: alterna selección; bloquea al alcanzar el nº de correctas
          if (picked[qi].has(oi)) picked[qi].delete(oi);
          else picked[qi].add(oi);
          const card = panel.querySelector(`[data-qcard="${qi}"]`);
          card.querySelectorAll(".opt").forEach((b) => {
            b.style.borderColor = picked[qi].has(+b.dataset.o) ? "var(--orange)" : "";
            b.style.background = picked[qi].has(+b.dataset.o) ? "var(--orange-tint)" : "";
          });
          if (picked[qi].size === q.correctas.length) lockQuestion(qi);
        }
      });
    });

    panel.querySelector("[data-reset]").addEventListener("click", () => {
      renderModulo(m.id, "preguntas");
    });
  }

  /* =========================================================
     Exámenes de práctica
     ========================================================= */
  function renderExamenes() {
    setActiveNav("examenes");
    if (!EXAMENES.length) {
      app.innerHTML = `
        <section class="pagehead wrap reveal">
          <div class="crumbs"><a href="#/">Inicio</a><span>/</span> Exámenes</div>
          <h1>Exámenes de práctica</h1>
        </section>
        <section class="wrap">
          <div class="empty reveal">
            <div class="empty__icon">${ICON.exam}</div>
            <h2>Próximamente</h2>
            <p>Los simulacros de examen se están preparando. Mientras tanto, repasa la teoría y sus preguntas de cada módulo.</p>
            <a class="btn btn--primary" href="#/teoria">${ICON.book} Ir a la teoría</a>
          </div>
        </section>`;
      return;
    }
    // (Estructura lista para cuando existan exámenes)
    const cards = EXAMENES.map((e, i) => `
      <a class="modcard reveal" href="#/examenes/${e.id}" style="animation-delay:${i * 0.04}s">
        <div class="modcard__top"><div class="modcard__num">${String(i + 1).padStart(2, "0")}</div></div>
        <h3>${esc(e.titulo)}</h3>
        <p>${esc(e.resumen || "")}</p>
        <div class="modcard__foot"><span>${ICON.help} ${e.preguntas ? e.preguntas.length : 0} preguntas</span></div>
      </a>`).join("");
    app.innerHTML = `
      <section class="pagehead wrap reveal">
        <div class="crumbs"><a href="#/">Inicio</a><span>/</span> Exámenes</div>
        <h1>Exámenes de práctica</h1>
        <p>Simulacros al estilo del examen oficial SAA-C03.</p>
      </section>
      <section class="wrap"><div class="modgrid">${cards}</div></section>`;
  }

  /* =========================================================
     Menú móvil
     ========================================================= */
  const links = document.querySelector(".nav__links");
  const toggle = document.getElementById("navToggle");
  function closeMenu() { links && links.classList.remove("is-open"); }
  if (toggle) toggle.addEventListener("click", () => links.classList.toggle("is-open"));

  /* ---------- Init ---------- */
  window.addEventListener("hashchange", router);
  router();
})();
