/* =========================================================
   GSAP ScrollTrigger animations
   Reveals · Hero parallax · Proceso pin-horizontal · Galería parallax
   ========================================================= */
(function () {
  if (!window.gsap || !window.ScrollTrigger) return;
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* -----------------------------------------
     1. Hero — líneas del H1 (reveal escalonado)
     ----------------------------------------- */
  const heroLines = document.querySelectorAll('.hero h1 .line > span');
  if (heroLines.length) {
    gsap.set('.hero h1 .line > span', { y: '110%' });
    gsap.to('.hero h1 .line > span', {
      y: '0%',
      duration: 1,
      ease: 'expo.out',
      stagger: 0.12,
      delay: 0.2,
    });
  }

  /* -----------------------------------------
     2. Hero — parallax del cubo + rotación ligera
     ----------------------------------------- */
  const cube = document.querySelector('.hero-cube');
  if (cube && !prefersReduced) {
    gsap.to(cube, {
      y: 120,
      rotate: 6,
      scale: 0.95,
      ease: 'none',
      scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    });

    // Floating idle animation
    gsap.to(cube, {
      y: '+=14',
      duration: 3.2,
      yoyo: true,
      repeat: -1,
      ease: 'sine.inOut',
    });

    // Orbit tags drift
    gsap.utils.toArray('.hero-orbit span').forEach((el, i) => {
      gsap.to(el, {
        y: (i % 2 === 0 ? -14 : 14),
        duration: 4 + i * 0.6,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut',
      });
    });
  }

  /* -----------------------------------------
     3. Reveals genéricos (.reveal)
     ----------------------------------------- */
  gsap.utils.toArray('.reveal').forEach((el) => {
    gsap.to(el, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    });
  });

  /* -----------------------------------------
     4. Proceso — pin + scroll horizontal
     ----------------------------------------- */
  const track = document.getElementById('procesoTrack');
  const bar = document.getElementById('procesoBar');
  const wrap = document.querySelector('.proceso-track-wrap');

  if (track && wrap) {
    const getDistance = () => track.scrollWidth - window.innerWidth + parseInt(getComputedStyle(document.documentElement).getPropertyValue('--gutter')) * 2;

    const tween = gsap.to(track, {
      x: () => -getDistance(),
      ease: 'none',
      scrollTrigger: {
        trigger: wrap,
        start: 'top top',
        end: () => '+=' + getDistance(),
        scrub: 1,
        pin: true,
        invalidateOnRefresh: true,
        anticipatePin: 1,
        onUpdate: (self) => {
          if (bar) bar.style.width = (self.progress * 100).toFixed(2) + '%';
        },
      },
    });

    window.addEventListener('resize', () => ScrollTrigger.refresh());
  }

  /* -----------------------------------------
     5. Galería — parallax con data-speed
     ----------------------------------------- */
  if (!prefersReduced) {
    gsap.utils.toArray('.gal-item[data-speed]').forEach((el) => {
      const speed = parseFloat(el.dataset.speed) || 1;
      const offset = (1 - speed) * 160; // px de desplazamiento relativo
      gsap.fromTo(
        el,
        { y: -offset },
        {
          y: offset,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        }
      );
    });
  }

  /* -----------------------------------------
     6. Header — fondo al hacer scroll
     ----------------------------------------- */
  const header = document.getElementById('header');
  if (header) {
    ScrollTrigger.create({
      start: 'top -20',
      end: 99999,
      onUpdate: (self) => {
        header.classList.toggle('is-scrolled', self.scroll() > 20);
      },
    });
  }

  // Refresh después de que cargue todo
  window.addEventListener('load', () => ScrollTrigger.refresh());
})();
