# i3D MAKERS — Landing Page

Landing page one-page para **i3D MAKERS**, construida con HTML + CSS + JS vanilla y animada con [Lenis](https://www.lenis.dev/) (smooth scroll) + GSAP ScrollTrigger.

## Stack

- HTML5 + CSS custom (tokens + BEM ligero)
- Montserrat (Google Fonts) — sustituto libre de Gotham
- Lenis 1.3.23 — smooth scroll
- GSAP 3.12.5 + ScrollTrigger — parallax, reveals, pin horizontal

Sin build step. Todo vía CDN.

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
3. **Parallax del cubo** isométrico ligado al scroll + flotación idle.
4. **Reveals** (`.reveal`) en todas las secciones al entrar al viewport.
5. **Pin + scroll horizontal** en la sección *Proceso* (4 pasos) con barra de progreso.
6. **Parallax por velocidad** (`data-speed`) en la galería.
7. **Header glassmorphism** al hacer scroll.
8. **Navegación smooth** usando `lenis.scrollTo`.
9. **`prefers-reduced-motion`** respetado en todo el sitio.

## Próximos pasos

- Reemplazar `assets/img/cube-isometric.svg` y `logo-mark.svg` por los oficiales exportados desde el manual de marca.
- Sustituir los placeholders de la galería por fotos reales en WebP (ratio 4:5 / 16:10 según grid).
- Conectar el formulario de contacto a un endpoint real (Formspree, Netlify Forms, API propia).
- Añadir metadatos OpenGraph + favicon PNG para legacy.
- Comprar/licenciar Gotham si se quiere usar la tipografía oficial.
