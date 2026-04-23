/* =========================================================
   Lenis — Smooth Scroll + GSAP ScrollTrigger sync
   Docs: https://www.lenis.dev/
   ========================================================= */
(function () {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const lenis = new Lenis({
    duration: 1.15,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: !prefersReduced,
    wheelMultiplier: 1,
    touchMultiplier: 1.5,
    gestureOrientation: 'vertical',
    orientation: 'vertical',
  });

  // Expose for navigation, debugging
  window.lenis = lenis;

  // GSAP plugin + sync ticker (only if GSAP is present)
  if (window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);
  } else {
    // Fallback RAF loop
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }
})();
