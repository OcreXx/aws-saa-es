# AWS SAA en español

Plataforma ligera y estática para estudiar la certificación **AWS Solutions Architect Associate (SAA-C03)** en español: teoría condensada con preguntas y exámenes de práctica.

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
  js/app.js          → router + render + quizzes + diagramas
  js/data-teoria.js  → contenido de teoría (13 módulos, mapas conceptuales opcionales)
  js/data-examenes.js→ exámenes de práctica (bloques de 50 preguntas; ver más abajo)
  img/               → imágenes de la teoría (diagramas de arquitectura, etc.)
```

## 🗺️ Diagramas (mapas conceptuales)

Cada módulo de teoría puede incluir un **mapa conceptual** que se muestra al principio de su pestaña *Teoría*. Se define con un campo opcional `diagrama` en el módulo (`js/data-teoria.js`), cuyo valor es texto **[Mermaid](https://mermaid.js.org/)**:

```js
{
  id: "02-iam",
  // …
  diagrama: `graph TD
    A[Usuarios / Grupos IAM] --> B[Roles IAM]
    B --> C[AWS STS]`,
  teoria: [ /* … */ ]
}
```

`app.js` lo renderiza solo (helper `runMermaid()`) dentro de `<figure class="conceptmap">`; **no hay que tocar el HTML ni el CSS**. Mermaid se carga de forma **diferida desde CDN** (jsdelivr, módulo ESM) en `index.html`, con un tema adaptado a la paleta del sitio.

> ⚠️ El render del diagrama necesita conexión (CDN de Mermaid). Sin internet el resto de la teoría funciona igual, pero el recuadro del mapa queda vacío.
>
> Los `.md` de origen en `TheroyBase/` **no se publican** (están en `.gitignore`): para incluir un diagrama hay que copiar su contenido al campo `diagrama` del módulo.

## 🖼️ Imágenes

Las imágenes (diagramas de arquitectura, etc.) van en **`docs/img/`** (dentro de `docs/`, por eso se publican) y se referencian en el HTML de una sección con una figura:

```html
<figure class="figure">
  <img src="img/DirectConnect.png" alt="Descripción accesible" loading="lazy">
  <figcaption>Pie de imagen.</figcaption>
</figure>
```

El CSS de `.prose .figure` las enmarca y centra automáticamente. Las imágenes fuente viven en `TheroyBase/NN-*/` (no publicado), así que hay que **copiarlas a `docs/img/`**. GitHub Pages distingue mayúsculas/minúsculas: respeta el nombre exacto en el `src`.

## 📝 Exámenes de práctica (cómo se generan)

Los exámenes viven en `js/data-examenes.js` (`window.EXAMENES`), en **bloques de 50 preguntas**. Cada pregunta usa el mismo esquema que las de teoría:

```js
{
  pregunta: "…",
  opciones: ["…", "…", "…", "…"],
  correctas: [1],       // índices 0=A, 1=B…  (varios si es de respuesta múltiple)
  explicacion: "…",
  codigo: "…"           // opcional: bloque monoespaciado (política IAM, diagrama…)
}
```

### Material de origen (local, no versionado)

El contenido se traduce y condensa al español desde `DumpsBase/` (está en `.gitignore`, **no se publica**):

- **`DumpsBase/dump1Sol.txt`** → la **respuesta correcta**. Trae las opciones A–D **solo en las preguntas 1–50**; de la 51 en adelante las opciones se sacan del PDF.
- **`DumpsBase/dump1Questions.pdf`** → 684 preguntas (marcador `Topic 1Question #N`). El texto se extrae con `pypdf` (pierde ligaduras `fi`/`ff`/`ti`, irrelevante al traducir). `poppler`/`pdftoppm` no está instalado, así que no se renderizan páginas.

Rarezas del `.txt`: numera con `N]` las preguntas 1–50 y 186+, y con `N.` las 51–185; alguna falta (la 98 va incrustada en la 97 con prefijo `IMP>>>>>>`) o no trae respuesta (la 80). Las preguntas con **imagen** (políticas IAM, diagramas) se extraen con `pypdf` + `pillow` y se vuelcan en el campo `codigo`.

### ⚠️ El dump tiene respuestas equivocadas

No copiar la respuesta del dump a ciegas: **verificar cada una**. Cuando el dump falle, poner la correcta y añadir al final de la `explicacion` una nota del tipo *«Nota: el fichero de soluciones del dump marca X»*.

### Progreso

| Examen | Preguntas del dump |
|--------|--------------------|
| `examen-01` | 1–52 (el dump repite 2 en ese tramo) |
| `examen-02` | 53–102 |
| `examen-03` | 103–152 |
| `examen-04` | 153–202 (18 de esas 50 no traían respuesta en el `.txt`; resueltas por conocimiento propio de AWS, sin nota al no contradecir un valor existente) |
| `examen-05` | 203–252 (6 sin respuesta en el `.txt`: 207, 210, 219, 224, 235, 247; y una respuesta corregida por quedar desactualizada: 239, Lambda Function URLs) |
| `examen-06` | 253–302 (2 sin respuesta en el `.txt`: 283 y 298; el resto traía explicación completa, no solo la letra) |
| `examen-07` | 303–352 (5 sin respuesta en el `.txt`: 308, 311, 315, 327, 341) |
| `examen-08` | 353–402 (3 sin respuesta en el `.txt`: 366, 390, 402) |
| **Siguiente** | **desde la 403** (quedan ~282 de 684) |

## ℹ️ Nota

Contenido educativo original. No son preguntas reales del examen oficial de AWS.
