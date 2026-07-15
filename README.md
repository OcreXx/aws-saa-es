# AWS SAA en español

Plataforma ligera y estática para estudiar la certificación **AWS Solutions Architect Associate (SAA-C03)** en español: teoría condensada con preguntas y (próximamente) exámenes de práctica.

## 🚀 Ver la web

El sitio se sirve con **GitHub Pages** desde la carpeta [`/docs`](docs/).

> URL: `https://<usuario>.github.io/<repositorio>/`

## 🛠️ Desarrollo local

No necesita build ni dependencias. Basta con abrir un servidor estático sobre la carpeta `docs/`:

```bash
cd docs
python -m http.server 8123
# abre http://localhost:8123
```

## 📂 Estructura

```
docs/            → sitio web publicado (GitHub Pages)
  index.html     → shell de la SPA
  css/styles.css → sistema de diseño
  js/app.js          → router + render + quizzes
  js/data-teoria.js  → contenido de teoría (13 módulos)
  js/data-examenes.js→ exámenes de práctica (en construcción)
```

## ℹ️ Nota

Contenido educativo original. No son preguntas reales del examen oficial de AWS.
