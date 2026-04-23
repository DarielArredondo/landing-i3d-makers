# i3D MAKERS — Landing Page

Landing page one-page para **i3D MAKERS**, construida con HTML + CSS + JS vanilla y animada con [Lenis](https://www.lenis.dev/) (smooth scroll) + GSAP ScrollTrigger.

## Stack

- HTML5 + CSS custom (tokens + BEM ligero)
- Montserrat (Google Fonts) — sustituto libre de Gotham
- Lenis 1.3.23 — smooth scroll
- GSAP 3.12.5 + ScrollTrigger — parallax, reveals, pin horizontal
- `<model-viewer>` 4.0.0 (Google) — visor 3D interactivo en el hero (rotación mouse + touch, pinch-zoom, AR)

Sin build step. Todo vía CDN.

## Modelo 3D del hero

El hero incluye un visor 3D interactivo de una **Bambu Lab X1 Carbon**.
Antes de deployar, descargar el GLB siguiendo [assets/models/README.md](assets/models/README.md) y dejarlo en `assets/models/printer.glb`.

Mientras no exista, se muestra el poster SVG sin romper el layout.

**Atribución:** modelo por [petersonja2 (@Chase_6)](https://sketchfab.com/Chase_6) bajo licencia [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). Ya incluida en el footer del sitio.

## Correr localmente

Opción 1 — VS Code Live Server: click derecho en `index.html` → *Open with Live Server*.

Opción 2 — Node:
```bash
npx serve .
```

Opción 3 — Python:
```bash
python -m http.server 8080
```

Luego abrir http://localhost:8080

## Estructura

```
/
├── index.html
├── assets/
│   ├── css/
│   │   ├── reset.css
│   │   ├── tokens.css      # variables de marca (colores, tipografía, chaflán)
│   │   └── styles.css      # layout y componentes
│   ├── js/
│   │   ├── lenis-init.js   # Lenis + sync con GSAP ticker
│   │   ├── animations.js   # ScrollTriggers (hero parallax, pin horizontal, reveals)
│   │   └── main.js         # navegación smooth, año, formulario, menú
│   └── img/                # logo y cubo isométrico (SVG)
└── README.md
```

## Sistema de marca aplicado

| Token | Valor |
|---|---|
| Bayside Blue | `#1e83e9` |
| Vibrant Violet | `#6c3bd9` |
| Magent Gem | `#e91d7a` |
| Gradient firma | `linear-gradient(120deg, #1e83e9, #6c3bd9, #e91d7a)` |
| Tipografía | Montserrat 400/600/700/800/900 |
| Chaflán | `clip-path` polygon 18px en tarjetas y botones |

## Efectos Lenis / ScrollTrigger

1. **Scroll suave global** con inercia exponencial (`duration: 1.15`).
2. **Reveal del H1** línea por línea al cargar.
3. **Visor 3D interactivo** en el hero: rotación mouse + touch, pinch-zoom, auto-rotate, hotspots, botón AR.
4. **Parallax sutil del frame** del visor ligado al scroll (sin interferir con la cámara).
5. **Reveals** (`.reveal`) en todas las secciones al entrar al viewport.
6. **Pin + scroll horizontal** en la sección *Proceso* (4 pasos) con barra de progreso.
7. **Parallax por velocidad** (`data-speed`) en la galería.
8. **Header glassmorphism** al hacer scroll.
9. **Navegación smooth** usando `lenis.scrollTo`.
10. **`prefers-reduced-motion`** respetado en todo el sitio.

## Visor 3D — features

- **Rotación:** drag con mouse (desktop) o un dedo (móvil).
- **Zoom:** rueda del mouse o pinch con dos dedos.
- **Auto-rotate:** arranca a los 2.5 s de inactividad.
- **Hotspots:** 3 puntos interactivos (Cabezal, Mesa, Display) que cambian las specs del panel lateral y re-encuadran la cámara al click.
- **Controles:** botones de reset vista, pausar rotación y activar AR.
- **AR móvil:** abre Scene Viewer (Android) o Quick Look (iOS) para colocar el printer en tu entorno.
- **Performance:** iluminación HDR neutral, tone mapping ACES, sombras suaves. Poster SVG mientras carga el GLB.
- **Accesibilidad:** `aria-label` en controles, `data-lenis-prevent` para que el gesto de rotación no scrollee la página.

## Próximos pasos

- Reemplazar `assets/img/cube-isometric.svg` y `logo-mark.svg` por los oficiales exportados desde el manual de marca.
- Sustituir los placeholders de la galería por fotos reales en WebP (ratio 4:5 / 16:10 según grid).
- Conectar el formulario de contacto a un endpoint real (Formspree, Netlify Forms, API propia).
- Añadir metadatos OpenGraph + favicon PNG para legacy.
- Comprar/licenciar Gotham si se quiere usar la tipografía oficial.
