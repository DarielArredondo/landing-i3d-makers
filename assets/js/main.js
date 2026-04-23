/* =========================================================
   UI general — año, navegación, formulario, menú móvil
   ========================================================= */
(function () {
  // Año en footer
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  // Navegación con Lenis scrollTo
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href');
      if (!href || href === '#' || href.length < 2) return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      if (window.lenis && typeof window.lenis.scrollTo === 'function') {
        window.lenis.scrollTo(target, { offset: -72, duration: 1.4 });
      } else {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      // cerrar menú móvil si estaba abierto
      document.body.classList.remove('menu-open');
    });
  });

  // Menú móvil (simple toggle)
  const btnMenu = document.getElementById('btnMenu');
  if (btnMenu) {
    btnMenu.addEventListener('click', () => {
      const open = document.body.classList.toggle('menu-open');
      btnMenu.setAttribute('aria-expanded', String(open));
    });
  }

  // ================= Visor 3D =================
  const viewer = document.getElementById('printerViewer');
  if (viewer) {
    const hint = document.getElementById('viewerHint');
    const specTitle = document.getElementById('specTitle');
    const specDesc = document.getElementById('specDesc');
    const specList = document.getElementById('specList');
    const btnReset = document.getElementById('viewerReset');
    const btnRotate = document.getElementById('viewerRotate');
    const btnAR = document.getElementById('viewerAR');

    const DEFAULT_ORBIT = '-25deg 72deg 2.4m';
    const SPECS = {
      default: {
        title: 'Bambu Lab X1 Carbon',
        desc: 'Impresora CoreXY de alta velocidad con sistema multimaterial AMS. Toca un punto del modelo para ver detalles.',
        list: [['Velocidad', '500 mm/s'], ['Volumen', '256³ mm'], ['Precisión', '±0.1 mm']],
        orbit: DEFAULT_ORBIT,
      },
      'hotspot-head': {
        title: 'Cabezal AMS Lite',
        desc: 'Extrusor directo de alta flujo con detección de filamento y cambio automático de hasta 16 materiales vía AMS.',
        list: [['Hotend', '300 °C'], ['Materiales', 'PLA/PETG/ABS/PC'], ['Cambio', '<30 s']],
        orbit: '10deg 55deg 1.6m',
      },
      'hotspot-bed': {
        title: 'Mesa calentada',
        desc: 'Cama de acero con resorte texturizada. Calentamiento uniforme y nivelación automática por sensor.',
        list: [['Temp. máx.', '120 °C'], ['Área', '256 × 256 mm'], ['Nivelado', 'Automático']],
        orbit: '-15deg 88deg 1.8m',
      },
      'hotspot-display': {
        title: 'Display táctil 5"',
        desc: 'Control integrado con cámara de monitoreo, time-lapse automático y gestión remota vía app.',
        list: [['Pantalla', 'IPS 5"'], ['Conectividad', 'Wi-Fi · LAN'], ['App', 'iOS · Android']],
        orbit: '40deg 65deg 1.5m',
      },
    };

    function renderSpec(key) {
      const s = SPECS[key] || SPECS.default;
      specTitle.textContent = s.title;
      specDesc.textContent = s.desc;
      specList.innerHTML = s.list
        .map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`)
        .join('');
      viewer.cameraOrbit = s.orbit;
    }

    // Hide hint on first interaction
    ['pointerdown', 'wheel', 'touchstart'].forEach((ev) => {
      viewer.addEventListener(ev, () => hint?.classList.add('is-hidden'), { once: true, passive: true });
    });

    // Hotspots
    const hotspots = viewer.querySelectorAll('.hotspot');
    hotspots.forEach((h) => {
      h.addEventListener('click', () => {
        const activeKey = h.getAttribute('slot');
        hotspots.forEach((x) => x.setAttribute('data-active', x === h ? 'true' : 'false'));
        renderSpec(activeKey);
      });
    });

    // Reset
    btnReset?.addEventListener('click', () => {
      hotspots.forEach((x) => x.setAttribute('data-active', 'false'));
      renderSpec('default');
    });

    // Toggle auto-rotate
    btnRotate?.addEventListener('click', () => {
      const on = viewer.hasAttribute('auto-rotate');
      if (on) {
        viewer.removeAttribute('auto-rotate');
        btnRotate.setAttribute('aria-pressed', 'false');
        btnRotate.setAttribute('aria-label', 'Reanudar rotación automática');
      } else {
        viewer.setAttribute('auto-rotate', '');
        btnRotate.setAttribute('aria-pressed', 'true');
        btnRotate.setAttribute('aria-label', 'Pausar rotación automática');
      }
    });

    // AR
    btnAR?.addEventListener('click', () => {
      if (viewer.canActivateAR) viewer.activateAR();
      else alert('AR no disponible en este dispositivo. Abre la página desde un móvil compatible.');
    });

    // Progress bar
    viewer.addEventListener('progress', (e) => {
      const bar = viewer.querySelector('.viewer-progress-bar');
      if (bar) bar.style.width = (e.detail.totalProgress * 100).toFixed(1) + '%';
    });
  }

  // Formulario — feedback visual
  const form = document.querySelector('.contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      if (!btn) return;
      const original = btn.textContent;
      btn.textContent = 'Enviando…';
      btn.disabled = true;
      setTimeout(() => {
        btn.textContent = '¡Gracias! Te contactamos pronto.';
        form.reset();
        setTimeout(() => {
          btn.textContent = original;
          btn.disabled = false;
        }, 2400);
      }, 700);
    });
  }
})();
